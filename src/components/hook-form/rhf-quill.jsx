import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import ReactQuill from "react-quill";

const RHFQuill = ({ name, label, ...other }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <ReactQuill theme="snow" value={value} onChange={onChange} />
      )}
      {...other}
    />
  );
};

export default RHFQuill;
