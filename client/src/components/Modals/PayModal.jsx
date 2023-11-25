import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from "@mui/icons-material/Close";


export default function PayModal({open,close}) {
    const onDecline = () => {
        close();
      };
      React.useEffect(()=>{
console.log(open);
      },[open])
  return (
      <Modal
        open={open}
        onClose={()=>handleClose()}
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
        > <CloseIcon fontSize="large" /></Button>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
  );
}