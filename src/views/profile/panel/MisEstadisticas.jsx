import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { alpha } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import jugadoresServices from "../../../services/api/jugadores/jugadoresService";

import { experimentalStyled as styled } from "@mui/material/styles";

import localeText from "../../../utils/translate/dataGridToolbar.json";

import "./styles/Table.css";

//import icon ver
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Toolbar, Typography } from "@mui/material";
import DialogJugadorDetails from "../../client/torneos-y-competencias/base-de-datos/DialogJugadorDetails";
import getEstadisticasServices from "../../../services/api/estadisticas/getEstadisticasService";

import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function SettingsPanel(props) {
  const { onApply, size } = props;
  const [sizeState, setSize] = React.useState(size);
  const [selectedPaginationValue, setSelectedPaginationValue] =
    React.useState(-1);

  const handleSizeChange = React.useCallback((event) => {
    setSize(Number(event.target.value));
  }, []);

  const handlePaginationChange = React.useCallback((event) => {
    setSelectedPaginationValue(event.target.value);
  }, []);

  const handleApplyChanges = React.useCallback(() => {
    onApply({
      size: sizeState,
      pagesize: selectedPaginationValue,
    });
  }, [sizeState, selectedPaginationValue, onApply]);

  return (
    <FormGroup className="MuiFormGroup-options" row>
      <FormControl variant="standard">
        <InputLabel>Jugadores</InputLabel>
        <Select value={sizeState} onChange={handleSizeChange}>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={1000}>{Number(1000).toLocaleString()}</MenuItem>
          <MenuItem value={10000}>{Number(10000).toLocaleString()}</MenuItem>
          <MenuItem value={100000}>{Number(100000).toLocaleString()}</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel>Paginas</InputLabel>
        <Select
          value={selectedPaginationValue}
          onChange={handlePaginationChange}
        >
          <MenuItem value={-1}>off</MenuItem>
          <MenuItem value={0}>auto</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={1000}>{Number(1000).toLocaleString()}</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        variant="standard"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Button size="small" variant="outlined" onClick={handleApplyChanges}>
          <KeyboardArrowRightIcon fontSize="small" /> Apply
        </Button>
      </FormControl>
    </FormGroup>
  );
}

SettingsPanel.propTypes = {
  onApply: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
};

const formatter = new Intl.NumberFormat("en-EN", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

export default function MisEstadisticas() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [pagination, setPagination] = React.useState({
    pagination: true,
    autoPageSize: false,
    pageSize: undefined,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const { user } = useSelector((state) => state.auth);
  const [jugadores, setJugadores] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [jugadorSelect, setJugadorSelect] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [torneo, setTorneo] = React.useState({});


  const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      minWidth: 200,
      headerClassName: "headerTableClass",
    },
    {
      field: "posiciones",
      headerName: "Posiciones",
      minWidth: 200,
      headerClassName: "headerTableClass",
    },
    {
      field: "rojas",
      headerName: "Tarjetas Rojas",
      minWidth: 0,
      valueGetter: (params) => {
        return params?.value?.nombre;
      },
      headerClassName: "headerTableClass",
    },
    {
      field: "amarillas",
      headerName: "Tarjetas Amarillas",
      valueGetter: (params) => {
        return params?.value?.nombre_corto;
      },
      flex: 1,
      headerClassName: "headerTableClass",
    },
    {
      field: "lesiones",
      headerName: "Lesiones",
      headerClassName: "headerTableClass",
    },
    {
      field: "asistencias",
      headerName: "Asistencias",
      headerClassName: "headerTableClass",
    },
    {
      field: "goles",
      headerName: "Goles",
      headerClassName: "headerTableClass",
    },
    {
      field: "suspenciones",
      headerName: "Suspenciones",
      headerClassName: "headerTableClass",
    },
  ];
  const getJugadores = async (id)=>{

    const response = await jugadoresServices.getJugadoresByEquipoService(id)
    setJugadores(response)
  }
  React.useEffect(() => {
    if (user.equipo) {
      getJugadores(user.equipo.id);
    }
    setLoading(false);
  }, [user]);

  console.log("USER CON PLANTILLAAA", user);


  const handleChangeJugadorSelect = (jugador, e) => {
    e.preventDefault();
    setJugadorSelect(jugador);
    setOpenDialog(true);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%", height: "100%" }}>
      <AppBar position="static">
      <Toolbar
                sx={{
                  color: "primary.main",
                  display: "flex",
                  justifyContent: "flex-start",
                  minHeight: "37px !important",
                  pb: 1.2,
                  pt: 1.2,
                  borderTopLeftRadius: 7,
                  borderTopRightRadius: 7,
                  width: "100%",
                  borderLeft: "5px solid #fff",

                  backgroundColor: "secondary.main",
                }}
              >
                <Typography variant="h6" id="tableTitle" component="div">
                  Estadisitcas
                </Typography>
              </Toolbar>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {user?.equipo?.Torneos?.length > 0 &&
            user?.equipo?.Torneos.map((torneo, idx) => (
              <Tab label={torneo.nombre} {...a11yProps(idx)} />
            ))}
        </Tabs>
      </AppBar>

      {user?.equipo?.Torneos?.length > 0 &&
        user?.equipo?.Torneos.map((torneo, idx) => (
          <TabPanel value={value} index={idx}>
            <StyledBox>
            
              <StripedDataGrid
                columns={columns}
                rows={jugadores}
                loading={loading}
                components={{
                  Toolbar: GridToolbar,
                }}
                componentsProps={{
                  toolbar: { showQuickFilter: true },
                }}
                sx={{
                  "& .MuiDataGrid-columnsContainer": {
                    pb: 3,
                  },

                  "& .MuiDataGrid-cell": {
                    borderTop: (theme) =>
                      `1px solid ${
                        theme.palette.mode === "dark"
                          ? theme.palette.primaryDark[600]
                          : theme.palette.grey[400]
                      }`,
                  },

                  backgroundColor: "customTheme.acento200",
                }}
                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
                }
                localeText={localeText}
                rowThreshold={0}
                {...pagination}
              />

              <DialogJugadorDetails
                open={openDialog}
                setOpen={setOpenDialog}
                jugador={jugadorSelect}
              />
            </StyledBox>
          </TabPanel>
        ))}
    </Box>
  );
}
