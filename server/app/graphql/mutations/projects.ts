import type { BuilderType } from '@app/graphql/builder'

export function addProjectsMutations(builder: BuilderType) {
  builder.mutationField('updateProject', (t) =>
    t.prismaField({
      type: 'projects',
      args: {
        id: t.arg.int(),
        description: t.arg.string(),
      },
      resolve: async (_query, _root, args, ctx, _info) => {
        if (!args.id || !args.description) {
          return
        }
        return ctx.prisma.projects.update({
          data: {
            description: args.description || '',
          },
          where: { id: args.id || BigInt(0) },
        })
      },
    }),
  )
}
