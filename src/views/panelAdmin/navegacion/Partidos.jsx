import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import {
  Button,
  Container,
  Input,
  Paper,
  Slide,
  Snackbar,
  styled,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
//AddCircleIcon
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DialogComponentTorneos from "./common/DialogComponentTorneos";
import DialogComponentTemporada from "./common/DialogComponentTemporada";
import { useDispatch, useSelector } from "react-redux";
import { getTorneos } from "../../../redux/torneoSlice";
import { EditNotifications } from "@mui/icons-material";
import FixtureServices from "../../../services/api/fixture/fixtureService";
import { useSnackbar } from 'notistack';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f5f5f5",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  borderRadius: "5px",
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Partidos() {
  const columns = [
    {
      field: "num_fecha",
      headerName: "Fecha",
      flex: 1,
      description: "Numero de fecha del partido",
    },
    {
      field: "local",
      headerName: "Local",
      minWidth: 200,
      description: "Equipo Local",
      renderCell: (params) => {
        return (
          <Tooltip title={params.value.nombre}>
            <span>{params.value.nombre}</span>
          </Tooltip>
        );
      },
    },
    {
      field: "visitante",
      headerName: "Visitante",
      minWidth: 200,
      renderCell: (params) => {
        return (
          <Tooltip title={params.value.nombre}>
            <span>{params.value.nombre}</span>
          </Tooltip>
        );
      },
      description: "Equipo Visitante",
      //solo tipo numero
    },

    {
      field: "goles_local",
      headerName: "Goles Local",
      minWidth: 113,
      editable: true,
      valueGetter: (params) => {
        return params?.row.goles_local != null ? params.row.goles_local : "-";
      },
      description: "Goles del equipo local",
      type: "number",
    },
    {
      field: "goles_visitante",
      headerName: "Goles Visitante",
      minWidth: 117,
      editable: true,
      valueGetter: (params) => {
        return params?.row?.goles_local != null
          ? params.row.goles_visitante
          : "-";
      },
      description: "Goles del equipo visitante",
      type: "number",
    },
    {
      field: "Torneo",
      headerName: "Torneo",
      minWidth: 150,
      valueGetter: (params) => {
        return params?.value?.nombre;
      },
      description: "Torneo al que pertenece el partido",
    },
    {
      field: "estado",
      headerName: "Estado",
      minWidth: 150,
      valueGetter: (params) => {
        return params?.row?.estado != null ? params.row.estado : "Por jugar";
      },
      description: "Estado del partido",
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      disableReorder: true,
      getActions: (params) => [
        <GridActionsCellItem icon={<EditNotifications />} label="Edit" />,
      ],
      flex: 1,
    },
  ];

  const { enqueueSnackbar } = useSnackbar();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDialogTemp, setOpenDialogTemp] = React.useState(false);
  const [action, setAction] = React.useState(null);
  const [partidosData, setPartidosData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState("");

  const [pageSize, setPageSize] = React.useState(5);

  const handleDialogTemporada = () => {
    setOpenDialogTemp(true);
    setAction("create");
  };
  const handleDialogTorneo = () => {
    setAction("create");
    setOpenDialog(!openDialog);
  };

  const getPartidos = async () => {
    setLoading(true);
    const response = await FixtureServices.getFixtureService();
    setPartidosData(response?.fixture);
    setLoading(false);
  };

  const handleCellEditCommit = async (params, event) => {
    const { id, field, value } = params;
    const formData = {
      id,
      field,
      value,
    };
    const response = await FixtureServices.updateFixtureService(formData);
    console.log(response?.partidoCompleto);

    if (response?.status === 200) {
      console.log("actualizado");
      enqueueSnackbar(response.message, { 
        variant: 'success'});
      getPartidos();
    } else {
      enqueueSnackbar(response.message, { 
        variant: 'error'});
    }
    getPartidos();
    
  };

  React.useEffect(() => {
    getPartidos();
  }, []);
  
/*   const handleCloseSnack = () => {
    setSnackBarOpen(false);
  }; */

  console.log("partidosData aqui", partidosData);

  return (
    <>
      <Container
        sx={{
          height: "50%",
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
                Partidos
              </Typography>
              {/*  <Box>
                <Tooltip title="Agregar Temporada">
                  <Button
                    sx={{ mr: 2 }}
                    variant="contained"
                    onClick={handleDialogTemporada}
                    endIcon={<AddCircleIcon />}
                  >
                    Crear temporada
                  </Button>
                </Tooltip>
                <Tooltip title="Agregar torneo">
                  <Button
                    variant="contained"
                    onClick={handleDialogTorneo}
                    endIcon={<AddCircleIcon />}
                  >
                    Crear torneo
                  </Button>
                </Tooltip>
              </Box> */}
            </div>
          </Toolbar>

          <DataGrid
            rows={partidosData}
            columns={columns}
            loading={loading}
            pageSize={pageSize}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            disableExtendRowFullWidth
            disableColumnMenu
            autoHeight
            disableSelectionOnClick
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            components={{ Toolbar: GridToolbar }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
            onCellEditCommit={(params, event) =>
              handleCellEditCommit(params, event)
            }
          />
        </Item>
      </Container>
    </>
  );
}
