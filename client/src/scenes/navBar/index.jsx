/* eslint-disable no-unused-vars */
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  DarkMode,
  LightMode,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import './../../index.css';


const NavBar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user) || '';
  const isNonMobileScreens = useMediaQuery("(min-width: 1016px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryMain = theme.palette.primary.main;
  const primaryLight = theme.palette.primary.light;
  const neutralNav = theme.palette.neutral.nav;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  return <>
  <FlexBetween backgroundColor={alt}>
    <FlexBetween width={'40%'} margin={'0'} padding={'0.75rem'}>
      
        
        <Typography
          mr={'10px'}
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          MyFood
        </Typography>
        
      
      {isNonMobileScreens && (
        <FlexBetween
          backgroundColor={neutralLight}
          borderRadius="9px"
          gap="3rem"
          padding="0.1rem 1.5rem"
        >
          <InputBase placeholder="Search..." />
          <IconButton>
            <Search />
          </IconButton>
        </FlexBetween>
      )}
    </FlexBetween>
    {/* DESKTOP NAV */}
    {isNonMobileScreens ? (
      <div className="container head" style={{width : 'fit-content', margin:'0'}}>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid fullHeight">
          <div className="collapse navbar-collapse fullHeight" id="navbarNav">
            <ul className="navbar-nav fullHeight">
              <li className="nav-item fullHeight">
                <a className="nav-link lighted" href="/Home" style={{fontSize:'16px', color:neutralNav}}>Home</a>
              </li>
              <li className="nav-item fullHeight">
                <a className="nav-link lighted" href="/TopRestaurants" style={{fontSize:'16px', color:neutralNav}}>Top Restaurants</a>
              </li>
              <li className="nav-item fullHeight">
                <a className="nav-link lighted" href="/cities" style={{fontSize:'16px', color:neutralNav}}>Cities</a>
              </li>
              <li className="nav-item fullHeight">
                <a className="nav-link lighted" href="/new" style={{fontSize:'16px', color:neutralNav}}>New</a>
              </li>
              <li className="nav-item fullHeight">
                <a className="nav-link lighted" href="/map" style={{fontSize:'16px', color:neutralNav}}>Map</a>
              </li>
              <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
                {user === '' ? (
                  <Button style={{
                    backgroundColor: primaryMain,
                    color: 'white',
                    marginLeft:'20px',
                    padding:'0 1.5rem',
                    fontSize:'14px'
                  }}
                    onClick={() => navigate('/')}
                  >
                    Login
                  </Button>
                ):(
          <FormControl variant="standard" value={user.firstName} style={{
            marginLeft:'20px',
            fontSize:'14px'
          }}>
            <Select
              value={user.firstName}
              sx={{
                backgroundColor: neutralLight,
                width: "fit-content",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={user.firstName}>
                <Typography>{user.firstName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
                )}
              
              
            </ul>
            
          </div>
        </div>
      </nav>
      
    </div> 
      ) : (
        <IconButton 
          style={{marginRight:'10px'}}
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}
    
    {/* MOBILE NAV */}
    {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
          transition="0.5s"
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="1.5rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <ul className="navbar-nav fullHeight"  style={{textAlign:'center'}}>
              <li className="nav-item fullHeight">
                <a className="nav-link lighted" href="#Articles" style={{fontSize:'18px', marginBottom:'5px'}}>Home</a>
              </li>
              <li className="nav-item fullHeight">
                <a className="nav-link lighted" href="#Articles" style={{fontSize:'18px', marginBottom:'5px'}}>Top Restaurants</a>
              </li>
              <li className="nav-item fullHeight">
                <a className="nav-link lighted" href="#Articles" style={{fontSize:'18px', marginBottom:'5px'}}>Cities</a>
              </li>
              <li className="nav-item fullHeight">
                <a className="nav-link lighted" href="#Gallery" style={{fontSize:'18px', marginBottom:'5px'}}>New</a>
              </li>
              <li className="nav-item fullHeight">
                <a className="nav-link lighted" href="#Features" style={{fontSize:'18px', marginBottom:'5px'}}>Map</a>
              </li>
              
                {user === '' ? (
                  <Button style={{
                    backgroundColor: primaryMain,
                    color: 'white',
                    
                    padding:'0 1.5rem',
                    fontSize:'14px'
                  }}
                    onClick={() => navigate('/')}
                  >
                    Login
                  </Button>
                ):(
          <FormControl variant="standard" value={'fullName'} style={{
            marginLeft:'20px',
            fontSize:'14px'
          }}>
            <Select
              value={user.firstName}
              sx={{
                backgroundColor: neutralLight,
                width: "fit-content",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={user.firstName}>
                <Typography>{user.firstName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
                )}
              
              
            </ul>
          </FlexBetween>
        </Box>
      )}
    
  </FlexBetween>
  </>
}

export default NavBar;