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
function AddBalanceCard() {
  const [amount, setAmount] = useState("1000");
  return (
    <Grid item xs={12} lg={4} container sx={{ mt: 4 }}>
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
              p: 10,
            }}
          >
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Add Money To Your Wallet
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                mt: 2,
              }}
            >
              <TextField
                id="outlined-basic"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CurrencyRupeeIcon />
                    </InputAdornment>
                  ),
                }}
                type="number"
                value={amount}
                variant="outlined"
                onChange={(e)=>setAmount(e.target.value)}
              />
            </Grid>
            <Grid item sx={{ my: 2, mx: 12 }}>
              <Button variant="outlined">Add</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default AddBalanceCard;
