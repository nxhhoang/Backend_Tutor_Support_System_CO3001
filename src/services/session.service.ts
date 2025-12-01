import prisma from './prisma.service'

export const sessionService = {
  async getAll() {
    return await prisma.session.findMany({
      include: { feedbacks: true, tutorFeedbacks: true }
    })
  },

  async getByStudent(studentId: number) {
    return await prisma.session.findMany({
      where: { studentId },
      include: { feedbacks: true }
    })
  },

  async getByTutor(tutorId: number) {
    return await prisma.session.findMany({
      where: { tutorId },
      include: { tutorFeedbacks: true }
    })
  },

  async updateStatus(id: number, status: string) {
    const data: any = { status }
    if (status === 'confirmed') data.confirmedAt = new Date()
    if (status === 'completed') data.completedAt = new Date()

    return await prisma.session.update({
      where: { id },
      data
    })
  },

  async addStudentFeedback(sessionId: number, payload: any) {
    return await prisma.sessionFeedback.create({
      data: {
        sessionId,
        studentId: payload.studentId,
        comment: payload.comment,
        practicalRelevance: payload.practicalRelevance || 0,
        knowledgeLoad: payload.knowledgeLoad || 0,
        clarity: payload.clarity || 0,
        enthusiasm: payload.enthusiasm || 0,
        goalTransmission: payload.goalTransmission || 0
      }
    })
  },

  async createSession(payload: any) {
    return await prisma.session.create({
      data: {
        programId: payload.programId,
        tutorId: payload.tutorId,
        studentId: payload.studentId,
        mode: payload.mode, // 'online' | 'offline'
        location: payload.location || '',
        time: new Date(payload.time),
        status: payload.status || 'confirm',
        subject: payload.subject,
        meetingReport: payload.meetingReport || null
      }
    })
  },

  async addTutorFeedback(sessionId: number, payload: any) {
    return await prisma.tutorFeedback.create({
      data: {
        sessionId,
        ...payload
      }
    })
  },

  async getFeedbacks(sessionId: number) {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { feedbacks: true, tutorFeedbacks: true }
    })
    return {
      studentFeedbacks: session?.feedbacks || [],
      tutorFeedbacks: session?.tutorFeedbacks || []
    }
  },

  async setReport(sessionId: number, report: string) {
    return await prisma.session.update({
      where: { id: sessionId },
      data: { meetingReport: report }
    })
  }
}
