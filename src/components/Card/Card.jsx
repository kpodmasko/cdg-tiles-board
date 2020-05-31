import React from "react";
import classNames from "classnames";

import { testIds } from "@constants";

import "./Card.css";

export const rootClassName = "card";

function Card({ className, state = "CLOSED", children, dataAttrs = {} }) {
  const rootClass = classNames(`${rootClassName}`, className);
  const contentClass = classNames(`${rootClassName}__item`, {
    [`${rootClassName}__item--opened`]: state === "OPENED",
    [`${rootClassName}__item--closed`]: state === "CLOSED",
    [`${rootClassName}__item--guessed`]: state === "GUESSED",
  });

  return (
    <div className={rootClass} data-testid={testIds.card} {...dataAttrs}>
      <div className={contentClass}>
        {state === "OPENED" && (
          <div className={`${rootClassName}__content`}>{children}</div>
        )}
      </div>
    </div>
  );
}

export default Card;
