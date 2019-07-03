// tslint:disable: prefer-array-literal
import { IConnectionResolver } from '../../xyo-connection-resolver'
import { IXyoConnectionConfig } from '../../xyo-context-config'
import { about } from './xyo-graphql-about'
import { collectorStatsSummary } from './xyo-graphql-summary'
import { collectorStatsSummaryHistorical } from './xyo-graphql-summary-historical'
import { blockByHash } from './xyo-graphql-block-by-hash'
import { querySupport } from './xyo-graphql-query-support'
import { queryFor } from './xyo-graphql-query'
import { blockList } from './xyo-graphql-block-list'
import { credits } from './xyo-graphql-credits'
import { coinCredits } from './xyo-graphql-coin-credits'
import { payTo } from './xyo-graphql-pay-to'
import { ethRedeem } from './xyo-graphql-eth'

import { request } from 'graphql-request'

export const graphQlResolver: IConnectionResolver = {
  canResolve: (config: IXyoConnectionConfig) => {
    return config.interface === 'graphql'
  },
  getSupports: async(config: IXyoConnectionConfig) => {
    const supportedQueries: {[key: string]: <T>(config: IXyoConnectionConfig, command: string) =>  Promise<Array<{result: T, id: string}>> } = {}
    const queryNames = await getAllSupportsFromSchema(config.uri)

    queryNames.forEach((queryName: string) => {
      if (allQueries[queryName]) {
        supportedQueries[queryName] = allQueries[queryName]
      }
    })

    return supportedQueries
  },
}

const allQueries: {[key: string]: <T>(config: IXyoConnectionConfig, command: string) =>  Promise<Array<{result: T, id: string}>> } = {
  about,
  collectorStatsSummary,
  blockByHash,
  blockList,
  querySupport,
  queryFor,
  collectorStatsSummaryHistorical,
  credits,
  payTo,
  ethRedeem,
  coinCredits
}

const getAllSupportsFromSchema = async(endpoint: string) => {
  const query = `
    query Schema {
      __schema {
          queryType {
                  name
                  fields {
                      name
                  }
              }
          }
      }
      `

  const result = await request(endpoint, query) as any
  return result.__schema.queryType.fields.map((queryAbout: any) => queryAbout.name)
}
