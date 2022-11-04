import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { Paper, styled } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import Logo from "../../assets/images/entherprise/logo.png";

function Copyright() {
  return (
    <Typography variant="body2" color="customTheme.secondary400">
      {"Copyright © "}
      <Link
        color="customTheme.acento200"
        href="https://mui.com/"
        sx={{
          textDecoration: "none",
        }}
      >
        | Todos los derechos reservados
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#222729",
  ...theme.typography.body2,
  /*   padding: theme.spacing(1), */
  textAlign: "center",
  color: "#E5E5E5",
  boxShadow: "none",
}));

export default function Footer() {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "customTheme.primary700" }}>
      <Grid container zeroMinWidth={true} sx={{p:3}}>
        <Grid xs={12} md={5} lg={4}>
          <Item
            sx={{
              backgroundColor: "customTheme.primary700",
            }}
          >
            <img width={173} height={173} src={Logo} alt="logo" />

            <Typography variant="body2" color="customTheme.acento200">
              Comunidad de habla hispana de Football Manager. Creadores de la
              SuperLiga de las Américas.
            </Typography>
          </Item>
        </Grid>
        <Grid container xs={12} md={7} lg={8} spacing={2}>
          <Grid xs={6} lg={3}>
            <Item>
              <Box
                id="category-a"
                sx={{ fontSize: "12px", textTransform: "uppercase" }}
              >
                Category A
              </Box>
              <Box
                component="ul"
                aria-labelledby="category-a"
                sx={{ pl: 2, listStyle: "none" }}
              >
                <li>Link 1.2</li>
                <li>Link 1.3</li>
              </Box>
            </Item>
          </Grid>
          <Grid xs={6} lg={3}>
            <Item>
              <Box
                id="category-b"
                sx={{ fontSize: "12px", textTransform: "uppercase" }}
              >
                Category B
              </Box>
              <Box
                component="ul"
                aria-labelledby="category-b"
                sx={{ pl: 2, listStyle: "none" }}
              >
                <li>Link 2.1</li>
                <li>Link 2.2</li>
                <li>Link 2.3</li>
              </Box>
            </Item>
          </Grid>
          <Grid xs={6} lg={3}>
            <Item>
              <Box
                id="category-c"
                sx={{ fontSize: "12px", textTransform: "uppercase" }}
              >
                Category C
              </Box>
              <Box
                component="ul"
                aria-labelledby="category-c"
                sx={{ pl: 2, listStyle: "none" }}
              >
                <li>Link 3.1</li>
                <li>Link 3.2</li>
                <li>Link 3.3</li>
              </Box>
            </Item>
          </Grid>
          <Grid xs={6} lg={3}>
            <Item>
              <Box
                id="category-d"
                sx={{ fontSize: "12px", textTransform: "uppercase" }}
              >
                Atribuciones
              </Box>
              <Box
                component="ul"
                aria-labelledby="category-d"
                sx={{ pl: 2, listStyle: "none",color:"#e5e5e5" }}
              >
                <li>
                  <a href="https://www.flaticon.es/" title="iconos">
                    Iconos creados por Flat Icons - Flaticon
                  </a>
                </li>
                <li><a href="https://www.flaticon.es/iconos-gratis/firma" title="firma iconos">Firma iconos creados por smalllikeart - Flaticon</a></li>
                <li>Link 4.3</li>
              </Box>
            </Item>
          </Grid>
        </Grid>
        {/* <Grid
          xs={12}
          container
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ xs: "column", sm: "row" }}
          sx={{ fontSize: "12px" }}
        >
          <Grid sx={{ order: { xs: 2, sm: 1 } }}>
            <Item>© Copyright</Item>
          </Grid>
          <Grid container columnSpacing={1} sx={{ order: { xs: 1, sm: 2 } }}>
            <Grid>
              <Item>Link A</Item>
            </Grid>
            <Grid>
              <Item>Link B</Item>
            </Grid>
            <Grid>
              <Item>Link C</Item>
            </Grid>
          </Grid>
        </Grid> */}
      </Grid>

      <Box
        component="footer"
        sx={{
          py: 3,

          mt: "auto",
          backgroundColor: "#343338",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" component="p" color="customTheme.acento200">
            COMPETICIONES ONLINE FM
          </Typography>
          <Copyright />
        </Box>
      </Box>
    </Box>
  );
}
