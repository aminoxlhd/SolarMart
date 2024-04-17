import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import React, { useEffect, useContext, useReducer, useState, useCallback, useMemo } from 'react';
import { IoIosCloseCircle } from "react-icons/io";
import styles from "../../../styles/EditProduct.module.css";

import {
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  ListItemText,
  TextField,
  CircularProgress,
  Radio,
  IconButton,
  Divider,
  Box,
} from '@material-ui/core';
import { getError } from '../../../utils/error';
import { Store } from '../../../utils/Store';
import Layout from '../../../components/Layout';
import useStyles from '../../../utils/styles';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useDropzone } from 'react-dropzone';
import { Autocomplete } from '@material-ui/lab';
import Image from 'next/image';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true, errorUpdate: '' };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, errorUpdate: '' };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
}

function CategoryEdit({ params }) {
  const categoryId = params.id;

  const [imagesUrls, setImagesUrls] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState("");
  const { state } = useContext(Store);
  const [{ loading, error, loadingUpdate }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });




  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const classes = useStyles();
  const { userInfo } = state;




  const style = useMemo(
    () => ({
      ...(isDragAccept ? { borderColor: "#00e676" } : {}),
      ...(isDragReject ? { borderColor: "#ff1744" } : {}),
    }),
    [isDragAccept, isDragReject]
  );

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    } else if (userInfo && !userInfo.isAdmin) {
      router.push('/admin/profile');
    } else {
      const fetchData = async () => {

        try {
          dispatch({ type: 'FETCH_REQUEST' });
          const { data } = await axios.get(`/api/admin/featuredCategories/${categoryId}`, {
            headers: { authorization: `Bearer ${userInfo.token}` },
          });

          dispatch({ type: 'FETCH_SUCCESS' });
          setSelectedImages([data.image]);
          setImagesUrls(data.image);
          setCategory(data.category);
          setValue('description', data.description);

        } catch (err) {
          dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
        }
      };
      fetchData();
    }
  }, [categoryId]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/products/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setImagesUrls("")
      setSelectedImages([acceptedFiles[0]]);
    }
  }, [selectedImages]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

  const handleImageDelete = (index) => {
    setSelectedImages([]);
    setImagesUrls("");

  };


  const uploadImages = async () => {
    if (selectedImages.length === 0) {
      enqueueSnackbar('Veuillez sélectionner au moins une image', { variant: 'error' });
      return;
    }
    try {
      const formData = new FormData();
      selectedImages.forEach((image) => {
        formData.append("file", image);
      });
      const response = await axios.post("/api/admin/upload", formData);

      setImagesUrls(response.data.imageUrls[0]);
      enqueueSnackbar("L'image a été téléchargée avec succès", { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Échec du téléchargement', { variant: 'error' });
      return;
    }
  }

  const submitHandler = async ({
    description,
  }) => {
    closeSnackbar();
    if (!imagesUrls) {
      enqueueSnackbar('Veuillez télécharger au moins une image', { variant: 'error' });
      return;
    }
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/admin/featuredCategories/${categoryId}`,
        {
          category,
          image: imagesUrls,
          description,
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: 'UPDATE_SUCCESS' });
      enqueueSnackbar('Catégorie modifiée avec succès', { variant: 'success' });
      router.push('/admin/featuredCategories');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  const handleCategoryChange = (event, newValue) => {
    setCategory(newValue);

  };



  return (
    <Layout title={`Modifier la catégorie ${categoryId}`}>
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
                    <ListItem selected button component="a">
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
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h1" variant="h1">
                  Change the category
                </Typography>
              </ListItem>
              <ListItem>
                {loading && <CircularProgress></CircularProgress>}
                {error && (
                  <Typography className={classes.error}>{error}</Typography>
                )}
              </ListItem>
              <ListItem>
                <form
                  onSubmit={handleSubmit(submitHandler)}
                  className={classes.form}
                >
                  <List>
                    <ListItem>
                      <Autocomplete
                        disableFreeSolo
                        id="categories"
                        options={categories}
                        // value={category}
                        onChange={handleCategoryChange}
                        fullWidth
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Catégories"
                            onChange={(e) => setCategory(e.target.value)}
                          />
                        )}
                      />
                    </ListItem>

                    <ListItem>
                      <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            multiline
                            id="description"
                            label="Description"
                            error={Boolean(errors.description)}
                            helperText={
                              errors.description
                                ? 'La description est un champ obligatoire'
                                : ''
                            }
                            {...field}
                          ></TextField>
                        )}
                      ></Controller>
                    </ListItem>

                    <ListItem>
                      <div className={styles.dropzone} {...getRootProps({ style })}>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                          <p>Drop the image here ...</p>
                        ) : (
                          <p>Drag and drop the image here, or click to select an image.</p>
                        )}
                      </div>
                    </ListItem>

                    <ListItem>
                      <div className={styles.images}>
                        {selectedImages.length > 0 &&
                          selectedImages.map((image, index) => {
                            return (
                              <div key={index}>

                                {image instanceof Blob ? (
                                  <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Product Image ${index}`}
                                    width={80}
                                    height={80}
                                  />
                                ) : (
                                  <img
                                    src={image}
                                    alt={`Product Image ${index}`}
                                    width={80}
                                    height={80}
                                  />
                                )}

                                <IconButton
                                  className={styles.deletePreview}
                                  onClick={() => handleImageDelete(index)}
                                >
                                  <IoIosCloseCircle />
                                </IconButton>

                              </div>
                            )
                          })}
                      </div>
                    </ListItem>
                    <Box sx={{ marginBottom: 2 }}>
                      <ListItem >
                        <Button
                          variant="contained"
                          color="primary"
                          type='button' onClick={uploadImages}>
                          Upload to Cloudinary
                        </Button>
                      </ListItem>
                    </Box>
                    <ListItem>
                      <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        color="primary"
                        disabled={!imagesUrls}
                      >
                        Edit
                      </Button>
                      {loadingUpdate && <CircularProgress />}
                    </ListItem>

                  </List>
                </form>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout >
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: { params },
  };
}

export default dynamic(() => Promise.resolve(CategoryEdit), { ssr: false });