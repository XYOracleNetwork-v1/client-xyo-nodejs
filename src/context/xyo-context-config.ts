export interface IXyoContextConfig {
  name?: string
  description?: string
  operation?: 'intersection' | 'union' | 'product'
  connection ?: IConnectionConfig
  sets?: IContextConfig[]
}

export interface IConnectionConfig {
  'interface': 'json' | 'graphql' | 'socket' | 'gatt'
  uri: string
}

export interface IRequestAbout {
  name: string
  address: string
}
