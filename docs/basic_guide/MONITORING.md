
## Stability (Healthcheck)

To ensure the service is up and running, we utilize [Terminus](https://docs.nestjs.com/recipes/terminus#setting-up-a-healthcheck) for performing health checks. When adding any new dependency (3rd party API, Database, URL, etc), make sure to update the `health` module to address how the service will resolve situations where these dependencies are down.