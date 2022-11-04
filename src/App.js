import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./components/navbar/menu/Navbar";

//PRUEBA PARA DESABILITAR NAV BAR
import { useDispatch } from "react-redux";
import { getRegiones } from "./redux/regionesSlice";
import Footer from "./components/templates/Footer";
import { Box, Container, Toolbar, Typography } from "@mui/material";

import ImgBg from "./assets/images/imagenes/home-bg.jpg";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getRegiones());
  }, [dispatch]);

  //PRUEBA PARA DESABILITAR NAV BAR

  return (
    <>
    <Container  maxWidth="100vw" sx={{px:"0px !important",overflowX:"hidden"}}>
    <Box sx={{backgroundColor:"red"}}>
       <header
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#1A2027",
        }}
      >
      <Navbar />
      </header> 
    </Box>
    <Box component="section" >
      <Outlet />
    </Box>
    <Box component="footer" maxWidth={"100vw !important"} >
      <Footer />
    </Box>
    </Container>
    </>
   

  
  );
}

export default App;
