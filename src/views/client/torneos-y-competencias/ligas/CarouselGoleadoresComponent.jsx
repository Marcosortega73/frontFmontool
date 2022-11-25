import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import getEstadisticasServices from "../../../../services/api/estadisticas/getEstadisticasService";
import { Chip, CircularProgress, Tooltip } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import IconPodio from "../../../../assets/images/iconos/podio.png";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,

  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,

  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,

  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,

  },
};

const CarouselGoleadoresComponent = ({ torneo }) => {
  const [goleadores, setGoleadores] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const getGoleadores = async () => {
    const data = {
      torneo: torneo,
      tipo:1,
    }
    const response = await getEstadisticasServices.getEstadisticasByTorneo(
      data
    );
    setGoleadores(response?.estadisticas);
    setLoading(false);
  };

  React.useEffect(() => {
    getGoleadores();
  }, [torneo]);

  console.log("goleadores", goleadores);

  return (
    <div className="my-own-custom-container" style={{ width: "70vw" }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Carousel
          responsive={responsive}
          autoPlay={true}
          autoPlaySpeed={3000}
          infinite={true}
          showDots={true}
          centerMode={true}
        >
         
            {goleadores.map((goleador, idx) => (
              <div key={idx}>
              <Card  sx={{ maxWidth: 300, maxHeight: "auto" }}>
                <CardMedia
                  component="img"
                  image={require("../../../../assets/images/persons/silueta.png")}
                  alt="green iguana"
                  width="73px"
                  height="73px"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {goleador.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {goleador.equipo}
                  </Typography>
                </CardContent>
                <CardActions sx={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
                  <Tooltip title="Posición">
                  <Button size="">
                    <img
                      src={IconPodio}
                      alt="icono podio"
                    />
                   <Chip size="small" sx={{ml:1}} label={
                      idx+1
                   } />
                  </Button>
                  </Tooltip>

                  <Tooltip title="Goles">
                  <Button size="">
                  <SportsSoccerIcon />
                  <Chip size="small" sx={{ml:1}} label={goleador.asistencias} />
                  </Button>
                  </Tooltip>
                </CardActions>
              </Card>
              </div>
            ))}
        </Carousel>
      )}
    </div>
  );
};

export default CarouselGoleadoresComponent;
