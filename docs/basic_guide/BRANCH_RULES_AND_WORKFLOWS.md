# Branch Rules

[Branch rules](https://github.com/adonisv79/nestjs-base-api/settings/rules/) create processes that development teams need to adhere to in order to greate a secured, predictable and organized delivery strategy.

## Main

This is our master branch where productions should be based upon. Anything that goes here must go through Peer Review from the [Code Owners](/.github/CODEOWNERS). This is important as CICD are in place here to auto deploy them to production. Main branch is therefore highly secured from alterations by anyone from deletion and forced commits.

# Workflow (Github Actions)

[Github Actions](https://github.com/adonisv79/nestjs-base-api/actions) or workflow helps automate most of the things we should do with certain actions. Example is running unit tests before a pull request can be considered ready for reviewm lint checks, code smell checks, security checks, code coverage, auto deployments, etc. All of these are configured under the [GitHub Workflow Folder](/.github/workflows/) in the repository