
import { request } from 'graphql-request'
import { IXyoConnectionConfig } from '../../xyo-context-config'

export const ethRedeem = async(config: IXyoConnectionConfig, command: any) => {
  const query = `
      query EthRedeem($txH: String!, $from: String!, $apiKey: String!, $signature: String!) {
        ethRedeem(txH: $txH, from: $from, apiKey: $apiKey, signature: $signature)
      }
    `

  const result = await request(config.uri, query, command) as any

  return [{
    result: result.ethRedeem,
    id: result.about.address
  }]
}
