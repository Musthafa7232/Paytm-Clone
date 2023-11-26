import React, { useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import axios from "../../Axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import BoilerPlateCode from "../Tostify/BoilerPlateCode";
function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    otp: "",
  });
  const [qr, setQr] = useState("");
  const [topt, setTotp] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [tost, settost] = useState({});
  const initial={
    open:false,
    success:false,
    data:''
  }
  useEffect(()=>{
settost(initial)
  },[])

  const setToastClosed=()=>{
    settost(initial)
  }
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
            setUserData(res.data.user);
            setOpen(true);
            setLoading(false);
            // navigate("/Login");
          }
        })
        .catch((err) => {
          setLoading(false);
          settost({
            data:err.response.data.message,
            success:false,
            open:true
           })
          console.log(err);
        });
    }
  };
  const handleOtp = () => {
    if (!loading) {
      setLoading(true);
      const data = {
        userId: userData._id,
        otp: userData.otp,
      };
      axios
        .post("/api/verifyotp", data)
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            setUserData(res.data.user);
            setOpen(false);
            setQr(res.data.qr);
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          settost({
            data:err.response.data.message,
            success:false,
            open:true
           })
          console.log(err);
        });
    }
  };

  const handleTotp = () => {
    console.log('hi');
    if (!loading) {
      setLoading(true);
      const data = {
        userId: userData._id,
        totp: topt,
      };
      axios
        .post("/api/verifytotp", data)
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            console.log("user Registered");
            navigate("/Login");
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          settost({
            data:'Some Error Occured try Again Later',
            success:false,
            open:true
           })
          console.log(err);
        });
    }
  };

  return (
    <div>
      <BoilerPlateCode success={tost.success} open={tost.open} data={tost.data} setToastClosed={setToastClosed} />
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
          {qr ? (
            <Grid></Grid>
          ) : (
            <Grid>
              <Grid
                sx={{
                  m: 2,
                }}
              >
                <TextField
                  fullWidth
                  disabled={open}
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
                  disabled={open}
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
          
          {open && (
            <Grid
              sx={{
                m: 2,
              }}
            >
              <TextField
                fullWidth
                id="otp"
                label="Enter the otp sent to your email"
                type="number"
                variant="outlined"
                value={userData.otp}
                onChange={(e) =>
                  setUserData((prevState) => ({
                    ...prevState,
                    otp: e.target.value,
                  }))
                }
              />    <Grid
            sx={{
              m: 2,
            }}
          >
           
          </Grid>
            </Grid>
          )}  
           {open ? (
              <Button
                variant="outlined"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                onClick={qr ? handleTotp : handleOtp}
              >
                {!loading ? "Continue" : "Loading"}
              </Button>
            ) : (  <>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                {!loading ? "Continue" : "Loading"}
              </Button>
              <Typography sx={{display:'block',textAlign:'center',mt:2}} variant="p" gutterBottom>
              Already Have an Account?<Link style={{color:'black'}} to="/login">Signin</Link>
             </Typography>
             </>
            )}
          </Grid>
          )}
          {qr && (
            <Grid
              sx={{
                m: 2,
              }}
            >
              <img src={qr} />
              <TextField
                fullWidth
                id="totp"
                label="Enter the totp displayed on your Authenticator App"
                type="number"
                variant="outlined"
                value={topt}
                onChange={(e) => setTotp(e.target.value)}
              />
               <Button
                variant="outlined"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                onClick={ handleTotp }
              >
                {!loading ? "Continue" : "Loading"}
              </Button>
            </Grid>
          )}
      
        </Grid>
      </Grid>
    </div>
  );
}

export default RegisterForm;
