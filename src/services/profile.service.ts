import prisma from './prisma.service' 
import { Profile } from '@prisma/client'

export const profileService = {
  async getAll() {
    return await prisma.profile.findMany()
  },

  async getById(id: number) {
    return await prisma.profile.findUnique({
      where: { id }
    })
  },

  async search(query: string) {
    const q = query.trim().toLowerCase()
    return await prisma.profile.findMany({
      where: {
        OR: [{ name: { contains: q } }, { email: { contains: q } }]
      }
    })
  },

  async create(data: any) {
    return await prisma.profile.create({
      data: {
        ...data,
        skills: data.skills ? JSON.stringify(data.skills) : null,
        avail: data.avail ? JSON.stringify(data.avail) : null
      }
    })
  }
}