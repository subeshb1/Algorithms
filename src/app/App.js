import React, { Component } from "react";
import { Route,NavLink } from "react-router-dom";
import "./App.css";
import "./css/index.css";
import { createComponent, createPortal } from "../lib";

import Sorting from "./sorting";
import Graph from "./graph-search";

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
            <NavItem as="a">Home</NavItem>
            <NavItem as={NavLink} to="/sorting">Sorting</NavItem>
            <NavItem as={NavLink} to="/graph-search">Graph</NavItem>
            <NavItem as="a">Profile</NavItem>
            <NavItem as="a">Login</NavItem>
          </Navbar>
        </Header>

        <Route path="/sorting" component={Sorting} />
        <Route path="/graph-search" component={Graph} />

        <Footer>&copy;Copyright Subesh Bhandari</Footer>
      </React.Fragment>
    );
  }
}

export default App;
