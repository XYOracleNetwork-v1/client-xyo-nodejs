/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable @typescript-eslint/member-delimiter-style */
export interface IXyoContextConfig {
  name?: string
  description?: string
  operation?: 'intersection' | 'union' | 'product'
  connection?: IXyoConnectionConfig
  sets?: IXyoContextConfig[]
}

export interface IXyoConnectionConfig {
  interface: 'json' | 'graphql' | 'socket' | 'gatt'
  uri: string
}
