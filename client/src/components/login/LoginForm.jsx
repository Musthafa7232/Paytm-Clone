import React, { useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import axios from "../../Axios";
import { useNavigate } from "react-router-dom";
import { Auth_user } from "../../features/AuthReducer";
import { useDispatch } from "react-redux";
import BoilerPlateCode from "../Tostify/BoilerPlateCode";
import { Link } from 'react-router-dom';
function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [open,setOpen]=useState(false)
  const[totp,setTotp]=useState('')
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
      const data={
        email:userData.email,
        password:userData.password,
        totp:totp
      }
      axios
        .post("/api/signin", data)
        .then((res) => {
          if (res.data.Verifiedsuccess) {
            localStorage.setItem(
              "authorization.user",
              JSON.stringify(res.data.token)
            );
            dispatch(Auth_user());
            navigate("/");
          }else if(res.data.success){
             setOpen(true)
              setLoading(false)
          }
        })
        .catch((err) => {
          setLoading(false)
          settost({
            data:err.response.data.message,
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
            Login To Your Account
          </Typography>
        {open?(
           <Grid
           sx={{
             m: 2,
           }}
         >
           <TextField
           fullWidth
           id="totp"
           label="Enter the totp displayed on your Authenticator App"
           type="number"
           variant="outlined"
           value={totp}
           onChange={(e) => setTotp(e.target.value)}
         />
         </Grid>
        ):(
          <Grid>
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
            </Grid>
        )}  
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
        {!open&&<Typography sx={{display:'block',textAlign:'center',mt:2}} variant="p" gutterBottom>
      Don't Have an Account?<Link style={{color:'black'}} to="/signup">Signup</Link>
      </Typography>}     
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default LoginForm;
