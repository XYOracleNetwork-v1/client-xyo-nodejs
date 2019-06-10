import { IConnectionResolver } from '../xyo-connection-resolver'
import { IConnectionConfig } from '../xyo-context-config'
import { request } from 'graphql-request'

export const graphQlResolver: IConnectionResolver = {
  canResolve: (config: IConnectionConfig) => {
    return config.interface === 'graphql'
  },
  supports: {
    about: async(config: IConnectionConfig, command: string) => {
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
  },
}
