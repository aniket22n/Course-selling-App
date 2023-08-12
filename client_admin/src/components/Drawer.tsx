import { atomUser } from "../store/atoms/user";
import { useRecoilValue } from "recoil";
import {
  Drawer,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItemButton,
  ListItem,
} from "@mui/material";
import { homeIcon, courseIcon, createCourse, settingsIcon } from "./content";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

export function DrawerComponent() {
  const redirect = useNavigate();
  const userValue = useRecoilValue(atomUser);
  return (
    <Drawer
      className="drawer"
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />

      <Typography className="drawer-title" fontFamily={"monospace"}>
        MAIN MENU
      </Typography>
      <List className="drawer-items">
        <ListItem disablePadding>
          <ListItemButton
            className="drawer-button"
            onClick={() => redirect("/admin")}
          >
            {homeIcon}
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            className="drawer-button"
            onClick={() => redirect("/admin/courses")}
          >
            {courseIcon}
          </ListItemButton>
        </ListItem>
        {!userValue.isLoading && userValue.user.username != "" && (
          <div>
            <Divider variant="middle" />
            <List className="drawer-items">
              <ListItem disablePadding>
                <ListItemButton
                  className="drawer-button"
                  onClick={() => redirect("/admin/addcourse")}
                >
                  {createCourse}
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton className="drawer-button">
                  {settingsIcon}
                </ListItemButton>
              </ListItem>
            </List>
          </div>
        )}
      </List>
    </Drawer>
  );
}
