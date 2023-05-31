import "react-dropzone-uploader/dist/styles.css";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";
import React, { useCallback, useEffect, useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import axios from "axios";
import subjectApi from "../../api/modules/subjects.api";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
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
  const [loading, setLoading] = useState(true);
  const [fileUploaded, setFileUploaded] = useState({
    fileName: "",
    percentCompleted: 0,
  });
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDownload = (fileName) => {
    const downloadLink = document.createElement("a");
    downloadLink.href = `${subjectApi.dowloadFile(fileName)}`;
    downloadLink.download = fileName;
    downloadLink.click();
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
      setLoading(true);
      const { response, err } = await subjectApi.getFiles();
      if (response) {
        setFiles(response);
        console.log(response);
      } else
        console.log({
          err,
        });
      setLoading(false);
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
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 400,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Stack direction={"column"}>
          <Stack direction={"column"}>
            {files &&
              files.map((item) => (
                <div key={item}>
                  <span style={{ fontWeight: "bold" }}>•</span>
                  <Button onClick={() => handleDownload(item)}>{item}</Button>
                </div>
              ))}
          </Stack>
        </Stack>
      )}
    </div>
  );
};
export default FilesTab;
