import { Link } from "react-router-dom";
import Container from "@mui/material/Container";

const NotFound = () => {
    return (
    <>
      <Container>
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


