# Error handling

As much as possible, avoid letting the errors fall into the default error catch as it will throw 500 which is designed for errors we failed to discover and handle properly. All our service codes that controllers call must have a try-catch in place and test them against custom errors we will encounter. 

## Custom Errors

Errors (different from Exception) are throwables that allows us to break when an issue is detected.You can create a custom error by inheriting the [base error class](/src/common/errors/custom_error.ts). Provide the default error message and code in the super() constructor.

```
import { ErrorData, CustomError } from './custom_error';

export class UserCreateNameConflictError extends OpenTCGError {
  constructor(data: ErrorData) {
    super('Username already in use', 'USR409', data);
  }
}
```

## Exception

Exceptions are throwable objects that represents API responses. This is what appears as the response from the server on specific occurences. An example is when a user 

```
const testUsername = 'Don'
try {
  return await users.addUser(testUsername);
} catch (error) {
  if (error instanceOf UsernameInUseError) {
    throw new ConflictException(`Username ${testUsername} is already in use`);
  }
  if (error instanceOf UsernameInvalidError) {
    throw new BadRequestException(`Username ${testUsername} is invalid. Make sure to use at least 10 characters with no spaces or special characters`);
  }
  throw error; // rethrow as this is unhandled
}

```