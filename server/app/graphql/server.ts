import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { builder } from '@app/graphql/builder'
import { prisma } from '@prisma/client'

const schema = builder.build()

// サーバーの起動
const server = new ApolloServer({
  schema,
})

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({
    ...req,
    prisma,
  }),
  listen: { port: Number(process.env.PORT || '4000') },
})

console.log(`🚀  Server ready at: ${url}`)
