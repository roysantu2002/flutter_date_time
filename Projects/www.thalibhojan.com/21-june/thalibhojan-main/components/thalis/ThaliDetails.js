import React, { Component } from "react";
import Slider from "react-slick";
import Grid from "@material-ui/core/Grid";
import { withStyles, Typography } from "@material-ui/core";
import Image from "next/image";
import Paper from "@material-ui/core/Paper";
import { useSelector, useDispatch } from "react-redux";
import CardActions from "@material-ui/core/CardActions";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Link from "../Link";
import { Card, Button } from "../controls";
import AddToCart from "../common/AddToCart"
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(4),
    display: "flex",
    justify: "center",
  },
  paper: {
    margin: "auto",
  },
});

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

class ThaliDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null,
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }

  renderSliderMainImages = () => {
    return DEFAULT_PROPS.map(({ id, url }) => {
      return (
        <div key={id}>
          <div className="item">
            <Image src={url} alt="images" width={500} height={500} />
          </div>
        </div>
      );
    });
  };

  renderSliderSubImages = () => {
    return DEFAULT_PROPS.map(({ id, url }) => {
      return (
        <div key={id}>
          <div className="item">
            <Image src={url} alt="images" width={100} height={100} />
          </div>
        </div>
      );
    });
  };

  render() {
    const { classes, products, title } = this.props;

    // console.log(products.sizes && products.sizes)

    console.log(products);
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h2" marked="center">
              {title} Meals
            </Typography>
          </Grid>

     
            {products && products.length > 1 ? (
              products.map((data) => (
                <Grid item xs={12} sm={4} md={4} lg={4}>
                <Card
                  key={data.id}
                  id={data.id}
                  url={data.url}
                  name={data.name}
                  title={data.title}
                  desc={data.desc}
                  price={data.price}
                  varient="h6"
                >
                  <CardActions disableSpacing>
                    <AddToCart data={data}/>
                  </CardActions>
                </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12} >
              <Card
                key={1111}
                id={1111}
                name={"More options"}
                title={"Coming Soon"}
                varient="h6"
              />
              </Grid>
            )}
          </Grid>
   
      </div>
    );
  }
}

const DEFAULT_PROPS = [
  {
    id: 1,
    url: "/images/product-details/1.jpg",
  },
  {
    id: 2,
    url: "/images/product-details/2.jpg",
  },
  {
    id: 3,
    url: "/images/product-details/3.jpg",
  },
  {
    id: 4,
    url: "/images/product-details/4.jpg",
  },
  {
    id: 5,
    url: "/images/product-details/5.jpg",
  },
  {
    id: 6,
    url: "/images/product-details/6.jpg",
  },
  {
    id: 7,
    url: "/images/product-details/7.jpg",
  },
];

export default withStyles(styles)(ThaliDetails);
