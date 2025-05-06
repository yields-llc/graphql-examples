import { builder, SchemaBuilder } from '@app/graphql/builder'
import PothosQueryGeneratorPlugin from 'pothos-query-generator'
import PothosSchemaExporter from 'pothos-schema-exporter'
import { addQueries } from '@app/graphql/queries'
import { addMutations } from '@app/graphql/mutations'

const exporter = new SchemaBuilder({
  ...builder.options,
  plugins: [...(builder.options.plugins || []), PothosQueryGeneratorPlugin, PothosSchemaExporter],
  pothosQueryGenerator: {
    output: './../schema/query.graphql',
    depth: 2,
  },
  pothosSchemaExporter: {
    output: './../schema/schema.graphql',
  },
})

addQueries(exporter)

addMutations(exporter)

exporter.toSchema({ sortSchema: false })
