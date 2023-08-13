import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { Appbar } from "./components/Appbar";
import { HomePage } from "./components/HomePage";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { CreateCourse } from "./components/CreateCourse";
import { Courses } from "./components/Courses";
import { EditCourse } from "./components/EditCourse";
import { DrawerComponent } from "./components/Drawer";
import { atomUser } from "./store/atoms/user";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./config";
import { SignupParams, SignupType } from "@aniket22n/common/dist/zod";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <InitUser />
        <Appbar />
        <DrawerComponent />
        {/* All routes goes here */}
        <div
          style={{
            marginTop: "100px",
            marginLeft: "240px",
          }}
        >
          <Routes>
            <Route path={"admin/"} element={<HomePage />} />
            <Route path={"admin/signup"} element={<Signup />} />
            <Route path={"admin/login"} element={<Login />} />
            <Route path={"admin/addcourse"} element={<CreateCourse />} />
            <Route path={"admin/courses"} element={<Courses />} />
            <Route path={"admin/editcourse/:id"} element={<EditCourse />} />
          </Routes>
        </div>
      </Router>
    </RecoilRoot>
  );
}

//from @aniket22n/common package
const TokenValiditiy = SignupParams;
type TokenValType = SignupType;

function InitUser() {
  const redirect = useNavigate();
  const setUser = useSetRecoilState(atomUser);
  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/me`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      const user = TokenValiditiy.safeParse(response.data);
      if (user.success) {
        const data: TokenValType = user.data;
        setUser({
          isLoading: false,
          user: data,
        });
      } else {
        setUser({
          isLoading: false,
          user: {
            username: "",
            email: "",
            contactNumber: 0,
            password: "",
          },
        });
      }
    } catch (error) {}
    redirect("/admin");
  };

  useEffect(() => {
    init();
  }, []);
  return <></>;
}

export default App;
