import React, { Component } from "react";
import { Helmet } from "react-helmet";

export default class Head extends Component {
  render() {
    return (
      <Helmet>
        <meta charSet="utf-8" />
        <title>Simple Algorithms - Learn, Visualize, Implement</title>
        <meta
          name="description"
          content="Simple Algorithms, a site to visualize, implement, learn and implement algorithms. Learn the basics to Design and Analysis of Algorithms. Compute Complexity, Easy Visualization, Algorithm Codes all in one place."
        />
        <meta
          name="keyword"
          content="algorithm,visualize,implementation,bfs,algorithm complexity,big o,time complexity,space complexity,"
        />
      </Helmet>
    );
  }
}
