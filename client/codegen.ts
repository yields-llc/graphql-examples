import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './../schema/schema.graphql',
  documents: './../schema/query.graphql',
  generates: {
    './src/generated/types.ts': {
      plugins: ['typescript'],
    },
    './src/generated/operations.ts': {
      preset: 'import-types',
      presetConfig: {
        typesPath: '@/generated/types',
      },
      plugins: ['typescript-operations'],
    },
  },
  hooks: {
    afterAllFileWrite: ['yarn format:fix'],
  },
  ignoreNoDocuments: true,
}

export default config
