import type { users } from '@prisma/generated/client'
import { createUsers } from '@prisma/seeds/shared/users'
import { hashPassword } from '@app/utils/password'

export default async function seedUsers() {
  const seeds: Partial<users>[] = [
    { username: 'Alice', email: 'alice@example.com', password_hash: await hashPassword('Password01') },
    { username: 'Bob', email: 'bob@example.com', password_hash: await hashPassword('Password02') },
    { username: 'Charlie', email: 'charlie@example.com', password_hash: await hashPassword('Password03') },
    { username: 'Diana', email: 'diana@example.com', password_hash: await hashPassword('Password04') },
    { username: 'Edward', email: 'edward@example.com', password_hash: await hashPassword('Password05') },
    { username: 'Fiona', email: 'fiona@example.com', password_hash: await hashPassword('Password06') },
    { username: 'George', email: 'george@example.com', password_hash: await hashPassword('Password07') },
    { username: 'Helen', email: 'helen@example.com', password_hash: await hashPassword('Password08') },
    { username: 'Ian', email: 'ian@example.com', password_hash: await hashPassword('Password09') },
    { username: 'Jane', email: 'jane@example.com', password_hash: await hashPassword('Password10') },
  ]
  await createUsers(seeds)
}
