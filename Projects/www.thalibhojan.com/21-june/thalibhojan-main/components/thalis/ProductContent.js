import React, { Component } from "react";
import Slider from "react-slick";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Image from "next/image";
import Paper from "@material-ui/core/Paper";
import Link from "next/link";

const styles = (theme) => ({
  root: {
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

class ProductContent extends Component {
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
    const { classes, product } = this.props;
    return product && product ? (
      <Grid item xs={6}>
        <Paper>
          <div className="col-lg-6 col-md-6">
            <div className="product-details-content">
              <h3>{product.title}</h3>

              <div className="price">
                <span className="new-price">$191.00</span>
              </div>

              <div className="product-review">
                <div className="rating">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
                <Link href="#">
                  <a className="rating-count">3 reviews</a>
                </Link>
              </div>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et.
              </p>

              <ul className="product-info">
                <li>
                  <span>Vendor:</span>{" "}
                  <Link href="#">
                    <a>Lereve</a>
                  </Link>
                </li>
                <li>
                  <span>Availability:</span>{" "}
                  <Link href="#">
                    <a>In stock (7 items)</a>
                  </Link>
                </li>
                <li>
                  <span>Product Type:</span>{" "}
                  <Link href="#">
                    <a>T-Shirt</a>
                  </Link>
                </li>
              </ul>

              {product.sizes && product.sizes.length > 1 ? (
                <div className="product-size-wrapper">
                  <h4>Size:</h4>
                  <ul>
                    {product.sizes.map((data) => (
                      <li>
                        <Link href="#">
                          <a>{data}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                ""
              )}

              <div className="product-add-to-cart">
                <div className="input-counter">
                  <span className="minus-btn" onClick={this.DecreaseItem}>
                    <i className="fas fa-minus"></i>
                  </span>
                  <input
                    type="text"
                    value={this.state.qty}
                    min={this.state.min}
                    max={this.state.max}
                    onChange={(e) => this.setState({ qty: e.target.value })}
                  />
                  <span className="plus-btn" onClick={this.IncrementItem}>
                    <i className="fas fa-plus"></i>
                  </span>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.handleAddToCartFromView}
                >
                  <i className="fas fa-cart-plus"></i> Add to Cart
                </button>
              </div>

              <div className="buy-checkbox-btn">
                <div className="item">
                  <input className="inp-cbx" id="cbx" type="checkbox" />
                  <label className="cbx" htmlFor="cbx">
                    <span>
                      <svg width="12px" height="10px" viewBox="0 0 12 10">
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                      </svg>
                    </span>
                    <span>I agree with the terms and conditions</span>
                  </label>
                </div>

                <div className="item">
                  <Link href="#">
                    <a className="btn btn-primary">Buy it now!</a>
                  </Link>
                </div>
              </div>

              <div className="custom-payment-options">
                <span>Guaranteed safe checkout:</span>

                <div className="payment-methods">
                  <Link href="#">
                    <a>
                      <img src="/images/payment-image/1.svg" alt="images" />
                    </a>
                  </Link>

                  <Link href="#">
                    <a>
                      <img src="/images/payment-image/2.svg" alt="images" />
                    </a>
                  </Link>

                  <Link href="#">
                    <a>
                      <img src="/images/payment-image/3.svg" alt="images" />
                    </a>
                  </Link>

                  <Link href="#">
                    <a>
                      <img src="/images/payment-image/4.svg" alt="images" />
                    </a>
                  </Link>

                  <Link href="#">
                    <a>
                      <img src="/images/payment-image/5.svg" alt="images" />
                    </a>
                  </Link>

                  <Link href="#">
                    <a>
                      <img src="/images/payment-image/6.svg" alt="images" />
                    </a>
                  </Link>

                  <Link href="#">
                    <a>
                      <img src="/images/payment-image/7.svg" alt="images" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </Grid>
    ) : (
      <div> Test </div>
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

export default withStyles(styles)(ProductContent);
