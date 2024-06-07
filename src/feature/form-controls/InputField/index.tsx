import { TextField } from '@mui/material';
import React from 'react'
import { Control, Controller } from 'react-hook-form';

interface InputFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  error?: boolean;
  helperText?: string;
  className?: string;
  placeholder?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  name,
  control,
  label,
  error,
  helperText,
  className,
  placeholder,
}) => {

  return (
    <Controller
      name={name}
      control={control}
      render={({ field}) => (
        <TextField
          {...field}
          label={label}
          error={error}
          helperText={helperText}
          className={className}
          placeholder={placeholder}
          variant="outlined"
        />
      )}
    />
  );
};

