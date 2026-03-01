
=============================================================
=============================================================

set-up:

    -install NVM
    -run nvm use
    
    Add the express library along with its types to your project:

    -npm i express
    -npm i -D @types/express
    

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