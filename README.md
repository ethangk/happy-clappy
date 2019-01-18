# happy-clappy

## Server
The server is fairly simple, to get it up and running run
```
cd backend
yarn
yarn start
```

## Client
The client is built using `create-react-app`. To get it up and running, run
```
cd frontend
yarn
yarn start
```

If you don't have yarn installed, instead run
```
cd frontend
npm install
npm start
```

## Architectural choices
 - I opted for WebSockets over plain old HTTP/S requests as they're fire and forget. Assuming the processing took several seconds, that would mean there'd be a new, long lived, request on every keystroke. How it works at the moment is using another socket message as a callback.
 - I used Typescript for the bulk of the frontend application. I opted to not use it for the SocketManager class as I was having trouble with the socket.io-client type definitions. With more time this could be ported over.
