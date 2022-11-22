
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { alpha, styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {useSelector} from "react-redux";
import jugadoresServices from '../../../services/api/jugadores/jugadoresService';

import localeText from "../../../utils/translate/dataGridToolbar.json";

import "./styles/Table.css";

//import icon ver
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Toolbar, Typography } from "@mui/material";
import DialogJugadorDetails from "../../client/torneos-y-competencias/base-de-datos/DialogJugadorDetails";

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

export default function Plantilla() {
  const [isAntDesign, setIsAntDesign] = React.useState(false);
  const [type, setType] = React.useState("Commodity");
  const [size, setSize] = React.useState(100);
  const [pagination, setPagination] = React.useState({
    pagination: true,
    autoPageSize: false,
    pageSize: undefined,
  });
  const { user } = useSelector((state) => state.auth);
  const [jugadores,setJugadores] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false)
  const [jugadorSelect, setJugadorSelect] = React.useState({})
  const [loading, setLoading] = React.useState(true);
  

  const getJugadores = async (id)=>{

    const response = await jugadoresServices.getJugadoresByEquipoService(id)
    setJugadores(response)
  }

  const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      minWidth: 200,
      headerClassName: "headerTableClass",
    },
    {
      field: "Nacionalidad",
      headerName: "Nacionalidad",
      minWidth: 0,
      valueGetter: (params) => {
        return params?.value?.nombre;
      },
      headerClassName: "headerTableClass",
    },
    {
      field: "Equipo",
      headerName: "Equipo",
      valueGetter: (params) => {
        return params?.value?.nombre_corto;
      },
      flex: 1,
      headerClassName: "headerTableClass",
    },
    {
      field: "altura",
      headerName: "Altura",
      valueFormatter: ({ value }) => `${value} cm`,
      headerClassName: "headerTableClass",
    },
    {
      field: "peso",
      headerName: "Peso",

      valueFormatter: (params) => {
        return `${params.value} kg`;
      },
      headerClassName: "headerTableClass",
    },
    {
      field: "ca",
      headerName: "CA",
      minWidth: 0,
      headerClassName: "headerTableClass",
      description: "Calidad Actual",
    },
    {
      field: "cp",
      headerName: "CP",
      minWidth: 0,
      headerClassName: "headerTableClass",
      description: "Calidad Potencial",
    },
    {
      field: "valor",
      headerName: "Valor",
      minWidth: 0,
      //formatear a $
      valueFormatter: (params) => {
        return formatter.format(params.value);
      },
      headerClassName: "headerTableClass",
    },
    //actions
    {
      field: "actions",
      headerName: "Acciones",
      renderCell: (params) => {
        return (
          <Button
            size="small"
            onClick={(e) => handleChangeJugadorSelect(params.row, e)}
          >
            <RemoveRedEyeIcon />
          </Button>
        );
      },
      headerClassName: "headerTableClass",
      flex: 0.5,
    },
  ];
  
  React.useEffect(() => {
    if(user.equipo){
      getJugadores(user.equipo.id)
    }
    setLoading(false)
  }, [user]);

  console.log("USER CON PLANTILLAAA",user)
  console.log("jugadores",jugadores)

  

  const handleChangeJugadorSelect = (jugador, e) => {
    e.preventDefault();
    setJugadorSelect(jugador)
    setOpenDialog(true)
  }; 

  return (
    <StyledBox>
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
          Plantilla
        </Typography>
        
      </Toolbar>
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

<DialogJugadorDetails open={openDialog} setOpen={setOpenDialog} jugador={jugadorSelect} />
    </StyledBox>
  );
}
