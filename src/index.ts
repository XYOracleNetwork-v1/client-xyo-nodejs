import { XyoContext } from './context/xyo-context'
import { IXyoCollectorStatsSummary } from './context/connectionResolvers/graphql/xyo-graphql-summary'

const main = async() => {
  const context =  await XyoContext.fetch('http://contexts.xyo.network/dataOcean.context.json')
  const result = await context.preform<IXyoCollectorStatsSummary>('collectorStatsSummary')
  console.log(result)
}

main()
