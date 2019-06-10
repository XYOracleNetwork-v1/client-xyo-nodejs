import { graphQlResolver } from './connectionResolvers/graphql/xyo-graphql'
import { IXyoConnectionConfg } from './xyo-context-config'

export interface IConnectionResolver {
  // tslint:disable-next-line:prefer-array-literal
  getSupports(config: IXyoConnectionConfg): Promise<{[key: string]: <T>(config: IXyoConnectionConfg, command: string) =>  Promise<Array<{result: T, id: string}>> }>
  canResolve(config: IXyoConnectionConfg): boolean
}

export const resolveConnection = (config: IXyoConnectionConfg): IConnectionResolver | undefined => {
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
