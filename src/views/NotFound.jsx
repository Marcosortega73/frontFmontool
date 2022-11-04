import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import { Toolbar } from "@mui/material";

const NotFound = () => {
    return (
    <>
    <Toolbar sx={{mt:1}} />
      <Container sx={{display:"flex",flexDirection:"column" ,justifyContent:"center", alignItems:"center", pb:2}}>
        <h1 style={{ color: "red", fontSize: 100 }}>404</h1>
        <h3>Pagina No Disponible</h3>
        <p>
          <Link to="/">Regresa al Home</Link>
        </p>
      </Container>
      </>
    );
  };

export default NotFound


