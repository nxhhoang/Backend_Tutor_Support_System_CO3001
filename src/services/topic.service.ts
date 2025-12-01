import prisma from './prisma.service'

export const topicService = {
  async getAll() {
    return await prisma.topic.findMany({
      include: { comments: true },
      orderBy: { createdAt: 'desc' }
    })
  },

  async getById(id: string) {
    return await prisma.topic.findUnique({
      where: { id },
      include: {
        comments: {
          orderBy: { createdAt: 'asc' }
        }
      }
    })
  },

  async createTopic(data: { title: string; author: string }) {
    return await prisma.topic.create({
      data: {
        title: data.title,
        author: data.author
      }
    })
  },

  async createComment(topicId: string, content: string, author: string, parentId?: string) {
    const topicExists = await prisma.topic.findUnique({ where: { id: topicId } })
    if (!topicExists) throw new Error('Topic không tồn tại')

    let level = 0
    if (parentId) {
      const parentComment = await prisma.comment.findUnique({
        where: { id: parentId }
      })

      if (!parentComment) throw new Error('Comment cha không tồn tại')

      if (parentComment.topicId !== topicId) throw new Error('Comment cha không thuộc topic này')

      level = parentComment.level + 1
    }

    return await prisma.comment.create({
      data: {
        topicId,
        content,
        author,
        parentId,
        level
      }
    })
  }
}
