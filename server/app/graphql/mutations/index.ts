import { addProjectsMutations } from '@app/graphql/mutations/projects'
import type { BuilderType } from '@app/graphql/builder'

export function addMutations(builder: BuilderType) {
  addProjectsMutations(builder)
}
