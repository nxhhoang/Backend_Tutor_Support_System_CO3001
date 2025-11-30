import prisma from './prisma.service'

export const menteeService = {
  getAll() {
    return prisma.mentee.findMany({
      include: {
        notes: true,
        previousFeedbacks: true
      }
    })
  },

  getById(id: number) {
    return prisma.mentee.findUnique({
      where: { id },
      include: {
        notes: true,
        previousFeedbacks: true
      }
    })
  },

  async addNote(menteeId: number, tutorId: number, content: string) {
    await prisma.menteeNote.create({
      data: { menteeId, tutorId, content }
    })
    return 'Đã lưu ghi chú thành công'
  },

  async addFeedback(menteeId: number, feedback: any) {
    await prisma.menteeFeedback.create({
      data: {
        studentId: menteeId,
        sessionId: feedback.sessionId,
        rating: feedback.ratingCriteria,
        comment: feedback.comment
      }
    })
    return 'Đánh giá đã được lưu thành công'
  }
}
