import { Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import React from "react";
import FixtureComponent from "../../client/torneos-y-competencias/base-de-datos/component/FixtureComponent";
import TableLigasClasificacionComponent from "../../client/torneos-y-competencias/base-de-datos/component/TableLigasClasificacionComponent";
import TableLigasClasificacionComponentSmall from "../../client/torneos-y-competencias/base-de-datos/component/TableLigasClasificacionComponentSmall";

const ContenedorLigas = ({ torneo }) => {
  const [equipos, setEquipos] = React.useState([]);
  const [progress, setProgress] = React.useState(false);

  React.useEffect(() => {
    setProgress(true);
    setEquipos(torneo?.Equipos);
    setProgress(false);
  }, [torneo]);

  return (
    <Box  sx={{ width: "100%", height: "100%",display:"flex",justifyContent:"center" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            color="customTheme.acento200"
            component="div"
            align="center"
          >
            {torneo?.nombre} - {torneo?.Season.nombre}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: "primary.main",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              borderRadius: 3,
            }}
          >
            <Toolbar
              sx={{
                backgroundColor: "primary.main",
                color: "#fff",
                display: "flex",
                justifyContent: "flex-start",
                minHeight: "37px !important",
                pt: 1,
                borderLeft: "5px solid #fff",
                borderTopLeftRadius: 7,
              }}
            >
              <Typography variant="h6" component="div" align="center">
                Tabla de posiciones
              </Typography>
            </Toolbar>
            <TableLigasClasificacionComponentSmall equipos={equipos} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <FixtureComponent liga={torneo} />
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}
        >
          <Button variant="contained" color="secondary">
            Ver detalles
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContenedorLigas;
