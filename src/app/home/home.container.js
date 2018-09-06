import React from "react";
import Carousel from "../components/carousel";
import "./css/index.css";

export default () => {
  return (
    <div className="home-wrapper">
      <Carousel height={"90vh"} interval={5000}>
        <Carousel.Slide>
          <div className="welcome">
          <h1 style={{ fontSize: "1.3em" }}>Welcome To Simple Algorithms </h1>
            <h2 style={{ fontSize: "1em" }}>A place to ...</h2>
            <div class="cards">
              <div class="card">
                <div class="image">
                  <img
                    src="https://www.freetutorials.us/wp-content/uploads/2018/01/816152_f28c_3.jpg"
                    alt=""
                  />
                </div>
                <div class="description">
                  <div class="heading">Learn</div>
                  <p>Learn about different Algorithms</p>
                </div>
              </div>
              <div class="card">
                <div class="image">
                  <img
                    src="http://blog.visualmotive.com/wp-content/uploads/2009/07/graph_usairways_bundled.jpg"
                    alt=""
                  />
                </div>
                <div class="description">
                  <div class="heading">Visualize</div>
                  <p>Visualize algorithms in real time.</p>
                </div>
              </div>
              <div class="card">
                <div class="image">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg4ckaK_te4BkpiE_nNbX2f7sF4_YN7z1fa48GY0OVZ21H4j6sjQ"
                    alt=""
                  />
                </div>
                <div class="description">
                  <div class="heading">Discover</div>
                </div>
              </div>
              <div class="card">
                <div class="image">
                  <img
                    src="https://edtech.digitalpromise.org/wp-content/uploads/sites/8/2016/09/implementation-and-training.png"
                    alt=""
                  />
                </div>
                <div class="description">
                  <div class="heading">Implement</div>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          A Place To Learn And Visualize Algorithms
        </Carousel.Slide>
        <Carousel.Slide>Sorting Algorithms</Carousel.Slide>
        <Carousel.Slide>Searching Algorithms</Carousel.Slide>
        <Carousel.Slide>Graph Algorithms</Carousel.Slide>
      </Carousel>
    </div>
  );
};
