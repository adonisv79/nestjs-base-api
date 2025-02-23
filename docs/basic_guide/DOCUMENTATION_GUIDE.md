[home](/README.md#wiki-pages)

# Documentation Guidelines

Documentation helps us understand the hows and whys of things. While the code itself are living documentation of how things are working, expert documentation tells why things are made to work a certain way. To help external users understand our API, we utilize [Swagger (Open-API)](https://docs.nestjs.com/openapi/introduction). By running the project in your local machine, you will be able to access the Swagger documentation of the API.

  * http://localhost:5000/api - API Documentation
  * http://localhost:5000/openapi.json - Swagger JSON file data

> Make sure to set DEV_SHOW_API_DOCS=TRUE in your environment or the /api route will not be available

### Documenting your endpoints

A good code is one that is easily understood, made to be stable and modular. However, there are things that is not explained by code alone like why something is designed the way it was or how something is supposed to be used. Sometimes even we will forget how or why we coded something. Therefore it is mandatory that we properly document our API documentation (Swagger).

Group your endpoints by adding ApiTags to your controller classes
```
@ApiTags('Analytics')
```

Describe the endpoint by using the ApiOperation summary
```
  @ApiOperation({
    summary: 'Retrieves a list of users',
  })
```

Describe the request body and provide sample data
```

  @ApiBody({
    type: CreateUsersDTO,
    required: true,
    examples: {
      sample: {
        value: {
          userId: 'adonisv79',
          UserName: 'Adonis Lee Villamor',
        },
      },
    },
  })
```

Utilize DTOs in your parameters, payloads and query variables and attach ApiProperty to the DTO
```
  @ApiProperty({
    description: 'The name of the company',
    type: String,
  })
  companyName: string;
```