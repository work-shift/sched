# WebSocketServer

`NB` each path has its own xstate.

## paths

### /register-account

Used by the app to create a new user account. Normally used only once in a life time by a client.

The server initiates the protocol according to the WebAuthN.
As a result, a new object is created inside the DB describing the user.

Now, the user ( app ) needs to close the connection and reconnect to the `/authenticate` path.

### /authenticate

As soon as the connection is established, the client has to send WebAuthN "login" request.
The server verifies it and if successful it returns a UserRootToken and closes the connection.

### /api

The client derives an APIAccessToken from his UserRootToken, establishes a connection to this path and sends its APIAccessToken as the first message.

### /

Client connection gets dropped with an error.
