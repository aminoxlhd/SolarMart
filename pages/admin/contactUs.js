import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import React, { useEffect, useContext, useReducer } from 'react';
import {
    CircularProgress,
    Grid,
    List,
    ListItem,
    Typography,
    Card,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Tooltip,
    IconButton,
    ListItemText,
} from '@material-ui/core';
import { getError } from '../../utils/error';
import { Store } from '../../utils/Store';
import Layout from '../../components/Layout';
import useStyles from '../../utils/styles';
import { BsThreeDots } from "react-icons/bs";

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, messages: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

function AdminMessages() {
    const { state } = useContext(Store);
    const router = useRouter();
    const classes = useStyles();
    const { userInfo } = state;

    const [{ loading, error, messages }, dispatch] = useReducer(reducer, {
        loading: true,
        messages: [],
        error: '',
    });

    useEffect(() => {
        if (!userInfo) {
            router.push('/login');
        }
        const fetchData = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/admin/contactUs`, {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });

            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };
        fetchData();
    }, [router, userInfo]);

    return (
        <Layout title="Messages">
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
                        </List>
                    </Card>
                </Grid>
                <Grid item md={9} xs={12}>
                    <Card className={classes.section}>
                        <List>
                            <ListItem>
                                <Typography component="h1" variant="h1">
                                    Messages
                                </Typography>
                            </ListItem>

                            <ListItem>
                                {loading ? (
                                    <CircularProgress />
                                ) : error ? (
                                    <Typography className={classes.error}>{error}</Typography>
                                ) : (
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>ID</TableCell>
                                                    <TableCell>FIRST AND LAST NAME</TableCell>
                                                    <TableCell>PHONE NUMBER</TableCell>
                                                    <TableCell>SUBJECT</TableCell>
                                                    <TableCell>ACTIONS</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((message) => (
                                                    <TableRow key={message._id}>
                                                        <TableCell>{message._id.substring(20, 24)}</TableCell>
                                                        <TableCell>{message.fullName}</TableCell>
                                                        <TableCell>{message.phoneNumber}</TableCell>
                                                        <TableCell>{message.subject}</TableCell>
                                                        <TableCell>
                                                            <NextLink href={`contactUs/${message._id}`} passHref>
                                                                <Tooltip title="Détails" arrow>
                                                                    <IconButton variant="contained">
                                                                        <BsThreeDots style={{ fontSize: '1em' }} />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </NextLink>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                )}
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    );
}

export default dynamic(() => Promise.resolve(AdminMessages), { ssr: false });
