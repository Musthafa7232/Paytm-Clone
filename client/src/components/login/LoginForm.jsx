import React, { useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import axios from "../../Axios";
import { useNavigate } from "react-router-dom";
import { Auth_user } from "../../features/AuthReducer";
import { useDispatch } from "react-redux";
function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      console.log(userData);
    }
  }, [userData]);

  const handleSubmit = () => {
    if (!loading) {
      setLoading(true);
      axios
        .post("/api/signin", userData)
        .then((res) => {
          if (res.data.success) {
            localStorage.setItem(
              "authorization.user",
              JSON.stringify(res.data.token)
            );
            dispatch(Auth_user());
            navigate("/");
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
            Login To Your Account
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

export default LoginForm;
