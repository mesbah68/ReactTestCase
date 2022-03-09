import React, { useState } from "react";
import Context from "./Context";

import ChatWrapper from "./Component/Pages/Chat/ChatWrapper";

import "./App.css";
import 'antd/dist/antd.css'

function App() {
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");

  const store = {
    user,
    setUser,
    message,
    setMessage,
  };

  return (
    <Context.Provider value={store}>
      <ChatWrapper />
    </Context.Provider>
  );
}

export default App;
