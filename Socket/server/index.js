import { Server } from "socket.io";
import uuid from "react-uuid";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import schema, { messages } from "./schema/index.js";

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(4001, () => {
  // eslint-disable-next-line no-console
  console.log('server connected');
});

const io = new Server(4002, {
  cors: {
    origin: "*",
  },
});

const users = new Map();

io.on("connection", (socket) => {
  // When a new user enter chat
  socket.on("addUser", (user) => {
    const newUser = {
      id: uuid(),
      name: user,
    };

    users.set(socket.id, newUser);

    // Send new user info and messages to new user
    socket.emit("addUser", newUser);
    socket.emit("sendMessage", messages);

    // Send updated users list to all users
    io.emit("users", Array.from(users.values()));
  });

  // When a new message is sent
  socket.on("sendMessage", (msg) => {
    messages.push(msg);
    io.emit("sendMessage", messages);
  });

  // When a message has removed
  socket.on("deleteMessage", (messageId) => {
    const index = messages.findIndex(item => item.id === messageId);
    messages.splice(index, 1);
    io.emit("deleteMessage", messages);
  });

  // When a message has edited
  socket.on("editMessage", (msg) => {
    const itemIndex = messages.findIndex(
        (item) => item?.id === msg.id
    );
    messages[itemIndex].text = msg.text;
  });

  // When chat has deleted
  socket.on("deleteChat", (chatTo) => {
    messages = messages.filter(item => item.to !== chatTo);
    io.emit("deleteChat", messages);
  });

  // When user leaves chat
  socket.on("disconnect", () => {
    users.delete(socket.id);

    io.emit("users", Array.from(users.values()));
  });
});
