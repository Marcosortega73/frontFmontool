import * as React from "react";

import { format } from "date-fns";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Controller } from "react-hook-form";
import { Chip } from "@mui/material";



export default function FormDate({
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
  disablePast,
  text,
  tieneLabel,
  disabled,
  setValue,
  disableFuturo,
  vmodel,
  readOnly,
  maxWidth,
  textColor,
  setValues,
}) {
  const [valueDate, setValueDate] = React.useState(setValue);

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{ required: rulesBol }}
        autoComplete="ViewCrunch"
        render={({ field: { onChange, name, value } }) => (
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    inputFormat="DD/MM/YYYY"
                    variant="filled"
                    id="filled-hidden-label-normal"
                    readOnly = {readOnly}
                    views={["year", "month", "day"]}
                    disableFuture={disableFuturo?true:false}
                    disablePast={disablePast?true:false}
                    value={value}
                    onChange={(date) => {
                      setValueDate(date);
                      onChange(
                        date?.isValid
                          ? new Date(date)
                          : ""
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        hiddenLabel
                        color="secondary"
                        sx={{

                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#cca500 !important",
                            
                            },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#cca500 !important",
                            },
                        
                          '&.MuiOutlinedInput-root': {
                            '&.MuiInputAdornment-positionEnd': {
                            '&.MuiIconButton-edgeEnd': {
                              '&.MuiSvgIcon-fontSizeMedium': {
                                color: textColor ? textColor : "#000",
                              },
                            },
                          },
                          },
                          maxWidth: maxWidth,
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
                          '.css-i4bv87-MuiSvgIcon-root':{
                            color: textColor ? textColor : "#000",
                        },
                        }}
                        {...params}
                      />
                    )}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
          </>
        )}
      />
    </>
  );
}

