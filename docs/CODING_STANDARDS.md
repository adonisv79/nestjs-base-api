[home](/README.md#wiki-pages)

# Modularity Principle

The modularity principle is a design principle that involves breaking a system into smaller, independent parts called modules. The goal is to reduce complexity by:

1. Separating concerns and encapsulating related parts
2. Minimizing interdependencies
3. Making components easy to understand, reuse, and replace (plug and play)

In order to achieve this, we need to make certain rules

1. All codes relevant to a particular module should be near or within that module
2. Codes should define properly their purpose.
3. When multiple instances of a particular code file type and spec will exist, create a subfolder for it.

```
[_] my-module
  - [_] dtos
      - create-something.dto.ts
      - get-something.dto.ts 
      - update-something.dto.ts 
  - [_] entities
      - my-module.table1.entity.ts
      - my-module.table2.entity.ts
  - [_] controllers
    - my-module.controller.spec.ts
    - my-module.controller.ts
  - [_] modules
    - my-module.module.spec.ts
    - my-module.module.ts
  - [_] services
    - my-module.service.spec.ts
    - my-module.service.ts
```

# Naming Conventions

## Code Files
  
  * Common 
    * lowercased + kebab-case
    * file type are defined by the extension
      * Test files - *.spec.ts (do not use *.test.ts)
      * Controllers - *.controller.ts
      * Modules - *.module.ts
      * Services - *.service.ts
      * Data Transformation Objects - *.dto.ts
  * Classes - PascalCase
  * variables - camelCase
  * JSON attributes - { camelCase: 'all' }
  * Environment variables and INLINE_CONFIG_CONSTANTS - SCREAMING_SNAKE_CASE

## Database

  * Tables and Columns - lowercased snake-case

## DTO Conventions and validations

We will be using DTO a lot in here. To make it easier to manage, we need to prevent duplications as much as possible. Utilize extending the DTO classes whenever possible. When naming these, it is a good practice to make it easier to understand what the DTO is used for. More about it on the official [guide](https://docs.nestjs.com/controllers#request-payloads)

* Every DTO class should be suffixed with DTO (i.e. DoSomethingDTO)
* DTO should be defined for each use case. Querry Strings, Params, Payload(Body). As such, prefix the variables properly like so
  * GetUsersListQueryDTO - query strings
  * GetUserInfoParamsDTO - path params
  * AddNewUserPayloadDTO - body payload
* Utilize

You can apply validation rules to DTOs using the `class-validator` module. It is adamant that we never trust the client and enforce the rules of what the parameters should be and throw any validation issues (and perform any necessary transformations and prefill) at the controller level.
