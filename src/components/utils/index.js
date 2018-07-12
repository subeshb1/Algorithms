import React from "react";
import ReactDOM from "react-dom";

// A simple HOC to return any type of element with default props set
export const createComponent = (
  RenderAs = "div",
  defaultProps = {},
  name = ""
) => {
  const { className, ...other } = defaultProps;
  function Component({ as = RenderAs, extra, ...props }) {
    return React.createElement(as, {
      ...{
        className: className
          ? // TO add extra class
            className + (extra ? " " + extra : " ")
          : undefined
      },
      ...other,
      ...props
    });
  }

  // Functional HOC
  Component.displayName = `FHOC(${getDisplayName(name || RenderAs)})`;

  return Component;
};
//Setting the Display Name
export const getDisplayName = Component => {
  return Component.displayName || Component.name || String(Component);
};

// Simple Portal
export const createPortal = (node, name = "") => {
  function Portal({ children }) {
    return ReactDOM.createPortal(children, node);
  }
  Portal.displayName = `Portal(${getDisplayName(name)})`;
  return Portal;
};
