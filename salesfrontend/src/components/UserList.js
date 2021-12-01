import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
}));

function UserList({users}) {
    let navigate = useNavigate();

    return (
        <Stack spacing={3} alignItems="stretch">
            {users.map((user, index) => {
                return (
                    <Item
                        sx={{
                            display: "flex",
                            ":hover": {
                                boxShadow: 6,
                            },
                        }}
                        key={user.username}
                        onClick={() => navigate("/sales/" + user.username)}
                    >
                        <Box>
                            <Typography variant="h5">{index}</Typography>
                        </Box>
                        <Box sx={{ ml: 10 }}>
                            <Typography variant="h5">
                                {user.username}
                            </Typography>
                        </Box>
                        <Box sx={{ ml: "auto", mr: 2 }}>
                            <Typography variant="h5">
                                {user.saleCount}
                            </Typography>
                        </Box>
                    </Item>
                );
            })}
        </Stack>
    );
}

export default UserList;
