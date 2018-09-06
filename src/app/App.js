import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";
import "./App.css";
import "./css/index.css";
import { createComponent, createPortal } from "./lib";

import Sorting from "./sorting";
import Graph from "./graph-search";
import DrawableGraph from "./drawable-graph";
import Home from "./home";

const Header = createPortal(document.getElementById("header"), "Header");
const Footer = createPortal(document.getElementById("footer"), "Footer");
const Navbar = createComponent("nav", { className: "navbar" });
const NavItem = createComponent("div", { className: "item" });

class App extends Component {
  render() {
    return (
      <React.Fragment>
        {/* Portal */}
        <Header>
          <Navbar>
            <NavItem className="header item">
              <img src="/logo.svg" alt="" />
              <a>Algorithms</a>
            </NavItem>
            <NavItem as={NavLink} to="/" exact>Home</NavItem>
            <NavItem as={NavLink} to="/sorting">
              Sorting
            </NavItem>
            <NavItem as={NavLink} to="/graph-search">
              Graph
            </NavItem>
            <NavItem as={NavLink} to="/drawable-graph">
              Drawable Graph
            </NavItem>
          </Navbar>
        </Header>

        <Route path="/"  exact component={Home} />
        <Route path="/sorting" component={Sorting} />
        <Route path="/graph-search" component={Graph} />
        <Route path="/drawable-graph" component={DrawableGraph} />

        <Footer>&copy;Copyright Subesh Bhandari</Footer>
      </React.Fragment>
    );
  }
}

export default App;
