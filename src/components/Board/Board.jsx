import React, { useEffect, useState, useCallback } from "react";
import classNames from "classnames";

import Card from "@components/Card";
import { testIds } from "@constants";

import "./Board.css";

const rootClassName = "board";

function Board({ className, cards: _cards }) {
  const rootClass = classNames(rootClassName, className);

  const [cards, setCards] = useState(_cards);
  const [round, setRound] = useState(1);

  const handleCardClick = useCallback(({ id }) => {
    if (!id) {
      return;
    }

    console.log(">>>", id);

    setRound((round) => round + 1);
  }, []);

  useEffect(() => {
    setCards(_cards);
  }, [_cards]);

  return (
    <div data-testid={testIds.board} className={rootClass}>
      <h1 className={`${rootClassName}__title`}>Round {round}</h1>
      <div className={`${rootClassName}__cards-container`}>
        {cards.map(({ state, viewValue, id }) => (
          <Card
            id={id}
            key={id}
            className={`${rootClassName}__card`}
            state={state}
            onClick={handleCardClick}
          >
            <div
              style={{ background: viewValue, width: "100%", height: "100%" }}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Board;
