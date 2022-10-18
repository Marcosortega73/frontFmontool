import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Img } from "../styles-components/Layout";
import siteEnConstruccion from "../assets/images/generales/SitioEnConstruccion.png";
const SitioEnConstruccion = () => {
  return (
    <>
      <Container maxWidth="sm" sx={{
          backgroundColor:"#292c31",
          width:"100%",
          height:"100%",
          
          }}>
        <Box
          sx={{
            width: "100%",
            height: '100%',
            backgroundColor: "primary.dark",
            mt: "25px",
            "&:hover": {
              backgroundColor: "primary.main",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <Img alt="complex" src={siteEnConstruccion} />
        </Box>
      </Container>
    </>
  );
};

export default SitioEnConstruccion;
