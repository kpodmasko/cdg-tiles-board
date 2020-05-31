import React from "react";

import Board from "@components/Board";
import { testIds } from "@constants";

import "./App.css";

function App() {
  return (
    <div data-testid={testIds.app}>
      <Board />
    </div>
  );
}

export default App;
