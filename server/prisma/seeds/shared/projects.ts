import { prisma } from '@prisma/client'
import type { projects } from '@prisma/generated/client'

export async function createProjects(seeds: Partial<projects>[]) {
  const creates: Partial<projects>[] = []
  for (const seed of seeds) {
    const found = await prisma.projects.findFirst({
      where: {
        name: seed.name || '',
        owner_id: seed.owner_id || BigInt(0),
      },
    })
    if (!found) {
      creates.push(seed)
    }
  }

  for (const create of creates) {
    const project = await prisma.projects.create({
      data: {
        name: create.name || '',
        description: create.description || '',
        owner_id: create.owner_id || BigInt(0),
      },
    })

    console.log({ project })
  }
}
