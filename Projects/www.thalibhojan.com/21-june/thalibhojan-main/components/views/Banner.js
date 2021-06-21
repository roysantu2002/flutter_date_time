import React, { useState } from "react";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Link from "../Link";
import Slider from "react-slick";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Image from "next/image";

const styles = (theme) => ({
  root: {
    display: "flex",
    marginTop: "1%",
    backgroundImage: `url(${"/images/desktop/main-banner-01.png"})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "auto",
  },

  gridList: {
    flexWrap: "nowrap",

    transform: "translateZ(0)",
  },
  control: {
    padding: theme.spacing(1),
  },
});

const Banner = (props) => {
  const { classes } = props;
  let [slideIndex, setslideIndex] = useState(0);
  let [updateCount, setupdateCount] = useState(0);

  const itemsDesktop = [
    "/images/desktop/main-banner-01.png",
    "/images/desktop/main-banner-02.png",
    "/images/desktop/main-banner-03.png",
    "/images/desktop/main-banner-04.png",
  ];

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1
  // };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,

    afterChange: () => setupdateCount(updateCount + 1),
    beforeChange: (current, next) => setslideIndex({ slideIndex: next }),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <div style={{ margin: "auto", textAlign: "center" }}>
          <Slider {...settings}>
            {itemsDesktop.map((item) => {
              return (
                <Link
                  key="item"
                  href="/placeorder"
                  style={{ textDecoration: "none" }}
                >
                  {" "}
                  <Image src={item} alt={item} width="1000" height="381" />
                </Link>
              );
            })}
          </Slider>
        </div>
      </Container>
    </section>
  );
};
export default withStyles(styles)(Banner);
