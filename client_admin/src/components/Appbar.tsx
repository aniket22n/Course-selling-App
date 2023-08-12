import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { profile, logout, title } from "./content";
import {
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Button,
  AppBar,
  Typography,
} from "@mui/material";
import "../style/Appbar.css";
import { useNavigate } from "react-router-dom";
import { atomUser } from "../store/atoms/user";

export function Appbar() {
  const userValue = useRecoilValue(atomUser);
  const login =
    userValue.user.username != "" ? <Authorized /> : <Unauthorized />;

  return (
    <div>
      <AppBar
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        color="inherit"
      >
        <div className="Appbar">
          {title}
          {login}
        </div>
      </AppBar>
    </div>
  );
}

//Component to Display User image
function Authorized() {
  const redirect = useNavigate();
  const setUser = useSetRecoilState(atomUser);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCLose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div className="appbar-admin">
        <Typography variant="overline" fontSize={"16px"}>
          Admin
        </Typography>
        <IconButton onClick={handleMenu}>
          <Avatar
            variant="circular"
            src="https://avatars.githubusercontent.com/u/69907734?v=4"
          />
        </IconButton>
      </div>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={Boolean(anchorEl)}
        onClose={handleCLose}
      >
        <MenuItem onClick={handleCLose}>{profile}</MenuItem>
        <MenuItem
          onClick={() => {
            localStorage.setItem("token", "");
            setUser({
              isLoading: false,
              user: {
                username: "",
                email: "",
                contactNumber: 0,
                password: "",
              },
            });
            redirect("/admin");
          }}
        >
          {logout}
        </MenuItem>
      </Menu>
    </div>
  );
}

//Component to Display Login and Signup buttons
function Unauthorized() {
  const redirect = useNavigate();
  //const setUser = useSetRecoilState(atomUser);

  return (
    <div className="Button-Group">
      <Button
        color="info"
        variant="contained"
        className="Button"
        onClick={() => redirect("admin/signup")}
      >
        Signup
      </Button>
      <Button
        color="info"
        variant="contained"
        className="Button"
        onClick={() => redirect("admin/login")}
      >
        Login
      </Button>
    </div>
  );
}
