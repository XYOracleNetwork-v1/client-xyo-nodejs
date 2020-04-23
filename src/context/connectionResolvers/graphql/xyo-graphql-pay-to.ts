/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { request } from 'graphql-request'
import { IXyoConnectionConfig } from '../../xyo-context-config'

export const payTo = async (config: IXyoConnectionConfig, command: string) => {
  const query = `
      query PayTo {
        payTo
      }
      `

  const result = (await request(config.uri, query)) as any

  return [
    {
      result: result.payTo,
      id: config.uri,
    },
  ]
}
