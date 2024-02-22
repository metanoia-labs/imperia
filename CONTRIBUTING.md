## Overview

Imperia is structured using a monorepo architecture, with separate packages for the bot, and website. We are using [Nx](https://nx.dev/) to manage the monorepo. Refer to the [Nx documentation](https://nx.dev/) for more information about the project structure and the commands or to leverage the full power of Nx.

### Prerequisites

-   [Node.js](https://nodejs.org/en/) >= 21.6.2
-   [pnpm](https://pnpm.io/) >= 8.15.1
-   [Docker](https://www.docker.com/) >= 25.0.2 _(optional)_
-   [PostgreSQL](https://www.postgresql.org/) >= 13.4 _(optional if Docker is used)_

### Initial Setup

-   Open the `.env.example` located in [apps/bot/.env.example](apps/bot/.env.example) and fill in the required environment variables and rename it to `.env`.
    -   If you are using Docker, fill in additional environment variables in [libs/database/.env.example](libs/database/.env.example) and rename it to `.env`, for Docker Compose to use.
-   Install the dependencies using `pnpm install`.

### Project Structure

Imperia is split into multiple projects and libraries. The main projects are:

-   [apps/bot](apps/bot): The main bot codebase.
-   [apps/web](apps/web): The website and dashboard for the bot.

With the following libraries:

-   [libs/database](libs/database): The database library, which contains the database schema and migrations.
-   [libs/discord-bot](libs/discord-bot): Additional utilities and shared code for the bot.
-   [libs/website](libs/website): Additional utilities and shared code for the website, such as components and hooks.

### Database Setup

-   If you are using Docker, you can start the database the following command:

    ```sh
    # Start the database
    pnpm nx run database:compose:up

    # Stop the database
    pnpm nx run database:compose:down
    ```

-   Generate the database migrations with the following command:

    ```sh
    pnpm nx run database:drizzle:generate
    ```

-   Drizzle ORM will automatically execute migrations when the bot is started, as indicated in the following [link to the GitHub code line](https://github.com/metanoia-labs/imperia/blob/master/libs/database/src/database.ts#L8).

### Running the Bot

-   Start the bot with the following command:

    ```sh
    pnpm nx run bot:serve
    ```

### Running the Website

-   Start the website with the following command:

    ```sh
    pnpm nx run web:dev
    ```
