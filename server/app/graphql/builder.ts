import PothosSchemaBuilder from '@pothos/core'
import PrismaPlugin from '@pothos/plugin-prisma'
import RelayPlugin from '@pothos/plugin-relay'
import PrismaUtils from '@pothos/plugin-prisma-utils'
import PothosPrismaGeneratorPlugin from 'pothos-prisma-generator'
import { prisma } from '@prisma/client'
import { addQueries } from '@app/graphql/queries'
import type { PrismaClient } from '@prisma/generated/client'
import type PrismaTypes from '@prisma/generated/types'
import type { GraphQLSchema } from 'graphql/type'
import { MapperKind, mapSchema } from '@graphql-tools/utils'
import { addMutations } from '@app/graphql/mutations'

class SchemaBuilder extends PothosSchemaBuilder<{
  PrismaTypes: PrismaTypes
  Context: { prisma: PrismaClient }
}> {
  build(): GraphQLSchema {
    const schema = this.toSchema({ sortSchema: false })
    // https://www.apollographql.com/docs/apollo-server/schema/directives#transformer-functions
    // https://github.com/apollographql/docs-examples/blob/main/apollo-server/v4/custom-directives/upper-case-directive/src/index.ts
    return mapSchema(schema, {
      [MapperKind.SCALAR_TYPE]: (fieldConfig) => {
        if (fieldConfig.name === 'ID') {
          // graphql-js が BigInt 型の ID に対応していない
          // https://github.com/graphql/graphql-js/issues/3913
          fieldConfig.serialize = (outputValue) => String(outputValue)
        }
        return fieldConfig
      },
    })
  }
}

const builder = new SchemaBuilder({
  plugins: [PrismaPlugin, RelayPlugin, PrismaUtils, PothosPrismaGeneratorPlugin],
  prisma: {
    client: prisma,
  },
  pothosPrismaGenerator: {
    authority: () => [],
  },
})

type BuilderType = typeof builder

addQueries(builder)

addMutations(builder)

export { builder, SchemaBuilder, type BuilderType }
