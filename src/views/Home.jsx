import React from "react";
import { Box, Container } from "@mui/material";
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import "./styles/Home.css";
import Grid from '@mui/material/Unstable_Grid2';

import ImageBg from "../assets/images/imagenes/home-bg.jpg";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Home = () => {
  return (
    <> 

    <main>
    <div  style={{backgroundImage:`url(public/images/home-bg.jpg)`}} >
     {/*  <img src={ImageBg} alt="Imagen de fondo" className="bgImage" /> */}
    </div>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(Array(6)).map((_, index) => (
          <Grid xs={2} sm={4} md={4} key={index}>
            <Item>xs=2</Item>
          </Grid>
        ))}
      </Grid>
    </Box>
    </main>


    
    
   
    
    
    </>
  )
}

export default Home