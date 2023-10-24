# overPing [aka ft_transcendence] Online pong Game with Chat and Friend Matching

Welcome to overPing project! This project is divided into two primary components: the "Client" and the "API." Each component has its own README file, providing detailed instructions for setup and usage. This README offers an overview of how to get started with the project.

## Starting the Project

To initiate the project you should create the .env files, please refere to .env.example files to see what vars you should add, and then follow these simple steps:

### Development Profile

For development purposes, execute the following command to start the project:

```bash
make start
```

This will launch the development version of the Ping Pong project. You can access the site by navigating to [http://localhost:5173](http://localhost:5173) in your web browser.

For more detailed information on the development environment and how to work with the Client and API, please refer to the README files located in the `client` and `api` folders.

### Production Profile

If you want to run the production version of the project, execute the following command:

```bash
make start-production
```

This will initiate the production environment, allowing you to experience the Ping Pong project with optimal performance.

Again, for specific details about the Client and API components and their operation in the production environment, consult the README files located in the respective `client` and `api` folders.

## Additional Information

For more in-depth guidance on using the Client and the API, please explore the README files provided in the `client` and `api` folders of the project.

## Cleanup and Maintenance

If you need to clean up containers, volumes, or networks, the project provides handy `make` targets for this purpose:

- `make clean`: Cleans up containers, leaving volumes and networks intact.
- `make clean-all`: Cleans up containers, volumes, and networks.

These targets are helpful for maintaining your development and production environments.
