import { prisma } from '@prisma/client'
import seedUsers from '@prisma/seeds/users'
import seedProjects from '@prisma/seeds/projects'
import seedTasks from '@prisma/seeds/tasks'

async function main() {
  await seedUsers()
  await seedProjects()
  await seedTasks()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
