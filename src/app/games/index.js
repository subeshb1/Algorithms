import React, { Component } from "react";
import "./css/index.css";
import Menu from "../components/menu";
import { Snake } from "./statefulComponents";
import { Route } from "react-router-dom";
import SnakeTut from "./components/snake-tut";
import { Helmet } from "react-helmet";
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
        <Helmet>
          <meta charSet="utf-8" />
          <title>Games | Tutorial | Sketch Algorithms</title>
          <meta
            name="description"
            content="Learn how to make a Simple Games using several programming languages. Follow the step by step process to build your own games."
          />
          <meta
            name="keyword"
            content="snake game using js, snake game using c++, snake game using java, snake game tutorial, tutorial, learn simple, easy, free tutorial"
          />
        </Helmet>
        <div className="container">
          <Menu className="menu" items={menuItems} />
          <Route path="/games/snake-game" component={Snake} />
        </div>
        <div className="section-container">
          <Route path="/games/snake-game" component={SnakeTut} />
        </div>
      </React.Fragment>
    );
  }
}
