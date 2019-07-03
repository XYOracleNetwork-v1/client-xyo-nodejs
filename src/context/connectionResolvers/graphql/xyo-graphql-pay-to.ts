import { request } from 'graphql-request'
import { IXyoConnectionConfig } from '../../xyo-context-config'

export const payTo = async(config: IXyoConnectionConfig, command: string) => {
  const query = `
      query PayTo {
        payTo
      }
      `

  const result = await request(config.uri, query) as any

  return [{
    result: result.payTo,
    id: config.uri
  }]
}
