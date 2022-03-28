import { Server } from "socket.io";
import uuid from "react-uuid";

const io = new Server(4000, {
  cors: {
    origin: "*",
  },
});

const users = new Map();
const messages = [];
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
    messages.filter(item => item.messages.id !== messageId);

    io.emit("deleteMessage", messages);
  });

  // When chat has deleted
  socket.on("deleteChat", () => {
    messages.splice(0, messages.length);

    io.emit("deleteChat", messages);
  });

  // When user leaves chat
  socket.on("disconnect", () => {
    users.delete(socket.id);

    io.emit("users", Array.from(users.values()));
  });
});
