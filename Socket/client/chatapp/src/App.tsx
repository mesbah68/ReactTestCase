import React, { useState } from "react";
import Context from "./Context";

import ChatWrapper from "./Component/Pages/Chat/ChatWrapper";

import "antd/dist/antd.css";

function App() {
  return <ChatWrapper chatRoomTitle="General Chat" />;
}

export default App;
