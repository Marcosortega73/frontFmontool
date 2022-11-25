import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { Divider, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Img } from "../../../styles-components/Layout";
import EquipoLogo from "../../../assets/images/logos/LogoVisitante.png";
import Silueta from "../../../assets/images/persons/jugador-de-futbol.png";
import TorneoLogo from "../../../assets/images/entherprise/logoSuperliga.png";
import dashboardService from "../../../services/api/otros/dashboardService";
import ManagersDashboard from "./ManagersDashboard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const [countData, setCountData] = React.useState({
    jugadores: 0,
    equipos: 0,
    torneos: 0,
  });

  const getDataDashboard = async () => {
    const response = await dashboardService.getdataDashboardService();
    setCountData(response.data);

    console.log(response.data);
  };

  React.useEffect(() => {
    getDataDashboard();
  }, []);


  return (
    <>
      <Toolbar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={12} md={12}>
            <Item sx={{ backgroundColor: "secondary.main" }}>
              <Typography variant="h4" component="div" gutterBottom>
                Bienvenido {user.email}
              </Typography>
            </Item>
          </Grid>
          <Grid xs={12} md={4}>
            <Item sx={{ backgroundColor: "customTheme.acento500" }}>
              <Box sx={{display:"flex", alignItems:"center" , justifyContent:"space-around"}}>
                <Img width={123} height={"auto"} src={EquipoLogo} />
                <Box>
                  <Typography
                    variant="h4"
                    component="div"
                    gutterBottom
                    sx={{ color: "customTheme.acento200" }}
                  >
                    {countData.equipos}
                  </Typography>
                  <Typography variant="h6" component="div" gutterBottom sx={{color:"customTheme.acento200"}}>
                    Equipos cargados
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{my:1}} />

              <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Link to="/panelAdministracion/equipos">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: 1,
                      "&:hover": {
                        color: "primary.main",
                        cursor: "pointer",
                        backgroundColor: "primary.light",
                        borderRadius: "5px",
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      gutterBottom
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        pr: "5px",
                        color: "customTheme.acento200",
                      }}
                    >
                      Ver equipos
                    </Typography>
                    <ArrowCircleRightIcon />
                  </Box>
                </Link>
              </Box>
            </Item>
          </Grid>
          <Grid xs={12} md={4}>
            <Item sx={{ backgroundColor: "customTheme.acento500" }}>
              <Box sx={{display:"flex", alignItems:"center" , justifyContent:"space-around"}}>
                <Img width={135} height={"auto"} src={Silueta} />
                <Box>
                  <Typography
                    variant="h4"
                    component="div"
                    gutterBottom
                    sx={{ color: "customTheme.acento200" }}
                  >
                    {countData.jugadores}
                  </Typography>
                  <Typography variant="h6" component="div" gutterBottom sx={{color:"customTheme.acento200"}}>
                    Jugadores cargados
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{my:1}} />

              <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Link to="/panelAdministracion/jugadores">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: 1,
                      "&:hover": {
                        color: "primary.main",
                        cursor: "pointer",
                        backgroundColor: "primary.light",
                        borderRadius: "5px",
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      gutterBottom
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        pr: "5px",
                        color: "customTheme.acento200",
                      }}
                    >
                      Ver jugadores
                    </Typography>
                    <ArrowCircleRightIcon />
                  </Box>
                </Link>
              </Box>
            </Item>
          </Grid>
          <Grid xs={12} md={4}>
            <Item sx={{ backgroundColor: "customTheme.acento500" }}>
              <Box sx={{display:"flex", alignItems:"center" , justifyContent:"space-around"}}>
                <Img width={129} height={"auto"} src={TorneoLogo} />
                <Box>
                  <Typography
                    variant="h4"
                    component="div"
                    gutterBottom
                    sx={{ color: "customTheme.acento200" }}
                  >
                    {countData.torneos}
                  </Typography>
                  <Typography variant="h6" component="div" gutterBottom sx={{color:"customTheme.acento200"}}>
                    Torneos cargados
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{my:1}} />

              <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Link to="/panelAdministracion/torneos">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: 1,
                      "&:hover": {
                        color: "primary.main",
                        cursor: "pointer",
                        backgroundColor: "primary.light",
                        borderRadius: "5px",
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      gutterBottom
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        pr: "5px",
                        color: "customTheme.acento200",
                      }}
                    >
                      Ver torneos
                    </Typography>
                    <ArrowCircleRightIcon />
                  </Box>
                </Link>
              </Box>
            </Item>
          </Grid>
          <Grid xs={12} md={8}>
            <Item sx={{backgroundColor:"customTheme.acento500"}}>
              <ManagersDashboard />
              <Divider />
              
              <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Link to="/panelAdministracion/usuarios">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: 1,
                      "&:hover": {
                        color: "primary.main",
                        cursor: "pointer",
                        backgroundColor: "primary.light",
                        borderRadius: "5px",
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      gutterBottom
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        pr: "5px",
                        color: "customTheme.acento200",
                      }}
                    >
                      Ver usuarios
                    </Typography>
                    <ArrowCircleRightIcon />
                  </Box>
                </Link>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
