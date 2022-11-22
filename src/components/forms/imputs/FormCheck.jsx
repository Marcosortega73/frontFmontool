import { Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'

export const FormCheck = ({control,register,errors ,name, rulesBol, variant, labelText }) => {

    
  return (
    <>
    
    <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
            <FormControlLabel  
            control={<Checkbox {...field}
             />}
            label={labelText}
          
            />
        )}
      />
    
    
    
    </>
  )
}

{/* <Checkbox
{...field}
{...register(name)}
variant={variant}
label="Hola"
size="medium"
autoComplete="off"
/> */}

{/* <FormControlLabel
value="top"
control={<Checkbox />}
label="Top"
labelPlacement="top"
/> */}

{/* <FormControlLabel
            control={
              <Checkbox  {...field}
              {...register(name)}
              
              />
            }
            label={labelText}
          /> */}