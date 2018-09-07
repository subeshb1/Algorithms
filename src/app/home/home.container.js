import React from "react";
import Carousel from "../components/carousel";
import "./css/index.css";
import { Helmet } from "react-helmet";
export default () => {
  return (
    <div className="home-wrapper">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Simple Algorithms</title>
        <meta
          name="description"
          content="Simple Algorithm, a site to visualize, implement, learn and implement algorithms"
        />
      </Helmet>
      <Carousel height={"90vh"} interval={5000}>
        <Carousel.Slide>
          <div className="welcome">
            <h1 style={{ fontSize: "1.3em" }}>Welcome To Simple Algorithms </h1>
            <h2 style={{ fontSize: "1em" }}>A place to ...</h2>
            <div className="cards">
              <div className="card">
                <div className="image">
                  <img
                    src="https://www.freetutorials.us/wp-content/uploads/2018/01/816152_f28c_3.jpg"
                    alt=""
                  />
                </div>
                <div className="description">
                  <div className="heading">Learn</div>
                  <p>Learn about different Algorithms</p>
                </div>
              </div>
              <div className="card">
                <div className="image">
                  <img
                    src="http://blog.visualmotive.com/wp-content/uploads/2009/07/graph_usairways_bundled.jpg"
                    alt=""
                  />
                </div>
                <div className="description">
                  <div className="heading">Visualize</div>
                  <p>Visualize algorithms in real time.</p>
                </div>
              </div>
              <div className="card">
                <div className="image">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg4ckaK_te4BkpiE_nNbX2f7sF4_YN7z1fa48GY0OVZ21H4j6sjQ"
                    alt=""
                  />
                </div>
                <div className="description">
                  <div className="heading">Discover</div>
                </div>
              </div>
              <div className="card">
                <div className="image">
                  <img
                    src="https://edtech.digitalpromise.org/wp-content/uploads/sites/8/2016/09/implementation-and-training.png"
                    alt=""
                  />
                </div>
                <div className="description">
                  <div className="heading">Implement</div>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div className="welcome">
            <h2 style={{ fontSize: "1.3em" }}>
              What Simple Algorithms provide ...
            </h2>
            <div className="cards">
              <div className="card">
                <div className="image">
                  <img
                    src="http://svgjs.com/assets/images/logo-svg-js-01d.png"
                    alt=""
                  />
                </div>
                <div className="description">
                  <div className="heading">Interactive PlayGround</div>
                  <p>Learn about different Algorithms</p>
                </div>
              </div>
              <div className="card">
                <div className="image">
                  <img
                    src="http://www.idoxsoft.com/wp-content/uploads/2016/04/User-Interface.png"
                    alt=""
                  />
                </div>
                <div className="description">
                  <div className="heading">User Friendly UI</div>
                  <p>Visualize algorithms in real time.</p>
                </div>
              </div>
              <div className="card">
                <div className="image">
                  <img src="http://techxapp.com/img/ui-2.png" alt="" />
                </div>
                <div className="description">
                  <div className="heading">Cross Platform</div>
                </div>
              </div>
              <div className="card">
                <div className="image">
                  <img
                    src="https://c-sf.smule.com/sf/s58/arr/83/09/a1c1da13-8f31-4223-86cd-117f99d02963.jpg"
                    alt=""
                  />
                </div>
                <div className="description">
                  <div className="heading">Offline Support</div>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Slide>
        <Carousel.Slide>Sorting Algorithms</Carousel.Slide>
        <Carousel.Slide>Searching Algorithms</Carousel.Slide>
        <Carousel.Slide>Graph Algorithms</Carousel.Slide>
      </Carousel>
    </div>
  );
};
