import React from "react";
import "./css/index.css";

import { Head, Slide, Section,Features } from "./components";
export default () => {
  return (
    <div className="section-container">
      <Head />
      <Slide />
      <Section />
      <Features />
    </div>
  );
};
