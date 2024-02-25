import { Box,useTheme,Typography, Button } from "@mui/material";
import NavBar from "scenes/navBar";
import Slider from "scenes/widgets/slider";
import { useNavigate } from "react-router-dom";
import Footer from "scenes/footer";
import FlexBetween from "components/FlexBetween";
import { FaStar, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { useState } from "react";
import {Helmet, HelmetProvider} from "react-helmet-async";

const HomePage = () => {
  const [margin, setMargin] = useState(0);
  const navigate = useNavigate();
  const {palette} = useTheme();
  const restos = useSelector((state) => state.restos);
  let url = 'https://myfood-54i9.onrender.com/assets/'
  
  
  return <Box>
    <HelmetProvider>
      <Helmet>
          <title>MyFood | Home</title>
      </Helmet>
    </HelmetProvider>
    <NavBar/>
    <Slider/>
    <Box width={'80%'} m={'30px auto'} p={'0 10px'} overflow={'hidden'}  position={'relative'}>
      <FlexBetween mb={'20px'}>
        <Typography fontSize={'20px'}>Best Restaurants</Typography>
        <Button
          sx= {{p : '5px 10px', border:`1px solid ${palette.primary.main}`, borderRadius:'20px'}}
          onClick={()=> navigate("/TopRestaurants")}
        >
          See All
        </Button>
      </FlexBetween>
      <Button sx={{
          display: margin === 0 ? 'none' : 'block',
          position:'absolute',
          left:'0px',
          bottom:'10px',
          width:'50px',
          height:'335px',
          background: 'linear-gradient(90deg, rgba(238,238,238,0.756827731092437) 0%, rgba(238,238,238,0.39548319327731096) 35%, rgba(211,205,207,0.05934873949579833) 100%)',
          color:'white',
          fontSize:'20px',
          transition: '0.5s',
          '&:hover' : {
            background: 'linear-gradient(90deg, rgba(233,30,99,0.8408613445378151) 0%, rgba(233,30,99,0.5775560224089635) 35%, rgba(233,30,99,0.05934873949579833) 100%)',
            color:'white',
          },
          
          }}
          onClick={() => setMargin(margin-1)}
        >
          <FaChevronLeft/>
        </Button> 
      <Box 
        display={'flex'} 
        width={'300%'} 
        gap={'20px'} 
        flexWrap={'nowrap !important'} 
        marginLeft={`${-300 * margin}px`} 
        sx={{transition:'0.5s'}}
        p={'10px'}
      >
      
        {
          restos.map((rest, i) => {
            if (i < 10) {
              return (
                <Box 
                  width={'300px'}
                  minWidth={'300px'} 
                  height={'335px'} 
                  borderRadius={'5px'} 
                  key={i.toString()}
                  boxShadow={'0 2px 4px rgb(45 51 63 / 20%);'} 
                  onClick={() => window.location.href =`/restaurant/${rest._id}`}
                  sx={{
                    transition:'0.3s',
                    '&:hover' : {
                      transform: 'translateY(-5px)'
                    }
                  }}
                >
                  <img src={url + rest.picturePath} alt={rest.name} width={'100%'} height={'200px'} style={{borderRadius:'5px 5px 0 0'}}/>
                  <Box p={'20px 20px 20px'} bgcolor={palette.background.alt} borderRadius={'0 0 5px 5px'}>
                    <Typography mb={'10px'}>{rest.name}</Typography>
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
            }
            return <></>
          })
        }
        
      </Box>
      <Button sx={{
          display: margin === 7 ? 'none' : 'block',
          position:'absolute',
          right:'0',
          bottom:'10px',
          width:'50px',
          height:'335px',
          background: 'linear-gradient(90deg, rgba(211,205,207,0.05934873949579833) 0%, rgba(238,238,238,0.39548319327731096) 35%, rgba(238,238,238,0.756827731092437) 100%)',
          color:'white',
          fontSize:'20px',
          transition: '0.5s',
          '&:hover' : {
            background: 'linear-gradient(90deg, rgba(233,30,99,0.05934873949579833) 0%, rgba(233,30,99,0.5775560224089635) 35%, rgba(233,30,99,0.8408613445378151) 100%)',
            color:'white',
          }
          }}
          onClick={() => setMargin(margin+1)}
        >
          <FaChevronRight/>
        </Button> 
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
  </Box>

}
export default HomePage;