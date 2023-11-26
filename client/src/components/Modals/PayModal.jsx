import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { Card, CardContent, Grid, TextField } from "@mui/material";
import NestedPayModal from "./NestedPayModal";

export default function PayModal({ open, close, users }) {
  const onDecline = () => {
    close();
  };
  const [modalOpen,setModalOpen]=React.useState(false)
  const handleClose=()=>setModalOpen(false)

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          p: 10,
          borderRadius: 4,
          maxWidth: 500,
          textAlign: "center",
        }}
      >
        <Button
          sx={{ position: "absolute", top: 8, right: 8 }}
          color="inherit"
          onClick={onDecline}
        >
          {" "}
          <CloseIcon fontSize="large" />
        </Button>
        <Grid container>
          <Grid item>
          {users && users.length > 0 ? (
  users.map((user) => (
    <Card key={user.id} sx={{ m: 1 }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>{user.email}</Typography>
        <Button
          sx={{ m: 2 }}
          variant="outlined"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Pay
        </Button>
        {modalOpen && (
          <NestedPayModal
            open={modalOpen}
            close={handleClose}
            user={user}
            outerClose={close}
          />
        )}
      </CardContent>
    </Card>
  ))
) : (
  <div>
   <Typography>
    No Users Found
   </Typography>
  </div>
)}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
