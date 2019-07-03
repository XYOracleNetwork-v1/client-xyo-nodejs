import { XyoContext } from './context/xyo-context'
import { IXyoJsonBoundWitness } from './context/xyo-json-bound-witness'

export * from './context/connectionResolvers/graphql/xyo-graphql-summary'
export * from './context/xyo-context'
export * from './context/xyo-json-bound-witness'

// const main = async() => {
//   const context =  await XyoContext.fetch('http://contexts.xyo.network/dataOcean.context.json')

//   // gets 5000 random blocks from the context
//   // tslint:disable-next-line:max-line-length

//   const query = {
//     payment: {
//       apiKey: 'carter'
//     },
//     select: {
//       name: 'SELECTOR_GEOHASH',
//       config: {
//         geohash: '9mud',
//         limit: 100
//       }
//     }
//   }

//   const result = await context.preform<IXyoJsonBoundWitness>('queryFor', query)
//   console.log(result)

// }

// main()

// import { XyoContext, IXyoCollectorStatsSummary } from '@xyo-network/client-xyo-nodejs'

// const main = async() => {
//   const context =  await XyoContext.fetch('http://contexts.xyo.network/data-ocean.context.json')
//   const result = await context.preform<IXyoJsonBoundWitness>('blockByHash', '1N9g2gYHdMMQwzQdPaLezVqTQPwf4a7dKwYL646bPcFY9hn')
//   console.log(result)
// }

// main()
