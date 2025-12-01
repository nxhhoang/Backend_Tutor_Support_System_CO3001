import prisma from './prisma.service'

export const reportService = {
  async getSummaries() {
    return await prisma.reportSummary.findMany({
      orderBy: { semester: 'desc' }
    })
  },

  async getDetailed(semester: string) {
    const whereCondition = semester !== 'all' ? { programTitle: { contains: semester } } : {}

    const rawData = await prisma.detailedReport.findMany({
      where: whereCondition
    })

    return rawData.map((item) => ({
      program: {
        id: item.programId,
        title: item.programTitle,
        description: item.programDesc,
        category: item.programCategory,
        capacity: item.programCapacity,
        enrolledCount: item.programEnrolled,
        availableSlots: item.programSlots,
        status: item.programStatus
      },
      tutorCount: item.tutorCount,
      menteeCount: item.menteeCount,
      avgScore: item.avgScore,
      completedSessions: item.completedSessions,
      ongoingSessions: item.ongoingSessions
    }))
  },

  async generate(filters: any) {
    return {
      success: true,
      time: new Date().toISOString(),
      filters
    }
  }
}
