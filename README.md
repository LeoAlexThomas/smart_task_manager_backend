# smart_task_manager_backend

## For deployment

- create folder named 'functions' in root inside move your (server.js / index.js / api.js) file inside it.
- create file named 'nerlify.toml' in root to deploy in netlify. Inside netlify file give lines like this.

```toml
[build]
   functions = "functions"
   node_bundler = "esbuild"
```

- create folder named 'dist' in root and inside create file named 'index.html' this is required to deploy in netlify.
- run below command to install package for deployment

```
 npm i express serverless-http netlify-cli netlify-lambda
```

- login to netlify cli by running this commend

```
netlify login
```

- Open file named '(server.js / index.js / api.js)' inside functions folder. and add these lines:

```js
const Serverless = require("serverless-http");

// Changing routes name to support deployed url replace route, replace route with this '/.netlify/functions/api'.
// From this
app.use("/", require("../routes/taskRoutes"));
// To this
app.use("/.netlify/functions/api", require("../routes/taskRoutes"));

// In last line
const handler = Serverless(app);

module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
```

- Test is everything working as excepted.
- To deploy run this command and followup steps which will be shown after running this command

```
netlify deploy --prod
```
