import {
  LogoutOutlined,
  ImageOutlined,
  HomeRounded,
  SchoolRounded,
  SettingsRounded,
  EditNoteRounded,
} from "@mui/icons-material";
import { Typography } from "@mui/material";

//Appbar content
export const profile = (
  <div style={{ display: "flex", gap: "5px" }}>
    Profile <ImageOutlined />
  </div>
);

export const logout = (
  <div style={{ display: "flex", gap: "5px" }}>
    Logout <LogoutOutlined />
  </div>
);

export const title = (
  <Typography
    style={{
      fontFamily: "Rubik Wet Paint",
      fontSize: "40px",
      color: "black",
    }}
  >
    TechWave Academy
  </Typography>
);

//Drawer- Items
export const homeIcon = (
  <div style={{ display: "flex", gap: "15px", padding: "10px" }}>
    <HomeRounded /> Home
  </div>
);

export const courseIcon = (
  <div style={{ display: "flex", gap: "15px", padding: "10px" }}>
    <SchoolRounded /> Courses
  </div>
);

export const createCourse = (
  <div style={{ display: "flex", gap: "15px", padding: "10px" }}>
    <EditNoteRounded /> Create Course
  </div>
);

export const settingsIcon = (
  <div style={{ display: "flex", gap: "15px", padding: "10px" }}>
    <SettingsRounded /> Settings
  </div>
);
