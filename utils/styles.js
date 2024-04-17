import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({

  navbar: {
    zIndex: 1100,
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    width: "100%",
    padding: '0 15px',
    height: '10vh',
    minHeight: '10vh',
    position: 'fixed',
    top: '0',
    left: '0',
    boxShadow: '0px 1px 2px -1px rgba(0,0,0,0.1), 0px 2px 3px 0px rgba(0,0,0,0.07), 0px 0px 5px 0px rgba(0,0,0,0.05) !important',
  },

  navLinks: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  navLinkText: {
    color: '#002654',
    marginLeft: 5,
    letterSpacing: "0.1em",
    fontWeight: '500 !important',
    fontSize: '1.2em',
    textTransform: 'capitalize',
  },

  brand: {
    display: "flex",
    whiteSpace: "nowrap",
    textDecoration: 'none !important',
  },
  brandSolar: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: "#ED2939",
  },
  brandMart: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: "#002654",
    marginLeft: '4px'
  },
  sideBar: {
    minWidth: '300px',
  },
  categoryListItem: {
    paddingLeft: "40px",
  },
  expandIcon: {
    marginRight: '15px',
    fontSize: '2em',
  },
  sideBarText: {
    letterSpacing: '0.1em',
    fontWeight: '300 !important',
    textTransform: 'capitalize',
  },
  navLinkSM: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      alignItems: 'center',
      height: '10vh',
    },
  },

  secondNav: {
    zIndex: 1100,
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    width: "100%",
    padding: '0 15px 0 20px',
    height: '10vh',
    minHeight: '10vh',
    position: 'fixed',
    top: '10vh',
    left: '0',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',

  },
  leftOption: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    // width: '20%',
  },
  searchSection: {
    display: 'flex',
    width: '50%',
    alignItems: 'center',
  },
  rightOption: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  },

  sideBarMenuButton: {
    margin: "15px 15px 0 0",
  },
  searchIcon: {
    color: '#002654',
    fontSize: '1em',
  },
  shoppingIcon: {
    color: '#002654',
    fontSize: '1.1em',
  },
  menuButtonCloseIcon: {
    fontSize: '1.1em',
  },
  menuButtonOpenIcon: {
    color: '#002654',
    fontSize: '1.2em',
  },
  bannerContainer: {
    width: '100%',
    marginBottom: '20px',
  },
  bannerImg: {
    objectFit: 'cover',
    width: '100%',
    height: 'auto',
    borderRadius: '5px',
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    minHeight: '80vh',
    marginTop: '23vh',
    marginBottom: '20px',
  },
  carouselContainer: {
    width: '100%',
    // height: ''
    marginBottom:"30px",
    // backgroundColor:'green',
  },
  carousel: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  carouselImage: {
    width: '100%',
    height: '50%',
  },


  productCarouselContainer: {
    margin: 'auto',
    marginBottom: '20px',
  },

  categoryCard: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  browseCategories: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  cardMedia: {
    height: 'auto',
    width: '100%',
    objectFit: 'cover',
  },
  cardContent: {
    height: 200,
    overflow: 'hidden',
  },
  categoryButton: {
    marginTop: 'auto',
    marginLeft:"15px",
  },



  categoryCardContent: {
    padding: ' 0 30px !important',
  },

  footer: {
    marginTop: 10,
    textAlign: 'center',
    height: '80vh',
    backgroundColor: '#001519',
    padding: "20px 20px",

    marginTop: "30px",
    overflowY: "hidden",
    [theme.breakpoints.down('md')]: {
      height: 'auto',
      margin: 'auto',

    },

  },
  footerContainer: {
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

  },
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
  form: {
    width: '100%',
    maxWidth: 800,
    margin: '0 auto',
  },
  transparentBackgroud: {
    backgroundColor: 'transparent',
  },
  error: {
    color: '#f04040',
  },
  fullWidth: {
    width: '100%',

  },
  categoryBox: {
    width: '100%',
    [theme.breakpoints.down('md')]: {
      minWidth: '200px',
    }
  },
  results: {
    [theme.breakpoints.down('md')]: {
      marginLeft: '15px',
    }
  },
  searchContainer: {
    marginTop: '1rem',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',

    },
  },
  reviewForm: {
    maxWidth: 800,
    width: '100%',
  },
  reviewItem: {
    marginRight: '1rem',
    borderRight: '1px #808080 solid',
    paddingRight: '1rem',
  },
  mt1: { marginTop: '1rem' },

 
  sendButton: {
    height: '50px',
    marginTop: '10px',
  },
  sendIcon: {
    fontSize: "1.5em",
    marginLeft: '10px'
  },
  searchForm: {
    border: '1px solid #f2f2f2',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: '45px',
  },
  searchInput: {
    flex: 1,
    padding: '10px',
    color: '#002654',
    '&::placeholder': {
      color: '#002654',
    },
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  iconButton: {
    backgroundColor: 'transparent',
    padding: '10px',
    borderRadius: "0 10px 10px 0",
    marginLeft: '-1px',
    '& span': {
      color: '#002654',
    },
  },



  sort: {
    marginRight: 5,
  },

  fullContainer: { height: '100vh' },
  mapInputBox: {
    position: 'absolute',
    display: 'flex',
    left: 0,
    right: 0,
    margin: '10px auto',
    width: 300,
    height: 40,
    '& input': {
      width: 250,
    },
  },
  text: {
    lineHeight: 1.15,
    fontSize: '1.3em',
  },

  textCenter: {
    textAlign: 'center',    
  },
  mb2: {
    marginBottom: '20px'
  },
  footerIcon: {
    color: '#001519',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#d5d5d5',
  },
  contactUsText: {
    lineHeight: "1.5",
    fontSize: "0.8",
    textAlign: 'center',
    fontWeight: 200,
  },
}));
export default useStyles;

