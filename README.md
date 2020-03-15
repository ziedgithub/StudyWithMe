# How to launch server
****************************

##CONFIGURATIONS
********************

### DEVELOPMENT `$NODE_ENV=development`
#### Environment variables
- **$DB_PASSWORD:** Password for database  
- **$DEBUG**: debug alias (`app:*` alias for all debug messages)  
- **$REFRESH_SECRET**: a refresh secret for jwt tokens  
- **$WINSTON_CONSOLE**: `1` or `0` for activating or deactivating showing debug messages in the console  
#### FILE PUBLIC/SECRET Keys
In a folder called `keys` you have to provide:  
- `token-key.pem`: private key for jwt
- `token-public-key.pem`: public key for jwt

### PRODUCTION `$NODE_ENV=production`
#### Environment variables
Same as development mode and also:
- **$JWT_PRIVATE_KEY**: private key for jwt  
- **$JWT_PUBLIC_KEY**: public key for jwt

#### FILE PUBLIC/SECRET Keys
No need for files

## DEPENDENCIES
********************
You have to install `Node.JS v12.15.0`

### DEVELOPMENT `$NODE_ENV=development`
- MongoDB