import { gql } from 'graphql-request'
import type { ListProjectsQuery } from '@/generated/operations'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { parse } from 'graphql'
import { client } from '@/client'

type ProjectsType = ListProjectsQuery['listProjects']

export async function listProjects(): Promise<ProjectsType> {
  const query: TypedDocumentNode<ListProjectsQuery> = parse(gql`
    query Query {
      listProjects {
        id
        name
        owner {
          id
          username
        }
      }
    }
  `)

  try {
    const response = await client.request(query)
    return response.listProjects
  } catch (error) {
    console.error(error)
    throw error
  }
}
