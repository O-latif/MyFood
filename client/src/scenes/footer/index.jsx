import { Box, Typography, useTheme} from "@mui/material";
import '../../css/Footer.css';
// import CloseIcon from '@mui/icons-material/xtwitter';

import { FaFacebook, FaGithub, FaInstagram, FaLinkedin} from 'react-icons/fa';

const Footer = () => {
  const { palette } = useTheme();

  return (
    <Box
    p={'50px'}
    bgcolor={palette.primary.main}
    display={'flex'}
    justifyContent={'center'}
    flexWrap={'wrap'}
    position={'relative'}
    > 
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>
      <ul style={{display:'flex', gap: '10px', fontSize:'30px', listStyle:'none', padding:'0', width:'100%', justifyContent:'center',color:'white'}}>
        <li className="li"><FaFacebook/></li>
        <li className="li"><FaInstagram/></li>
        <li className="li"><FaLinkedin/></li>
        <li className="li"><FaGithub/></li>
      </ul>
      <ul style={{display:'flex', gap: '10px', fontSize:'30px', listStyle:'none', padding:'0', width:'100%', justifyContent:'center',color:'white'}}>
        <li className="li">
          <a href="/Home" style={{fontSize:'16px',color:'white', textDecoration:'none'}}>Home</a>
        </li>
        <li className="li">
          <a href="/TopRestaurants" style={{fontSize:'16px',color:'white', textDecoration:'none'}}>Top Restaurants</a>
        </li>
        <li className="li">
          <a href="/cities" style={{fontSize:'16px',color:'white', textDecoration:'none'}}>Cities</a>
        </li>
        <li className="li">
          <a href="/new" style={{fontSize:'16px',color:'white', textDecoration:'none'}}>New</a>
        </li>
        <li className="li">
          <a href="/map" style={{fontSize:'16px',color:'white', textDecoration:'none'}}>Map</a>
        </li>
        <li className="li">
          <a href="/credits" style={{fontSize:'16px',color:'white', textDecoration:'none'}}>Credits</a>
        </li>
      </ul>
      <Typography color='white'>&copy;2023 Fi_Tal | All Rights Reserved</Typography>
    </Box>
  )
}

export default Footer;