import { prisma } from '@prisma/client'
import type { users } from '@prisma/generated/client'

export async function createUsers(seeds: Partial<users>[]) {
  for (const seed of seeds) {
    const user = await prisma.users.upsert({
      where: { username: seed.username },
      update: {
        username: seed.username,
        email: seed.email,
        password_hash: seed.password_hash,
      },
      create: {
        username: seed.username || '',
        email: seed.email || '',
        password_hash: seed.password_hash || '',
      },
    })

    console.log({ user })
  }
}
