import React from "react";
import classNames from "classnames";

import { testIds } from "@constants";

import "./Template.css";

const rootClassName = "template";

function Template({ className }) {
  const rootClass = classNames(rootClassName, className);

  return (
    <div data-testid={testIds.template} className={rootClass}>
      init
    </div>
  );
}

export default Template;
