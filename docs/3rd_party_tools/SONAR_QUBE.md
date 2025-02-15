# SonarQube Cloud Report

We utilize SonarQube Cloud to check our codebase (https://sonarcloud.io/summary/overall?id=adonisv79_nestjs-base-api&branch=main). This helps remind us of globaly accepted coding standards and even teach us new tricks. Make sure to always fix any issues you may have added to its list.

## Test Coverage

One thing we need to provide it is test coverage. We need to ensure that we follow the instructions on the [official guide](https://docs.sonarsource.com/sonarqube-cloud/enriching/test-coverage/overview/) to make this work. In our case, having the github workflow to trigger coverage check on each PR ensures that the coverage report gets generated for sonar cloud to consume.

We also need to ensure that the overall code coverage does not decline. This is controlled in the package.json config for `jest.coverageThreshold`.

``` example
"jest": {
  ...,
  "coverageThreshold": {
    "global": {
      "statements": 85,
      "branches": 85,
      "functions": 85,
      "lines": 85
    }
  },
}
```