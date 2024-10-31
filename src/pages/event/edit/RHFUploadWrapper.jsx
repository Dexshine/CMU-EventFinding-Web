import { Box, IconButton, Stack, Typography } from "@mui/material";
import React, { useMemo, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { convertImageToBase64 } from "../../../utils/function/global";
import { Cancel } from "@mui/icons-material";
import { v4 as uuid } from "uuid";
import { Controller, useFormContext } from "react-hook-form";

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function RHFUpload({ value, onChange, error }) {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 3,
    onDrop: (acceptedFiles) => {
      const prevFiles = value.map((file) => file.file);

      const totalSize = [...prevFiles, ...acceptedFiles].reduce(
        (acc, file) => acc + file.size,
        0
      );

      if (totalSize > 5 * 1024 * 1024) {
        setErrorMessage("ขนาดไฟล์รวมต้องไม่เกิน 5 MB");
      } else {
        setErrorMessage("");
        convertFilesToBase64(acceptedFiles);
      }
    },
    onDropRejected: () => {
      setErrorMessage("เลือกรูปภาพได้สูงสุด 3 รูป");
    },
  });

  const baseStyle = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    cursor: "pointer",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: error ? "red" : "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
    width: "100px",
    height: "100px",
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const convertFilesToBase64 = async (files) => {
    const base64Promises = files.map(async (file) => {
      return {
        id: `${uuid()}-${file.name.replace(/\s/g, "")}`,
        name: file.name,
        base64: await convertImageToBase64(file),
        file,
      };
    });
    const base64Results = await Promise.all(base64Promises);
    onChange([...value, ...base64Results]);
  };

  const handleDeleteImage = (id) => {
    onChange(value.filter((image) => image.id !== id));
  };

  return (
    <Box>
      <Box>
        <Typography variant="h6">อัพโหลดรูปภาพ (สูงสุด 3 รูป )</Typography>
        <Typography variant="caption" gutterBottom>
          ไฟล์ที่อนุญาต JPG, JPEG และ PNG
        </Typography>
        {errorMessage && (
          <Typography color="error" variant="body2" gutterBottom>
            {errorMessage}
          </Typography>
        )}
        <Typography color="error" variant="body2">
          {error?.message}
        </Typography>
        <Stack spacing={2} direction="row">
          {value.map((file) => (
            <Box key={file.id} position="relative">
              <IconButton
                sx={{
                  position: "absolute",
                  top: "-10px",
                  right: "-10px",
                  zIndex: 1,
                  bgcolor: "white",
                  p: 0,
                }}
                onClick={() => handleDeleteImage(file.id)}
              >
                <Cancel />
              </IconButton>
              <img
                src={file.base64}
                alt={file.id}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </Box>
          ))}
          {value.length < 3 && (
            <Box width="100px">
              <Box {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>Upload images</p>
              </Box>
            </Box>
          )}
        </Stack>
      </Box>
    </Box>
  );
}

function RHFUploadWrapper() {
  const { control } = useFormContext();

  return (
    <Controller
      name="uploadImages"
      control={control}
      defaultValue={[]}
      render={({ field, fieldState: { error } }) => (
        <RHFUpload
          value={field.value}
          onChange={field.onChange}
          error={error}
        />
      )}
    />
  );
}

export default RHFUploadWrapper;
