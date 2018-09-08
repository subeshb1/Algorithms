import React, { Component } from "react";
import { Helmet } from "react-helmet";

export default class Head extends Component {
  render() {
    return (
      <Helmet>
        <meta charSet="utf-8" />
        <title>Simple Algorithms</title>
        <meta
          name="description"
          content="Simple Algorithms, a site to visualize, implement, learn and implement algorithms"
        />
      </Helmet>
    );
  }
}
