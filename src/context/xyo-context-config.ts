export interface IXyoContextConfig {
  name?: string
  description?: string
  operation?: 'intersection' | 'union' | 'product'
  connection ?: IXyoConnectionConfig
  sets?: IXyoContextConfig[]
}

export interface IXyoConnectionConfig {
  'interface': 'json' | 'graphql' | 'socket' | 'gatt'
  uri: string
}
