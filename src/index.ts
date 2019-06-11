import { XyoContext } from './context/xyo-context'
import { IXyoJsonBoundWitness } from './context/xyo-json-bound-witness'

export * from './context/connectionResolvers/graphql/xyo-graphql-summary'
export * from './context/xyo-context'
export * from './context/xyo-json-bound-witness'

const main = async() => {
  const context =  await XyoContext.fetch('http://contexts.xyo.network/dataOcean.context.json')
  const result = await context.preform<IXyoJsonBoundWitness[]>('blockList', {
    limit: 20,
  })
  console.log(result.length)
}

main()

// import { XyoContext, IXyoCollectorStatsSummary } from '@xyo-network/client-xyo-nodejs'

// const main = async() => {
//   const context =  await XyoContext.fetch('http://contexts.xyo.network/dataOcean.context.json')
//   const result = await context.preform<IXyoCollectorStatsSummary>('collectorStatsSummary')
//   console.log(result)
// }

// main()
