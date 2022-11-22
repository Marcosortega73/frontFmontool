import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import usersManagersService from "../../../services/api/managers/usersManagerService";
import { Box, Chip, Container } from "@mui/material";
import translate from "../../../utils/translate/dataGridToolbar.json";

const ODD_OPACITY = 0.1;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: "#e5e5e5",
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha("#757575", ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        "#757575",
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          "#757575",
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            "#757575",
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));
const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: 600,
  width: "100%",
  "& .MuiFormGroup-options": {
    alignItems: "center",
    paddingBottom: theme.spacing(1),
    "& > div": {
      minWidth: 100,
      margin: theme.spacing(2),
      marginLeft: 0,
    },
  },
  
}));

const statusChip = (value) => {
  console.log(value, "STATUS");
  return (
    <Chip
      label={value.nombre}
      sx={{ backgroundColor: value.color, fontWeight: 700, color: "white" }}
    />
  );
};

export default function ManagersCliente() {
  const { data, loading } = useDemoData({
    dataSet: "Employee",
    rowLength: 200,
  });

  const [managers, setManagers] = React.useState([]);

  const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      flex: 1,
      valueGetter: (params) => {
        return params.row.nombre && params.row.apellido
          ? params.row.nombre + " " + params.row.apellido
          : "Sin datos";
      },
    },
    {
      field: "username",
      headerName: "Username",
      width: 130,
      valueGetter: (params) => {
        return params.value ? params.value : "Sin datos";
      },
    },
    {
      field: "nacimiento",
      headerName: "Edad",
      width: 130,
      valueGetter: (params) => {
        return params.row?.nacimiento
          ? new Date().getFullYear() -
              new Date(params.row.nacimiento).getFullYear()
          : "Sin datos";
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },

    {
      field: "Nacionalidad",
      headerName: "Nacionalidad",
      valueGetter: (params) => {
        return params.value?.nombre ? params.value?.nombre : "Sin datos";
      },
    },
    {
      field: "UserState",
      headerName: "Estado",
      minWidth: 200,
      renderCell: (props) => {
        return statusChip(props.value);
      },
    },
    {
      field: "Equipo",
      headerName: "Equipo",
      flex: 1,
      valueGetter: (params) => {
        return params.value?.nombre ? params.value?.nombre : "Sin datos";
      },
    },
  ];

  const getManagers = async () => {
    const response = await usersManagersService.getManagers();
    setManagers(response);
    console.log(response, "responseee");
  };

  React.useEffect(() => {
    getManagers();
  }, []);

  console.log("MANAGERS viejo ", managers);

  return (
    <Container sx={{my:3}}>
      <StyledBox >
      <StripedDataGrid loading={loading} rows={managers} columns={columns}
      className="dataTableGrid tableClasificacion"
      localeText={translate}
      disableSelectionOnClick
      rowHeight={53}
      headerHeight={43}
      components={{
        Toolbar: GridToolbar,
      }}
     
      componentsProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }} />

      </StyledBox>
    </Container>
  );
}
