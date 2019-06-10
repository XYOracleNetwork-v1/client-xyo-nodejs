import { request } from 'graphql-request'
import { IXyoConnectionConfig } from '../../xyo-context-config'

export const about = async(config: IXyoConnectionConfig, command: string) => {
  const query = `
      query About {
          about {
              name
              address
          }
      }
      `

  const result = await request(config.uri, query) as any

  return [{
    result: result.about,
    id: result.about.address
  }]
}
