import * as React from "react";
import Box from "@mui/material/Box";
import UserList from "../components/UserList";



function createUserData(username, saleCount) {
    return { username, saleCount };
}

function Users(props) {
    const users = [
        createUserData("Hector", 25),
        createUserData("Aster", 12),
        createUserData("Jimmy", 8),
        createUserData("Mario", 4),
        createUserData("Robert", 25),
        createUserData("Manuel", 12),
        createUserData("Dormon", 8),
        createUserData("Lalo", 4),
    ];

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ m: { xs: 2, lg: 8 } }}>
                <UserList users={users}/>
            </Box>
        </Box>
    );
}

export default Users;
