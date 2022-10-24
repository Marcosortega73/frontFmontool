import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import {
  Button,
  Container,
  Paper,
  styled,
  TableContainer,
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

//importar translate
import translate from "../../../utils/translate/dataGridToolbar.json";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f5f5f5",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  borderRadius: "5px",
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Torneos() {
  const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      minWidth: 200,
      description: "Nombre del torneo",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },
    {
      field: "TipoTorneo",
      headerName: "Tipo",
      width: 100,
      valueGetter: (params) => {
        return params?.value?.nombre;
      },
      description: "Tipo de Torneo",
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },
    {
      field: "Continente",
      headerName: "Region",
      minWidth: 200,
      valueGetter: (params) => {
        return params?.value?.nombre;
      },
      description: "Region del Torneo",
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },
    {
      field: "total_de_equipos",
      headerName: "Equipos",
      width: 100,
      description: "Cantidad de Equipos",
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },
    {
      field: "total_grupos",
      headerName: "Grupos",
      description: "Cantidad de Grupos",
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
      minWidth: 100,
    },

    {
      field: "rondas",
      headerName: "Rondas",
      type: "date",
      width: 73,
      description: "Cantidad de Rondas",
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },
    {
      field: "Season",
      headerName: "Season",
      minWidth: 200,
      valueGetter: (params) => {
        return params?.value?.nombre;
      },
      description: "Temporada del Torneo",
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
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
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },
  ];

  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDialogTemp, setOpenDialogTemp] = React.useState(false);
  const [action, setAction] = React.useState(null);
  const [torneosData, setTorneosData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const [pageSize, setPageSize] = React.useState(5);

  const { torneos } = useSelector((state) => state.torneos);

  const handleDialogTemporada = () => {
    setOpenDialogTemp(true);
    setAction("create");
  };
  const handleDialogTorneo = () => {
    setAction("create");
    setOpenDialog(!openDialog);
  };

  React.useEffect(() => {
    setLoading(true);
    dispatch(getTorneos());
    setLoading(false);
  }, [dispatch, openDialog]);

  React.useEffect(() => {
    setLoading(true);
    setTorneosData(torneos);
    setLoading(false);
  }, [torneos, openDialog]);

  console.log("torneos aqui", torneos);

  return (
    <>
      <Box sx={{ overflow: "hidden" }}>
        <Item sx={{ m: 5 }}>
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
                Torneos
              </Typography>
              <Box>
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
              </Box>
            </div>
          </Toolbar>
          <TableContainer>
            <DataGrid
              rows={torneosData}
              columns={columns}
              loading={loading}
              pageSize={pageSize}
              disableColumnFilter
              disableColumnSelector
              disableDensitySelector
              disableExtendRowFullWidth
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
              localeText={translate}
              labelRowsPerPage={"Filas por pagina"}
              className="tableClasificacion"
              rowHeight={53}
              headerHeight={43}
            />
          </TableContainer>
        </Item>

        <DialogComponentTorneos
          open={openDialog}
          setOpen={setOpenDialog}
          action={action}
        />
        <DialogComponentTemporada
          open={openDialogTemp}
          setOpen={setOpenDialogTemp}
          action={action}
        />
      </Box>
    </>
  );
}
