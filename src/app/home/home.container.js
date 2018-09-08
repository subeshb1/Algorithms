import React from "react";
import "./css/index.css";

import { Head, Slide, Section } from "./components";
export default () => {
  return (
    <div className="home-wrapper">
      <Head />
      <Slide />
      <Section />
    </div>
  );
};
