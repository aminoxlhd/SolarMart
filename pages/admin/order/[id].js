import React, { useContext, useEffect, useReducer } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../../../components/Layout';
import { Store } from '../../../utils/Store';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  Grid,
  TableContainer,
  Table,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  CircularProgress,
  Card,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import useStyles from '../../../utils/styles';
import { getError } from '../../../utils/error';


function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function Order({ params }) {
  const orderId = params.id;
  const classes = useStyles();
  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [
    { loading, error, order },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });
  const {
    shippingAddress,
    orderItems,
    totalPrice,
  } = order;


  useEffect(() => {
    if (!userInfo) {
      return router.push('/login');
    }
    const fetchOrder = async () => {

      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });

      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (
      !order._id ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
    }
  }, [order, orderId, router, userInfo]);



  return (
    <Layout title={`Commande ${orderId}`}>

      <Grid container spacing={1} >
        <Grid item md={3} xs={12}>
          <Card className={classes.section}>
            <List>
              <NextLink href="/admin/profile" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Profil"></ListItemText>
                </ListItem>
              </NextLink>
              {userInfo && userInfo.isAdmin && (
                <>
                  <NextLink href="/admin/dashboard" passHref>
                    <ListItem button component="a">
                      <ListItemText primary="Dashboard"></ListItemText>
                    </ListItem>
                  </NextLink>
                  <NextLink href="/admin/products" passHref>
                    <ListItem button component="a">
                      <ListItemText primary="Produits"></ListItemText>
                    </ListItem>
                  </NextLink>
                  <NextLink href="/admin/featuredCategories" passHref>
                    <ListItem button component="a">
                      <ListItemText primary="Catégories"></ListItemText>
                    </ListItem>
                  </NextLink>
                  <NextLink href="/admin/banner" passHref>
                    <ListItem button component="a">
                      <ListItemText primary="Bannière"></ListItemText>
                    </ListItem>
                  </NextLink>
                  <NextLink href="/admin/slider" passHref>
                    <ListItem button component="a">
                      <ListItemText primary="Carrousel"></ListItemText>
                    </ListItem>
                  </NextLink>
                </>
              )}
              <NextLink href="/admin/orders" passHref>
                <ListItem selected button component="a">
                  <ListItemText primary="Commandes"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/contactUs" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Messages"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/newsLetters" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Newsletters"></ListItemText>
                </ListItem>
              </NextLink>
              {userInfo && userInfo.isAdmin && (
                <>
                  <NextLink href="/admin/users" passHref>
                    <ListItem button component="a">
                      <ListItemText primary="Utilisateurs"></ListItemText>
                    </ListItem>
                  </NextLink>
                  <NextLink href="/admin/register" passHref>
                    <ListItem button component="a">
                      <ListItemText primary="Nouvel utilisateur"></ListItemText>
                    </ListItem>
                  </NextLink>
                </>
              )}
            </List>
          </Card>
        </Grid>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography className={classes.error}>{error}</Typography>
        ) : (
          < >
            <Grid item md={9} xs={12}>

              <Card className={classes.section}>
                <List>
                  <ListItem>
                    <Typography component="h2" variant="h2">
                      Delivery address
                    </Typography>
                  </ListItem>
                  <ListItem>
                    {shippingAddress.fullName},{shippingAddress.email} ,{shippingAddress.phoneNumber},{shippingAddress.address},{' '}
                    {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                    {shippingAddress.country}
                    &nbsp;

                  </ListItem>

                </List>
              </Card>

              <Card className={classes.section}>
                <List>
                  <ListItem>
                    <Typography component="h2" variant="h2">
                      Order
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Price</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {orderItems.map((item) => (
                            <TableRow key={item._id}>
                              <TableCell>
                                <NextLink href={`/product/${item.slug}`} passHref>
                                  <Link>
                                    <Image
                                      src={item.image}
                                      alt={item.name}
                                      width={50}
                                      height={50}
                                    ></Image>
                                  </Link>
                                </NextLink>
                              </TableCell>

                              <TableCell>
                                <NextLink href={`/product/${item.slug}`} passHref>
                                  <Link>
                                    <Typography>{item.name}</Typography>
                                  </Link>
                                </NextLink>
                              </TableCell>
                              <TableCell align="right">
                                <Typography>{item.quantity}</Typography>
                              </TableCell>
                              <TableCell align="right">
                                <Typography>€{item.price}</Typography>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </ListItem>
                </List>
              </Card>
              <Card className={classes.section}>
                <List>
                  <ListItem>
                    <Typography variant="h2">Order Summary</Typography>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Total:</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">
                          <strong>€{totalPrice}</strong>
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                </List>
              </Card>
            </Grid>

          </>
        )}
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  return { props: { params } };
}

export default dynamic(() => Promise.resolve(Order), { ssr: false });
