- [GraphQL Lab](#sec-1)
  - [Structure](#sec-1-1)
- [Notes](#sec-2)
- [Activity Log](#sec-3)
  - [<span class="timestamp-wrapper"><span class="timestamp">&lt;2021-02-12 Fri 08:00&gt; </span></span> Setup initial repository](#sec-3-1)
- [Tasks](#sec-4)
  - [Setup Postgres schema and tables](#sec-4-1)
  - [Create database test data scripts](#sec-4-2)
  - [Define demo application](#sec-4-3)
  - [Setup server dependencies](#sec-4-4)
  - [Setup client dependencies](#sec-4-5)


# GraphQL Lab<a id="sec-1"></a>

This is just a simple repository to record my experiments with GraphQL. To be honest, there is very little to see here. Most of what is in this repository are half baked ideas and mini-experiments which are mainly for testing and expanding my understanding of GraphQL. This README will be essentially a type of lab book with notes and results from my exploration of the GraphQL space.

## Structure<a id="sec-1-1"></a>

The top level of the repository contains various housekeeping files (like this README) and two directories, `server` and `client`. The `server` directory will contain code, configuration and tests for the server components, including any related back-end requirements, such as databases. The `client` directory contains code, configuration and tests relating to clients which will use the GraphQL server.

### Server<a id="sec-1-1-1"></a>

The `server` directory contains sub-directories for `src`, `db` and `test`. The `src` directory contains all the Javascript sources for the server component. The `db` directory contains the Postgres database DDL and scripts to load any necessary test data. The `test` directory will contain mocha based tests<sup><a id="fnr.1" class="footref" href="#fn.1">1</a></sup>.

1.  Database

    PostgreSQL is used as the database back-end. A database called `playground` has been created which the developer has full access to. A schema called `graphql_lab` is used inside this database to hold all the DDL relating to this repository. (the `playground` database is my general *catch-all* database for small projects like this.

    All the DDL and DML necessary to create the initial database are defined in scripts within the `db` directory. All scripts have a numeric prefix, used to control the order of execution.

2.  Node Dependencies

    NPM is used to manage the node dependencies. Executing the following commands creates the `package.json` file and installs the initial set of package dependencies.

    ```shell
    npm init -y
    npm i apollo-server dotenv graphql pg
    npm i --save-dev chai mocha sinon
    ```

    It is likely additional packages will be added as required.

# Notes<a id="sec-2"></a>

# Activity Log<a id="sec-3"></a>

## <span class="timestamp-wrapper"><span class="timestamp">&lt;2021-02-12 Fri 08:00&gt; </span></span> Setup initial repository<a id="sec-3-1"></a>

-   Create basic repository structure
-   Add initial README
-   Perform initial commit
-   Install initial server dependencies
-   Setup base database

# Tasks<a id="sec-4"></a>

## TODO Setup Postgres schema and tables<a id="sec-4-1"></a>

## TODO Create database test data scripts<a id="sec-4-2"></a>

## TODO Define demo application<a id="sec-4-3"></a>

## TODO Setup server dependencies<a id="sec-4-4"></a>

## TODO Setup client dependencies<a id="sec-4-5"></a>
