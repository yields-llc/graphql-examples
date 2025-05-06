import { prisma } from '@prisma/client'
import type { tasks } from '@prisma/generated/client'

export async function createTasks(seeds: Partial<tasks>[]) {
  const creates: Partial<tasks>[] = []
  for (const seed of seeds) {
    const found = await prisma.tasks.findFirst({
      where: {
        title: seed.title || '',
        project_id: seed.project_id || BigInt(0),
      },
    })
    if (!found) {
      creates.push(seed)
    }
  }

  for (const create of creates) {
    const task = await prisma.tasks.create({
      data: {
        title: create.title || '',
        description: create.description || '',
        project_id: create.project_id || BigInt(0),
      },
    })

    console.log({ task })
  }
}
