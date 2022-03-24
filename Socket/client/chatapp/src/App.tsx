import React, { useState } from "react";
import Context from "./Context";

import ChatWrapper from "./Component/Pages/Chat/ChatWrapper";

import "antd/dist/antd.css";

function App() {
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);

  const store = {
    user,
    setUser,
    messages,
    setMessages,
  };

  return (
    <Context.Provider value={store}>
      <ChatWrapper chatRoomTitle="General Chat" />
    </Context.Provider>
  );
}

export default App;
