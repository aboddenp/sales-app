import * as React from "react";
import Box from "@mui/material/Box";
import UserList from "../components/UserList";



function Users() {

    return (
        <Box sx={{ width: "100%",height:"80vh"}}>
            <Box sx={{ m: { xs: 2, lg: 8 },height:"100%"}}>
                <UserList />
            </Box>
        </Box>
    );
}

export default Users;
