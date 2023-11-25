import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useState,useEffect } from "react";
import PaymentIcon from "@mui/icons-material/Payment";
import PayModal from "../Modals/PayModal";
import RequestMoneyModal from "../Modals/RequestMoneyModal";
import { useSelector } from "react-redux";
import axios from "../../Axios";
function WalletBalanceCard() {
    const { user } = useSelector((state) => state.user);
    const [paymodal, setPayModal] = useState(false)
    const [requestmodal, setRequestModal] = useState(false)
    const handlePayClose = () => setPayModal(false);
    const handleRequestClose = () => setRequestModal(false);
const [users,setUsers]=useState([])
    useEffect(()=>{
axios.get('/api/getAllUsers',{ headers: {
    "auth-token": JSON.parse(localStorage.getItem("authorization.user")),
  },}).then((res)=>{
if(res.data.success){
setUsers(res.data.users)
}
  })
    },[])
  return (
    <Grid item xs={12} lg={12} container sx={{ mt: 4 }}>
      <Card
        className="CardItems"
        variant="outlined"
        sx={{
          width: "100%",
          minHeight: "40vh",
          borderRadius: 6,
          backgroundColor: "rgba(255, 255, 255, 0.7)",
        }}
      >
        <CardContent>
            <PayModal  open={paymodal} close={handlePayClose}/>
            <RequestMoneyModal  open={requestmodal} close={handleRequestClose}/>
          <Grid
            container
            sx={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              p: 10,
            }}
          >
             <Grid item xs={12} sx={{
                mb:2
             }}>
               <Typography variant="h5" sx={{ fontWeight: 700 }}>
               Hi {user.email}
              </Typography> 
             </Grid>
         
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Total Wallet Balance
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                ₹ {user?.walletBalance?user.walletBalance:0}
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{
                mt:3
            }}>
              <Grid
                sx={{
                  display: { xs: "block", md: "flex" },
                  justifyContent: "space-between",
                }}
              >
                <Button
                  sx={{
                    mr: { xs: 0, md: 2 },
                    mb: { xs: 2, md: 0 },
                  }}
                  fullWidth
                  variant="outlined"
                  startIcon={<PaymentIcon />}
                  onClick={()=>setPayModal(true)}
                >
                  Pay
                </Button>
                <Button
                  sx={{
                    mr: { xs: 0, md: 2 },
                    mb: { xs: 2, md: 0 },
                  }}
                  fullWidth
                  variant="outlined"
                  startIcon={<PaymentIcon />}
                  onClick={()=>setRequestModal(true)}
                >
                  Request Money
                </Button>
                <Button
                  sx={{
                    mr: { xs: 0, md: 2 },
                    mb: { xs: 2, md: 0 },
                  }}
                  fullWidth
                  variant="outlined"
                  startIcon={<PaymentIcon />}
                >
                  Account Statement
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
    </Grid>
  );
}

export default WalletBalanceCard;
