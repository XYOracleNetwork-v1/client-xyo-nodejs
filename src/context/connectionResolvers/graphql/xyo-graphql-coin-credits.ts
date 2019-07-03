import { request } from 'graphql-request'
import { IXyoConnectionConfig } from '../../xyo-context-config'

export const coinCredits = async(config: IXyoConnectionConfig, command: string) => {
  const query = `
      query CoinCredits($token: String!) {
        coinCredits(token: $token)
      }
    `

  const result = await request(config.uri, query, {
    token: command
  }) as any

  return [{
    result: result.coinCredits,
    id: config.uri
  }]
}
