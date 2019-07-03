import { request } from 'graphql-request'
import { IXyoConnectionConfig } from '../../xyo-context-config'

export const collectorStatsSummaryHistorical = async(config: IXyoConnectionConfig, command: string) => {
  const query = `
        query SummaryHistorical {
            collectorStatsSummaryHistorical
        }
      `

  const result = await request(config.uri, query) as any

  return [{
    result: result.collectorStatsSummaryHistorical,
    id: JSON.stringify(result.collectorStatsSummaryHistorical)
  }]
}
