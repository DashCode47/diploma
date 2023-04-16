// Render Prop
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import { Button, Grid, TextField, Item } from "@mui/material";
import subjectApi from "../../api/modules/subjects.api";
import { ToastContainer, toast } from "react-toastify";

const JoinSubjectModal = ({ handleCloseJoin }) => {
  const [code, setCode] = useState();
  const userId = localStorage.getItem("userId");
  const getCode = (e) => {
    setCode(e.target);
  };

  /* SUBMITTING FUNCTION */
  const handleSubmit = async () => {
    console.log(code);
    const { response, err } = await subjectApi.addUserToSubject(code, userId);
    if (response) {
      handleCloseJoin();
      toast.success("You are in", {
        position: "bottom-left",
      });
    } else console.log({ err });
  };

  return (
    <div>
      <h2>Join a subject!</h2>

      <Grid container spacing={2} direction={"column"}>
        <Grid item>
          <TextField
            id="outlined-basic"
            label="Enter code"
            variant="outlined"
            name="code"
            size="small"
            onChange={(e) => setCode(e.target.value)}
            sx={{ width: "100%" }}
          />
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="success"
            type="submit"
            onClick={handleSubmit}
            size="small"
          >
            Success
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default JoinSubjectModal;
