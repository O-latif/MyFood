import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import {Helmet, HelmetProvider} from "react-helmet-async";


const LoginPage = () => {
  const theme = useTheme();
  const alt = theme.palette.background.alt;
  const primaryLight = theme.palette.primary.light;
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  

  return <Box>
    <HelmetProvider>
      <Helmet>
          <title>MyFood | Login</title>
      </Helmet>
    </HelmetProvider>
    <Box
      width={'100%'}
      padding={'1rem'}
      bgcolor={alt}
      textAlign={'center'}
    >
      <Typography
          mr={'10px'}
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          MyFood
        </Typography>
    </Box>
    <Box
      width={isNonMobileScreens ? '50%' : '93%'}
      bgcolor={alt}
      m={'2rem auto'}
      borderRadius={'2rem'}
      padding={'2rem'}
    >
      <Typography
        variant="h5"
        fontWeight={'500'}
        textAlign={'center'}
        mb={'1.5rem'}
      >
        Welcome To The Algerian Restaurants Guide
      </Typography>
      <Form/>
    </Box>
  </Box>
}

export default LoginPage;