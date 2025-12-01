import prisma from './prisma.service'

const formatWorkload = (item: any) => ({
  tutor: {
    id: item.tutorRefId,
    name: item.tutorName,
    email: item.tutorEmail,
    role: item.tutorRole,
    major: item.tutorMajor,
    rating: item.tutorRating
  },
  totalMentees: item.totalMentees,
  maxMentees: item.maxMentees,
  totalSessions: item.totalSessions,
  completedSessions: item.completedSessions,
  totalHours: item.totalHours,
  avgCompletionRate: item.avgCompletionRate
})

export const workloadService = {
  async getAll() {
    const data = await prisma.tutorWorkload.findMany()
    return data.map(formatWorkload)
  },

  async getMetrics() {
    const aggregations = await prisma.tutorWorkload.aggregate({
      _avg: {
        avgCompletionRate: true,
        totalHours: true
      }
    })

    return {
      avgCompletion: aggregations._avg.avgCompletionRate || 0,
      avgHours: aggregations._avg.totalHours || 0
    }
  },

  async assignMentee(tutorId: number, studentName: string) {
    const tutor = await prisma.tutorWorkload.findFirst({
      where: { tutorRefId: tutorId }
    })

    if (!tutor) throw new Error('Không tìm thấy Tutor')
    if (tutor.totalMentees >= tutor.maxMentees) throw new Error('Tutor đã đầy')

    await prisma.tutorWorkload.update({
      where: { id: tutor.id }, 
      data: {
        totalMentees: { increment: 1 },
        totalSessions: { increment: 2 },
        totalHours: { increment: 3 },
        avgCompletionRate: Math.min(100, tutor.avgCompletionRate + 1)
      }
    })

    console.log(`Đã gán sinh viên ${studentName} cho tutor ${tutor.tutorName}`)

    return this.getAll()
  }
}