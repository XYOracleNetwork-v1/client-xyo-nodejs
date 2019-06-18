import { request } from 'graphql-request'
import { IXyoConnectionConfig } from '../../xyo-context-config'

export const credits = async(config: IXyoConnectionConfig, command: string) => {
  const query = `
      query Credits($apiKey: String!) {
        credits(apiKey: $apiKey)
      }
    `

  const result = await request(config.uri, query, {
    apiKey: command
  }) as any

  return [{
    result: result.about,
    id: result.about.address
  }]
}
