import React from "react";
import "./index.css";
import { createComponent } from "../../utils";

function MenuBar({ as = "div", ...props }) {
  return React.createElement(as, { className: "menu", ...props });
}

export const MenuItem = createComponent("a", { className: "item" }, "MenuItem");

MenuBar.Item = MenuItem;
export default MenuBar;
