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
    const { ratingCriteria, ...rest } = payload

    return await prisma.sessionFeedback.create({
      data: {
        sessionId,
        studentId: rest.studentId,
        comment: rest.comment,
        practicalRelevance: ratingCriteria?.practicalRelevance || 0,
        knowledgeLoad: ratingCriteria?.knowledgeLoad || 0,
        clarity: ratingCriteria?.clarity || 0,
        enthusiasm: ratingCriteria?.enthusiasm || 0,
        goalTransmission: ratingCriteria?.goalTransmission || 0
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
