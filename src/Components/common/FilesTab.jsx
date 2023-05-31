import "react-dropzone-uploader/dist/styles.css";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";
import React, { useCallback, useEffect, useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import axios from "axios";
import subjectApi from "../../api/modules/subjects.api";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { getFID } from "web-vitals";
import { Button, Stack } from "@mui/material";
import { saveAs } from "file-saver";

/* LOADING COMPONENT EXPORT */
function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
/* MAIN SCREEN */
const FilesTab = () => {
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState();
  const [fileUploaded, setFileUploaded] = useState({
    fileName: "",
    percentCompleted: 0,
  });
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDownload = async (fileName) => {
    const { response, err } = await subjectApi.dowloadFile(fileName);
    if (response) {
      const blob = new Blob([response.data]);
      saveAs(blob, fileName);
    } else {
      console.log("Error downloading", err);
    }
  };

  const onDrop = async (acceptedFiles) => {
    console.log(acceptedFiles[0]);
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("description", "Your file description");
    formData.append("file", file);
    // Replace with your actual description

    try {
      setTimeout(() => {
        setProgress(50); // Update progress to 50% after 1.5 seconds
        setTimeout(() => {
          setProgress(100); // Update progress to 100% after 3 seconds
          // Send the formData to the backend here

          toast.success("Upload success", {
            position: "bottom-left",
          });
          setTimeout(() => {
            setUploadProgress(0);
            setProgress(0);
          }, 1000);
        }, 1500);
      }, 1500);

      const { response, err } = await subjectApi.uploadFile(formData); // Call the `uploadFile` function from the subjectApi module
      if (response) {
        setUploadProgress(100);
        console.log("Upload success:", response.data);
      } else console.error("Upload error:", err);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    const getList = async () => {
      const { response, err } = await subjectApi.getFiles();
      if (response) {
        setFiles(response);
        console.log(response);
      } else
        console.log({
          err,
        });
    };
    getList();
  }, []);

  return (
    <div style={{ paddingLeft: 55, paddingRight: 25 }}>
      <Dropzone onDrop={(acceptedFiles) => onDrop(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            style={{
              width: "50%",
              marginLeft: "auto",
              marginRight: "auto",
              cursor: "pointer",
            }}
          >
            <input {...getInputProps()} />
            <div
              style={{
                borderStyle: "dashed",
                borderColor: "blue",
                borderWidth: 2,
                paddingTop: 15,
                paddingBottom: 10,
              }}
            >
              <FileUploadIcon fontSize="large" color="primary" />
              <p>Drag and drop here</p>
            </div>
          </div>
        )}
      </Dropzone>
      {uploadProgress > 0 && <LinearProgressWithLabel value={progress} />}
      <Stack direction={"column"}>
        {files &&
          files.map((item) => (
            <div>
              <span style={{ fontWeight: "bold" }}>•</span>{" "}
              {/* Bold bullet point */}
              <Button onClick={() => handleDownload(item)}>{item}</Button>
            </div>
          ))}
      </Stack>
    </div>
  );
};
export default FilesTab;
