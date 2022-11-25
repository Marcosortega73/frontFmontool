/* import * as React from "react";
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
        return <span>{params.value.num_fecha}</span>;
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
          <>
            <span>
              {params.value.local.nombre_corto} vs{" "}
              {params.value.visitante.nombre_corto}{" "}
            </span>
          </>
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
       renderCell: (params) => {
        return (
          <Tooltip title={params.value.nombre}>
            <span>{params.value.nombre_corto}</span>
          </Tooltip>
        );
      }, 
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
       valueGetter: (params) => {
        return params?.row.goles_local != null ? params.row.goles_local : "-";
      }, 
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
         valueGetter: (params) => {
        return params?.row?.estado != null ? params.row.estado : "Por jugar";
      }, 
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
    console.log("eventeeeeeeeeeeees", item);
    setDataItemSelect(item);
    setOpenDialogStats(true);
  };

  const getEstadisticas = async () => {
    const response = await getEstadisticasServices.getAllEstadisticas();
    console.log("response", response);
    setEstadisticas(response.estadisticas);
  };
  const handleDelete = (id) => {
    console.log("delete", id);
  };

  React.useEffect(() => {
    getEstadisticas();
  }, [open]);

  console.log("estadisticasssssssssssssssssssssssssssssss", estadisticas);

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
          <Box
            sx={{
              mt: 2,
              width: "100%",
              borderBottom: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TableContainer>
              <DataGrid
                rows={estadisticas}
                columns={columns}
                loading={loading}
                pageSize={pageSize}
                disableExtendRowFullWidth
                disableColumnMenu
                
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
          </Box>
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
 */

import * as React from "react";
import Box from "@mui/material/Box";

import TableContainer from "@mui/material/TableContainer";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import Tooltip from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import StorageIcon from "@mui/icons-material/Storage";
import DialogComponentJugadores from "./common/DialogComponentJugadores";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SearchIcon from "@mui/icons-material/Search";
import { getRegiones } from "../../../redux/regionesSlice";
import { useDispatch } from "react-redux";
import jugadoresServices from "../../../services/api/jugadores/jugadoresService";
import equiposServices from "../../../services/api/equipos/equiposServices";

import RunCircleIcon from "@mui/icons-material/RunCircle";

import translate from "../../../utils/translate/dataGridToolbar.json";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import {
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Pagination,
  Stack,
  styled,
  TextField,
} from "@mui/material";

import Swal from "sweetalert2";
import DialogExcel from "./common/DialogExcelJugadores";
import ButtonPopperComponent from "./common/ButtonPopperComponent";

import "./styles/Jugadores.css";
import getEstadisticasServices from "../../../services/api/estadisticas/getEstadisticasService";
import { useSnackbar } from "notistack";
import estadisticasServices from "../../../services/api/estadisticas/estadisticasService";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  borderRadius: "5px",
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

//formateador a moneda euro
const formatter = new Intl.NumberFormat("en-EN", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

export default function Jugadores() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [dataItemSelect, setDataItemSelect] = React.useState(null);

  const columns = [
    {
      field: "id",
      headerName: "Id",
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },
    {
      field: "Fixture",
      headerName: "Partido",
      flex: 1,
      description: "Equipos que juegan el partido",
      renderCell: (params) => {
        return (
          <>
            <Grid container>
              <Grid item xs={12}>
                <span>{params.value.local.nombre_corto}</span> vs{" "}
              </Grid>
              <Grid item xs={12}>
                <span> {params.value.visitante.nombre_corto}</span>
              </Grid>
            </Grid>
          </>
        );
      },
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },

    {
      field: "Jugador",
      headerName: "Jugador",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Grid container>
              <Grid item xs={12}>
                <span>{params.value.nombre}</span> -{" "}
              </Grid>
              <Grid item xs={12}>
                <span> ({params.value.Equipo?.nombre_corto})</span>
              </Grid>
            </Grid>
          </>
        );
      },
      description: "Jugador",
      type: "number",
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },
    {
      field: "Estadistica",
      headerName: "Tipo de Estadistica",
      minWidth: 200,
      renderCell: (params) => {
        return (
          <Tooltip title={params.descripcion}>
            <span>{params.value.nombre}</span>
          </Tooltip>
        );
      },
      description: "Equipo Visitante",
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },
    {
      field: "cantidad",
      headerName: "Cantidad",
      valueGetter: (params) => {
        console.log("paramss cantidad", params);
        return params.row?.cantidad ? params.row.cantidad : "-";
      },
      description: "Estado del partido",
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
      field: "actions",
      headerName: "Acciones",
      disableReorder: true,
      flex: 1,
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon fontSize="small" />}
          label="Resetear partido"
          onClick={() => {
            handleDelete(params.id);
          }}
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
    console.log("eventeeeeeeeeeeees", item);
    setDataItemSelect(item);
    setOpenDialogStats(true);
  };

  const getEstadisticas = async () => {
    const response = await getEstadisticasServices.getAllEstadisticas();
    console.log("response", response);
    setEstadisticas(response.estadisticas);
  };
  const handleDelete = (id) => {
    console.log("delete", id);
    Swal.fire({
      title: "¿Estas seguro que desea eliminar la estadistica?",
      text: "No podras revertir esta accion",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        estadisticasServices.deleteEstadistica(id).then((response) => {
          console.log("response", response);
          if (response.status === 200) {
            Swal.fire(
              "Eliminado!",
              "La estadistica ha sido eliminada.",
              "success"
            );
          }
        });
      }
    });
  };

  React.useEffect(() => {
    getEstadisticas();
  }, [open]);

  console.log("estadisticasssssssssssssssssssssssssssssss", estadisticas);
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
                Estadisticas de jugador
              </Typography>
            </div>
          </Toolbar>

          <Box
            sx={{
              mt: 2,
              width: "100%",
              borderBottom: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TableContainer>
              <DataGrid
                rows={estadisticas}
                columns={columns}
                className="dataTableGrid tableClasificacion"
                pageSize={pageSize}
                disableExtendRowFullWidth
                disableColumnMenu={true}
                loading={loading}
                isCellEditable={(params) => params.row.cantidad != null}
                autoHeight
                disableSelectionOnClick
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                localeText={translate}
                rowHeight={73}
                headerHeight={43}
                components={{
                  Toolbar: GridToolbar,
                }}
                componentsProps={{
                  toolbar: {
                    showQuickFilter: true,
                  },
                }}
                //obtener valor del search
              />
            </TableContainer>
          </Box>
        </Item>
      </Box>
    </>
  );
}
