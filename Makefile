# Specify the path to your docker-compose.yml file
COMPOSE_FILE := docker-compose.yml

# Docker Compose options
COMPOSE := docker-compose -f $(COMPOSE_FILE) --env-file=./api/.env

# Define targets
.PHONY: start stop restart logs clean clean-all client



# Start services (development profile)
start:
	$(COMPOSE)  --profile development up -d 
# build services (development profile)	
build:
	$(COMPOSE) --profile development build

# Start services (production profile)
start-production:
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
	$(COMPOSE) --profile development up client-dev	

# Clean up containers
clean:
	$(COMPOSE) down --remove-orphans

# Clean up containers, volumes, and networks
clean-all:
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
	@echo "  start-production    Start services (production profile)"
	@echo "  stop                Stop services"
	@echo "  restart             Restart services (development profile)"
	@echo "  restart-production  Restart services (production profile)"
	@echo "  logs                View container logs (development profile)"
	@echo "  client              Start the client service (development profile)"
	@echo "  clean               Clean up containers (leave volumes and networks)"
	@echo "  clean-all           Clean up containers, volumes, and networks"
	@echo "  help                Show this help message"
