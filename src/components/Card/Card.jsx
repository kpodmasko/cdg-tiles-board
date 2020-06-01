import React, { useCallback, memo } from "react";
import classNames from "classnames";

import { testIds } from "@constants";

import "./Card.css";

export const rootClassName = "card";

function Card({ className, state = "CLOSED", children, onClick, id }) {
  const rootClass = classNames(`${rootClassName}`, className, {
    [`${rootClassName}--opened`]: state === "OPENED",
    [`${rootClassName}--closed`]: state === "CLOSED",
    [`${rootClassName}--guessed`]: state === "GUESSED",
  });

  const handleClick = useCallback(
    (event) => {
      onClick({ event, id });
    },
    [id, onClick]
  );

  return (
    <div className={rootClass} data-testid={testIds.card} onClick={handleClick}>
      <div className={`${rootClassName}__part ${rootClassName}__part--front`}>
        <div className={`${rootClassName}__content`}>{children}</div>
      </div>
      <div className={`${rootClassName}__part ${rootClassName}__part--back`} />
    </div>
  );
}

export default memo(Card);
