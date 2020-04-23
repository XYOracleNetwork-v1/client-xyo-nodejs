/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/member-delimiter-style */
import { request } from 'graphql-request'
import { IXyoConnectionConfig } from '../../xyo-context-config'

export interface IXyoCollectorStatsSummary {
  allTimeBoundWitnesses: number
  allTimeCollectedBoundWitnesses: number
  allTimeCollectedPerBoundWitness: number
  runTimeBoundWitnesses: number
  runTimeBoundWitnessMinute: number
  runTimeCollectedBoundWitnesses: number
  runTimeCollectedPerBoundWitness: number
  runTimeCollectedPerBoundWitnessMinute: number
  lastBoundWitnessTime: string
}

export const collectorStatsSummary = async (
  config: IXyoConnectionConfig,
  command: string
) => {
  const query = `
      query Summary {
        collectorStatsSummary {
            allTimeBoundWitnesses
            allTimeCollectedBoundWitnesses
            allTimeCollectedPerBoundWitness
            runTimeBoundWitnesses
            runTimeBoundWitnessMinute
            runTimeCollectedBoundWitnesses
            runTimeCollectedPerBoundWitness
            runTimeCollectedPerBoundWitnessMinute
            lastBoundWitnessTime
        }
      }
      `

  const result = (await request(config.uri, query)) as any

  return [
    {
      result: result.collectorStatsSummary,
      id: JSON.stringify(result.collectorStatsSummary),
    },
  ]
}
