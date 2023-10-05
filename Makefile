
all: build

build:
		docker compose up --build

clean:
		docker compose down

fclean: clean
		docker compose down --rmi all
		docker system prune -f 

re: fclean all

.PHONY: re fclean clean build all