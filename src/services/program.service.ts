import prisma from './prisma.service'

const formatTutor = (t: any) => ({
  ...t,
  avail: t.avail ? JSON.parse(t.avail) : []
})

export const programService = {
  async getPrograms(params: { q?: string; category?: string; field?: string }) {
    const { q, category, field } = params
    const where: any = {}

    if (q) where.title = { contains: q } 
    if (category) where.category = category
    if (field) where.field = { contains: field }

    const programs = await prisma.academicProgram.findMany({
      where,
      include: { tutors: true } 
    })

    return programs.map((p) => ({
      ...p,
      tutors: p.tutors.map(formatTutor)
    }))
  },

  async getProgramById(id: number) {
    const p = await prisma.academicProgram.findUnique({
      where: { id },
      include: { tutors: true }
    })
    if (!p) return null
    return { ...p, tutors: p.tutors.map(formatTutor) }
  },

  async registerProgram(programId: number, studentId: number) {
    return await prisma.$transaction(async (tx) => {
      const program = await tx.academicProgram.findUnique({ where: { id: programId } })
      if (!program) throw new Error('Chương trình không tồn tại')
      if (program.availableSlots <= 0) throw new Error('Chương trình đã hết chỗ')

      await tx.academicProgram.update({
        where: { id: programId },
        data: {
          enrolledCount: { increment: 1 },
          availableSlots: { decrement: 1 }
        }
      })

      return await tx.academicRegistration.create({
        data: {
          programId,
          studentId,
          status: 'pending'
        }
      })
    })
  },

  async selectTutor(registrationId: number, tutorId: number) {
    const reg = await prisma.academicRegistration.findUnique({ where: { id: registrationId } })
    if (!reg) return false

    await prisma.academicRegistration.update({
      where: { id: registrationId },
      data: {
        tutorId,
        status: 'confirmed'
      }
    })
    return true
  },

  async aiMatchTutors(registrationId: number) {
    const reg = await prisma.academicRegistration.findUnique({
      where: { id: registrationId },
      include: {
        program: {
          include: { tutors: true }
        }
      }
    })

    if (!reg || !reg.program) return []
    return reg.program.tutors.map(formatTutor)
  },

  async getRegistrations(studentId: number, programId: number) {
    return await prisma.academicRegistration.findMany({
      where: { studentId, programId }
    })
  },

  async getTutors(programId?: number, q?: string) {
    let where: any = {}

    if (programId) {
      where.programs = { some: { id: programId } }
    }

    if (q) {
      where.OR = [{ name: { contains: q } }, { major: { contains: q } }]
    }

    const tutors = await prisma.academicTutor.findMany({ where })
    return tutors.map(formatTutor)
  }
}
