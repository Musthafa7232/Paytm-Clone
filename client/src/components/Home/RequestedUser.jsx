import {
    Button,
    Card,
    CardContent,
    Grid,
    InputAdornment,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
  function RequestedUser() {
    const [amount, setAmount] = useState("1000");
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
              
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    );
  }
  
  export default RequestedUser;
  