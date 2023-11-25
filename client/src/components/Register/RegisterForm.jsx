import React, { useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import axios from "../../Axios";
import { useNavigate } from "react-router-dom";
function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      console.log(userData);
    }
  }, [userData]);

  const handleSubmit = () => {
    if (!loading) {
      setLoading(true);
      axios
        .post("/api/signup", userData)
        .then((res) => {
          if (res.data.success) {
            console.log("user Registered");
            navigate("/Login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
            }}
          >
            Create A New Account
          </Typography>
          <Grid
            sx={{
              m: 2,
            }}
          >
            <TextField
              fullWidth
              id="Email"
              label="Enter Your Email Id"
              type="email"
              variant="outlined"
              value={userData.email}
              onChange={(e) =>
                setUserData((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid
            sx={{
              m: 2,
            }}
          >
            <TextField
              fullWidth
              id="Password"
              label="Enter Your Password"
              type="password"
              variant="outlined"
              value={userData.password}
              onChange={(e) =>
                setUserData((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid
            sx={{
              m: 2,
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              {!loading ? "Continue" : "Loading"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default RegisterForm;
