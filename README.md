
=============================================================
=============================================================

set-up:

    -install NVM
    -run nvm use
    
    Add the express library along with its types to your project:

    -npm i express
    -npm i -D @types/express
    
    for database:
        -install Postgres v15 or later.
        -insure the vesion is 15+ by runnimg: psql --version
        -start postgress server in the background by running:
            *   Mac: brew services start postgresql@15
            *   Linux: sudo service postgresql start
        -Enter the psql shell:

            *   Mac: psql postgres
            *   Linux: sudo -u postgres psql

        You should see a new prompt that looks like this:

        postgres=#

        -Create a new database. I called mine chirpy:
            
            *   CREATE DATABASE chirpy;

        -Connect to the new database:
            
            *   \c chirpy

        You should see a new prompt that looks like this:

            *   chirpy=#

        -Set the user password (Linux only)
            
            *   ALTER USER postgres PASSWORD 'postgres';

    -install drizzle, postgres and drizzle-kit run:

        -   npm i drizzle-orm postgres
        -   npm i -D drizzle-kit

    update connection string in drizzle.config.ts.  to connect to a database. The format is:

        *   protocol://username:password@host:port/database

    Here are examples:

        -   macOS (no password, your username): 
            *   postgres://wagslane:@localhost:5432/chirpy
        -   Linux (password you put, postgres as user):
            *   postgres://postgres:postgres@localhost:5432/chirpy

    
    test the connection 

        -   psql "postgres://wagslane:@localhost:5432/chirpy" (use your connection string)

    generate migration depend on current schema:

        -   npx drizzle-kit generate

    run the migration:

        -   npx drizzle-kit migrate


    make .env file in root file and put this format:

        -   DB_URL="YOUR_CONNECTION_STRING_HERE"

==============================================================
==============================================================


tsconfig details:
    
    -rootDir is where your TypeScript files are located
    -outDir is where your compiled JavaScript files will go (you won't modify these - they're generated from your TypeScript files)
    -include specifies the files to include in the compilation
    -exclude specifies the files to exclude from the compilation
    -strict enables all strict type checking options
    -esModuleInterop allows you to use ES module syntax
    -moduleResolution specifies how modules are resolved
    -skipLibCheck skips type checking all declaration files
    -baseUrl allows you to use paths relative to the project root

==============================================================
==============================================================

package.json

    -adding "type": "module" this let us use ES module syntax in our project for imports and exports

    -add a build script that runs npx tsc - this will compile your TypeScript code to JavaScript.

    -add a start script that runs node dist/index.js - this will start the REPL.
    
    -add a dev script that runs a combination of the build and start scripts for convenience.