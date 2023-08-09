import { atomUser } from "../store/email";
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
import { homeIcon, courseIcon, purchaseIcon, settingsIcon } from "./content";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

export function DrawerComponent() {
  const redirect = useNavigate();
  const user = useRecoilValue(atomUser);
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
            onClick={() => redirect("/")}
          >
            {homeIcon}
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton className="drawer-button">
            {courseIcon}
          </ListItemButton>
        </ListItem>
        {user && (
          <div>
            <Divider variant="middle" />
            <List className="drawer-items">
              <ListItem disablePadding>
                <ListItemButton className="drawer-button">
                  {purchaseIcon}
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
