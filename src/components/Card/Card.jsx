import React, { useCallback, memo } from "react";
import classNames from "classnames";

import { testIds, cardsStates } from "@constants";

import "./Card.css";

export const rootClassName = "card";

function Card({
  className,
  state = cardsStates.CLOSED,
  children,
  onClick,
  onTransitionEnd,
  id,
}) {
  const rootClass = classNames(`${rootClassName}`, className, {
    [`${rootClassName}--opened`]: state === cardsStates.OPENED,
    [`${rootClassName}--closed`]: state === cardsStates.CLOSED,
    [`${rootClassName}--guessed`]: state === cardsStates.GUESSED,
  });

  const handleClick = useCallback(
    (event) => {
      onClick({ event, id });
    },
    [id, onClick]
  );

  const handleTransitionEnd = useCallback(
    (event) => {
      onTransitionEnd({ event, id });
    },
    [id, onTransitionEnd]
  );

  return (
    <div className={rootClass} data-testid={testIds.card} onClick={handleClick}>
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

export default memo(Card);
