# Specify the path to your docker-compose.yml file
COMPOSE_FILE := docker-compose.yml

# Docker Compose options
COMPOSE := docker compose 

# Define targets
.PHONY: start stop restart logs clean fclean client



# Start services (development profile)
start:
	$(COMPOSE)  --profile development up 
# build services (development profile)	
build:
	$(COMPOSE) --profile development build

# Start services (production profile)
ship:
	$(COMPOSE) --profile production up -d


# Stop services
stop:
	$(COMPOSE) --profile development down
	$(COMPOSE) --profile production down

# Restart services (development profile)
restart:
	$(COMPOSE) --profile development down
	$(COMPOSE) --profile development up -d

# Restart services (production profile)
restart-production:
	$(COMPOSE) --profile production down
	$(COMPOSE) --profile production up -d

# View logs (development profile)
logs:
	$(COMPOSE) --profile development logs -f

# starting the client service
client:
	docker stop client
	docker rm client
	docker rmi overping_client
	$(COMPOSE) --profile production up -d client

# Clean up containers
clean:
	$(COMPOSE) down --remove-orphans

# Clean up containers, volumes, and networks
fclean:
	docker system prune -a -f

# Define the default target when you run 'make' with no arguments
default: start

# Usage instructions
help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  build               Build Docker Compose services"
	@echo "  start               Start services (development profile)"
	@echo "  ship    Start services (production profile)"
	@echo "  stop                Stop services"
	@echo "  restart             Restart services (development profile)"
	@echo "  restart-production  Restart services (production profile)"
	@echo "  logs                View container logs (development profile)"
	@echo "  client              Start the client service (development profile)"
	@echo "  clean               Clean up containers (leave volumes and networks)"
	@echo "  fclean              Clean up containers, volumes, and networks"
	@echo "  help                Show this help message"
