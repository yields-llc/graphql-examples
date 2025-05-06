import type { BuilderType } from '@app/graphql/builder'

export function addProjectsQueries(builder: BuilderType) {
  builder.queryField('listProjects', (t) =>
    t.prismaField({
      type: ['projects'],
      resolve: async (_query, _root, args, ctx, _info) => {
        return ctx.prisma.projects.findMany({
          include: {
            owner: {
              select: { id: true, username: true, email: true },
            },
          },
          orderBy: [{ id: 'asc' }],
        })
      },
    }),
  )
}
