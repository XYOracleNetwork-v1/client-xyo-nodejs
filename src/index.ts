import { IXyoContextConfig } from './context/xyo-context-config'
import { XyoContext } from './context/xyo-context'

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

const context = new XyoContext(config)

const main = async() => {
  const result = await context.preform('about', '')
  console.log(result)
}

main()
