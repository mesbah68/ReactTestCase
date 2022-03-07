import React, { useState } from "react";
import Context from "./Context";

import Container from "./Container";

import "./index.scss";

function App() {
  const [user, setUser] = useState("");

  const store = {
    user,
    setUser,
  };

  return (
    <Context.Provider value={store}>
      <Container />
    </Context.Provider>
  );
}

export default App;
