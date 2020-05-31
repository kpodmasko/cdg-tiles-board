import React from "react";
import classNames from "classnames";

import { testIds } from "@constants";

import "./Board.css";

const rootClassName = "board";

function Board({ className }) {
  const rootClass = classNames(rootClassName, className);

  return (
    <div data-testid={testIds.board} className={rootClass}>
      <h1 className={`${rootClassName}__title`}>Round 1</h1>
      <div className={`${rootClassName}__cards-container`}></div>
    </div>
  );
}

export default Board;
