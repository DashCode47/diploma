import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import { IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { ToastContainer, toast } from "react-toastify";

const percentage = 0;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

export default function CardComponent({ item }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const goToDetails = (item) => {
    navigate("/DetailClass", { state: { item } });
  };

  return (
    <Box sx={{ width: 275, position: "relative" }}>
      <Card variant="outlined">
        <React.Fragment>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Stack
                sx={{
                  flex: 1,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">Subject Id</Typography>
                <Stack
                  direction={"horizontal"}
                  spacing={3}
                  sx={{
                    flex: 1,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">{item.id}</Typography>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      navigator.clipboard.writeText(item.id);
                      toast.success("Coppied to clipboard", {
                        position: "bottom-left",
                      });
                    }}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </Stack>
              </Stack>
            </Box>
          </Modal>
          <CardContent>
            <Stack justifyContent={"center"} alignItems={"center"} spacing={3}>
              <Stack
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={3}
              >
                <IconButton
                  sx={{ position: "absolute", top: 3, right: 5 }}
                  onClick={handleOpen}
                >
                  <InfoIcon />
                </IconButton>
                <div style={{ width: 100, height: 100 }}>
                  <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                  />
                </div>
                <Stack justifyContent={"center"} alignItems={"center"}>
                  <Stack
                    direction={"row"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Typography variant="h5">0/</Typography>
                    <Typography>20</Typography>
                  </Stack>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Assistance
                  </Typography>
                </Stack>
              </Stack>

              <Typography variant="h5" component="div">
                {item.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {item.description}
              </Typography>
            </Stack>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => goToDetails(item)}>
              Learn More
            </Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}
