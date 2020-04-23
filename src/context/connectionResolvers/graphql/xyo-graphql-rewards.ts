/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { request } from 'graphql-request'
import { IXyoConnectionConfig } from '../../xyo-context-config'

export const rewards = async (
  config: IXyoConnectionConfig,
  command: string
) => {
  const query = `
      query Rewards($publicKey: String!) {
        rewards(publicKey: $publicKey)
      }
    `

  const result = (await request(config.uri, query, {
    publicKey: command,
  })) as any

  return [
    {
      result: result.rewards,
      id: config.uri,
    },
  ]
}
