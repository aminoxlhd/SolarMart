import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import db from '../utils/db';
import Product from '../models/Product';
import useStyles from '../utils/styles';
import ProductItem from '../components/ProductItem';
import { Store } from '../utils/Store';
import axios from 'axios';
import { Pagination } from '@material-ui/lab';

const PAGE_SIZE = 6;

export default function Search(props) {
  const classes = useStyles();
  const router = useRouter();
  const {
    query = 'all',
    category = 'all',
  } = router.query;
  const { products, countProducts, categories, subCategory, pages } = props;

  const filterSearch = ({
    page,
    category,
    subCategory,
    searchQuery,
    isOffer,
  }) => {

    const path = router.pathname;
    const { query } = router;
    if (page) query.page = page;
    if (searchQuery) query.searchQuery = searchQuery;
    if (category) query.category = category;
    if (subCategory) query.subCategory = subCategory;
    if (isOffer !== undefined) query.isOffer = isOffer;

    router.push({
      pathname: path,
      query: query,
    });
  };

  const [subCategories, setSubCategories] = useState([])
  const [selectedSubCategory, setSelectedSubCategory] = useState(subCategory || 'all');

  const categoryHandler = (e) => {
    const selectedCategory = e.target.value;
    setSelectedSubCategory('all');
    const newQuery = { ...router.query, category: selectedCategory };
    newQuery.subCategory = 'all';
    if (newQuery.page && newQuery.page !== '1') {
      newQuery.page = '1';
    }
    filterSearch(newQuery);
  };
  const subCategoryHandler = (e) => {
    setSelectedSubCategory(e.target.value);
    filterSearch({ subCategory: e.target.value });
  };
  const pageHandler = (e, page) => {
    filterSearch({ page });
  };


  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get('/api/products/subCategories', {
          params: { category: category }
        });
        setSubCategories(response.data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchSubCategories();
  }, [category]);



  const { state, dispatch } = useContext(Store);
  const addToCartHandler = async (product) => {
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
      subCategory: data.subCategory,
      description: data.description,
      quantity,
      image,
    };
    dispatch({ type: 'CART_ADD_ITEM', payload });
    router.push('/cart');
  };
  return (
    <Layout title="Search">
      <Grid  container spacing={1}>
        <Grid item md={3}>
          <List>
            <ListItem >
              <Box className={classes.categoryBox} >
                <Typography>Categories</Typography>
                <Select fullWidth value={category} onChange={categoryHandler}>
                  <MenuItem value="all">All</MenuItem>
                  {categories &&
                    categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                </Select>
              </Box>
            </ListItem>

            {category !== 'all' && (
              <ListItem>
                <Box className={classes.categoryBox} >
                  <Typography>Under Categories</Typography>
                  <Select fullWidth value={selectedSubCategory} onChange={subCategoryHandler}>
                    <MenuItem value="all">All</MenuItem>
                    {subCategories &&
                      subCategories.map((subCategory) => (
                        <MenuItem key={subCategory} value={subCategory}>
                          {subCategory}
                        </MenuItem>
                      ))}
                  </Select>
                </Box>
              </ListItem>
            )}
          </List>
        </Grid>

        <Grid item md={9} >
          <Grid container justifyContent="space-between" alignItems="center" className={classes.results}>
            <Grid item>
              {products.length === 0 ? 'Aucun résultat' : products.length === 1 ? '1 Résultat' : `${countProducts} Résultats`}
              {query !== 'all' && query !== '' && ' : ' + query}
              {category !== 'all' && ' : ' + category}
              {(query !== 'all' && query !== '') ||
                category !== 'all' ? (
                <Button onClick={() => router.push('/search')}>
                  <CancelIcon />
                </Button>
              ) : null}
            </Grid>

          </Grid>
          <Grid className={classes.mt1} container spacing={3}>
            {products.map((product) => (
              <Grid item md={4} key={product.name}>
                <ProductItem
                  product={product}
                  addToCartHandler={addToCartHandler}
                />
              </Grid>
            ))}
          </Grid>
          <Pagination
            className={classes.mt1}
            defaultPage={parseInt(query.page || '1')}
            count={pages}
            onChange={pageHandler}
          ></Pagination>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {

  await db.connect();
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || '';
  const subCategory = query.subCategory || '';
  const searchQuery = query.query || '';

  const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
        name: {
          $regex: searchQuery,
          $options: 'i',
        },
      }
      : {};

  const isOfferFilter = query.isOffer === 'true' ? { isOffer: true } : {};
  const categoryFilter = category && category !== 'all' ? { category } : {};
  const subCategoryFilter = subCategory && subCategory !== 'all' ? { subCategory } : {};
  
  


  const categories = await Product.find().distinct('category');
  const subCategories = await Product.find({ category: category }).distinct('subCategory');

  const productDocs = await Product.find(
    {
      ...queryFilter,
      ...categoryFilter,
      ...subCategoryFilter,
      ...isOfferFilter,
    },
    '-reviews'
  )
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...subCategoryFilter,
    ...isOfferFilter,
  });
  // await db.disconnect();

  const products = productDocs.map(product => ({
    ...db.convertDocToObj(product),
    images: product.images.map(image => ({
      ...image,
      _id: image._id.toString()
    }))
  }));

  return {
    props: {
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
      categories,
      subCategories,
    },
  };
}
