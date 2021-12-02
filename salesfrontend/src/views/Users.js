import * as React from "react";
import Box from "@mui/material/Box";
import UserList from "../components/UserList";



function createUserData(username, saleCount) {
    return { username, saleCount };
}

function Users(props) {

    const users = props.users.map((user)=> createUserData(user.username, user.sale_count))

    return (
        <Box sx={{ width: "100%",height:"80vh"}}>
            <Box sx={{ m: { xs: 2, lg: 8 },height:"100%"}}>
                <UserList users={users}/>
            </Box>
        </Box>
    );
}

export default Users;
