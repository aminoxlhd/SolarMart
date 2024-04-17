import React, { useContext } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
  Switch,
  Badge,
  Button,
  Menu,
  MenuItem,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid,
  Collapse,
  useTheme,
  FormControlLabel,
  InputBase,
  TextField,

} from '@material-ui/core';
import useStyles from '../utils/styles';
import { Store } from '../utils/Store';
import { getError } from '../utils/error';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect } from 'react';
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from "react-icons/io";
import { IoLocationSharp, IoTimeSharp } from "react-icons/io5";
import { RiSearchLine } from "react-icons/ri";

import { IoMenuSharp } from "react-icons/io5";
import { IoMenuOutline } from "react-icons/io5";

import { FaPhoneAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { RiShoppingCartLine } from "react-icons/ri";
import { RiMenuFill } from "react-icons/ri";
// import { IoMenuSharp  } from "react-icons/io";




import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { styled } from '@mui/material/styles';
import { Autocomplete } from '@mui/material';

import Styles from '../styles/Footer.module.css'

export default function Layout({ metaImage, title, description, children }) {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith('/admin');
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;
  const theme = createMuiTheme({
    typography: {
      h1: {
        fontSize: '1.6rem !important',
        fontWeight: '400 !important',
        margin: '1rem 0',
        color: darkMode ? '#00A0BC' : '#006a7d',
        textWrap: 'nowrap',
      },
      h2: {
        fontSize: '2rem !important',
        fontWeight: '600 !important',
        margin: '1rem 0',
        color: darkMode ? '#00A0BC' : '#006a7d',

      },
      h3: {
        fontSize: '1.2rem',
        // fontWeight: 300,
        margin: '1rem 0',
        textAlign: 'left',
        color: darkMode ? '#00A0BC' : '#006a7d',
        textWrap: 'nowrap',
      },
      p: {
        textAlign: 'center',
        color: darkMode ? '#FFFFFF' : '#909090',
      }
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#00A0BC',
      },
      secondary: {
        main: '#dc3545',
      },
    },
  });

  const classes = useStyles();

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const sidebarOpenHandler = () => {
    setSidebarVisible(true);
  };

  const sidebarCloseHandler = () => {
    setSidebarVisible(false);
  };

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        console.error(getError(err));
      }
    };

    fetchCategories();
  }, []);

  // footer solutions
  const [browseCategories, setBrowseCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/browseCategories');
        setBrowseCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const [query, setQuery] = useState('');

  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);

  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const loginMenuCloseHandler = (e) => {
    setAnchorEl(null);
  };

  const productsClickHandler = (e) => {
    setAnchorEl2(e.currentTarget);
  };
  const productsMenuCloseHandler = (e) => {
    setAnchorEl2(null);
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    Cookies.remove('shippinhAddress');
    Cookies.remove('paymentMethod');
    router.push('/');
  };

  const [open, setOpen] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClickUser = () => {
    setOpenUser(!openUser);
  };

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));
  return (
    <div>
      <Head>
        <title>{title ? `${title} | SOLAR MART` : 'SOLAR MART'}</title>
        <meta property="og:type" content="website"></meta>

        {title && (
          <>
            <meta property="og:title" content={`${title} | SOLAR MART`}></meta>
            <meta name="twitter:title" content={`${title} | SOLAR MART`}></meta>
          </>
        )}
        {description && (
          <>
            <meta name="description" content={description}></meta>
            <meta property="og:description" content={description}></meta>
            <meta name="twitter:description" content={description}></meta>
          </>
        )}

        {metaImage && (
          <>
            <meta property="og:image" content={metaImage} ></meta>
            <meta name="twitter:image" content={metaImage}></meta>
          </>
        )}

      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>

          <div className={classes.navbar}>

            <Box display="flex" alignItems="center">

              <NextLink href="/" passHref>
                <Link className={classes.brand}>
                  <Typography component="h1" className={classes.brandSolar}>SOLAR </Typography>{" "}
                  <Typography component="h1" className={classes.brandMart}> MART</Typography>{" "}
                </Link>
              </NextLink>
            </Box>
            {/* SIDE BAR */}
            <Drawer
              anchor="right"
              open={sidebarVisible}
              onClose={sidebarCloseHandler}
              className={classes.sideBar}
              PaperProps={{ style: { minWidth: '340px' } }}
            >
              <Box
                display="flex"
                justifyContent="end"
                alignItems="center"
              >

                <IconButton
                  aria-label="close"
                  onClick={sidebarCloseHandler}
                  className={classes.sideBarMenuButton}
                  variant="a"
                  component="a"
                >
                  <IoMdClose className={classes.menuButtonCloseIcon} />
                </IconButton>
              </Box>
              <List
                component="nav"
              >

                <NextLink
                  href="/"
                  passHref
                >
                  <ListItem
                    button
                    component="a"
                  >

                    <ListItemText
                    onClick={sidebarCloseHandler}
                     primary={
                      <Typography variant="a" className={classes.sideBarText}>
                        Acceuil
                      </Typography>
                    }></ListItemText>
                  </ListItem>
                </NextLink>

                <ListItem
                  button
                  component="a"
                  onClick={handleClick}>
                  <ListItemText
                   primary={
                    <Typography variant="a" className={classes.sideBarText}>
                      Produits
                    </Typography>
                  }></ListItemText>
                  {open ? <ExpandLess variant="a" className={classes.expandIcon} /> : <ExpandMore variant="a" className={classes.expandIcon} />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>

                    <NextLink
                      href="/search"
                      passHref
                    >
                      <ListItem
                        className={classes.categoryListItem}
                        button
                        component="a"
                      >

                        <ListItemText
                        onClick={sidebarCloseHandler}
                        primary={
                          <Typography variant="a" className={classes.sideBarText}>
                            Tout les produits
                          </Typography>
                        }></ListItemText>
                      </ListItem>
                    </NextLink>
                    {categories && categories.map((category) => (
                      <NextLink
                        key={category}
                        href={`/search?category=${category}`}
                        passHref
                      >
                        <ListItem
                          className={classes.categoryListItem}
                          button
                          component="a"
                        >
                          <ListItemText
                          onClick={sidebarCloseHandler}
                            PaperProps={{ style: { marginLeft: '8px' } }}
                            primary={
                              <Typography variant="a" className={classes.sideBarText}>
                                {category}
                              </Typography>
                            }></ListItemText>

                        </ListItem>
                      </NextLink>
                    ))}
                  </List>
                </Collapse>

                <NextLink
                  href="/search?isOffer=true"
                  passHref
                >
                </NextLink>
                <NextLink
                  href="/#sectionId"
                  passHref
                >
                  <ListItem
                    button
                    component="a"
                  >
                    <ListItemText
                    onClick={sidebarCloseHandler}
                      primary={
                        <Typography variant="a" className={classes.sideBarText}>
                          About Us
                        </Typography>
                      }></ListItemText>
                  </ListItem>
                </NextLink>

                <NextLink
                  href="/contact-us"
                  passHref
                >
                  <ListItem
                    button
                    component="a"
                  >
                    <ListItemText
                    onClick={sidebarCloseHandler}
                      primary={
                        <Typography variant="a" className={classes.sideBarText}>
                          Contact Us
                        </Typography>
                      }></ListItemText>
                  </ListItem>
                </NextLink>

                {userInfo && (
                  <>
                    <ListItem
                      button
                      component="a"
                      onClick={handleClickUser}>
                      <ListItemText
                        PaperProps={{ style: { marginLeft: '8px' } }}
                        primary={
                          <Typography variant="a" className={classes.sideBarText}>
                            {userInfo.name}
                          </Typography>
                        }></ListItemText>

                      {openUser ? <ExpandLess className={classes.expandIcon} /> : <ExpandMore className={classes.expandIcon} />}
                    </ListItem>
                    <Collapse in={openUser} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {userInfo.isAdmin ? (
                          <NextLink
                            href='/admin/dashboard'
                            passHref
                          >
                            <ListItem
                              button
                              component="a"
                              className={classes.categoryListItem}
                            >

                              <ListItemText
                              onClick={sidebarCloseHandler}
                                PaperProps={{ style: { marginLeft: '8px' } }}
                                primary={
                                  <Typography variant="a" className={classes.sideBarText}>
                                    Dashboard
                                  </Typography>
                                }></ListItemText>
                            </ListItem>
                          </NextLink>
                        ) : (
                          <NextLink
                            href='/admin/orders'
                            passHref
                          >
                            <ListItem
                              button
                              component="a"
                              className={classes.categoryListItem}
                            >


                              <ListItemText
                              onClick={sidebarCloseHandler}
                                PaperProps={{ style: { marginLeft: '8px' } }}
                                primary={
                                  <Typography variant="a" className={classes.sideBarText}>
                                    Orders
                                  </Typography>
                                }></ListItemText>
                            </ListItem>
                          </NextLink>

                        )}
                        <ListItem
                          button
                          component="a"
                          className={classes.categoryListItem}
                          
                        >

                          <ListItemText
                            onClick={logoutClickHandler}
                            PaperProps={{ style: { marginLeft: '8px' } }}
                            primary={
                              <Typography variant="a" className={classes.sideBarText}>
                                Logout
                              </Typography>
                            }></ListItemText>
                        </ListItem>
                        
                      </List>
                    </Collapse>
                  </>
                )}

              </List>
            </Drawer>

            {/* NAV LINKS */}
            <List className={classes.navLinks}>
              <NextLink href="/" passHref>
                <Link>
                  <Button>
                    <Typography className={classes.navLinkText}>
                      Home
                    </Typography>
                  </Button>
                </Link>
              </NextLink>
              <>
                <Button
                  aria-controls="simple-menu-product"
                  aria-haspopup="true"
                  onClick={productsClickHandler}
                  className={classes.navbarButton}
                >
                  <Typography className={classes.navLinkText}>
                    Products
                  </Typography>
                </Button>
                <Menu
                  id="simple-menu-product"
                  anchorEl={anchorEl2}
                  keepMounted
                  open={Boolean(anchorEl2)}
                  onClose={productsMenuCloseHandler}
                >
                  <NextLink
                    href="/search"
                    passHref
                  >
                    <ListItem
                      button
                      component="a"
                    >
                      <ListItemText primary='Tout les produits'></ListItemText>
                    </ListItem>
                  </NextLink>
                  {categories && categories.map((category) => (
                    <NextLink
                      key={category}
                      href={`/search?category=${category}`}
                      passHref
                    >
                      <ListItem
                        button
                        component="a"
                      >
                        <ListItemText primary={category}></ListItemText>
                      </ListItem>
                    </NextLink>
                  ))}
                </Menu>
              </>

              <NextLink href="/#sectionId" passHref>
                <Link>
                  <Button>

                    <Typography className={classes.navLinkText}>
                      About Us
                    </Typography>
                  </Button>
                </Link>
              </NextLink>
              <NextLink href="/contact-us" passHref>
                <Link>
                  <Button>
                    <Typography className={classes.navLinkText}>
                      Contact Us
                    </Typography>
                  </Button>
                </Link>
              </NextLink>

              {userInfo && (
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginClickHandler}
                    className={classes.navbarButton}
                  >
                    <Typography className={classes.navLinkText}>
                      {userInfo.name}
                    </Typography>
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    {userInfo.isAdmin ? (

                      <NextLink
                        href='/admin/dashboard'
                        passHref
                      >
                        <ListItem
                          button
                          component="a"
                        >
                          <ListItemText primary='Dashboard'></ListItemText>

                        </ListItem>
                      </NextLink>
                    ) : (
                      <NextLink
                        href='/admin/orders'
                        passHref
                      >
                        <ListItem
                          button
                          component="a"
                        >
                          <ListItemText primary={
                            <Typography className={classes.navLinkText}>
                              Logout
                            </Typography>
                          }></ListItemText>

                        </ListItem>
                      </NextLink>

                    )}
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>

                </>
              )}
            </List>

            <div className={classes.navLinkSM}>

              <List >
                <IconButton
                  aria-label="open drawer"
                  onClick={sidebarOpenHandler}
                  className={classes.menuButton}
                >
                  <IoMenuSharp className={classes.menuButtonOpenIcon} />
                </IconButton>
              </List>
            </div>

          </div>
          <div className={classes.secondNav}>
            <List className={classes.leftOption}>
              <FormControlLabel
                control={
                  <MaterialUISwitch
                    className={classes.switchThemeSideBar}

                    checked={darkMode}
                    onChange={darkModeChangeHandler} />
                }
              />
            </List>
            <List className={classes.rightOption}>
              <NextLink href="/cart" passHref>
                <Link>
                  {cart.cartItems.length > 0 ? (
                    <Badge
                      color="secondary"
                      badgeContent={cart.cartItems.length}
                    >
                      <IconButton
                        className={classes.menuButton}
                      >
                        <RiShoppingCartLine className={classes.shoppingIcon} />
                      </IconButton>
                    </Badge>
                  ) : (
                    <IconButton
                      className={classes.menuButton}
                    >
                      <RiShoppingCartLine className={classes.shoppingIcon} />
                    </IconButton>
                  )}
                </Link>
              </NextLink>
            </List>
          </div>

        </div>


        {/* MAIN */}
        <Container className={classes.main}>{children}</Container>

        {/* FOOTER */}
        {!isAdminRoute ? (

          <footer className={`${classes.footer} ${Styles.footer}`}>
            <Grid container className={classes.footerContainer} >

              <Grid item >
                <h3>Our Solutions</h3>
                <List>
                  {browseCategories && browseCategories.map((category) => (
                    <NextLink
                      key={category._id}
                      href={`/search?category=${category.category}`}
                      passHref
                    >
                      <ListItem
                        button
                        component="a"
                      >
                        <ListItemText
                          primary={
                            <Typography className={classes.primaryText}>
                              {category.category}
                            </Typography>
                          } />
                      </ListItem>
                    </NextLink>
                  ))}
                </List>
              </Grid>
              <Grid item >
                <h3>Social Media</h3>
                <List>
                  <NextLink
                    href="https://facebook.com"
                    passHref
                  >
                    <ListItem
                      button
                      component="a"
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <IoLogoFacebook className={classes.footerIcon} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography className={classes.primaryText}>
                            Facebook page
                          </Typography>
                        } />
                    </ListItem>
                  </NextLink>

                  <NextLink
                    href="https://instagram.com"
                    passHref
                  >
                    <ListItem
                      button
                      component="a"
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <IoLogoInstagram className={classes.footerIcon} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography className={classes.primaryText}>
                            Instagram page
                          </Typography>
                        } />
                    </ListItem>
                  </NextLink>

                  <NextLink
                    href="https://twitter.com"
                    passHref
                  >
                    <ListItem
                      button
                      component="a"
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <IoLogoTwitter className={classes.footerIcon} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography className={classes.primaryText}>
                            Twitter page
                          </Typography>
                        } />
                    </ListItem>
                  </NextLink>

                </List>
              </Grid>

              <Grid item >
                <h3>Find Us</h3>
                <List>

                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <IoLocationSharp className={classes.footerIcon} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography className={classes.primaryText}>
                          Adresse
                        </Typography>
                      }
                      secondary={
                        <Typography className={classes.secondaryText}>
                          203 Hay Arrabie Route d'universite Oujda Morocco
                        </Typography>
                      }
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <IoTimeSharp className={classes.footerIcon} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography className={classes.primaryText}>
                          Schedule
                        </Typography>
                      }
                      secondary={
                        <Typography className={classes.secondaryText}>
                          Monday - Sunday de 9h à 17h
                        </Typography>
                      }
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <FaPhoneAlt className={classes.footerIcon} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography className={classes.primaryText}>
                          Phone Number
                        </Typography>
                      }
                      secondary={
                        <Typography className={classes.secondaryText}>
                          06 06 06 06 06
                        </Typography>
                      }
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <MdEmail className={classes.footerIcon} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography className={classes.primaryText}>
                          Email
                        </Typography>
                      }
                      secondary={
                        <Typography className={classes.secondaryText}>
                          example@email.com
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>

            </Grid>
            {/* Copyright Notice */}
            <div className={Styles.footerCopyright}>
              <p>
              © 2024 SolarMart specializes in solar energy solutions and services for individuals, businesses, and communities seeking sustainable alternatives.
              </p>
            </div>
            &nbsp;&nbsp;&nbsp;
          </footer>

        ) : (
          <div>
            <p className={classes.textCenter}>
            © 2024 SolarMart specializes in solar energy solutions and services for individuals, businesses, and communities seeking sustainable alternatives.
            </p>
          </div>
        )}





      </ThemeProvider>
    </div>
  );
}


