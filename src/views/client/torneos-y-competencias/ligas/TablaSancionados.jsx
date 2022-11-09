import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const TablaSancionados = ({ equipo_id }) => {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nombre", headerName: "Nombre", width: 130 },
  ];

  console.log("equipo_idequipo_id", equipo_id);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
        {/*   <DataGrid

            sx={{
              boxShadow: 2,
              border: 2,
              color: "customTheme.acento200",
              borderColor: "primary.light",
              "& .MuiDataGrid-cell:hover": {
                color: "secondary.main",
              },
            }}
            rows={jugadores}
            columns={columns}
            disableSelectionOnClick
          /> */}
        </div>
      </div>
    </div>
  );
};

export default TablaSancionados;
