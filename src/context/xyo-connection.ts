import { IXyoConnectionConfg } from './xyo-context-config'
import { IConnectionResolver, resolveConnection } from './xyo-connection-resolver'

export class Connection {
  public supports: string[] = []
  public onUpdate: (() => void) | undefined
  private config: IXyoConnectionConfg
  private resolver: IConnectionResolver | undefined

  constructor(config: IXyoConnectionConfg) {
    this.resolver = resolveConnection(config)
    this.config = config
  }

  // tslint:disable-next-line:prefer-array-literal
  public async run <T>(type: string, command: string): Promise<Array<{result: T, id: string}> | undefined> {
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
