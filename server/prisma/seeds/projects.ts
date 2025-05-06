import type { projects } from '@prisma/generated/client'
import { createProjects } from '@prisma/seeds/shared/projects'
import { prisma } from '@prisma/client'

export default async function seedProjects() {
  const randomUsers = await prisma.users.findMany({ orderBy: [{ id: 'asc' }], take: 3 })

  const seeds: Partial<projects>[] = [
    {
      name: 'Project Alpha',
      description: 'This is a description for Project Alpha.',
      owner_id: randomUsers[0].id,
    },
    {
      name: 'Project Beta',
      description: 'This is a description for Project Beta.',
      owner_id: randomUsers[1].id,
    },
    {
      name: 'Project Gamma',
      description: 'This is a description for Project Gamma.',
      owner_id: randomUsers[2].id,
    },
  ]
  await createProjects(seeds)
}
