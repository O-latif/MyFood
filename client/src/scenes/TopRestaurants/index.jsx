
import { Box,useTheme,Typography, Button } from "@mui/material";
import NavBar from "scenes/navBar";
import { useNavigate } from "react-router-dom";
import Footer from "scenes/footer";

import { FaStar } from 'react-icons/fa';
import { useSelector } from "react-redux";
import '../../css/topRes.css';
import {Helmet} from "react-helmet";

const TopRestaurants = () => {
  const navigate = useNavigate();
  const {palette} = useTheme();
  const restos = useSelector((state) => state.restos);
  let url = '/assets/'
  

  return <Box>
    <Helmet>
        <meta charSet="utf-8" />
        <title>MyFood | Top Restaurants</title>
        <link rel="canonical" href="http://example.com/example" />
    </Helmet>
    <NavBar/>
    <Box width={'80%'} m={'30px auto'} p={'0 10px'} overflow={'hidden'}>
      
      <Typography variant="h1" className="h1">Top Restaurants : </Typography>
      <p style={{width:'100%',color:palette.neutral.mediumMain, fontWeight:'bold', fontSize:'20px', textAlign:'center', marginBottom:'20px'}}>This Is The List Of Top 10 Restaurants in MyFood</p>
      <Box display={'flex'} width={'100%'} gap={'20px'} flexWrap={'wrap'} sx={{transition:'0.5s'}}>
      
        {
          restos.map((rest, i) =>  {
            return (
              <Box
                className={'resto'}
                // width={'100%'}
                // height={'200px'}
                key={i}
                onClick={() => window.location.href = `http://localhost:3000/restaurant/${rest._id}`}
                // display={'flex'}
                
              >
                <Box width={'450px'} height={'100%'}>
                  <img src={url + rest.picturePath} alt={rest.name} width={'100%'} height={'100%'} />
                </Box>
                <Box
                  p={'20px 20px 20px'}
                  bgcolor={palette.background.alt}
                  width={'100%'}
                >
                  <Typography variant="h5" fontWeight={'bold'} mb={'10px'}>{rest.name}</Typography>
                  {[...Array(5)].map((star, i) => {
                    const value = i + 1;
                    return (

                      <label key={i}>
                        <input
                          type="radio"
                          name="rating"
                          value={value} />
                        <FaStar
                          className="star"
                          size={30}
                          color={value <= (Math.round(rest.moyen)) ? '#ffc107' : '#e4e5e9'} />
                      </label>
                    );
                  })}
                  <Typography mt={'10px'}>{rest.city}</Typography>
                  <Box mt={'20px'}>
                    {(rest.tags).map((tag, index) => (
                      <div className="tag" key={index}>
                        {tag}
                      </div>
                    ))}
                  </Box>
                </Box>

              </Box>


            );
          })
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
  </Box>
}
export default TopRestaurants;