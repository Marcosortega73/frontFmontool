
import React from "react";
import { Controller } from "react-hook-form";

import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';

import "./formText.css";

export const FormText = ({
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
  textColor
}) => {
  
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{ required: rulesBol }}
        autoComplete='ViewCrunch'
        
        render={({ field }) => (
          <>
          <div style={{
          display:"flex",flexDirection:"column",width:"100%"}}>

          { tieneLabel&&
          
          <div style={{marginBottom:5}}>
          <Chip label={text} color="primary" />    
          </div> }
          <TextField  
            {...field }
            {...register(name)}
        
            color="secondary"
            type={mostrar?"password":type}
            className="formText"
            value={
             type==="number"?
              field.value || undefined:
              field.value || ""

            }
            sx={{
              maxWidth: maxWidth,
              '& .MuiOutlinedInput-input': {
                color: textColor?textColor:"#cfd8dc !important",
                borderColor: textColor?textColor:"#cfd8dc !important",
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: textColor?textColor:"#cfd8dc !important",
                },
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: textColor?textColor:"#cfd8dc !important",
              },

              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#cca500 !important",
                
                },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#cca500 !important",
                },
              

            }}
            InputProps={
              readOnly ? {
              readOnly: true,
            }: 
            {}}
            disabled={disabled}
            error={!!errors[name]}
            helperText={errors[name] && `${text} es un Campo Requerido`}
            autoComplete='off'
          />
          </div>
          </>
        )}
      />
    </>
  );
};
