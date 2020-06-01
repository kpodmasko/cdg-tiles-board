import React, { useEffect, useState, useCallback, useRef, memo } from "react";
import classNames from "classnames";

import Card from "@components/Card";
import { testIds, cardsStates } from "@constants";
import { shuffle } from "@helpers";

import "./Board.css";

const rootClassName = "board";

function Board({ className, cards: _cards }) {
  const rootClass = classNames(rootClassName, className);

  const [cards, setCards] = useState({ ..._cards });
  const [activeCardsIds, setActiveCardsIds] = useState([]);
  const [game, setGame] = useState(shuffle(Object.keys(cards)));
  const [round, setRound] = useState(1);

  const clicksBlocker = useRef(false);

  const handleCardClick = useCallback(
    ({ id }) => {
      if (!id || clicksBlocker.current) {
        return;
      }

      const newCards = { ...cards };
      let newActiveCardsIds = [...activeCardsIds];

      if (newCards[id].state === cardsStates.OPENED) {
        newCards[id].state = cardsStates.CLOSED;
        newActiveCardsIds = newActiveCardsIds.filter(
          (activeCardId) => activeCardId !== id
        );
      } else if (
        newCards[id].state === cardsStates.CLOSED ||
        !newCards[id].state
      ) {
        newCards[id].state = cardsStates.OPENED;
        newActiveCardsIds = [...newActiveCardsIds, id];
      }

      clicksBlocker.current = true;
      setCards(newCards);
      setActiveCardsIds(newActiveCardsIds);
    },
    [cards, activeCardsIds]
  );

  const handleCardTransitionEnd = useCallback(() => {
    clicksBlocker.current = false;

    if (activeCardsIds.length < 2) {
      return;
    }

    const newCards = { ...cards };

    const firstCard = newCards[activeCardsIds[0]];
    const secondCard = newCards[activeCardsIds[1]];

    if (firstCard.modelValue === secondCard.modelValue) {
      firstCard.state = cardsStates.GUESSED;
      secondCard.state = cardsStates.GUESSED;
    } else {
      firstCard.state = cardsStates.CLOSED;
      secondCard.state = cardsStates.CLOSED;
    }

    setActiveCardsIds([]);
    setRound((round) => round + 1);
  }, [activeCardsIds, cards]);

  useEffect(() => {
    setCards({ ..._cards });
    setRound(1);
    setGame(shuffle(Object.keys(_cards)));
  }, [_cards]);

  return (
    <div data-testid={testIds.board} className={rootClass}>
      <h1 className={`${rootClassName}__title`}>Round {round}</h1>
      <div className={`${rootClassName}__cards-container`}>
        {game.map((cardId) => {
          const { state, viewValue, id } = cards[cardId];

          return (
            <Card
              id={id}
              key={id}
              className={`${rootClassName}__card`}
              state={state}
              onClick={handleCardClick}
              onTransitionEnd={handleCardTransitionEnd}
            >
              <div
                style={{ background: viewValue, width: "100%", height: "100%" }}
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default memo(Board);
