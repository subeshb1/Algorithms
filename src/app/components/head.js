import React from "react";
import { Helmet } from "react-helmet";
export default class Head extends React.Component {
  render() {
    const {
      data: {
        url = "/",
        title = "Sketch Algorithms",
        ogTitle = title,
        description = "Learn, Visualize, Implement",
        ogDescription = description,
        image = "logo.svg"
      }
    } = this.props;

    return (
      <Helmet>
        <meta charSet="utf-8" />
        {/* SEO */}
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Facebook */}
        <meta property="og:title" content={ogTitle} />
        <meta
          property="og:url"
          content={"https://www.sketchalgorithms.com" + url}
        />
        <meta property="og:type" content={"website"} />
        <meta
          property="og:description"
          content={ogDescription || description}
        />
        <meta
          property="og:image"
          content={"https://www.sketchalgorithms.com/static/img/og-image/" + image}
        />
        {/* Twitter */}
        <meta name="twitter:card" content={"summary"} />
        <meta name="twitter:title" content={ogTitle} />
        <meta
          name="twitter:url"
          content={"https://www.sketchalgorithms.com" + url}
        />
        <meta
          name="twitter:image"
          content={"https://www.sketchalgorithms.com/static/img/og-image/" + image}
        />
        <meta name="twitter:description" content={ogDescription} />
      </Helmet>
    );
  }
}
