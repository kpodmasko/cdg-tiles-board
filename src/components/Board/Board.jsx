import React from "react";
import classNames from "classnames";

import Card from "@components/Card";
import { testIds } from "@constants";

import "./Board.css";

const rootClassName = "board";

function Board({ className }) {
  const rootClass = classNames(rootClassName, className);

  return (
    <div data-testid={testIds.board} className={rootClass}>
      <h1 className={`${rootClassName}__title`}>Round 1</h1>
      <div className={`${rootClassName}__cards-container`}>
        <Card className={`${rootClassName}__card`} state={"GUESSED"}>
          <div style={{ background: "red", width: "100%", height: "100%" }} />
        </Card>
        <Card className={`${rootClassName}__card`} state={"OPENED"}>
          <div style={{ background: "red", width: "100%", height: "100%" }} />
        </Card>
        <Card className={`${rootClassName}__card`} />
        <Card className={`${rootClassName}__card`} />

        <Card className={`${rootClassName}__card`} />
        <Card className={`${rootClassName}__card`} />
        <Card className={`${rootClassName}__card`} />
        <Card className={`${rootClassName}__card`} />

        <Card className={`${rootClassName}__card`} />
        <Card className={`${rootClassName}__card`} />
        <Card className={`${rootClassName}__card`} />
        <Card className={`${rootClassName}__card`} />

        <Card className={`${rootClassName}__card`} />
        <Card className={`${rootClassName}__card`} />
        <Card className={`${rootClassName}__card`} />
        <Card className={`${rootClassName}__card`} />
      </div>
    </div>
  );
}

export default Board;
