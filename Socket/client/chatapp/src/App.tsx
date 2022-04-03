import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ChatWrapper from "./Component/Pages/Chat/ChatWrapper";

import "antd/dist/antd.css";

function App() {
  return (
          <Router>
              <Routes>
                <Route path="/" element={<ChatWrapper />} />
                <Route path="/channel/:title" element={<ChatWrapper />} />
                <Route path="/contact/:name" element={<ChatWrapper />} />
              </Routes>
          </Router>
      )
}

export default App;
