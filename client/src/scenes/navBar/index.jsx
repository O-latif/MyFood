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
  TextField
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
import { Formik } from "formik";
import * as yup from "yup";

const searchSchema = yup.object().shape({
  search : yup.string() 
});
const initialValuesSearch = {
  search : ""
};

const NavBar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [searchData, setSearchData] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [resul, setResul] = useState([]);
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

  const sear = async (value) => {
    const searchResponse = await fetch("http://localhost:3002/resto/sear", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({payload : value}),
      
    });
    const searchResult = await searchResponse.json();
    setResul(searchResult);
    
  };
  

  const handleChange = event => {
    
    setSearchData(event.target.value);
    sear(event.target.value);
    if (event.target.value === '') {
      setIsSearched(false);
    } else {
      setIsSearched(true);
    }
  };

  // const handleFormSubmit = async (values, onSubmitProps) => {
  //   await sear(values, onSubmitProps);
  //   // SearchGet()
  // };
  

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
        <Box position={'relative'}>
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            
                  <form>
                    <input variant='standard' name='search' type='text' placeholder='Search ... '  onChange={handleChange} style={{height:'36px', outline:'none', backgroundColor:'transparent',padding:'5px 10px', color:neutralNav, border:'none'}} />
                    <IconButton onClick={() => sear(searchData)}>
                      <Search/>
                    </IconButton>
                  </form>

            
          </FlexBetween>
          <Box 
            width={'100%'}  
            maxHeight='200px'
            bgcolor={theme.palette.background.alt} 
            position={'absolute'} 
            zIndex={'3'}
            borderBottom={'3px solid'}
            borderColor={theme.palette.primary.main}
            sx={{
              height:'fit-content',
              overflowX:'hidden',
              overflowY:'scroll',
              '&::-webkit-scrollbar': {
                width: '10px'
              },
              
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.primary.main,
                outline: '1px solid slategrey'
              },
              display : `${isSearched ? 'block': 'none'}`
              
            }}
            
          >
            <Box 
              bgcolor={theme.palette.background.default}
              borderTop={'1px solid'}
              borderColor={theme.palette.primary.main}
            >

              { resul.length > 1 ? (
                
                resul.map(r => {
                  return (<Box
                            onClick={() => window.location.href = `/restaurant/${r._id}`}
                            sx={{
                              cursor:'pointer',
                              transition:'0.3s',
                              '&:hover':{
                                bgcolor:alt
                              }
                              
                            }}
                          >
                    <Typography
                      p={'10px'}
                      pb='3px'
                      fontSize='16px'
                    >
                      {r.name}
                    </Typography>
                    <Box
                      display='flex'
                      flexDirection='row'
                      pl='12px'
                    >
                      <Typography pt='5px' color={theme.palette.neutral.mediumMain}>
                            Tags : 
                        </Typography>
                      {r.tags.map(t => {
                        return (<>
                          <Typography p={'5px 10px'} color={theme.palette.neutral.mediumMain}>
                            {t}
                          </Typography>
                          
                        </>
                        )
                      })}
                    </Box> 
                  </Box> 
                  )
                })) : (
                  <Typography
                    p={'10px'}
                    pb='3px'
                    fontSize='16px'
                  > NO RESULTS FOUND</Typography>
                )
              }
              
            </Box>
          </Box>
        </Box>
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
                <a className= {document.title ===  ('MyFood | Home') ? "nav-link lighted active-tab" : "nav-link lighted"}  href="/Home" style={{fontSize:'16px', color:neutralNav}}>Home</a>
              </li>
              <li className="nav-item fullHeight">
                <a className={document.title ===  ('MyFood | Top Restaurants') ? "nav-link lighted active-tab" : "nav-link lighted"} href="/TopRestaurants" style={{fontSize:'16px', color:neutralNav}}>Top Restaurants</a>
              </li>
              <li className="nav-item fullHeight">
                <a className={document.title ===  ('MyFood | Cities') ? "nav-link lighted active-tab" : "nav-link lighted"} href="/cities" style={{fontSize:'16px', color:neutralNav}}>Cities</a>
              </li>
              <li className="nav-item fullHeight">
                <a className={document.title ===  ('MyFood | Newest Restaurants') ? "nav-link lighted active-tab" : "nav-link lighted"} href="/newest" style={{fontSize:'16px', color:neutralNav}}>New</a>
              </li>
              <li className="nav-item fullHeight">
                <a className={document.title ===  ('MyFood | Map') ? "nav-link lighted active-tab" : "nav-link lighted"} href="/map" style={{fontSize:'16px', color:neutralNav}}>Map</a>
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
                <a className= {document.title ===  ('MyFood | Home') ? "nav-link lighted active-tab" : "nav-link lighted"}  href="/Home" style={{fontSize:'16px', color:neutralNav}}>Home</a>
              </li>
              <li className="nav-item fullHeight">
                <a className={document.title ===  ('MyFood | Top Restaurants') ? "nav-link lighted active-tab" : "nav-link lighted"} href="/TopRestaurants" style={{fontSize:'16px', color:neutralNav}}>Top Restaurants</a>
              </li>
              <li className="nav-item fullHeight">
                <a className={document.title ===  ('MyFood | Cities') ? "nav-link lighted active-tab" : "nav-link lighted"} href="/cities" style={{fontSize:'16px', color:neutralNav}}>Cities</a>
              </li>
              <li className="nav-item fullHeight">
                <a className={document.title ===  ('MyFood | Newest Restaurants') ? "nav-link lighted active-tab" : "nav-link lighted"} href="/newest" style={{fontSize:'16px', color:neutralNav}}>New</a>
              </li>
              <li className="nav-item fullHeight">
                <a className={document.title ===  ('MyFood | Map') ? "nav-link lighted active-tab" : "nav-link lighted"} href="/map" style={{fontSize:'16px', color:neutralNav}}>Map</a>
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