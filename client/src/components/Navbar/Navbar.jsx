import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import LogoutIcon from "@mui/icons-material/Logout";
import { Grid, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ClearUserData, SetUserData } from "../../features/userReducer";
import { Clear_user } from "../../features/AuthReducer";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../Axios";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { auth } = useSelector((state) => state.auth);
  React.useEffect(() => {
    axios
      .get("/api/userData", {
        headers: {
          "auth-token": JSON.parse(localStorage.getItem("authorization.user")),
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          dispatch(SetUserData(res.data));
        } else {
          dispatch(ClearUserData());
          dispatch(Clear_user());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [auth]);
  const logoutHandler = () => {
    localStorage.removeItem("authorization.user");
    dispatch(ClearUserData());
    dispatch(Clear_user());
    navigate("/");
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Grid container>
            <Grid
              sx={{
                alignItems: "center",
              }}
              item
              xs={5}
            >
              <img
                style={{
                  cursor: "pointer",
                }}
                onClick={() => navigate("/")}
                src="https://pwebassets.paytm.com/commonwebassets/paytmweb/header/images/logo.svg"
              ></img>
            </Grid>
            {user && (
              <Grid
                item
                xs={7}
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                }}
                onClick={logoutHandler}
              >
                <LogoutIcon sx={{ marginRight: "0.75rem" }} />
                Logout
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
