import React, { Component } from "react";

import { Helmet } from "react-helmet";

class Head extends Component {
  render() {
    return (
      <Helmet>
        <meta charSet="utf-8" />
        <title>Snake Game | Tutorial | Sketch Algorithms</title>
        <meta
          name="description"
          content="Learn how to make a Simple Snake Games using several programming languages. Follow the step by step process to build your own Snake Game."
        />
        <meta
          name="keyword"
          content="snake game using js, snake game using c++, snake game using java, snake game tutorial, tutorial, learn simple, easy, free tutorial"
        />
      </Helmet>
    );
  }
}

export default class SnakeTut extends Component {
  render() {
    return (
      <div>
        <Head />
        <article className="section">
          <h1>Snake Game</h1>
          <article>
            <h2>Introduction</h2>

            <p>
              Hello Guys, Today I'll be walking you through step by step process
              to build a simple snake game.
            </p>
          </article>
        </article>
      </div>
    );
  }
}
