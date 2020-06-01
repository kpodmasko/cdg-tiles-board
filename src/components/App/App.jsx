import React from "react";

import Board from "@components/Board";
import { testIds } from "@constants";
import getData from "@utils/getData";

import "./App.css";

const data = getData();

function App() {
  return (
    <div data-testid={testIds.app}>
      <Board cards={data} />
    </div>
  );
}

export default App;
