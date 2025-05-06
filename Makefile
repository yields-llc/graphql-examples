.PHONY: start-db
start-db:
	docker compose up --wait -d

.PHONY: start-server
start-server:
	cd server && \
	corepack enable && \
	yarn && \
	yarn prisma generate && \
	yarn prisma db seed && \
	yarn export && \
	yarn dev

.PHONY: build-client
build-client:
	cd client && \
	corepack enable && \
	yarn && \
	yarn generate && \
	yarn build

.PHONY: run-example
run-example:
	cd example-app && \
	corepack enable && \
	yarn && \
	yarn example
