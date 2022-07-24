# authentication

libraries to be used:

1. [SimpleWebAuthn](https://github.com/MasterKale/SimpleWebAuthn).
2. [macaroons.js](https://github.com/nitram509/macaroons.js)

`NB`: every command is a Google Macaroon.

## user

### create account

`NB`: 100% anonymous accounts. Uses your device's built-in biometric reader.

uses the `WebAuthN` protocol.

### authenticate

Use your device's built-in biometric reader.
If all goes well you will receive a token ( in a form of google macaroon ) which you can then use to communicate with the server.
