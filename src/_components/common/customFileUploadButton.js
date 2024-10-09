import React, { useState } from 'react';
import { Grid, Button, Chip, Box, TextField } from '@mui/material';

const CustomFileUpload = ({ buttonType, className, buttonText, onChange }) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    if (onChange) {
      onChange(newFiles);
    }
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleDelete = (fileToDelete) => () => {
    const updatedFiles = files.filter((file) => file !== fileToDelete);
    setFiles(updatedFiles);
    if (onChange) {
      onChange(updatedFiles);
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <input
          id="fileInput"
          type="file"
          style={{ display: 'none' }}
          multiple
          onChange={handleFileChange}
          accept="image/*"
        />
        <Button
          variant={buttonType}
          color="primary"
          onClick={handleButtonClick}
          className={className}
        >
          {buttonText}
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" flexWrap="wrap" gap={1} className="mb-3">
          {files.map((file, index) => (
            <Chip
              key={index}
              label={file.name}
              onDelete={handleDelete(file)}
              deleteIcon={"Delete"}
            />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default CustomFileUpload;
