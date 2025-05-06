import { addProjectsQueries } from '@app/graphql/queries/projects'
import type { BuilderType } from '@app/graphql/builder'

export function addQueries(builder: BuilderType) {
  addProjectsQueries(builder)
}
