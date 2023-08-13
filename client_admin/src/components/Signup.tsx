import { Button, Card, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { atomUser } from "../store/atoms/user";
import { BASE_URL } from "./../config";
import "./../style/LoginSignup.css";
import { SignupParams, SignupType } from "@aniket22n/common/dist/zod";

//Main Function
export function Signup() {
  const redirect = useNavigate();
  const setUser = useSetRecoilState(atomUser);

  //Initial State
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState(0);
  const [password, setPassword] = useState("");

  //Function to hit admin/signup Route on backend server
  async function handleSignup() {
    const input = { username, email, contactNumber, password };
    const requestBody = SignupParams.safeParse(input);
    if (requestBody.success) {
      const body: SignupType = requestBody.data;
      const response = await axios.post(`${BASE_URL}/admin/signup`, body);
      if (response.data.token) {
        localStorage.setItem("token", `Bearer ${response.data.token}`);
        setUser({
          isLoading: false,
          user: response.data.user,
        });
        redirect("/admin");
      } else alert(response.data.message);
    } else alert("Invalid Details");
  }

  //Signup Component
  return (
    <div className="main-div">
      <div className="main-container-signup">
        <Card className="sub-container-signup1">
          <Typography className="title-signup" variant="h4">
            Signup
          </Typography>

          <TextField
            fullWidth
            variant="filled"
            label="Enter your name"
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            fullWidth
            type="email"
            variant="filled"
            label="Enter valid email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            fullWidth
            variant="filled"
            label="10 digits phone number"
            onChange={(event) => setContactNumber(Number(event.target.value))}
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
            onClick={handleSignup}
          >
            Signup
          </Button>
        </Card>

        <Card className="sub-container-signup2">
          <Typography>
            Already Signed up?{" "}
            <span>
              <Button size="small" onClick={() => redirect("/admin/login")}>
                Click here to login
              </Button>
            </span>
          </Typography>
        </Card>
      </div>
    </div>
  );
}
