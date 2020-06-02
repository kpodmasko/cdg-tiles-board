import React, { useCallback, memo } from "react";
import classNames from "classnames";

import { testIds, cardsStates } from "@constants";

import "./Card.css";

const rootClassName = "card";

function Card({
  className = "",
  state = cardsStates.CLOSED,
  children,
  onClick,
  onTransitionEnd,
  id = Math.random(), // as it sets id attribute to div it must be unique
}) {
  const rootClass = classNames(`${rootClassName}`, className, {
    [`${rootClassName}--opened`]: state === cardsStates.OPENED,
    [`${rootClassName}--closed`]: state === cardsStates.CLOSED,
    [`${rootClassName}--guessed`]: state === cardsStates.GUESSED,
  });

  const handleClick = useCallback(
    (event) => {
      if (onClick) {
        onClick({ event, id });
      }
    },
    [id, onClick]
  );

  const handleTransitionEnd = useCallback(
    (event) => {
      if (onTransitionEnd) {
        onTransitionEnd({ event, id });
      }
    },
    [id, onTransitionEnd]
  );

  return (
    <div
      className={rootClass}
      data-testid={testIds.card}
      id={id}
      onClick={handleClick}
    >
      <div
        className={`${rootClassName}__part ${rootClassName}__part--front`}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className={`${rootClassName}__content`}>{children}</div>
      </div>
      <div className={`${rootClassName}__part ${rootClassName}__part--back`} />
    </div>
  );
}

// memo is used as in App we guarantee that new instances(objects, functions, arrays) will be passed only
// if it really change so shallow compare will help to optimize render
export default memo(Card);
