import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import { createComponent, createPortal } from "../lib";

import Sorting from "./sorting";

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
            <NavItem as="a">About</NavItem>
            <NavItem as="a">Contact</NavItem>
            <NavItem as="a">Profile</NavItem>
            <NavItem as="a">Login</NavItem>
          </Navbar>
        </Header>

        <Route path="/sorting" component={Sorting} />

        <Footer>&copy;Copyright Subesh Bhandari</Footer>
      </React.Fragment>
    );
  }
}

export default App;
