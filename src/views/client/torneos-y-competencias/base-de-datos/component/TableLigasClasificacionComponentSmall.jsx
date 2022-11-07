import * as React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Box, Container, Toolbar, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import "./TableLigasClasificacion.css";

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
  {
    field: "posicion",
    headerName: "Pos",
    width: 73,
    description: "Posicion en la tabla de posiciones",
    valueGetter: (params) => {
      return params.row?.Clasificacion?.posicion;
    },
    align: "left",
    headerAlign: "center",
    headerClassName: "headerClass",
  },

  {
    field: "nombre_corto",
    headerName: "Nombre",
    flex: 1,
    headerClassName: "headerClass",
  },
  {
    field: "puntos",
    headerName: "Puntos",
    width: 73,
    valueGetter: (params) => {
      return params.row?.Clasificacion?.puntos;
    },
    align: "center",
    headerClassName: "headerClass",
    headerAlign: "center",
  },
];

export default function TableLigasClasificacionComponent({ equipos, liga }) {
  console.log("EQUIPOS TABLE CLASIFICACION", equipos);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
        headerHeight={43}
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
        className="tableClasificacion"
      />
    </Box>
  );
}
