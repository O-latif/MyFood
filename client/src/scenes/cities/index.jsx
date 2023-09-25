import { Box,useTheme,Typography, Button } from "@mui/material";
import NavBar from "scenes/navBar";
import { useNavigate } from "react-router-dom";
import Footer from "scenes/footer";
import {Helmet} from "react-helmet";

import { useEffect, useState } from "react";


const Cities = () => {
  const navigate = useNavigate();
  const {palette} = useTheme();
  
  let url = '/assets/';
  const [wilayas, setWilayas] = useState([]);

  const getWilayas = async () => {
    const response = await fetch("/wil", {
      method: "GET",
    });
    const data = await response.json();
    setWilayas(data)
    
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=> {getWilayas()}, []);

  
  
  return <>
  <Helmet>
      <meta charSet="utf-8" />
      <title>MyFood | Cities</title>
      <link rel="canonical" href="http://example.com/example" />
  </Helmet>
  <NavBar/>
  <Box 
    display={'flex'} 
    width={'80%'} 
    gap={'20px'} 
    flexWrap={'wrap'} 
    margin={'0 auto'}  
    justifyContent={'center'}
    sx={{transition:'0.5s'}}
  >
      <Typography variant="h1" className="h1" mt={'30px'}>All Cities : </Typography>
      <Box 
        display={'flex'} 
        width={'300%'} 
        gap={'20px'} 
        flexWrap={'nowrap !important'} 
        sx={{transition:'0.5s'}}
        m={'50px'}
      >
        {
          wilayas.map((wil, i) =>  (
                <Box 
                  width={'250px'} 
                  height={'400px'} 
                  boxShadow={'0 2px 4px rgb(45 51 63 / 20%);'} 
                  borderRadius={'5px'} 
                  key={i}
                  onClick={() => window.location.href =`http://localhost:3000/cities/${wil.name}`}
                  sx={{
                    cursor:'pointer',
                    transition:'0.5s',
                    '&:hover' : {
                      transform:'translateY(-5px)'
                    }
                  }}
                >
                  <img src={url + wil.picturePath} alt={wil.name} width={'100%'} height={'340px'} style={{borderRadius:'5px 5px 0 0'}}/>
                  <Box bgcolor={palette.background.alt} borderRadius={'0 0 5px 5px'} p={'10px'} height={'60px'} display={'flex'}
                  alignItems={'center'}>
                    <Typography variant="h5" fontWeight={'bold'}>{wil.name}</Typography>
                    
                  </Box>
                  
                </Box>
              )
            )
        }
      </Box>
    </Box>
    {/* Restaurant Owner  */}
    <Box mt={'50px'} bgcolor={palette.background.alt} p={'50px 0'} textAlign={'center'} color={palette.neutral.nav}>
      <Typography variant="h1" fontWeight={'bold'}>
        Are You A Restaurant Owner ?
      </Typography>
      <Button 
      type="submit"
        sx={{
          m: "2rem 0",
          p: "1rem",
          backgroundColor: palette.primary.main,
          color: "white",
          "&:hover": {backgroundColor: palette.primary.light },
        }}
        onClick={() => navigate("/addRestaurant") }
      > Add A Restaurant </Button>
    </Box>
    <Footer/>
  </>
}

export default Cities;