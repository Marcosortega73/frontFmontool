import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Img } from "../styles-components/Layout";
import siteEnConstruccion from "../assets/images/generales/SitioEnConstruccion.png";
import { TableContainer, Toolbar, Typography } from "@mui/material";
import "./styles/EnConstruccion.css";
const SitioEnConstruccion = () => {
  return (
    <>
    <Toolbar />        
        <Box
         className="containerClass"
        >
          <TableContainer maxWidth="lg">
            <Box

              sx={{ 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "100vh",
              }}
            >
              <Typography variant="h2" component="h1" gutterBottom sx={{
                color: "white",
                fontWeight: "bold",
                textShadow: "0px 0px 10px #cca500",
              

              }}>
                Sitio en Construcción
              </Typography>
              <Typography variant="h5" component="h2" gutterBottom sx={{
                color: "white",
                fontWeight: "bold",
                textShadow: "0px 0px 10px #cca500",
              
                
              }}>
                Estamos trabajando para brindarte una mejor experiencia
              </Typography>
              
              </Box>
          </TableContainer>
        </Box>
     
    </>
  );
};

export default SitioEnConstruccion;
