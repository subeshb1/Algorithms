import React from "react";
import "./index.css";
function DrawBoard(props) {
  return React.createElement("div", { className: "drawboard", ...props });
}

export default DrawBoard;
