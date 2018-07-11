import React, { Component } from "react";
import "./App.css";
import { createComponent, createPortal } from "./components/utils";

const Header = createPortal(document.getElementById("header"), "Header");
const Footer = createPortal(document.getElementById("footer"), "Footer");
const Navbar = createComponent("nav", { className: "navbar" });
const Main = createComponent("div", {}, "Main");

const NavItem = createComponent("div", { className: "item" });

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header>
          <Navbar>
            <NavItem className="header item">
              <img src="logo.svg" alt="" />
              <a>Algorithms</a>
              <button>I</button>
            </NavItem>
            <NavItem as="a">Home</NavItem>
            <NavItem as="a">About</NavItem>
            <NavItem as="a">Contact</NavItem>
            <NavItem as="a">Profile</NavItem>
            <NavItem as="a">Login</NavItem>
          </Navbar>
        </Header>
        <Main>
          <div>Hello</div>
        </Main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
