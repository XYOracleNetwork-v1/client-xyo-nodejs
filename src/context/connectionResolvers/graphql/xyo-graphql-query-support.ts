/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { request } from 'graphql-request'
import { IXyoConnectionConfig } from '../../xyo-context-config'

export const querySupport = async (
  config: IXyoConnectionConfig,
  command: string
) => {
  const query = `
        query QuerySupport {
            querySupport
        }
    `

  const result = (await request(config.uri, query)) as any

  return [
    {
      result: result.querySupport,
      id: config.uri,
    },
  ]
}
