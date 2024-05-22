import { TextField } from '@mui/material';
import React from 'react'
import { Controller } from 'react-hook-form';

export const InputField = ({ name, label, control, rules }) => {

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          variant="outlined"
          error={!!error}
          helperText={error ? error.message : ''}
        />
      )}
    />
  );
};

