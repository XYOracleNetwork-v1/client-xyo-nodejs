/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { request } from 'graphql-request'
import { IXyoConnectionConfig } from '../../xyo-context-config'

export const blockByHash = async (
  config: IXyoConnectionConfig,
  command: any
) => {
  const query = `
        query BlockByHash($hash: String!) {
            blockByHash(hash: $hash) {
                signedHash
                bytes
                humanReadable
            }
        }
    `

  const result = (await request(config.uri, query, {
    hash: command,
  })) as any

  return [
    {
      result: result.blockByHash,
      id: result.blockByHash.bytes || command,
    },
  ]
}
