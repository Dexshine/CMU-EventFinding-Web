import { FormControl } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const RHFDatePicker = ({ name, label, ...other }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        console.log("error", error);
        return (
          <FormControl fullWidth error={!!error}>
            <DateTimePicker
              {...field}
              label={label}
              ampm={false}
              slotProps={{
                textField: {
                  helperText: error?.message,
                  error: !!error,
                },
              }}
            />
          </FormControl>
        );
      }}
    />
  );
};

export default RHFDatePicker;
