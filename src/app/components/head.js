import React from "react";
import { Helmet } from "react-helmet";
import { images } from "../assets/images";

const root = "https://www.sketchalgorithms.com";
export default class Head extends React.Component {
  render() {
    const {
      data: {
        url = "/",
        title = "Sketch Algorithms",
        ogTitle = title,
        description = "Learn, Visualize, Implement",
        ogDescription = description,
        image = "logo.png"
      }
    } = this.props;
    return (
      <Helmet>
        {/* Facebook */}
        <meta property="og:title" content={ogTitle} />
        <meta property="og:url" content={root + url} />
        <meta property="og:type" content={"website"} />
        <meta
          property="og:description"
          content={ogDescription || description}
        />
        <meta property="og:image" content={root + images[image]} />
        {/* Twitter */}
        <meta name="twitter:card" content={"summary"} />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:url" content={root + url} />
        <meta name="twitter:image" content={root + images[image]} />
        <meta name="twitter:description" content={ogDescription} />
        <meta charSet="utf-8" />
        {/* SEO */}
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
    );
  }
}
