import {
  Button,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import axios from "../../Axios";
import { useDispatch } from "react-redux";
import { SetUserData } from "../../features/userReducer";
function TransactionCard() {
  const [amount, setAmount] = useState(1000);
  const [payments, setPayments] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    axios
      .get("/api/accountStatement", {
        headers: {
          "auth-token": JSON.parse(localStorage.getItem("authorization.user")),
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          setPayments(res.data.details);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString(); // Adjust the format based on your needs
  };

  return (
    <div>
      <Grid item xs={12} lg={12} container sx={{ mt: 4 }}>
        <Card
          className="CardItems"
          variant="outlined"
          sx={{
            width: "100%",
            minHeight: "50vh",
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
                width: "100%",
                p: 5,
              }}
            >
              <Grid item xs={12}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Total Wallet Balance
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  ₹ {user?.walletBalance ? user.walletBalance : 0}
                </Typography>
              </Grid>

              <Grid item xs={12} sx={{ mt: 3 }}>
                {payments.map((details) => {
                  return (
                    <Card sx={{ my: 7, height: "4rem" }}>
                      <CardContent>
                        <Grid
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography textAlign={"start"}>
                            {details.from._id === details.to._id
                              ? "Self Credited"
                              : details.from._id === user._id
                              ? `Paid to ${details.to.email}`
                              : `Paid by ${details.from.email}`}
                          </Typography>
                          
                          <Typography textAlign={"end"}>
                          ₹ {details.amount}
                          </Typography>
                        </Grid><Typography variant="caption">
                          {formatCreatedAt(details.createdAt)}
                          </Typography>
                      </CardContent>
                    </Card>
                  );
                })}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default TransactionCard;
