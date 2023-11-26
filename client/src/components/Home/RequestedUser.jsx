import {
    Button,
    Card,
    CardContent,
    Grid,
    InputAdornment,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useState,useEffect } from "react";
  import axios from '../../Axios'
  import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
  function RequestedUser() {
    const [amount, setAmount] = useState("1000");
    const [requests,setRequests]=useState([])
    useEffect(()=>{
      axios.get('/api/getAllRequests',{ headers: {
        "auth-token": JSON.parse(localStorage.getItem("authorization.user")),
      },}).then((res)=>{
        console.log(res.data);
        setRequests(res.data.requests)
      }).catch(err=>{
        console.log(err);
      })
    },[])
  
    return (
      <Grid item xs={12} lg={8} container sx={{ mt: 4 }}>
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
            <Grid
              container
              sx={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item xs={12}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Money Requested By Others
                </Typography>
              </Grid>
              <Grid item xs={12}>
              {requests.map((details) => {
                  return (
                    <Card sx={{ my: 4, height: "4rem" }}>
                      <CardContent >
                        <Grid
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography textAlign={"start"}>
                          {details.from.email}
                          </Typography>
                          
                          <Typography textAlign={"end"}>
                          ₹ {details.amount}
                          </Typography>
                        </Grid>
                      </CardContent>
                    </Card>
                  );
                })}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    );
  }
  
  export default RequestedUser;
  