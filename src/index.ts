import { IXyoContextConfig } from './context/xyo-context-config'
import { XyoContext } from './context/xyo-context'
import { IXyoCollectorStatsSummary } from './context/connectionResolvers/graphql/xyo-graphql-summary'

const config: IXyoContextConfig = {
  name: 'Data Ocean',
  description: 'A lot of data',
  operation: 'union',
  sets: [
    {
      name: 'Data Archivist',
      connection: {
        interface: 'graphql',
        uri: 'http://ac0.xyo.network:11001'
      }
    },
  ]
}

const main = async() => {
  const context = new XyoContext(config)
  const result = await context.preform<IXyoCollectorStatsSummary>('collectorStatsSummary')
  console.log(result)
}

main()
