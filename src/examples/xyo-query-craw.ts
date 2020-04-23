/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { XyoContext } from '../context/xyo-context'
import { IXyoJsonBoundWitness } from '../context/xyo-json-bound-witness'

type QueryBuilder = (key: string) => any

const latestBlockQueryBuilder: QueryBuilder = (key: string) => {
  return {
    select: {
      name: 'SELECTOR_TIME',
      config: {
        fromTime: new Date().getTime(),
        limit: Math.floor(Math.random() * 500) + 1,
      },
    },
    mutate: {
      name: 'MUTATOR_HUMAN',
      config: {},
    },
    payment: {
      apiKey: key,
    },
  }
}

const geohashQueryBuilder: QueryBuilder = (key: string) => {
  const base32 = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
  ]

  const g1 = base32[
    Math.floor(Math.random() * (base32.length - 1))
  ].toLowerCase()
  const g2 = base32[
    Math.floor(Math.random() * (base32.length - 1))
  ].toLowerCase()
  const geohash = g1 + g2

  console.log(`Geohash ${geohash}`)

  return {
    select: {
      name: 'SELECTOR_GEOHASH',
      config: {
        geohash,
        limit: Math.floor(Math.random() * 2000) + 1,
      },
    },
    mutate: {
      name: 'MUTATOR_HUMAN',
      config: {},
    },
    payment: {
      apiKey: key,
    },
  }
}

const queryBuilders: QueryBuilder[] = [
  latestBlockQueryBuilder,
  geohashQueryBuilder,
  geohashQueryBuilder,
  geohashQueryBuilder,
]

export class XyoQueryCall {
  context: XyoContext
  key: string

  constructor(context: XyoContext, apiKey: string) {
    this.context = context
    this.key = apiKey
  }

  public start = async () => {
    console.log('Starting...')

    let i = 0
    while (true) {
      await this.loop(i)
      await this.delay(1000 * 60)
      i += 1
    }
  }

  private loop = async (it: number) => {
    console.log('------------------------------')
    const credits = await this.getNumberOfCredits()
    console.log(`Credits ${credits}`)

    if (credits < 1) {
      console.log('Out of credits, sleeping for 10 mins')
      await this.delay(1000 * 60 * 10)
      return
    }

    const runner = queryBuilders[it % queryBuilders.length]
    const query = runner(this.key)

    try {
      const blocks = await this.context.preform<IXyoJsonBoundWitness>(
        'queryFor',
        query
      )
      console.log(`Queried ${blocks.length} bound witnesses`)
    } catch (e) {
      console.log(e)
    }
  }

  private delay(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }

  public getNumberOfCredits = async (): Promise<number> => {
    return (await this.context.preform<number>('credits', this.key))[0]
  }
}

const main = async () => {
  const context = await XyoContext.fetch(
    'https://contexts.xyo.network/data-ocean-diviner.context.json'
  )
  const query = new XyoQueryCall(context, process.argv[2])
  query.start()
}

main()
