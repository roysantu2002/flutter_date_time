import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Container from "@material-ui/core/Container";
import ThaliDetails from "../../components/thalis/ThaliDetails";
import ProductContent from "../../components/thalis/ProductContent";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Slider from "react-slick";
import Image from "next/image";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { Typography, CardActions } from "@material-ui/core";
import Link from "../../components/Link";
import { Button } from "../../components/controls";



const styles = (theme) => ({
  root: {
    maxWidth: "50%",
    margin: "auto",
    marginBottom: "auto",

    // margin: theme.spacing(1),
    // padding: theme.spacing(1),
    // maxWidth: '50%',
    // height: 50,
    [theme.breakpoints.down("sm")]: {
      maxWidth: "50%",
    },
  },
  paper: {
    height: 80,
    maxWidth: "30%",
  },
  card: {
    maxWidth: "auto",
    margin: "auto",
    marginBottom: "auto",

    [theme.breakpoints.down("sm")]: {
      maxHeight: 120,
      width: 110,
      maxWidth: "auto",
      margin: theme.spacing(1),

      marginBottom: "auto",
    },
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  control: {
    padding: theme.spacing(1),
  },
  media: {
    height: 0,
    padding: "50%",
  },
  title: {
    margin: theme.spacing(4),
    marginBottom: theme.spacing(14),
  },
});

const Product = (props) => {
  const { classes } = props;
  let [slideIndex, setslideIndex] = useState(0);
  let [updateCount, setupdateCount] = useState(0);


  const router = useRouter();

  const title = router.query;
  console.log(title.title);
  // console.log(`id ${state.storeItems.options.burgers}`)
  //   let product = useSelector((state) => {
  //     return state.storeItems.snacksMenus.find((item) => item === title)
  //   });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    afterChange: () => setupdateCount(updateCount + 1),
    beforeChange: (current, next) => setslideIndex({ slideIndex: next }),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const option = useSelector(
    (state) => {
      let products;
      Object.entries(state.storeItems.options).map(([key, value]) => {
        if (key.includes(title.title)) {
          products = value;
        }
        return products;
      });
      return products;
    }

    // state.storeItems.options.find((item) => item === 'burgers')
  );

  // const updateLink = (id) => {
  //   console.log(id);
  // };

  //   console.log(`option ${option[0].title}`);

  //   const detailedProd = useSelector((state) =>
  //     state.storeItems.detailedProd.find((item) => item.id === parseInt(id))
  //   );

  //   console.log(detailedProd && `detailedProd ${detailedProd.title}`);

  // const products = useSelector((state) => state.storeItems.snacksMenus);
  const thalis = useSelector((state) => state.storeItems.thalis);

  const renderSliderSubImages = () => {
    return thalis.map(({ id, url, name, title }) => {
      return (
        <div className={classes.root}>
          <Link
            href="/thalis/[name]"
            as={`/thalis/${name}`}
            style={{ textDecoration: "none" }}
          >
            <Card key={id} align="center" className={classes.card}>
              <CardContent>
                {" "}
                <CardMedia
                  className={classes.media}
                  image={url}
                  title={title}
                />
                <Typography> {title} </Typography>
              </CardContent>
            </Card>
          </Link>
        </div>
      );
    });
  };

  // const addedItemsToCompare = useSelector((state) => state.addedItemsToCompare)
  return (
    <Container fixed align="center" component="section">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2" marked="center" className={classes.title}>
            Thali Meals
          </Typography>
          <Slider {...settings}>{renderSliderSubImages()}</Slider>
        </Grid>

        <Grid item xs={12}>
          <ThaliDetails title={title.title} products={option} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default withStyles(styles)(Product);
