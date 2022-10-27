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

import translate from "../../../utils/translate/dataGridToolbar.json";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Container,
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
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("nombre");

  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [count, setCount] = React.useState(0);
  const [filter, setFilter] = React.useState("");

  const [openExcel, setOpenExcel] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [jugadores, setJugadores] = React.useState([]);

  const [jugadorSelect, setJugadorSelect] = React.useState({
    id: 0,
    nombre: "",
    nacionalidad: [],
    equipo: 0,
    altura: 0,
    peso: 0,
    ca: 0,
    cp: 0,
    valor: 0,
  });

  const [actionSelect, setActionSelect] = React.useState("");
  const [equipos, setEquipos] = React.useState([]);

  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();

  const getJugadores = async () => {
    setLoading(true);
    console.log("ROWperPage ", rowsPerPage);
    console.log("PAGE ", page);

    const players = await jugadoresServices.getFilterJugadoresService(
      page,
      filter,
      rowsPerPage
    );

    

    console.log("DATA DEl FILTER", players);

    let countRedondeado = parseInt(players.players.count / rowsPerPage);
    setCount(countRedondeado);

    console.log("count", count);
    setJugadores(players.players.rows);
    console.log("Jugadores Filtrados", jugadores);
    setLoading(false);
  };

  React.useEffect(() => {
    dispatch(getRegiones());
    /*     getEquipos(); */
    getJugadores();
  }, [loading, rowsPerPage, page, filter]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    getJugadores();
  }, [loading])

  
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleJugadorSelect = (jugador, action) => {
    console.log("Jugador Seleccionado", jugador);
    setActionSelect(action);
    if (jugador) {
      if (action === "edit") {
        setJugadorSelect({
          id: jugador.id,
          nombre: jugador.nombre,
          nacionalidad: jugador.Nacionalidad?.id,
          equipo: jugador.Equipo?.id,
          altura: jugador.altura,
          peso: jugador.peso,
          ca: jugador.ca,
          cp: jugador.cp,
          valor: jugador.valor,
        });
      } else if (action === "ver") {
        setJugadorSelect({
          id: jugador.id,
          nombre: jugador.nombre,
          nacionalidad: jugador.Nacionalidad?.nombre,
          equipo: jugador.Equipo?.nombre,
          altura: jugador.altura,
          peso: jugador.peso,
          ca: jugador.ca,
          cp: jugador.cp,
          valor: jugador.valor,
        });
      }
    }
    console.log("Jugador Seleccionado", jugadorSelect);
    handleOpenDialog();
  };
  const handleCreateJugador = () => {
    setActionSelect("create");
    setJugadorSelect({});
    handleOpenDialog();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleExcel = () => {
    setOpenExcel(true);
  };

  const handleDelete = async (id) => {
    console.log("ID DE JUGADOR", id);
    Swal.fire({
      title: "Advertencia",
      text: "¿ Esta seguro que desea eliminar el jugador ?",
      icon: "warning",
      iconColor: "#e8b71c",
      showCancelButton: true,
      confirmButtonText: "Si, Eliminar",
      confirmButtonColor: "#1e2024",
      cancelButtonText: "No, Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await jugadoresServices.deleteJugadorService(id);
        console.log("QUE ONDA", res);

        if (res.status === 200) {
          await getJugadores();
          Swal.fire("Eliminado!", `${res.message}`, "success");
        } else {
          Swal.fire(
            "Error!",
            "El jugador no ha sido eliminado. Ocurrio un error en el servidor",
            "error"
          );
        }
      }
    });
  };

  const columns = [
    {
      field: "id",
      headerName: "Id",
      width: 100,
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },
    {
      field: "nombre",
      headerName: "Nombre",
      minWidth: 173,
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },
    {
      field: "Nacionalidad",
      headerName: "Nacionalidad",
      valueGetter: (params) => {
        return params?.value?.nombre;
      },
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },
    {
      field: "Equipo",
      headerName: "Equipo",
      width: 200,
      valueGetter: (params) => {
        return params?.value?.nombre;
      },
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },
    {
      field: "altura",
      headerName: "Altura",
      type: "number",
      width: 73,
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
      valueFormatter: ({ value }) => `${value} cm`,
    },
    {
      field: "peso",
      numeric: true,
      headerName: "Peso",
      width: 73,
      valueFormatter: (params) => {
        return `${params.value} kg`;
      },
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },
    {
      field: "ca",
      headerName: "CA",
      type: "number",
      width: 50,
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },

    {
      field: "cp",
      headerName: "CP",
      type: "number",
      width: 50,
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },
    {
      field: "valor",
      numeric: true,
      headerName: "Valor",
      width: 150,
      valueFormatter: (params) => {
        return formatter.format(params.value);
      },
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
    },
    {
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      filterable: false,
      flex: 1,
      disableClickEventBubbling: true,
      headerAlign: "center",
      align: "center",
      headerClassName: "headerClass",
      width: 200,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={1}>
            <Tooltip title="Ver Acciones">
              <ButtonPopperComponent
                handleDelete={handleDelete}
                handleJugadorSelect={handleJugadorSelect}
                row={params?.row}
                id={params?.id}
              />
            </Tooltip>
          </Stack>
        );
      },
    },
  ];

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
                Jugadores
              </Typography>
              <Box>
                <Tooltip title="Agregar Jugador">
                  <Button
                    sx={{ mr: 2 }}
                    onClick={handleExcel}
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    endIcon={<StorageIcon />}
                  >
                    Subir Excel de Jugadores
                  </Button>
                </Tooltip>
                <Tooltip title="Agregar Jugador">
                  <Button
                    onClick={handleCreateJugador}
                    variant="contained"
                    endIcon={<AddCircleIcon />}
                  >
                    Crear jugador
                  </Button>
                </Tooltip>
              </Box>
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
                rows={jugadores}
                columns={columns}
                pageSize={rowsPerPage}
                className="dataTableGrid tableClasificacion"
                disableExtendRowFullWidth
                disableColumnMenu={true}
                autoHeight
                disableSelectionOnClick
                onPageSizeChange={(newPageSize) => setRowsPerPage(newPageSize)}
                rowsPerPageOptions={[
                  5,
                  10,
                  20,
                  { value: jugadores.length, label: "Todos" },
                ]}
                pagination
                localeText={translate}
                rowHeight={53}
                headerHeight={43}
                components={{
                  Toolbar: GridToolbar,
                }}
                componentsProps={{
                  toolbar: {
                    showQuickFilter: true,
                  },
                }}
              />
            </TableContainer>
            <Stack spacing={2}>
              <Pagination
                count={count}
                defaultPage={page}
                onChange={handleChangePage}
                color="primary"
              />
            </Stack>
            <DialogComponentJugadores
              open={openDialog}
              setOpen={setOpenDialog}
              jugador={jugadorSelect}
              setJugadorSelect={setJugadorSelect}
              action={actionSelect}
              equipos={equipos}
              setLoading={setLoading}
            />
            <DialogExcel openExcel={openExcel} setOpenExcel={setOpenExcel} />
          </Box>
        </Item>
      </Box>
    </>
  );
}
