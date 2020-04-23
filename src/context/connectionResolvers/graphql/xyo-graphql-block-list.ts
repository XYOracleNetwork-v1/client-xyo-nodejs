/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { request } from 'graphql-request'
import { IXyoConnectionConfig } from '../../xyo-context-config'
import { IXyoJsonBoundWitness } from '../../xyo-json-bound-witness'

export const blockList = async (config: IXyoConnectionConfig, command: any) => {
  const query = `
        query BlockList($limit: Int!, $cursor: String) {
            blockList(limit: $limit, cursor: $cursor) {
                items {
                    bytes
                    humanReadable
                    signedHash
                }
            }
        }
    `

  const result = (await request(config.uri, query, command)) as any

  return result.blockList.items.map((block: IXyoJsonBoundWitness) => {
    return {
      result: block,
      id: block.signedHash,
    }
  })

  return []
}
