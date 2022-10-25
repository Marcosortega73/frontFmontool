import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Avatar,
  Button,
  Container,
  Divider,
  IconButton,
  Input,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Slide,
  Snackbar,
  styled,
  TableContainer,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
//AddCircleIcon
import DeleteIcon from "@mui/icons-material/Delete";
import RunCircleIcon from "@mui/icons-material/RunCircle";
import DialogComponentTemporada from "./common/DialogComponentTemporada";
import { useDispatch, useSelector } from "react-redux";
import { getTorneos } from "../../../redux/torneoSlice";
import {
  EditNotifications,
  Logout,
  PersonAdd,
  Settings,
} from "@mui/icons-material";
import FixtureServices from "../../../services/api/fixture/fixtureService";
import { useSnackbar } from "notistack";
import DialogComponentEstadisticas from "./common/DialogComponentEstadisticas";
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

function AccountMenu({ anchor, open, handleClose, setOpenDialogStats }) {
  return (
    <React.Fragment>
      <Menu
        anchorEl={anchor}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => setOpenDialogStats(true)}>
          <ListItemIcon>
            <RunCircleIcon fontSize="small" />
          </ListItemIcon>
          Agregar Estadisticas
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Borrar
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default function Partidos() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleEstadisticas = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick = (event) => {
    console.log("HANDLE CLICK", event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const columns = [
    {
      field: "num_fecha",
      headerName: "Fecha",
      flex: 1,
      description: "Numero de fecha del partido",
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },
    {
      field: "local",
      headerName: "Local",
      minWidth: 200,
      description: "Equipo Local",
      renderCell: (params) => {
        return (
          <Tooltip title={params.value.nombre}>
            <span>{params.value.nombre_corto}</span>
          </Tooltip>
        );
      },
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },
    {
      field: "visitante",
      headerName: "Visitante",
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
      field: "goles_local",
      headerName: "Goles Local",
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
      field: "estado",
      headerName: "Estado",
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
      type: "actions",
      headerName: "Acciones",
      disableReorder: true,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Box>
              <Tooltip title="Opciones">
                <IconButton
                  aria-label="settings"
                  aria-controls="account-menu"
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MoreHorizIcon />
                </IconButton>
              </Tooltip>
              <AccountMenu
                anchor={anchorEl}
                open={open}
                handleClose={handleClose}
                setOpenDialogStats={setOpenDialogStats}
              />
            </Box>
          </>
        );
      },
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },
  ];

  const { enqueueSnackbar } = useSnackbar();
  const [partidosData, setPartidosData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(5);

  const [openDialogStats, setOpenDialogStats] = React.useState(false);
  const [action, setAction] = React.useState(null);

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
        variant: "success",
      });
      getPartidos();
    } else {
      enqueueSnackbar(response.message, {
        variant: "error",
      });
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
          <TableContainer>
            <DataGrid
              rows={partidosData}
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
              onCellEditCommit={(params, event) =>
                handleCellEditCommit(params, event)
              }
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
      />
    </>
  );
}
