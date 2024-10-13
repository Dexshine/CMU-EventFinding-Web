import { Box, IconButton, Stack, Typography } from "@mui/material";
import React, { useMemo, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { convertImageToBase64 } from "../../../utils/function/global";
import { Cancel } from "@mui/icons-material";
import { v4 as uuid } from "uuid";

const baseStyle = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  cursor: "pointer",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  width: "100px",
  height: "100px",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function UploadImages({ uploadImages, setUploadImages }) {
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
    onDropRejected: () => {
      setErrorMessage("You can only upload up to 3 images.");
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  useEffect(() => {
    const convertFilesToBase64 = async () => {
      const base64Promises = acceptedFiles.map(async (file, index) => {
        return {
          id: `${uuid()}-${file.name.replace(/\s/g, "")}`,
          name: file.name,
          base64: await convertImageToBase64(file),
          file,
        };
      });
      const base64Results = await Promise.all(base64Promises);
      setUploadImages((prev) => [...prev, ...base64Results]);
      setErrorMessage("");
    };

    if (acceptedFiles.length > 0) {
      convertFilesToBase64();
    }
  }, [acceptedFiles]);

  console.log("uploadImages", uploadImages);

  const handleDeleteImage = (id) => {
    setUploadImages((prevImages) =>
      prevImages.filter((image) => image.id !== id)
    );
  };

  return (
    <Box>
      <Box>
        <h4>Upload event image (maximum is 3)</h4>
        {errorMessage && (
          <Typography color="error" variant="body2">
            {errorMessage}
          </Typography>
        )}
        <Stack spacing={2} direction="row">
          {uploadImages.map((file) => (
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
          {uploadImages.length < 3 && (
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

export default UploadImages;
