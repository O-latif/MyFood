/* eslint-disable no-unused-vars */
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import LoginPage from "scenes/loginPage";
import AddRestoPage from "scenes/addRestoPage";
import Restaurant from "scenes/restaurant";
import TopRestaurants from "scenes/TopRestaurants";
import Cities from "scenes/cities";
import CityRestos from "scenes/cityRestos";
import Newest from "scenes/newest";
import Map from "scenes/map";
import Credits from "scenes/credits";


function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Routes>
          <Route path="/" element= {<LoginPage/>}/>
          <Route path="/Home" element= {<HomePage/>}/>
          <Route path="/TopRestaurants" element= {<TopRestaurants/>}/>
          <Route path="/AddRestaurant" element= {<AddRestoPage/>}/>
          <Route path="/cities" element= {<Cities/>}/>
          <Route path="/cities/:name" element= {<CityRestos/>}/>
          <Route path="/newest" element= {<Newest/>}/>
          <Route path="/map" element= {<Map/>}/>
          <Route path="/credits" element= {<Credits/>}/>
          <Route
              path="/restaurant/:resId"
              element={<Restaurant/>}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
