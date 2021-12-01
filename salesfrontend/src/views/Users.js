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
        createUserData("Robert1", 25),
        createUserData("Manu1el2", 12),
        createUserData("Dormo1n3", 8),
        createUserData("Lal1o4", 4),
        createUserData("Robert13", 25),
        createUserData("Manuel21", 12),
        createUserData("Dormon11", 8),
        createUserData("Lalo1", 4),
    ];

    return (
        <Box sx={{ width: "100%",height:"80vh"}}>
            <Box sx={{ m: { xs: 2, lg: 8 },height:"100%"}}>
                <UserList users={users}/>
            </Box>
        </Box>
    );
}

export default Users;
