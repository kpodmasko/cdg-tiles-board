import React, { useEffect, useState, useCallback, useRef, memo } from "react";
import classNames from "classnames";
import cloneDeep from "clone-deep";

import Card from "@components/Card";
import { testIds, cardsStates } from "@constants";

import "./Board.css";

const rootClassName = "board";

function Board({
  className = "",
  cards: _cards, // does not default object as useEffect watches it and every new default instance will trigger it
  onRoundPlayed,
  game, // does not default array as useEffect watches it and every new default instance will trigger it
  renderCardContent,
}) {
  const rootClass = classNames(rootClassName, className);

  const [cards, setCards] = useState();
  const [activeCardsIds, setActiveCardsIds] = useState();

  // blocks cards clicking while card is being flipped by animation
  // not state as render does not depend on it and it should not reset on every render
  const clicksBlocker = useRef(false);
  // not state as render does not depend on it and it should not reset on every render
  const guessedCounter = useRef(0);

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
      guessedCounter.current = guessedCounter.current + 2;
    } else {
      firstCard.state = cardsStates.CLOSED;
      secondCard.state = cardsStates.CLOSED;
    }

    if (onRoundPlayed) {
      onRoundPlayed(guessedCounter.current === game.length);
    }

    setActiveCardsIds([]);
  }, [activeCardsIds, cards, onRoundPlayed, game]);

  useEffect(() => {
    setCards(cloneDeep(_cards));
    setActiveCardsIds([]);
    guessedCounter.current = 0;
  }, [_cards, game]);

  return (
    <div data-testid={testIds.board} className={rootClass}>
      <div className={`${rootClassName}__cards-container`}>
        {
          // we should use cards to make a fast update (objects - O(1); arrays - O(n))
          // and game for shuffling and rendering
          game &&
            cards &&
            game.map((cardId) => {
              const { state, viewValue, id } = cards[cardId] || {};

              return (
                <Card
                  id={id || cardId}
                  key={id || cardId}
                  className={`${rootClassName}__card`}
                  state={state}
                  onClick={handleCardClick}
                  onTransitionEnd={handleCardTransitionEnd}
                >
                  {renderCardContent ? renderCardContent(viewValue) : viewValue}
                </Card>
              );
            })
        }
      </div>
    </div>
  );
}

// memo is used as in App we guarantee that new instances(objects, functions, arrays) will be passed only
// if it really change so shallow compare will help to optimize render
export default memo(Board);
