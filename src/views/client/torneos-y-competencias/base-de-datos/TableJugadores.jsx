import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

//import icon ver
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

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

export default function TableJugadores({ jugadores, setOpen, setJugadorSelect }) {
  const [isAntDesign, setIsAntDesign] = React.useState(false);
  const [type, setType] = React.useState("Commodity");
  const [size, setSize] = React.useState(100);
  const [pagination, setPagination] = React.useState({
    pagination: true,
    autoPageSize: false,
    pageSize: undefined,
  });

  const columns = [
    { field: "nombre", headerName: "Nombre", minWidth: 200 },
    {
      field: "Nacionalidad",
      headerName: "Nacionalidad",
      minWidth: 0,
      valueGetter: (params) => {
        return params?.value?.nombre
      },
    },
    {
      field: "Equipo",
      headerName: "Equipo",
      maxWidth: "300",
      valueGetter: (params) => {
        return params?.value?.nombre;
      },
    },
    { field: "altura", headerName: "Altura" },
    { field: "peso", headerName: "Peso" },
    { field: "ca", headerName: "Calidad Actual", minWidth: 0 },
    { field: "cp", headerName: "Calidad Potencial", minWidth: 0 },
    { field: "valor", headerName: "Valor", minWidth: 0 },
    //actions
    {
      field: "actions",
      headerName: "Acciones",
      renderCell: (params) => {
        return (
          <Button
            size="small"
            onClick={(e) => handleChangeJugadorSelect(params.row,e)}
          >
            <RemoveRedEyeIcon />
          </Button>
        );
      },
    },
  ];

  const handleChangeJugadorSelect = (jugador,e) => {
    e.preventDefault();
    setJugadorSelect(jugador);
    setOpen(true);
  }

  const getActiveTheme = () => {
    return isAntDesign ? "ant" : "default";
  };

  const handleApplyClick = (settings) => {
    if (size !== settings.size) {
      setSize(settings.size);
    }

    if (type !== settings.type) {
      setType(settings.type);
    }

    if (getActiveTheme() !== settings.theme) {
      setIsAntDesign(!isAntDesign);
    }

    const newPaginationSettings = {
      pagination: settings.pagesize !== -1,
      autoPageSize: settings.pagesize === 0,
      pageSize: settings.pagesize > 0 ? settings.pagesize : undefined,
    };

    setPagination((currentPaginationSettings) => {
      if (
        currentPaginationSettings.pagination ===
          newPaginationSettings.pagination &&
        currentPaginationSettings.autoPageSize ===
          newPaginationSettings.autoPageSize &&
        currentPaginationSettings.pageSize === newPaginationSettings.pageSize
      ) {
        return currentPaginationSettings;
      }
      return newPaginationSettings;
    });
  };

  return (
    <StyledBox>
      <SettingsPanel
        onApply={handleApplyClick}
        size={size}
        type={type}
        theme={getActiveTheme()}
      />
      <DataGrid
        columns={columns}
        rows={jugadores}
        components={{
          Toolbar: GridToolbar,
        }}
        componentsProps={{
          toolbar: { showQuickFilter: true },
        }}
        rowThreshold={0}
        {...pagination}
      />
    </StyledBox>
  );
}
