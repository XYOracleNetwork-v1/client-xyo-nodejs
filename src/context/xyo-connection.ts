import { IXyoConnectionConfig } from './xyo-context-config'
import { IConnectionResolver, resolveConnection } from './xyo-connection-resolver'

export class Connection {
  public supports: string[] = []
  public onUpdate: (() => void) | undefined
  public config: IXyoConnectionConfig
  public resolver: IConnectionResolver | undefined

  constructor(config: IXyoConnectionConfig) {
    this.resolver = resolveConnection(config)
    this.config = config
  }

  public async preform <T>(type: string, command: any): Promise<T | undefined> {
    if (this.resolver) {
      const supports = await this.resolver.getSupports(this.config)
      const runner = supports[type]

      if (runner) {
        const results = (await runner<T>(this.config, command)).map((r) => {
          return r.result
        })

        if (results.length > 0) {
          return results[0]
        }
      }
    }

    return undefined
  }

  // tslint:disable-next-line:prefer-array-literal
  public async run <T>(type: string, command: any): Promise<Array<{result: T, id: string}> | undefined> {
    if (this.resolver) {
      const supports = await this.resolver.getSupports(this.config)
      const runner = supports[type]

      if (runner) {
        return runner<T>(this.config, command)
      }
    }

    return undefined
  }
}
