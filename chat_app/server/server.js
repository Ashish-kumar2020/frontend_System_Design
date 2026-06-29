const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({
  port: 8080,
});

wss.on("connection", (ws) => {
  // here all the messages we received from client gets attached
  console.log("New Client COnnected");
  ws.on("message", (message) => {
    // this will broadcast the message to all the connected clients
    wss.clients.forEach((client) => {
      // if we do not want the send to see its message
      // ws is the one who sends the message
      // Note: if any of the client gets disconnected then websockets library will automatically removes that
      if (client !== ws) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    console.log("Client Disconnected");
  });

  wss.on("error", (err) => {
    console.log(err);
  });
});

console.log("Websocket server is started");
