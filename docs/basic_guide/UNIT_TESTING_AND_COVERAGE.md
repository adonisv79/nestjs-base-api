[home](/README.md#wiki-pages)

# Unit testing and Code Coverage

While some claim unit tests just adds another layer of coding which increases development time, coders have time and time again made more cost impacting damage by not having one. This is because unit tests were either improperly provided or intentionaly made to solve only a particular happy path. unit tests should be treated as a mechanism that protects your code from others who may try to change its original purpose and break your masterpiece.

# Unit Tests vs. Integration Tests

A good article would be [this](https://circleci.com/blog/unit-testing-vs-integration-testing/). Before working with testing in NestJS, read this [official guide](https://docs.nestjs.com/fundamentals/testing) as well.

## Scripts

```bash
# unit tests
$ pnpm run test

# unit test a single spec file
$ pnpm run test src/health/health.controller.spec.ts

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

### Some notes on testing

* Unit tests should appear on the same level of the file being tested.
* Unit tests should test all possible permutations of the functionality's usage
* Unit test aims to ensure the function will not break from its original intent when someone modifies your code.
* Integration tests the interactions between different parts of the code.
* Integration tests should be written in the /test folder.

## Code Coverage

While getting a very high Code Coverage result does not guarantee a perfect unbreakable program, It does add more assurance that the team is complying to the highest standards than those with 0 coverage. Our goal is to always have 100% coverage and any code submissions that will lower it should be rejected. There are however situations where a particular code is not testable. We can force these codes to be skipped but these things should be avoided as often.

Note: Whenever you have improved the coverage results, please do not forget to bump the coverageThreshold in package.json