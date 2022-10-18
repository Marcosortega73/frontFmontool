import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { Controller } from "react-hook-form";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Chip from "@mui/material/Chip";
import { Checkbox, Popper, styled } from "@mui/material";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}



export default function FormAutocomplete({
  type,
  control,
  register,
  errors,
  name,
  rulesBol,
  variant,
  labelText,
  bgcolor,
  mostrar,
  text,
  tieneLabel,
  disabled,
  setValue,
  vmodel,
  readOnly,
  limitTags,
  limitTagsSelect,
  maxWidth,
  textColor,
  setSelected,
  opciones,
  multiple,
  selectEquipos,
}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [checkSelected, setCheckSelected] = React.useState(null);

  const StyledPopper = styled(Popper)(({ theme }) => ({
    '& .MuiAutocomplete-groupLabel': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  }))
  const handleChange = (value) => {
    console.log("value", value);
   
    if (value) {
      setCheckSelected(value.length)
    }
    console.log("count", checkSelected);
  }

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...opciones]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, opciones]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{ required: rulesBol }}
        autoComplete="ViewCrunch"
        render={({ field: { onChange, value } }) => (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              {tieneLabel && (
                <div style={{ marginBottom: 5 }}>
                  <Chip label={text} color="primary" />
                </div>
              )}

              <Autocomplete
                id="asynchronous-demo"
                value={value}
                color="secondary"
                getOptionDisabled={(option) => checkSelected >= limitTagsSelect && true}
                PopperComponent={StyledPopper}
                open={open}
                multiple={!!multiple}
                onOpen={() => {
                  setOpen(true);
                }}
                limitTags={limitTags}
                readOnly={readOnly}
                onClose={() => {
                  setOpen(false);
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                 getOptionLabel={(option) =>
                  !selectEquipos? option.nombre :`${option.nombre} - (${option.Nacionalidad?.nombreCorto})`
                } 
                options={options}
                loading={loading}
                disableCloseOnSelect = {multiple}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {!selectEquipos
                      ? option.nombre
                      : `${option.nombre} - (${option.Nacionalidad?.nombreCorto})`}
                  </li>
                )}
                groupBy={(option) => option.Nacionalidad?.nombre}
                onChange={(_, values) => {
                  onChange(values);
                  setSelected && setSelected(values.id);
                  name === "equipos" && selectEquipos && setSelected(values);
                  name === "equipos" && selectEquipos && handleChange(values);
                }}
                renderInput={(params, index) => (
                  <TextField
                    {...params}
                    color="secondary"
                    sx={{
                      "& .MuiOutlinedInput-input": {
                        color: textColor ? textColor : "#000",
                        borderColor: textColor ? textColor : "#000",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: textColor ? textColor : "#000",
                          "&:hover": {
                            borderColor: "blue",
                          },
                        },
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: textColor ? textColor : "#000",
                        "&:hover": {
                          borderColor: "blue",
                        },
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#cca500 !important",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#cca500 !important",
                      },

                      ".css-i4bv87-MuiSvgIcon-root": {
                        color: textColor ? textColor : "#000",
                      },
                      ".css-1glvl0p-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-clearIndicator":
                        {
                          color: textColor ? textColor : "#000",
                        },
                    }}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loading ? (
                            <CircularProgress color="secondary" size={20} />
                          ) : null}
                          <li key={index}>{params.InputProps.endAdornment}</li>
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
            </div>
          </>
        )}
      />
    </>
  );
}
