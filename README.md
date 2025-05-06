# graphql-example

# How to run example

## Start database (PostgreSQL)
```bash
$ make start-db
docker compose up --wait -d
[+] Running 1/1
 ✔ Container graphql-examples-postgres-1  Healthy
```

## Start server
```bash
$ make start-server
cd server && \
        corepack enable && \
        yarn && \
        yarn prisma generate && \
        yarn prisma db seed && \
        yarn export && \
        yarn dev
➤ YN0000: · Yarn 4.4.1
➤ YN0000: ┌ Resolution step

...

🌱  The seed command has been executed.
🚀  Server ready at: http://localhost:4000/
```

## Build client
```bash
$ make build-client
cd client && \
        corepack enable && \
        yarn && \
        yarn generate && \
        yarn build
➤ YN0000: · Yarn 4.4.1
➤ YN0000: ┌ Resolution step

...

vite v6.3.4 building for production...
✓ 140 modules transformed.

[vite:dts] Start generate declaration files...
dist/main.js  80.43 kB │ gzip: 18.40 kB
[vite:dts] Start rollup declaration files...
Analysis will use the bundled TypeScript version 5.8.2
[vite:dts] Declaration files built in 1124ms.

✓ built in 1.30s
```

## Run example

```bash
$ make run-example
cd example-app && \
        corepack enable && \
        yarn && \
        yarn example
➤ YN0000: · Yarn 4.4.1

...

[
  {
    id: '1',
    name: 'Project Alpha',
    owner: { id: '1', username: 'Alice' }
  },
  {
    id: '2',
    name: 'Project Beta',
    owner: { id: '2', username: 'Bob' }
  },
  {
    id: '3',
    name: 'Project Gamma',
    owner: { id: '3', username: 'Charlie' }
  }
]
```
