import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import HomeIcon from "@mui/icons-material/Home";
import ViewListIcon from "@mui/icons-material/ViewList";
import {useNavigate} from "react-router-dom";

function createData(name, location, icon) {
    return { name, location, icon};
  }

function ResponsiveDrawer(props) {
    const { mobileOpen, handleDrawerToggle, drawerWidth, window } = props;
    let navigate = useNavigate();
    const menuData = [
        createData("HOME","/",<HomeIcon/>),
        createData("USER LIST","/userlist",<ViewListIcon/>)
    ];

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {menuData.map((menuItem, index) => (
                    <ListItem button key={menuItem.name} onClick={()=>navigate(menuItem.location)}>
                        <ListItemIcon>
                            {menuItem.icon}
                        </ListItemIcon>
                        <ListItemText primary={menuItem.name} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            {/* Drawer for mobile */}
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
            >
                {drawer}
            </Drawer>
            {/* Drawer for Desktop */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
                open
            >
                {drawer}
            </Drawer>
        </>
    );
}

export default ResponsiveDrawer;
