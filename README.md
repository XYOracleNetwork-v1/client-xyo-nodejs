[logo]: https://cdn.xy.company/img/brand/XYO_full_colored.png

[![logo]](https://xyo.network)

# client-xyo-nodejs

![NPM](https://img.shields.io/npm/v/@xyo-network/client-xyo-nodejs.svg?style=plastic)

![](https://github.com/XYOracleNetwork/client-xyo-nodejs/workflows/CI/badge.svg?branch=develop)
[![BCH compliance](https://bettercodehub.com/edge/badge/XYOracleNetwork/client-xyo-nodejs?branch=master)](https://bettercodehub.com/results/XYOracleNetwork/sdk-core-nodejs) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/cd8bf9baa0504c08842143f50841d83e)](https://www.codacy.com/gh/XYOracleNetwork/client-xyo-nodejs?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=XYOracleNetwork/client-xyo-nodejs&amp;utm_campaign=Badge_Grade) [![Sonarcloud Status](https://sonarcloud.io/api/project_badges/measure?project=XYOracleNetwork_client-xyo-nodejs&metric=alert_status)](https://sonarcloud.io/dashboard?id=XYOracleNetwork_client-xyo-nodejs) [![Maintainability](https://api.codeclimate.com/v1/badges/65d33ad3e57abccbbf5c/maintainability)](https://codeclimate.com/github/XYOracleNetwork/client-xyo-nodejs/maintainability) [![Known Vulnerabilities](https://snyk.io/test/github/XYOracleNetwork/client-xyo-nodejs/badge.svg?targetFile=package.json)](https://snyk.io/test/github/XYOracleNetwork/client-xyo-nodejs?targetFile=package.json)

> The XYO Foundation provides this source code available in our efforts to advance the understanding of the XYO Procotol and its possible uses. We continue to maintain this software in the interest of developer education. Usage of this source code is not intended for production.

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
