# trippin replicator

replicator env
----
```env
HERE_API_KEY=HERE_API_KEY | null
HERE_URL=HERE_API_URL | null
DB_HOST=POSTGRES_HOST_IP | localhost
DB_USER=POSTGRES_USERNAME | "postgres"
DB_PASSWORD=POSTGRES_PASSWORD | "postgres"
DB_PORT=POSTGRES_PORT | 5432
DB_SCHEMA=POSTGRES_SCHEMA | "trippin"
```

replicator env mode
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
