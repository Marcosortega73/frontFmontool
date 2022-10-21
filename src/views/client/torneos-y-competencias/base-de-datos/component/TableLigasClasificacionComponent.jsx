import * as React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Box, Container, Toolbar, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f5f5f5",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  borderRadius: "5px",
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const columns = [
  //posicion
  { field: "posicion", headerName: "Pos", minWidth: 50,
    description: "Posicion en la tabla de posiciones",
    valueGetter: (params) => {
      return params.row?.Clasificacion?.posicion;
    }
     },
    
 
  { field: "nombre", headerName: "Nombre", minWidth: 300,},
  {
    field: "puntos",
    headerName: "Puntos",
    minWidth: 73,
    valueGetter: (params) => {
      return params.row?.Clasificacion?.puntos;
    },
    flex: 1,
  },
  {
    field: "partidos_jugados",
    headerName: "PJ",
    minWidth: 50,
    valueGetter: (params) => {
      return params.row?.Clasificacion?.partidos_jugados;
    },
  },
  {
    field: "partidos_ganados",
    headerName: "PG",
    minWidth: 50,
    valueGetter: (params) => {
      return params.row?.Clasificacion?.partidos_ganados;
    },
  },
  {
    field: "partidos_empatados",
    headerName: "PE",
   minWidth: 50,
    valueGetter: (params) => {
      return params.row?.Clasificacion?.partidos_empatados;
    },
    sortComparator: (v1, v2, param1, param2) => {
      return v1 - v2;
    },
  },
  {
    field: "partidos_perdidos",
    headerName: "PP",
   minWidth: 50,
    valueGetter: (params) => {
      return params.row?.Clasificacion?.partidos_perdidos;
    },
  },
  {
    field: "goles_favor",
    headerName: "GF",
   minWidth: 50,
    valueGetter: (params) => {
      return params.row?.Clasificacion?.goles_favor;
    },
  },
  {
    field: "goles_contra",
    headerName: "GC",
   minWidth: 50,
    valueGetter: (params) => {
      return params.row?.Clasificacion?.goles_contra;
    },
  },
  {
    field: "diferencia_goles",
    headerName: "DIF",
   minWidth: 50,

    valueGetter: (params) => {
      return params.row?.Clasificacion?.diferencia_goles;
    },
  },
];

export default function TableLigasClasificacionComponent({ equipos }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(equipos?.length);

  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("puntos");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log("EQUIPOS TABLE CLASIFICACION", equipos);

  return (
    <Container
      sx={{
        height: "100%",
        width: "100%",
        pt: 7,
        backgroundColor: "primary.main",
      }}
    >
      <Item sx={{ height: "100%" }}>
        <Toolbar
          variant="dense"
          sx={{
            backgroundColor: "secondary.main",
            px: 0,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              height: "100%",
              px: 32,
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, pr: 3, textAlign: "start", fontWeight: 700 }}
            >
              Liga
            </Typography>
          </div>
        </Toolbar>

        <DataGrid
          rows={equipos}
          columns={columns}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          disableExtendRowFullWidth
          hideFooter
          initialState={{
            pinnedColumns: {
              left: ["partidos_jugados"],
            },
          }}
          rowHeight={33}

          autoHeight
          disableSelectionOnClick
          disableColumnMenu
          components={{ Toolbar: GridToolbar }}
           sortModel={[
            {
              field: "posicion",
              sort: "asc",
            },
          ]} 
    


        />
      </Item>
    </Container>

    /*    </Paper> */
  );
}
