
import React from "react";
import { Controller } from "react-hook-form";

import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';


export const FormFile = ({
  type,
  control,
  register,
  name,
  labelText,
  text
}) => {
  
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
          <div style={{display:"flex",flexDirection:"column"}}>
          <div style={{marginBottom:5}}>
          <Chip label={text} color="primary" />    
          </div> 
          <TextField  
            {...field }
            {...register(name)}
            type={type}
            autoComplete="off"
          />
          </div>
          </>
        )}
      />
    </>
  );
};
