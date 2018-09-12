import React, { Component } from "react";
import "./css/index.css";
import { DrawBoard, ToolBar } from "./containers";
import Menu from "../components/menu";
import { Snake } from "./statefulComponents";
import {
  Route
} from 'react-router-dom'
import SnakeTut from "./components/snake-tut";

const links = ["/snake-game"];

const getAlgoFromPath = pathname => {
  return "snake-game";
};

const getName = pathname =>
  getAlgoFromPath(pathname)
    .split("-")
    .map(x => x.toUpperCase())
    .join(" ");

// Menu Component
let menuItems = links.map(item => ({
  className: "item",
  children: getName(item),
  to: "/games" + item
}));

export default class Games extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <Menu className="menu" items={menuItems} />
          <Route path='/games/snake-game' component={Snake}/>
        </div>
        <div className="home-wrapper">
          <Route path='/games/snake-game' component={SnakeTut}/>
          
        </div>
      </React.Fragment>
    );
  }
}
