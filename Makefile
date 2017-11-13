start-dev:
	yarn start

compose-server:
	docker-compose up postgres web

migrate-up:
	node_modules/.bin/mariner migrate up

migrate-down:
	node_modules/.bin/mariner migrate down

container-migrate-up:
	docker exec -t hapijsbootstrapreactredux_web_1 make migrate-up

container-migrate-down:
	docker exec -t hapijsbootstrapreactredux_web_1 make migrate-down
