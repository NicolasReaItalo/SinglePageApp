#########################################################
### VARIABLES
#########################################################

Off='\033[0m'       # Text Reset
Blue='\033[0;34m'         # Blue
Red='\033[1;31m'         # Red
Green='\033[1;32m'       # Green
#########################################################
### REGLES
#########################################################
.PHONY:		all init up down prune dev re


all: init up

#regle re : wipe les volumes et reconstruit tout
re: prune init up

dev: init-dev up


init:
	@echo "🔧 Building the images..."
	@docker compose  -f docker-compose.yml build

test-front:
	@cd ./frontend && npm i && npm test
	# @rm -rf frontend/node_modules

#cree et demarre les container
up:
	@ echo '🚀      starting the containers...'
	@docker compose  -f docker-compose.yml up --detach

stop:
	@ echo '✋🏻     stopping the containers...'
	@docker compose  -f docker-compose.yml stop


#stoppe les container et les detruits avec le network
down:
	@ echo '🚫   shutting down containers..'
	@docker compose -f docker-compose.yml  down

#efface les container, les images, et  les caches
prune: down
	@echo "👨‍🌾 Let's prune all this mess"
	@docker container prune -f
	@docker image prune -fa
	@docker system prune -f

logs:
	@echo "${Blue}=========== LOGS NGINX     ===============${Off}"
	@docker logs nginx
	@echo "${Blue}===========  ############  ===============${Off}"
	@echo "${Blue}=========== LOGS BACKEND     ===============${Off}"
	@docker logs backend
	@echo "${Blue}===========  ############  ===============${Off}"
