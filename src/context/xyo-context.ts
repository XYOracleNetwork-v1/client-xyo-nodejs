// tslint:disable: prefer-array-literal
import { IXyoContextConfig } from './xyo-context-config'
import { Connection } from './xyo-connection'
import requestPromise from 'request-promise'

export class XyoContext {

  public static async fetch(url: string): Promise<XyoContext> {
    const contextAsString = await requestPromise(url)
    const contextConfig = JSON.parse(contextAsString)
    return new XyoContext(contextConfig)
  }

  private set: XyoContext[] = []
  private connection: Connection | undefined
  private config: IXyoContextConfig

  constructor(config: IXyoContextConfig) {
    this.config = config

    if (config.connection) {
      this.connection = new Connection(config.connection)
    }

    if (config.sets) {
      config.sets.forEach((contextConfig) => {
        this.set.push(new XyoContext(contextConfig))
      })
    }
  }

  public getOperator(): 'intersection' | 'union' | 'product' {
    return this.config.operation || 'union'
  }

  public getDescription(): string | undefined {
    return this.config.description
  }

  public getConnections(): Connection | undefined {
    return this.connection
  }

  public getSet(): XyoContext[] {
    return this.set
  }

  public getAllConnections(): Connection[] {
    const connections: Connection[] = []

    if (this.connection) {
      connections.push(this.connection)
    }

    const sets = this.getSet()

    sets.forEach((set) => {
      const childConnections = set.getAllConnections()

      childConnections.forEach((connection) => {
        connections.push(connection)
      })
    })

    return connections
  }

  public async preform <T>(type: string, command: string = ''): Promise<T[]> {
    return (await this.run<T>(type, command)).map(a => a.result)
  }

  private async run <T>(type: string, command: string): Promise<Array<{result: T, id: string}>> {
    const results = Array<{result: T, id: string}>()

    if (this.connection) {
      const connectionConnectionResult = await this.connection.run<T>(type, command)

      if (connectionConnectionResult) {
        connectionConnectionResult.forEach((result) => {
          results.push(result)
        })
      }
    }

    const set = this.getSet()
    const operator = this.getOperator()
    const setResults = await Promise.all(set.map((ctx) => {
      return ctx.run<T>(type, command)
    }))

    this.preformSetOperation<T>(setResults, operator).forEach((result) => {
      results.push(result)
    })

    return results
  }

  private preformSetOperation<T>(input: Array<Array<{result: T, id: string}>>, o: 'intersection' | 'union' | 'product'): Array<{result: T, id: string}> {
    if (o === 'union') {
      return this.preformUnion(input)
    }

    if (o === 'intersection') {
      return this.preformIntersection(input)
    }

    return []
  }

  private preformIntersection <T>(input: Array<Array<{result: T, id: string}>>): Array<{result: T, id: string}> {
    const all: {[key: string]: T} = {}
    const mapping: Array<{[key: string]: T}> = new Array(input.length)

    input.forEach((group, i) => {
      group.forEach((result) => {
        mapping[i][result.id] = result.result
        all[result.id] = result.result
      })
    })

    const ids = Object.keys(all)
    const toReturn = Array<{result: T, id: string}>()

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i]

      for (let j = 0; j < mapping.length; j++) {
        if (mapping[j][id] === undefined) {
          break
        }

        if (j === mapping.length - 1) {
          toReturn.push({
            id,
            result: mapping[j][id],
          })
        }
      }
    }

    return toReturn
  }

  private preformUnion <T>(input: Array<Array<{result: T, id: string}>>): Array<{result: T, id: string}> {
    const mapping: {[key: string]: T} = {}

    input.forEach((group) => {
      group.forEach((result) => {
        mapping[result.id] = result.result
      })
    })

    return Object.keys(mapping).map((key) => {
      return {
        result: mapping[key],
        id: key,
      }
    })
  }

}
