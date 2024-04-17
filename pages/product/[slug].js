import React, { useContext } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  CardMedia,
} from '@material-ui/core';
import Layout from '../../components/Layout';
import useStyles from '../../utils/styles';
import Product from '../../models/Product';
import db from '../../utils/db';
import axios from 'axios';
import { Store } from '../../utils/Store';
import { useRouter } from 'next/router';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';




export default function ProductScreen(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { product } = props;
  const classes = useStyles();

  if (!product) {
    return <div>Product not found</div>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      window.alert('Sorry. This product is out of stock.');
      return;
    }
    const image = data.images.length > 0 ? data.images[0].image : '';
    const payload = {
      _id: data._id,
      name: data.name,
      price: data.price,
      countInStock: data.countInStock,
      slug: data.slug,
      category: data.category,
      description: data.description,
      quantity,
      image,
    };
    dispatch({ type: 'CART_ADD_ITEM', payload });
    router.push('/cart');
  };

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={product.images[i].image} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false

  };


  return (
    <Layout title={product.name} description={product.description} metaImage={product.images[0].image}>
      <div className={classes.section}>
        <NextLink href="/search" passHref>
          <Link>
            <Typography>Back to products</Typography>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={9} className={classes.productCarouselContainer}>
          {product.images.length === 1 ? (
            <CardMedia
              component="img"
              image={product.images[0]?.image}
            />

          ) : (
            <div >
              <Slider {...settings} dots customPaging={i => <Image src={product.images[i].image} width={400} height={400} />} infinite speed={500} slidesToShow={1} slidesToScroll={1}>
                {product.images.map((image, index) => (
                  <div key={index}>
                    <CardMedia
                      component="img"
                      image={image.image}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </Grid>

        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category}</Typography>
            </ListItem>
            {product.subCategory && (
              <ListItem>
                <Typography>Sub-category: {product.subCategory}</Typography>
              </ListItem>
            )
            }
            <ListItem>
              <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}> Description: <br />{product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Prix</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>€{product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Statut</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.countInStock > 0 ? 'En stock' : 'Indisponible'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={addToCartHandler}
                  disabled={!product.countInStock || product.countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }, '-reviews').lean();
  // await db.disconnect();
  const serializedProduct = JSON.parse(JSON.stringify(product));

  return {
    props: {
      product: serializedProduct,
    },
  };
}