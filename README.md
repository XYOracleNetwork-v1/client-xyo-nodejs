[logo]: https://cdn.xy.company/img/brand/XY_Logo_GitHub.png

[![logo]](https://xy.company)

# client-xyo-nodejs

![NPM](https://img.shields.io/npm/v/@xyo-network/client-xyo-nodejs.svg?style=plastic)

![](https://github.com/XYOracleNetwork/client-xyo-nodejs/workflows/CI/badge.svg?branch=develop)
[![BCH compliance](https://bettercodehub.com/edge/badge/XYOracleNetwork/client-xyo-nodejs?branch=develop)](https://bettercodehub.com/results/XYOracleNetwork/sdk-core-nodejs) [![DepShield Badge](https://depshield.sonatype.org/badges/XYOracleNetwork/client-xyo-nodejs/depshield.svg)](https://depshield.github.io) 
[![Sonarcloud Status](https://sonarcloud.io/api/project_badges/measure?project=XYOracleNetwork_client-xyo-nodejs&metric=alert_status)](https://sonarcloud.io/dashboard?id=XYOracleNetwork_client-xyo-nodejs) 

## Table of Contents

-   [Sections](#sections)
-   [Project Overview](#project-overview)
-   [Scope of Features](#scope-of-features)
-   [Getting Started](#getting-started)
-   [Developer Guide](#developer-guide)
-   [Maintainers](#maintainers)
-   [License](#license)
-   [Credits](#credits)

## Project Overview

## Getting started
```typescript
import { XyoContext, IXyoCollectorStatsSummary } from '@xyo-network/client-xyo-nodejs'

const main = async() => {
  const context =  await XyoContext.fetch('http://contexts.xyo.network/dataOcean.context.json')
  const result = await context.preform<IXyoCollectorStatsSummary>('collectorStatsSummary')
  console.log(result)
}

main()
```

## Developer Guide

## Maintainers

-   Carter Harrison

## License

See the [LICENSE.md](LICENSE) file for license details.

## Credits

Made with 🔥and ❄️ by [XY - The Persistent Company](https://www.xy.company)
