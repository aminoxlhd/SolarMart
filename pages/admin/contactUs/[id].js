import React, { useContext, useEffect, useReducer } from 'react';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import Layout from '../../../components/Layout'
import { Store } from '../../../utils/Store';
import axios from 'axios';
import { useRouter } from 'next/router';
import useStyles from '../../../utils/styles';
import { getError } from '../../../utils/error';
import {
    Grid,
    Card,
    List,
    ListItem,
    Typography,
    ListItemText,
    CircularProgress,
} from '@material-ui/core';

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, message: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

function ContactUsMessage({ params }) {
    const messageId = params.id;
    const classes = useStyles();
    const router = useRouter();
    const { state } = useContext(Store);
    const { userInfo } = state;

    const [
        { loading, error, message },
        dispatch,
    ] = useReducer(reducer, {
        loading: true,
        message: {},
        error: '',
    });

    useEffect(() => {
        if (!userInfo) {
            return router.push('/login');
        }
        const fetchMessage = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/admin/contactUs/${messageId}`, {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };
        fetchMessage();
    }, [messageId, userInfo, router]);

    return (
        <Layout title={`Message ${messageId}`}>
            <Grid container spacing={1}>
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
                                <ListItem button component="a">
                                    <ListItemText primary="Commandes"></ListItemText>
                                </ListItem>
                            </NextLink>
                            <NextLink href="/admin/contactUs" passHref>
                                <ListItem selected button component="a">
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

                    <Grid item md={9} xs={12}>
                        <Card className={classes.section}>
                            <List>
                                <ListItem>
                                    <Typography component="h2" variant="h2">
                                        Message details
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography variant="subtitle1">Fullname: {message.fullName}</Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography variant="subtitle1">Email: {message.email}</Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography variant="subtitle1">Phone Number: {message.phoneNumber}</Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography variant="subtitle1">Subject: {message.subject}</Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography variant="subtitle1">Message: {message.message}</Typography>
                                </ListItem>
                            </List>
                        </Card>
                    </Grid>

                )}
            </Grid>
        </Layout>

    );
}

export async function getServerSideProps({ params }) {
    return { props: { params } };
}

export default dynamic(() => Promise.resolve(ContactUsMessage), { ssr: false });
