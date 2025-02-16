[home](/README.md#wiki-pages)

# Debugging Tools

No code is foolproof. Something that works years ago will suddenly break as codes are constantly modified and pushed to ever changing business needs. This is why we need to take advantage of anything that can aide us in understanding what has changed in our system.

## Global catch

We should as often as possibly implement try...catch blocks to capture and respond appropriately to certain errors. However, some edge case errors can be missed. This is where the global catch comes in to provide a default API response (such as 500 Internal Server Error) while at the same time, alerting the developers (i.e. via Sentry). Our [GlobalEsceptionFilter](/src/common/filters/global-exception.filter.ts) 

## Logging

Logging is an essential tool we use for tracing and understanding what went wrong in our product. We should understand what we log out based on environments we are working on. Logger instances should be created in the specific file and define the context (file name) for easy debugging.

example in the AnalyticsService.ts file
```
const logger = new Logger('AnalyticsService', { timestamp: true });
```

### Log Levels (based on NODE_ENV)

depending on the values of process.env.NODE_ENV, certain logs are allowed.

| **log level** | **default** | **test** | **qa** | **development** |
|:-------------:|:-----------:|:--------:|:------:|:---------------:|
| verbose       |     ❌     |     ❌   |   ❌  |        ✅       |
| debug         |     ❌     |     ❌   |   ✅  |        ✅       |
| log           |     ✅     |     ❌   |   ✅  |        ✅       |
| warn          |     ✅     |     ✅   |   ✅  |        ✅       |
| error         |     ✅     |     ✅   |   ✅  |        ✅       |
| fatal         |     ✅     |     ✅   |   ✅  |        ✅       |

## Sentry

We use sentry to monitor activities (particularly errors) in our apps and apis. Integrating with nestjs is as simple as following [the official guide](https://docs.sentry.io/platforms/javascript/guides/nestjs/). This has been done for this repository so by forking, you will no longer need to do it. all you need is to provide the SENTRY_DSN in your environment.

