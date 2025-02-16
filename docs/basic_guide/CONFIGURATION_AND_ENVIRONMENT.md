[home](/README.md#wiki-pages)

# Configuration and the Environment Variables

It is common that our app would be run in different environments. Each one prefering different configurations. Some would be hard coded (i.e. INLINE_CONSTANTS) while some will be provided through the process.env (Environment Variables or Secrets).

## /config folder

NestJS has already simplified the handling of configuration for us with its config module which also uses dotenv out of the box. All configurations are to be defined from the `/config` folder as outlined [here](https://docs.nestjs.com/techniques/configuration#custom-configuration-files). As we apply the configuration to be globaly available, we just need to add the ConfigService as a dependency injection to the services needing it.

```
constructor(private config: ConfigService) {}
```

## Missing required environment configuration

Some configurations are required. We make sure to break the deployment than allow a code to run as if everything is ok only to break for a user. When adding a new configuration, make sure to define if this is required. provide a default value if a configuration is expected to run this value as default. 
