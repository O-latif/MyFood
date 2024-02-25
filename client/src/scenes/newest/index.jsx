import { Box,useTheme,useMediaQuery,Typography, Button } from "@mui/material";
import NavBar from "scenes/navBar";
import { useNavigate } from "react-router-dom";
import Footer from "scenes/footer";
import { FaStar} from 'react-icons/fa';

import { useEffect, useState } from "react";
import {Helmet, HelmetProvider} from "react-helmet-async";

const Newest = () => {
  const navigate = useNavigate();
  const {palette} = useTheme();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  
  let url = 'https://myfood-54i9.onrender.com/assets/';
  const [restos, setRestos] = useState([]);

  const getNewestRestos = async () => {
    const response = await fetch('https://myfood-54i9.onrender.com/newest', {
      method: "GET",
    });
    const data = await response.json();
    setRestos(data)
    console.log(data.length)
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=> {getNewestRestos()}, []);

  return <>
  <HelmetProvider>
    <Helmet>
        <title>MyFood | Newest Restaurants</title>
    </Helmet>
  </HelmetProvider>
  <NavBar/>
  <Box 
    display={'flex'} 
    width={isNonMobile ? '80%' : '100%'} 
    gap={'20px'} 
    flexWrap={'wrap'} 
    margin={'0 auto'}  
    justifyContent={'center'}
    sx={{transition:'0.5s'}}
  >
      <Typography variant="h1" className="h1" mt={'30px'}> Newest Restaurants In MyFood : </Typography>
      <Box 
        display={'flex'} 
        justifyContent={'center'}
        width={'100%'} 
        gap={'20px'} 
        flexWrap={'wrap'} 
        sx={{transition:'0.5s'}}
        p={'10px'}
      >
      
        {
          restos.map((rest, i) => (
                <Box 
                  width={'300px'}
                  minWidth={'300px'} 
                  height={'335px'} 
                  borderRadius={'5px'} 
                  key={i}
                  boxShadow={'0 2px 4px rgb(45 51 63 / 20%);'} 
                  onClick={() => window.location.href =`https://myfood-54i9.onrender.com/restaurant/${rest._id}`}
                  sx={{
                    cursor:'pointer',
                    position:'relative',
                    transition:'0.3s',
                    '&:hover' : {
                      transform: 'translateY(-5px)'
                    },
                    '&::before' : {
                      content:'"New"',
                      position:'absolute',
                      top:'0',
                      left:'-15px',
                      width:'100px',
                      height:'30px',
                      bgcolor:palette.primary.main,
                      color:'white',
                      display:'flex',
                      justifyContent:'center',
                      alignItems:'center',
                      border:'solid 15px transparent',
                      borderLeftColor: palette.background.default
                    },
                    '&::after' : {
                      content:'""',
                      position:'absolute',
                      top:'0',
                      left:'85px',
                      width:'0',
                      height:'30px',
                      color:'white',
                      display:'flex',
                      justifyContent:'center',
                      alignItems:'center',
                      border:'solid 15px transparent',
                      borderLeftColor:palette.primary.main
                    }
                  }}
                >
                  <img src={url + rest.picturePath} alt={rest.name} width={'100%'} height={'200px'} style={{borderRadius:'5px 5px 0 0'}}/>
                  <Box p={'20px 20px 20px'} bgcolor={palette.background.alt} borderRadius={'0 0 5px 5px'}>
                    <Typography mb={'10px'} variant="h5" fontWeight={'bold'}>{rest.name}</Typography>
                    {[...Array(5)].map((star, i) => {
                      const value = i + 1;
                      return (
                        
                          <label key={i}>
                            <input 
                              type="radio" 
                              name="rating" 
                              value={value} 
                            />
                            <FaStar 
                              className="star" 
                              size={30} 
                              color={value <= (Math.round(rest.moyen)) ? '#ffc107' : '#e4e5e9'}
                              
                            />
                          </label>
                        )
                    })
                    }
                    <Typography mt={'10px'}>{rest.city}</Typography>
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

export default Newest;