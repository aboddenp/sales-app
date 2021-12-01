import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
}));

function UserList({ users }) {
    let navigate = useNavigate();

    let Row = (index, style) => (
        <Item
            sx={{
                display: "flex",
                ":hover": {
                    boxShadow: 6,
                },
            }}
            style={style}
            key={users.username}
            onClick={() => navigate("/sales/" + users[index].username)}
        >
            <h1>test</h1>
            <Box>
                <Typography variant="h5">{index}</Typography>
            </Box>
            <Box sx={{ ml: 10 }}>
                <Typography variant="h5">{users[index].username}</Typography>
            </Box>
            <Box sx={{ ml: "auto", mr: 2 }}>
                <Typography variant="h5">{users[index].saleCount}</Typography>
            </Box>
        </Item>
    );

    return (
        <AutoSizer>
            {({ height, width }) => (
                <List
                    className="List"
                    height={height}
                    itemCount={users.length}
                    itemSize={50}
                    width={width}
                >
                    {Row}
                </List>
            )}
        </AutoSizer>
    );
}

export default UserList;
