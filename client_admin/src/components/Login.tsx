import { Button, Card, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { atomUser } from "../store/atoms/user.tsx";
import axios from "axios";
import { BASE_URL } from "./../config.ts";
import "../style/LoginSignup.css";
import { LoginParams, LoginType } from "@aniket22n/common/dist/zod";

//Main Function
export function Login() {
  const setUser = useSetRecoilState(atomUser);
  const redirect = useNavigate();

  //Initial State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //Function to hit admin/login Route on backend servers
  async function handleLogin() {
    const requestBody = LoginParams.safeParse({ username, password });
    if (requestBody.success) {
      const body: LoginType = requestBody.data;
      const response = await axios.post(`${BASE_URL}/admin/login`, body);
      if (response.data.token) {
        localStorage.setItem("token", `Bearer ${response.data.token}`);
        setUser({
          isLoading: false,
          user: response.data.user,
        });
        redirect("/admin");
      } else alert(response.data.message);
    } else return alert("Invalid Details");
  }

  //Login Component
  return (
    <div className="main-div">
      <div className="main-container-signup">
        <Card className="sub-container-signup1">
          <Typography className="title-signup" variant="h4">
            Login
          </Typography>

          <TextField
            fullWidth
            variant="filled"
            label="Enter your name"
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            fullWidth
            type="password"
            variant="filled"
            label="Create password"
            onChange={(event) => setPassword(event.target.value)}
          />

          <Button
            className="button-signup"
            variant="contained"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Card>

        <Card className="sub-container-signup2">
          <Typography>
            Don't have an Account?{" "}
            <span>
              <Button size="small" onClick={() => redirect("/admin/signup")}>
                create Account
              </Button>
            </span>
          </Typography>
        </Card>
      </div>
    </div>
  );
}
