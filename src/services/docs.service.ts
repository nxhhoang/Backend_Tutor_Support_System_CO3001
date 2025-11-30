import prisma from './prisma.service'

export const getAllDocs = () => {
  return prisma.document.findMany()
}

export const searchDocs = async (keyword: string) => {
  const lower = keyword.toLowerCase()

  const docs = await prisma.document.findMany({
    where: {
      OR: [
        { title: { contains: lower } },
        { author: { contains: lower } },
        { subject: { contains: lower } },
        { topic: { contains: lower } }
      ]
    }
  })

  return docs.filter(doc => {
    const arr = doc.keywords as string[] | null
    if (!arr) return false
    return arr.some((k) => k.toLowerCase().includes(lower))
  })
}

export const downloadDoc = async (id: string) => {
  const found = await prisma.document.findUnique({ where: { id } })

  if (!found) return 'Không tìm thấy tài liệu.'
  return `Đang tải xuống "${found.title}"...`
}
