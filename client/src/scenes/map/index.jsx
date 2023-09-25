import { Box,useTheme,Typography, Button } from "@mui/material";
import NavBar from "scenes/navBar";
import { useNavigate } from "react-router-dom";
import Footer from "scenes/footer";
import { GoogleMap,useLoadScript, MarkerF } from "@react-google-maps/api";
// import { useEffect, useState } from "react";
import '../../css/map.css';
import {Helmet} from "react-helmet";


const Map = () => {
  const navigate = useNavigate();
  const {palette} = useTheme();

  const {isLoaded} = useLoadScript({googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY});
  if (!isLoaded) return (<p>Loading ...</p>)
  return <>
  <Helmet>
      <meta charSet="utf-8" />
      <title>MyFood | Map</title>
      <link rel="canonical" href="http://example.com/example" />
  </Helmet>
  <NavBar/>
  <Box>
  <div className="map">
    
    <GoogleMap zoom={5} center={{lat:28.0339,lng:1.6596}} mapContainerClassName="map-container">
      <MarkerF position={{lat:35.6987,lng:0.0058}}/>
      <MarkerF position={{lat:35.6980,lng:0.2646}}/>
      <MarkerF position={{lat:35.6984,lng:0.3427}}/>
      <MarkerF position={{lat:35.6985,lng:0.4109}}/>
    </GoogleMap>
    
  </div>

  </Box>
  {/* Restaurant Owner  */}
  <Box bgcolor={palette.background.alt} p={'50px 0'} textAlign={'center'} color={palette.neutral.nav}>
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

export default Map;