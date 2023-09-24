import { Box,useTheme,useMediaQuery,Typography, Button } from "@mui/material";
import NavBar from "scenes/navBar";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "scenes/footer";
import { FaStar} from 'react-icons/fa';

import { useEffect, useState } from "react";

const CityRestos = () => {
  const navigate = useNavigate();
  const {palette} = useTheme();
  const isNonMobile = useMediaQuery("(min-width:1000px)");

  let url = 'http://localhost:3002/assets/';
  const [restos, setRestos] = useState([]);
  const {name} = useParams();
  const getWilayaRestos = async () => {
    const response = await fetch(`http://localhost:3002/wil/${name}`, {
      method: "GET",
    });
    const data = await response.json();
    setRestos(data)
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=> {getWilayaRestos()}, []);

  return <>
  <NavBar/>
  <Box 
    display={'flex'} 
    width={isNonMobile ? '80%' : '100%'}  
    gap={isNonMobile ? '20px' : '5px'} 
    flexWrap={'wrap'} 
    margin={'0 auto'}  
    justifyContent={'center'}
    sx={{transition:'0.5s'}}
  >
      <Typography variant="h1" className="h1" mt={'30px'}> {name.charAt(0).toUpperCase() + name.slice(1)}'s Restaurants : </Typography>
      <Box 
        display={'flex'} 
        justifyContent={'center important'}
        width={'100%'} 
        gap={'20px'} 
        flexWrap={'wrap'} 
        sx={{transition:'0.5s'}}
        p={'10px'}
      >
      
        {
          restos.map((rest, i) => (
                <Box 
                  width={isNonMobile ? '300px' : '250px'}
                  minWidth={isNonMobile ? '300px' : '250px'} 
                  height={'335px'} 
                  borderRadius={'5px'} 
                  key={i}
                  boxShadow={'0 2px 4px rgb(45 51 63 / 20%);'} 
                  onClick={() => window.location.href =`http://localhost:3000/restaurant/${rest._id}`}
                  sx={{
                    cursor:'pointer',
                    transition:'0.3s',
                    '&:hover' : {
                      transform: 'translateY(-5px)'
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

export default CityRestos;