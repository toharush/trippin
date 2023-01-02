# trippin server

server env
----
```env
PORT=NUMBER || 8080
DATABASE_URL=URI_CLOUD_OR_LOCAL // postgres://user:password@host:port/dbname
DATABASE_SCHEMA=DATABASE_SCHEMA_NAME
```

server env mode
----
running regular without developer or debug tools

```
$ npm start
```

developer mode
----
running with developer tools.
```
$ npm run start:dev // windows
$ npm run start:dev:linux // mac && linux
```

adding graphql custom server on route /graphiql with all query and mutation options.
http://localhost:port/api/v1/dev/graphiql



nodemon
----
addding nodemon option (listen to file changes and run the server again).

```
$ npm run start:nodemon // global
$ npm run start:dev:nodemon // windows
$ npm run start:dev:linux:nodemon // mac && linux
```

