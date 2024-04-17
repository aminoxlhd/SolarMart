/* eslint-disable @next/next/no-img-element */
import { Typography } from '@material-ui/core';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';
import BrowseCategories from '../components/BrowseCategories';
import ServicesSection from '../components/ServicesSection';
import Map from '../components/Map/';
import Styles from '../styles/Home.module.css'


export default function Home(props) {
  const classes = useStyles();

  return (

    <Layout>



      <div className={Styles.aboutUs} id='sectionId'>

        <div className={Styles.aboutUsText}>
          <Typography component="p" variant="p" className={classes.text}  >
          Headquartered in Morocco, Solarmart is your premier destination for high-quality solar solutions tailored to meet the energy needs of homes, businesses, and industries. Our comprehensive range of products includes solar panels, batteries, and accessories, all designed to harness the power of the sun efficiently and sustainably. At Solarmart, we go beyond just selling products we offer expert installation services to ensure that your solar system is seamlessly integrated into your property, maximizing its performance and energy savings. Our team of experienced professionals is committed to providing top-notch customer service and support at every step of your solar journey.
            <br />
            <br />
            Trust Solarmart for reliable and sustainable solar solutions tailored to your needs. Join us in embracing renewable energy for a brighter, greener future.
          </Typography>
        </div>
      </div>


      <BrowseCategories />

      <ServicesSection />
      <Map />

    </Layout>
  );
}

