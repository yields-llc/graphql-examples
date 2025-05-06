import type { tasks } from '@prisma/generated/client'
import { prisma } from '@prisma/client'
import { createTasks } from '@prisma/seeds/shared/tasks'

export default async function seedTasks() {
  const randomProjects = await prisma.projects.findMany({ orderBy: [{ id: 'asc' }], take: 3 })

  const seeds: Partial<tasks>[] = []
  for (const project of randomProjects) {
    for (let number = 1; number <= 3; number++) {
      seeds.push({
        title: `Task ${number}`,
        description: `Task ${number}`,
        project_id: project.id,
      })
    }
  }
  await createTasks(seeds)
}
