
import React from "react";
import { Controller } from "react-hook-form";

import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

import "./formText.css";

export const FormPassword = ({
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
  maxWidth,
  
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    console.log("showPassword", showPassword);
    setShowPassword(!showPassword);
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{ required: rulesBol }}
        autoComplete='off'
        
        render={({ field }) => (
          <>
          <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
          { tieneLabel&&<div style={{marginBottom:5}}>
          <Chip label={text} color="primary" />    
          </div> }
          <OutlinedInput
           {...field }
           {...register(name)}
            id="outlined-adornment-password"
            type={!showPassword?type:"text"}
            autoComplete='off'
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            error={!!errors[name]}
            
            helperText={errors[name] && `${text} es un Campo Requerido`}
          />
          </div>
          </>
        )}
      />
    </>
  );
};
