import { request } from 'graphql-request'
import { IXyoConnectionConfig } from '../../xyo-context-config'

export const queryFor = async(config: IXyoConnectionConfig, command: any) => {
  const query = `
        query Query($queryString: String!) {
            queryFor(query: $queryString)
        }
    `

  command.mutate = {
    name: 'MUTATOR_HUMAN',
    config: {}
  }

  const result = await request(config.uri, query, {
    queryString: JSON.stringify(command),
  }) as any

  return result.queryFor.map((result: any) => {
    return {
      result: {
        signedHash: result.hash,
        bytes: result.bytes,
        humanReadable: result.human.value
      },
      id: result.hash
    }
  })
}
