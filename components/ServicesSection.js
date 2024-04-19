import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTools } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import { RiHomeGearFill } from 'react-icons/ri';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Styles from '../styles/Services.module.css';

export default function ServicesSection() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('data/servicesSection.json');
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className={Styles.container}>
            <div className={Styles.servicesTitle}>
                <h2>A Comprehensive Service</h2>
            </div>
        </div>
    );
}

function ServiceSection({ service, index }) {
    const controls = useAnimation();
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return (
        <motion.div
            className={Styles.section}
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 50 },
            }}
            transition={{ duration: 0.5 }}
        >
            <div className={Styles.iconContainer}> 
                {index === 0 && <RiHomeGearFill />}
                {index === 1 && <FaTools />}
                {index === 2 && <FaGear />}
            </div>
            <div className={Styles.description}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
            </div>
        </motion.div>
    );
}
