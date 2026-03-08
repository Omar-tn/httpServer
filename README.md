
# http server with RESTful API, enable users to make chrips and get and manage them

## API overview:

### POST /admin/reset

-   remove all users in the database if the running script/platform is dev in .env file.

-   return error otherwise.

### GET /api/chirps
returns autherId chirps if not provide return all chirps
#### Request:
-   It has a optional autherId and sort parameters
-   if provide autherId it returns their chirps else return all chirps
-   if provide sort 'desc' sort the result descending else the default is 'asc' and will sort ascending 

#### Response:
```json
[
  {
    "body": "Test chirp body",
    "createdAt": "2026-03-08T22:39:03.402Z",
    "id": "6ef1e6f6-ddc8-4aa2-9584-3464dc82ff15",
    "updatedAt": "2026-03-08T22:39:03.402Z",
    "user_id": "c3dec008-aa69-4330-9bc5-f41ab7ca0fd1"
  }
]

```

### GET /api/chirps/:chirpId
-  get a chirp by the id.

#### Request:

#### Response:
```json
[
  {
    "body": "Test chirp body",
    "createdAt": "2026-03-08T22:39:03.402Z",
    "id": "6ef1e6f6-ddc8-4aa2-9584-3464dc82ff15",
    "updatedAt": "2026-03-08T22:39:03.402Z",
    "user_id": "c3dec008-aa69-4330-9bc5-f41ab7ca0fd1"
  }
]

```

### POST /api/users
register user with email and password
#### Request:
-   It require user email and password in the body



```json
{
  "email": "walt@breakingbad.com",
  "password": "123456"
}

```
#### Response:


```json
Response Status Code: 201
  Response Body: 
{
  "createdAt": "2026-03-08T22:39:03.036Z",
  "email": "walt@breakingbad.com",
  "id": "c3dec008-aa69-4330-9bc5-f41ab7ca0fd1",
  "isChirpyRed": false,
  "updatedAt": "2026-03-08T22:39:03.036Z"
}


```

### POST /api/login 
login user with email and password and return access token for an hour and refresh token for 60 days
#### Request:

-   It require user email and password in the body



```json
{
  "email": "walt@breakingbad.com",
  "password": "123456"
}

```
#### Response:


```json
Response Status Code: 200
  Response Body: 
{
  "createdAt": "2026-03-08T23:05:06.007Z",
  "email": "walt@breakingbad.com",
  "id": "249c821d-6df2-4ce4-9f9a-3d69dfdafffa",
  "isChirpyRed": false,
  "refreshToken": "bcfc41bcbff057c04ec70fa507082640250c2a55a8cc182882b8a555a32806e5",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjaGlycHkiLCJzdWIiOiIyNDljODIxZC02ZGYyLTRjZTQtOWY5YS0zZDY5ZGZkYWZmZmEiLCJpYXQiOjE3NzMwMDM5MDYsImV4cCI6MTc3MzAwNzUwNn0.Hbo1Smr4BsFK6Fk7idxZutQuXytRnTjr69MHLP-y91k",
  "updatedAt": "2026-03-08T23:05:06.007Z"
}

```


### POST /api/chirps
save a chirp 
#### Request:
##### header:
    Authorization: Bearer ${waltAccessToken}

-   It chirp text in the body
-   require the access token in the header for authentication 


```json
{
  "body": "I'm the one who knocks!"
}

```
#### Response:


```json
 Response Status Code: 201
  Response Body: 
{
  "body": "I'm the one who knocks!",
  "createdAt": "2026-03-08T23:05:06.137Z",
  "id": "54944064-f29a-4215-ac9e-1b304941aeec",
  "updatedAt": "2026-03-08T23:05:06.137Z",
  "userId": "249c821d-6df2-4ce4-9f9a-3d69dfdafffa"
}


```

### POST /api/refresh
create new access token by the valid refresh token 
#### Request:
##### header:
    Authorization: Bearer ${waltRefreshToken}


-   require the refresh token in the header for authentication 

#### Response:


```json
 Response Status Code: 200
  Response Body: 
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjaGlycHkiLCJzdWIiOiI1NjAwNzI2Zi00NGQxLTQzOGUtOTJmNi05MjljNDZjODExZGEiLCJpYXQiOjE3NzMwMDQ2MTUsImV4cCI6MTc3MzAwODIxNX0.8_MjVzR3u0I4n1mq5XUhLc3CKIlKgiTEm2KzUrQlob4"
}


```
### POST /api/revoke
revoke a refresh token
#### Request:
##### header:
    Authorization: Bearer ${waltRefreshToken}


-   require the refresh token in the header 


#### Response:


```json
 Response Status Code: 204
  Response Body: 


```


### POST /api/polka/webhooks
webhook to upgrade user 
#### Request:

##### header:
    Authorization: ApiKey f271c81ff7084ee5b99a5091b42d486e


-   require the apikey in the header for authentication => should match the POLKA_KEY in .env file
-   require request body strurcture provided with userID and 'user.upgraded' as envet. 
    * any other event will return 204 but fail with no event or wrong userId only

```json
{
  "data": {
    "userId": "${userID}"
  },
  "event": "user.upgraded"
}
```





#### Response:


```json
 Response Status Code: 204
  Response Body: 

```

### PUT /api/users
change the email and the password of the user 
#### Request:

##### header:
    Authorization: Bearer ${accessToken}


-   require the access in the header for authentication
-   require request body strurcture provided with email and password. 
    * any other event will return 204 but fail with no event or wrong userId only

```json
{
  "email": "walter@breakingbad.com",
  "password": "losPollosHermanos"
}
```





#### Response:


```json
 Response Status Code: 200
  Response Body: 
{
  "createdAt": "2026-03-08T23:42:25.461Z",
  "email": "walter@breakingbad.com",
  "hashed_password": "$argon2id$v=19$m=65536,t=3,p=4$u2I00p/nHHg5JBWY8jQdwA$NU76PO1CDzAL8nYaQmfNWdL3ZDmJaQSPgAxvHCmqMlg",
  "id": "e5db82e0-fbce-4c56-be04-ec8a1035aefc",
  "isChirpyRed": false,
  "updatedAt": "2026-03-08T21:42:25.636Z"
}

```

### DELETE /api/chirps/${chirpID}
delete chirp by id  
#### Request:

##### header:
    Authorization: Bearer ${accessToken}


-   require the access in the header for authentication
-   require math between userId in the token and the userId in the chirp







#### Response:


```json
  Response Status Code: 204
  Response Body: 

```



=============================================================
=============================================================
##  Run:
-   use any provided scripts
-   simply run.:

        npm run dev

##  Set-up:

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
        
        -   *   run: openssl rand -base64 64 
            *   put the result in the file with name: SECRET => SECRET = 'VALUE'

        -   add POLKA_KEY = 'API_KEY', use for example -> f271c81ff7084ee5b99a5091b42d486e       


    
    depenendancy for hashing:
        -   npm i argon2

    JWT:
        -   npm i jsonwebtoken
        -   npm i -D @types/jsonwebtoken

==============================================================
==============================================================


##  tsconfig details:
    
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

##  package.json

    -adding "type": "module" this let us use ES module syntax in our project for imports and exports

    -add a build script that runs npx tsc - this will compile your TypeScript code to JavaScript.

    -add a start script that runs node dist/index.js - this will start the REPL.
    
    -add a dev script that runs a combination of the build and start scripts for convenience.


