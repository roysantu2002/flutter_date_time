import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "../Link";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Carousel from "react-elastic-carousel";

const imageDesktop = "/images/main-banner.png";
const imgMobile = "/images/main-banner-sm.png";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  // { width: 550, itemsToShow: 2 },
  // { width: 768, itemsToShow: 3 },
  // { width: 1200, itemsToShow: 4 },
];

const styles = (theme) => ({
  root: {
    height: "90vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundImage: `url(${imageDesktop})`,
    [theme.breakpoints.down("md")]: {
      backgroundImage: `url(${imgMobile})`,
    },
  },
  rootcontent: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignitems: "center",
    padding: "40px",
    [theme.breakpoints.down("md")]: {
      backgroundPosition: "center center",
    },
  },
  media: {
    marginTop: theme.spacing(1),
    height: 381,
  },
  container: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignitems: "center",
  },
  backdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    zIndex: -1,
  },
  background: {
    position: "relative",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    alignitems: "center",
    zIndex: -2,
  },
  // mainFeaturedPost: {
  //   position: "auto",
  //   width: "100%",
  //   minHeight: "30rem",
  //   [theme.breakpoints.down("md")]: {
  //     width: "100%",
  //     height: "auto",
  //   },
  //   // margin: "-10px auto 0",
  //   backgroundColor: theme.palette.grey[600],
  //   color: theme.palette.common.white,
  //   backgroundImage: `url(${backgroundImage})`,
  //   backgroundSize: "cover",
  //   backgroundRepeat: "no-repeat",
  //   backgroundPosition: "center",
  // },
  arrowDown: {
    position: "absolute",
    bottom: theme.spacing(4),
  },
  // hero: {
  //   backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.01)), url(${backgroundImage})`,
  //   height: "300px",
  //   backgroundPosition: "center",
  //   backgroundRepeat: "no-repeat",
  //   backgroundSize: "cover",
  //   position: "relative",
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   color: "#fff",
  //   fontSize: "4rem",
  // },
});

function AppHeroLayout(props) {
  const { classes } = props;



  const itemsDesktop = ["../images/desktop/main-banner-01.png", "../images/desktop/main-banner-02.png", "../images/desktop/main-banner-03.png", "../images/desktop/main-banner-04.png"];
  const itemsMobile = ["../images/mobile/banner-01.png", "../images/mobile/banner-02.png", "../images/mobile/banner-03.png", "../images/mobile/banner-04.png"];

  const items = window.innerWidth >= 650 ? itemsDesktop : itemsMobile;

  console.log(window.innerWidth);
  return (

        <Carousel>
          {items.map(item =>(
          <Link href="book">
            <div><img src={item} alt='test'></img></div>
          </Link>
          ))}
        </Carousel>
   
  );
}

AppHeroLayout.propTypes = {
  backgroundClassName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppHeroLayout);
