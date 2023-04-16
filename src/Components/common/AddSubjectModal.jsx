// Render Prop
import React from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import subjectApi from "../../api/modules/subjects.api";
import userApi from "../../api/modules/users.api";
import { Button, Grid, TextField } from "@mui/material";

const AddSubjectModal = (props) => {
  /* SUBMITTING FUNCTION */
  const formik = useFormik({
    initialValues: {
      name: "",
      teacher: "",
    },

    onSubmit: async (values, { setSubmitting }) => {
      const data = {
        name: values.name,
        description: values.teacher,
      };
      const userId = localStorage.getItem("userId");
      /* const { response, err } = await subjectApi.addSubject(data); */
      const { response, err } = await userApi.addSubjectB(userId, data);

      if (response) {
        console.log(response);
        setSubmitting(false);
        props.onSucces();
        formik.values.name = "";
        formik.values.teacher = "";
      } else
        console.log({
          err,
        });
    },
  });
  return (
    <div>
      <h1>Create Subject!</h1>

      <Formik>
        {({ isSubmitting }) => (
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3} direction={"column"}>
              <Grid item md={10}>
                <TextField
                  id="outlined-basic"
                  label="name"
                  variant="outlined"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  sx={{ width: "100%" }}
                />
              </Grid>

              <Grid item>
                <TextField
                  id="outlined-basic"
                  label="teacher"
                  value={formik.values.teacher}
                  variant="outlined"
                  name="teacher"
                  onChange={formik.handleChange}
                  sx={{ width: "100%" }}
                />
              </Grid>

              <Button
                variant="contained"
                color="success"
                type="submit"
                disabled={isSubmitting}
              >
                Success
              </Button>
            </Grid>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddSubjectModal;
