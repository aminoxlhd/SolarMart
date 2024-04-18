
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import axios from 'axios';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import useStyles from '../utils/styles';


export default function BrowseCategories() {
    const classes = useStyles();
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('api/browseCategories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);



    return (
        <>
            {categories.length > 0 && (
                <div className='categories-section'>
                    <Typography component="h2" variant="h2" >Explore our categories</Typography>
                    <div className={classes.browseCategories}>
                        {categories.map((category, index) => (
                            <CategoriesAnimation category={category} key={category.id} index={index} />
                        ))}
                    </div>
                </div>

            )}
        </>
    );
}

function CategoriesAnimation({ category, index }) {
    const controls = useAnimation();
    const { ref, inView } = useInView();
    const classes = useStyles();

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: index % 2 === 0 ? '-100%' : '100%' },
            }}
            transition={{ duration: 0.5 }}
        >
            <Card className={classes.categoryCard}>
                <NextLink href={`search?category=${category.category}`} passHref>
                    <CardActionArea>
                        <CardMedia

                            className={classes.cardMedia}
                            component="img"
                            image={category.image}
                            title={category.category}
                        />
                        <CardContent className={classes.categoryCardContent}>
                            <Typography component='h3' variant='h3'>{category.category}</Typography>
                            <Typography>{category.description}</Typography>
                        </CardContent>
                    </CardActionArea>
                </NextLink>
                <CardActions className={classes.categoryButton}>
                    <Button
                        size="small"
                        color="primary"
                    >
                        Explorer 
                    </Button>
                </CardActions>
            </Card>
        </motion.div>
    );
}
