# Custom Logger for Trace ID

We created a customized Logger as we need to introduce some custom data across all requests. one of which is Trace ID. This ID is used to easily identify all the logs relative to a specific transaction or request. Example is when a call is made to a `GET /users` endpoint, any Logger.log() calls should have the same traceId rendered on the console. This helps with debuging specialy in situations where multiple activities can be happening at the same time making many log informations overlap. Another information we include is the JWT Subscriber which helps identify the requestor.

# Modules and files

Our app module is located [here](/src/logger/) which should be added into our [app.module](/src/app/app.module.ts). The Trace Id feature is a middleware found in [here](/src/common/middlewares/trace-id.middleware.ts).