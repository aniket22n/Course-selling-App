import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Appbar } from "./components/Appbar";
import { HomePage } from "./components/HomePage";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { CreateCourse } from "./components/CreateCourse";
import { Courses } from "./components/Courses";
import { EditCourse } from "./components/EditCourse";
import { PurchaseCourse } from "./components/PurchaseCourse";
import { Purchased } from "./components/Purchased";
import { DrawerComponent } from "./components/Drawer";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Appbar />
        <DrawerComponent />
        {/* All routes goes here */}
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/addcourse"} element={<CreateCourse />} />
          <Route path={"/courses"} element={<Courses />} />
          <Route path={"/editcourses"} element={<EditCourse />} />
          <Route path={"/purchase"} element={<PurchaseCourse />} />
          <Route path={"/purchased"} element={<Purchased />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

// function InitUser() {

//   return <></>
// }

export default App;
