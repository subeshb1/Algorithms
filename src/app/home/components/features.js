import React, { Component } from "react";
import interactive from "../../assets/svg/interactive.svg";
import userFriendly from "../../assets/svg/user-friendly.svg";
import crossPlatform from "../../assets/svg/cross-platform.svg";
import offline from "../../assets/svg/offline.svg";
export default class Features extends Component {
  render() {
    return (
      <div className="section">
        <article id="features">
          <h2>Features</h2>
          <article id="interactive">
            <h3>Interactive Playground</h3>
            <p>
              <img src={interactive} alt="" />
              Simple Algorithms provides a very Interactive Playground. Change
              inputs, configuration, move nodes, change speed and interval of
              the entire visualization process. We've provided a set of
              tutorials to get you started with the basics and get you started.
            </p>
          </article>
          <article id="user-friendly">
            <h3>User Friendly</h3>
            <p>
              <img src={userFriendly} alt="" />
              Simple Algorithms provides a very Interactive Playground. Change
              inputs, configuration, move nodes, change speed and interval of
              the entire visualization process. We've provided a set of
              tutorials to get you started with the basics and get you started.
            </p>
          </article>
          <article id="cross-platform">
            <h3>Cross Platform</h3>
            <p>
              <img src={crossPlatform} alt="" />
              Simple Algorithms provides a very Interactive Playground. Change
              inputs, configuration, move nodes, change speed and interval of
              the entire visualization process. We've provided a set of
              tutorials to get you started with the basics and get you started.
            </p>
          </article>
          <article id="offline">
            <h3>Offline Support</h3>
            <p>
              <img src={offline} alt="" />
              Simple Algorithms provides a very Interactive Playground. Change
              inputs, configuration, move nodes, change speed and interval of
              the entire visualization process. We've provided a set of
              tutorials to get you started with the basics and get you started.
            </p>
          </article>
        </article>
      </div>
    );
  }
}
