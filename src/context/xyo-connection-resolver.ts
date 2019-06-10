import { graphQlResolver } from './connection-resolvers/xyo-graphql'
import { IConnectionConfig } from './xyo-context-config'

export interface IConnectionResolver {
  // tslint:disable-next-line:prefer-array-literal
  supports: {[key: string]: <T>(config: IConnectionConfig, command: string) =>  Promise<Array<{result: T, id: string}>> }
  canResolve(config: IConnectionConfig): boolean
}

export const resolveConnection = (config: IConnectionConfig): IConnectionResolver | undefined => {
    // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < connectionResolvers.length; i++) {
    const trying = connectionResolvers[i]

    if (trying.canResolve(config)) {
      return trying
    }
  }

  return undefined
}

export const connectionResolvers = [
  graphQlResolver,
]
