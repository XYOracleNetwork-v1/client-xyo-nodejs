import { IConnectionConfig } from './xyo-context-config'
import { IConnectionResolver, resolveConnection } from './xyo-connection-resolver'

export class Connection {
  public name = 'Loading'
  public status = 'Loading'
  public supports: string[] = []
  public onUpdate: (() => void) | undefined
  private config: IConnectionConfig
  private resolver: IConnectionResolver | undefined

  constructor(config: IConnectionConfig) {
    this.resolver = resolveConnection(config)
    this.config = config
  }

  // tslint:disable-next-line:prefer-array-literal
  public async run <T>(type: string, command: string): Promise<Array<{result: T, id: string}> | undefined> {
    if (this.resolver) {
      const runner = this.resolver.supports[type]

      if (runner) {
        return runner<T>(this.config, command)
      }
    }

    return undefined
  }
}
