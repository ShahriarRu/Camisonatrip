import React from "react";
import Slider from "react-slick";
import classes from "./SimpleSlider.module.css";
import image from "./1.png";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SimpleSlider = ({ data }) => {
  var settings = {
    dots: true,
    speed: 1000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className={classes.container}>
      <Slider {...settings}>
        {data.map((result, i) => {
          return (
            <div className={classes.slickSlide} key={i}>
              <img src={result.user.fileURL} key={i} alt={i} />
            </div>
          );
        })}
        <div className={classes.slickSlide}>
          <img src={image} />
        </div>
        <div className={classes.slickSlide}>
          <img src={image} />
        </div>
        <div className={classes.slickSlide}>
          <img src="http://placekitten.com/g/400/200" />
        </div>
        <div className={classes.slickSlide}>
          <img src="http://placekitten.com/g/400/200" />
        </div>
      </Slider>
    </div>
  );
};

export default SimpleSlider;
