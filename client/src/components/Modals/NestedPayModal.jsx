import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material'
import React,{useState} from 'react'

import CloseIcon from "@mui/icons-material/Close";
import axios from '../../Axios';
import { useDispatch } from 'react-redux';
import { SetUserData } from '../../features/userReducer';
function NestedPayModal({open,close,user,outerClose}) {
    const dispatch=useDispatch()
    const [amount,setAmount]=useState(0)
    const onDecline = () => {
        close();
      };

      const handleSendMoney=()=>{
        const data={
            amount:amount,
            receiverUserId:user._id
        }
        axios.post('/api/payment/pay',data,{headers: {
            "auth-token": JSON.parse(localStorage.getItem("authorization.user")),
          }}).then(res=>{
            if(res.data.success){
dispatch(SetUserData(res.data.user))
outerClose()
close()

            }
          })
      }
  return (
    <div>
        <Modal
      open={open}
      onClose={() => handleClose()}
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
        <Grid>
            <Typography fontWeight='700'>
                Pay {user.email}
            </Typography>
            <Grid sx={{display:'flex' ,alignItems:'center',mt:2}}>
              <TextField   type="number" label='Enter the Amount' value={amount} onChange={(e)=>setAmount(parseInt(e.target.value, 10))}/>
            <Button onClick={handleSendMoney}>
               Send Money
            </Button>   
            </Grid>
           
        </Grid>
      </Box>
      </Modal>
    </div>
  )
}

export default NestedPayModal