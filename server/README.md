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
foo@bar:~$ npm start
```

developer mode
----
running with developer tools but without debug tools
```
foo@bar:~$ npm run start:dev // windows
foo@bar:~$ npm run start:dev:linux // mac && linux
```

debug mode
----
running with developer and debug tools

``` 
foo@bar:~$ npm run start:debug // windows
foo@bar:~$ npm run start:debug:linux // mac && linux
```

adding graphql custom server on route /graphiql with all query and mutation options.

