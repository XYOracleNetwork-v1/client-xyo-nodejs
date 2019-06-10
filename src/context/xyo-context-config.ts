export interface IXyoContextConfig {
  name?: string
  description?: string
  operation?: 'intersection' | 'union' | 'product'
  connection ?: IXyoConnectionConfg
  sets?: IXyoContextConfig[]
}

export interface IXyoConnectionConfg {
  'interface': 'json' | 'graphql' | 'socket' | 'gatt'
  uri: string
}
