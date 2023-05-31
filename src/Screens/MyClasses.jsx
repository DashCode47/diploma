import React, { useEffect, useState } from "react";
import { Box, Grid, IconButton, Modal } from "@mui/material";
import NavBar from "../Components/common/NavBar";
import CardComponent from "../Components/common/CardComponent";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddSubjectModal from "../Components/common/AddSubjectModal";
import { ToastContainer, toast } from "react-toastify";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import subjectApi from "../api/modules/subjects.api";
import JoinSubjectModal from "../Components/common/JoinSubjectModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const MyClasses = () => {
  const [open, setOpen] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpenJoin = () => setOpenJoin(true);
  const handleClose = () => setOpen(false);
  const handleCloseJoin = () => setOpenJoin(false);
  const [data, setData] = useState([]);
  const userId = localStorage.getItem("userId");
  const [refresh, setRefresh] = useState(false);

  const onSucces = () => {
    setRefresh(true);
    toast.success("subject added", {
      position: "bottom-left",
    });
  };

  useEffect(() => {
    const getList = async () => {
      const { response, err } = await subjectApi.getUserSubjects(userId);
      if (response) {
        setData(response);
      } else
        console.log({
          err,
        });
    };
    getList();
  }, [refresh]);

  return (
    <Box sx={{ display: "flex", marginTop: 10 }}>
      <NavBar />
      <ToastContainer autoClose={1000} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddSubjectModal onSucces={onSucces} />
        </Box>
      </Modal>

      <Modal
        open={openJoin}
        onClose={handleCloseJoin}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <JoinSubjectModal
            onSucces={onSucces}
            handleCloseJoin={handleCloseJoin}
          />
        </Box>
      </Modal>

      <Box component={"main"} sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={2}>
          {data.map((item, index) => (
            <Grid item xs={6} md={3} key={index}>
              <CardComponent item={item} />
            </Grid>
          ))}
        </Grid>
        <IconButton
          sx={{ position: "absolute", bottom: 10, right: 10 }}
          onClick={handleOpen}
        >
          <AddCircleIcon sx={{ fontSize: 50 }} />
        </IconButton>

        <IconButton
          sx={{ position: "absolute", bottom: 10, right: 100 }}
          onClick={handleOpenJoin}
        >
          <GroupAddIcon sx={{ fontSize: 50 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MyClasses;
