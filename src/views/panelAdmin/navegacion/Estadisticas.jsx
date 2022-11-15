import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  styled,
  TableContainer,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
//AddCircleIcon
import DeleteIcon from "@mui/icons-material/Delete";
import RunCircleIcon from "@mui/icons-material/RunCircle";
import FixtureServices from "../../../services/api/fixture/fixtureService";
import { useSnackbar } from "notistack";
import DialogComponentEstadisticas from "./common/DialogComponentEstadisticas";
import translate from "../../../utils/translate/dataGridToolbar.json";
import getEstadisticasServices from "../../../services/api/estadisticas/getEstadisticasService";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f5f5f5",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  borderRadius: "5px",
  textAlign: "center",
  color: theme.palette.text.secondary,
}));


export default function Estadisticas() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [dataItemSelect, setDataItemSelect] = React.useState(null);

  const columns = [
    {
      field: "Fixture",
      headerName: "Fecha",
      flex: 1,
      description: "Numero de fecha del partido",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
         
            <span>{params.value.num_fecha}</span>
          
        );
      },
      headerClassName: "headerClass",
    },
    {
      field: "Fixture",
      headerName: "Partido",
      minWidth: 200,
      description: "Equipo Local",
      renderCell: (params) => {
        return (
         
            <span>{params.value.local.nombre_corto} vs {params.value.visitante.nombre_corto} </span>
          
        );
      }, 
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },
    {
      field: "Estadistica",
      headerName: "Tipo de Estadistica",
      minWidth: 200,
    /*   renderCell: (params) => {
        return (
          <Tooltip title={params.value.nombre}>
            <span>{params.value.nombre_corto}</span>
          </Tooltip>
        );
      }, */
      description: "Equipo Visitante",
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },

    {
      field: "jugador",
      headerName: "Jugador",
      minWidth: 113,
      editable: true,
    /*   valueGetter: (params) => {
        return params?.row.goles_local != null ? params.row.goles_local : "-";
      }, */
      description: "Goles del equipo local",
      type: "number",
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },

    {
      field: "Torneo",
      headerName: "Torneo",
      minWidth: 150,
      valueGetter: (params) => {
        return params?.value?.nombre;
      },
      description: "Torneo al que pertenece el partido",
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },
    {
      field: "cantidad",
      headerName: "Cantidad",
      minWidth: 150,
    /*   valueGetter: (params) => {
        return params?.row?.estado != null ? params.row.estado : "Por jugar";
      }, */
      description: "Estado del partido",
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },

    {
      field: "actions",
      headerName: "Acciones",
      disableReorder: true,
      flex: 1,
      type: 'actions',
      getActions: (params) => [
    
        <GridActionsCellItem
          icon={ <RunCircleIcon fontSize="small" />}
          label="Agregar Estadisticas"
          onClick={()=>{handleStats(params.row)}}
          showInMenu
        />,
        <GridActionsCellItem
          icon={ <DeleteIcon fontSize="small" />}
          label="Resetear partido"
          onClick={()=>{handleDelete(params.id)}}
          showInMenu
        />,
      ],
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },
  ];

  const { enqueueSnackbar } = useSnackbar();
  const [estadisticas, setEstadisticas] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(5);

  const [openDialogStats, setOpenDialogStats] = React.useState(false);
  const [action, setAction] = React.useState(null);


  const handleStats = (item) => {
    console.log("eventeeeeeeeeeeees",item)
    setDataItemSelect(item);
    setOpenDialogStats(true)
}

const getEstadisticas = async () => {
  const response = await getEstadisticasServices.getAllEstadisticas();
  console.log("response", response);
  setEstadisticas(response.estadisticas);
}
const handleDelete = (id) => {
    console.log("delete",id)
}


  React.useEffect(() => {
    getEstadisticas()
  }, [open]);

console.log("estadisticasssssssssssssssssssssssssssssss",estadisticas)

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
                Estadisticas de Partido
              </Typography>
            </div>
          </Toolbar>
          <TableContainer>
            <DataGrid
              rows={estadisticas}
              columns={columns}
              loading={loading}
              pageSize={pageSize}
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
            
              localeText={translate}
              className="tableClasificacion"
              rowHeight={53}
              headerHeight={43}
            />
          </TableContainer>
        </Item>
      </Box>

      <DialogComponentEstadisticas
        open={openDialogStats}
        setOpen={setOpenDialogStats}
        action={action}
        dataItemSelect={dataItemSelect}
      />
    </>
  );
}
