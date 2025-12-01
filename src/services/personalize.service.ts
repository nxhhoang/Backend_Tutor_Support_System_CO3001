import prisma from '~/services/prisma.service'

export const personalizeService = {
  getPreferences() {
    return prisma.learningPreference.findMany()
  },
  getGoals() {
    return prisma.learningGoal.findMany()
  },
  getRecommendations() {
    return prisma.recommendation.findMany()
  },
  getProgress() {
    return prisma.learningProgress.findMany()
  },
  async setFeedback(id: string, feedback: 'up' | 'down') {
    return prisma.recommendation.update({
      where: { id },
      data: { feedback }
    })
  }
}
