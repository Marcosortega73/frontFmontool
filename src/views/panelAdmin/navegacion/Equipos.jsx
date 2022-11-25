import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import StorageIcon from "@mui/icons-material/Storage";
import DialogComponentEquipos from "./common/DialogComponentEquipos";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SearchIcon from "@mui/icons-material/Search";
import { useOutletContext } from "react-router-dom";

import { getRegiones } from "../../../redux/regionesSlice";
import { useDispatch } from "react-redux";
import equiposServices from "../../../services/api/equipos/equiposServices";
import {
  Chip,
  Container,
  IconButton,
  InputAdornment,
  styled,
  TextField,
} from "@mui/material";

import Swal from "sweetalert2";
import DialogExcelEquipos from "./common/DialogExcelEquipos";

import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  esES,
} from "@mui/x-data-grid";
import { EditNotifications } from "@mui/icons-material";

import translate from "../../../utils/translate/dataGridToolbar.json";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  borderRadius: "5px",
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Equipos() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("nombre");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filter, setFilter] = React.useState("");
  const [queryOptions, setQueryOptions] = React.useState({
    sort: "asc",
    field: "nombre",
  });

  const [openExcel, setOpenExcel] = React.useState(false);
  const [openDialogEquipos, setOpenDialogEquipos] = React.useState(false);
  const [managers, setManagers] = React.useState([]);
  const [torneos, setTorneos] = React.useState([]);
  const [equipos, setEquipos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [pageSize, setPageSize] = React.useState(5);

  const [equiposSelect, setEquiposSelect] = React.useState({
    id: 0,
    nombre: "",
    nombre_corto: "",
    nacionalidad: [],
    manager: 0,
    torneo: 0,
  });

  const [actionSelect, setActionSelect] = React.useState("");

  const columns = [
    {
      field: "idFmrte",
      headerName: "Id",
      description: "Id del equipo dentro del Juego",
      with: 100,
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass", // <-- Header cell className
    },
    {
      field: "nombre_corto",
      headerName: "Nombre",
      minWidth: 200,
      description: "Nombre del equipo",
      flex: 1,
      renderCell: (params) => {
        return (
          <Tooltip title={params.row.nombre}>
            <span>{params.row.nombre_corto}</span>
          </Tooltip>
        );
      },
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },
    {
      field: "Nacionalidad",
      headerName: "Nacionalidad",
      renderCell: (params) => {
        return (
          <Tooltip title={params.row.Nacionalidad.nombre}>
            <span>{params.row.Nacionalidad.nombre}</span>
          </Tooltip>
        );
      },
      sortable: true,
      sortComparator: (v1, v2, param1, param2) => {
        console.log(v1, v2, param1, param2);
        return param1.field.localeCompare(param2.value.Nacionalidad.nombre);
      },
      description: "Nacionalidad del equipo",
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },
    {
      field: "Manager",
      flex: 1,
      headerName: "Manager",
      renderCell: (params) => {
        console.log("paramasmsmamsdmasmdamsd", params);
        return params.row.Manager != null ? (
          <Tooltip title={params.row.Manager.nombre}>
            <span>
              {params.row.Manager?.nombre
                ? params.row.Manager.nombre
                : params.row.Manager?.email?
                params.row.Manager.email:""}
            </span>
          </Tooltip>
        ) : (
          <>
            <span>Sin Manager</span>
          </>
        );
      },
      sortable: true,
      sortComparator: (v1, v2, param1, param2) => {
        console.log(v1, v2, param1, param2);
        return param1.field.localeCompare(param2.value.Manager.nombre);
      },
      description: "Manager del equipo",
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },

    {
      field: "Torneos",
      headerName: "Torneos",
      renderCell: (params) => {
        return (
          <div style={{ padding: 3, display: "flex", flexWrap: "wrap" }}>
            {params.value?.length > 0
              ? params.value.map((torneo, idx) => {
                  return (
                    <Chip
                      key={idx}
                      label={torneo.nombre}
                      color="primary"
                      variant="outlined"
                      size="small"
                      sx={{ m: "3px" }}
                    />
                  );
                })
              : "Resto del mundo"}
          </div>
        );
      },
      flex: 1,
      grow: 1,
      description: "Torneos en los que participa el equipo",
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
          icon={<VisibilityIcon fontSize="small" />}
          label="Ver Equipo"
          onClick={() => {
            handleEquipoSelect(params.row, "ver");
          }}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<EditIcon fontSize="small" />}
          label="Editar Equipo"
          onClick={() => {
            handleEquipoSelect(params.row, "edit");
          }}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<DeleteIcon fontSize="small" />}
          label="Borrar Equipo"
          onClick={() => {
            handleDelete(params.id);
          }}
          showInMenu
        />,
      ],
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },
  ];

  const getEquipos = async () => {
    const { clubes } = await equiposServices
      .getEquipos(page, filter, rowsPerPage, queryOptions)
      .finally(() => {
        setLoading(false);
      });
    setEquipos(clubes);
    console.log("Holassssss", clubes);
    console.log("rowsPerPage", rowsPerPage);
    console.log("page", page);
  };

  React.useEffect(() => {
    /*     dispatch(getRegiones()); */
    getEquipos();
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleOpenDialog = () => {
    setOpenDialogEquipos(true);
  };
  console.log("Equipos =>", equipos);

  const handleEquipoSelect = (equipo, action) => {
    setActionSelect(action);

    console.log("Equipo Select =>", equipo);

    if (action === "edit") {
      setEquiposSelect({
        id: equipo.id,
        nombre: equipo.nombre,
        nombre_corto: equipo?.nombre_corto,
        nacionalidad: equipo.Nacionalidad,
        manager:
          equipo.Manager && equipo.Manager.nombre
            ? equipo.Manager.nombre
            : equipo.Manager?.email?equipo.Manager.email:"Sin Manager",
        torneo: equipo.Torneos && equipo.Torneos.nombre,
      });
    } else if (action === "ver") {
      setEquiposSelect({
        id: equipo.id,
        nombre: equipo.nombre,
        nombre_corto: equipo?.nombre_corto,
        nacionalidad: equipo.Nacionalidad.nombre,
        manager:
        equipo.Manager && equipo.Manager.nombre
          ? equipo.Manager.nombre
          : equipo.Manager?.email?equipo.Manager.email:"Sin Manager",

        torneo: equipo.Torneos && equipo.Torneos.nombre,
      });
    }

    console.log("Equipo Select ULTIMO =>", equiposSelect);

    handleOpenDialog();
  };
  const handleCreateEquipos = () => {
    setActionSelect("create");
    setEquiposSelect({});
    handleOpenDialog();
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = equipos.map((n) => n.nombre);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleExcel = () => {
    setLoading(true);
    setOpenExcel(true);
  };

  const handleDelete = async (id) => {
    console.log("ID DE equipo", id);
    Swal.fire({
      title: "Advertencia",
      text: "¿ Esta seguro que desea eliminar el equipo ?",
      icon: "warning",
      iconColor: "#e8b71c",
      showCancelButton: true,
      confirmButtonText: "Si, Eliminar",
      confirmButtonColor: "#1e2024",
      cancelButtonText: "No, Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await equiposServices.deleteEquiposService(id);
        console.log("QUE ONDA", res);

        if (res.status === 200) {
          await getEquipos();
          Swal.fire("Eliminado!", `${res.message}`, "success");
        } else {
          Swal.fire(
            "Error!",
            "El equipo no ha sido eliminado. Ocurrio un error en el servidor",
            "error"
          );
        }
      }
    });
  };

  /*   const handleSortModelChange = React.useCallback((sortModel) => {
    // Here you save the data you need from the sort model
    // and then call the service to get the data
    const sort = sortModel[0];
    setQueryOptions({
      ...queryOptions,
      field: sort.field,
      sort: sort.sort,
    });
  }, []); */

  console.log("queryOptions", queryOptions);

  const handleFilter = (e) => {
    // limitar el numero de caracteres
    if (e.length > 3) {
      return;
    }

    setFilter(e);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;

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
                Equipos
              </Typography>
              <Box>
                <Tooltip title="Agregar Equipos">
                  <Button
                    onClick={handleExcel}
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    endIcon={<StorageIcon />}
                    sx={{ mr: 1 }}
                  >
                    Subir Excel de Equipos
                  </Button>
                </Tooltip>
                <Tooltip title="Agregar Equipos">
                  <Button
                    onClick={handleCreateEquipos}
                    variant="contained"
                    endIcon={<AddCircleIcon />}
                  >
                    Crear equipo
                  </Button>
                </Tooltip>
              </Box>
            </div>
          </Toolbar>

          <TableContainer>
            <DataGrid
              rows={equipos}
              columns={columns}
              loading={loading}
              pageSize={rowsPerPage}
              page={page}
              density="compact"
              autoHeight
              disableSelectionOnClick
              onPageSizeChange={(newPageSize) => setRowsPerPage(newPageSize)}
              onPageChange={(newPage) => setPage(newPage)}
              rowsPerPageOptions={[5, 10, 20]}
              pagination
              components={{ Toolbar: GridToolbar }}
              /*        onSortModelChange={handleSortModelChange} */
              componentsProps={{
                toolbar: {
                  showQuickFilter: true,
                },
                //traducir filter panel
              }}
              localeText={translate}
              className="tableClasificacion"
              rowHeight={53}
              headerHeight={43}
            />
          </TableContainer>
        </Item>

        <DialogComponentEquipos
          open={openDialogEquipos}
          setOpen={setOpenDialogEquipos}
          torneos={torneos}
          managers={managers}
          equipo={equiposSelect}
          setEquipoSelect={setEquiposSelect}
          action={actionSelect}
          setLoading={setLoading}
        />
        <DialogExcelEquipos
          updateEquipos={getEquipos}
          openExcel={openExcel}
          setOpenExcel={setOpenExcel}
          setLoading={setLoading}
        />
      </Box>
    </>
  );
}
