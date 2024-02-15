/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavBar from "scenes/navBar";
import Form from "./Form";
import Footer from "scenes/footer";
import {Helmet, HelmetProvider} from "react-helmet-async";


const AddRestoPage = () =>{
  const theme = useTheme();
  const alt = theme.palette.background.alt;
  const primaryLight = theme.palette.primary.light;
  const primaryMain = theme.palette.primary.main;
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return <>
    <HelmetProvider>
      <Helmet>
          <title>MyFood | Add Restaurant</title>
      </Helmet>
    </HelmetProvider>
    <NavBar/>
    <Box
      width={isNonMobileScreens ? '80%' : '100%'}
      m={'0 auto 50px'}
      p={'2rem'}
    >
      <Typography
        variant="h2"
        fontWeight={'500'}
        position={'relative'}
        pb={'20px'}
        m={'50px 0'}
        sx={{
          "&::after" : {
            content: '""',
            position : 'absolute',
            bottom:'0',
            right:'0',
            width:'45%',
            height: '0.5px',
            backgroundColor : "#444" 
          },
          "&::before" : {
            content: '""',
            position : 'absolute',
            bottom:'0',
            left:'0',
            width:'55%',
            height: '2px',
            backgroundColor : primaryMain 
          },
          
        }}
      >
        Register Your Restaurant
      </Typography>
      <Form/>
    </Box>
    <Footer/>
  </>

}

export default AddRestoPage;