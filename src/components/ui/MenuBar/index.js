import React from "react";
import "./index.css";
function MenuBar({ as = "div", ...props }) {
  return React.createElement(as, { className: "menu", ...props });
}

export const MenuItem = ({ as = "div", ...props }) =>
  React.createElement(as, { className: "item", ...props });
  
MenuBar.Item = MenuItem;
export default MenuBar;
