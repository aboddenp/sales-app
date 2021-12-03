import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack"
import { useNavigate } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import {useUsers} from "../ContextProviders/users"

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
}));

function UserList({limit}) {
    let navigate = useNavigate();
    const {users,loadUsers} = useUsers();
    const [loading,setLoading]  = React.useState(true);

    React.useEffect(() => {
        loadUsers(()=>{
            setLoading(false)
        });
    }, [loadUsers]);


    const gapSize = 20;


    function Row({index, style}) {
        let user = users[index]
        return <Item
            sx={{
                display: "flex",
                px: 4,
                ":hover": {
                    boxShadow: 6,
                },
            }}
            component="div"
            style={{
                ...style,
                top: style.top + gapSize,
                height: style.height - gapSize,
            }}
            key={user.username}
            onClick={() => navigate(`/users/${user.id}/sales`)}
        >
            <Box>
                <Typography variant="h5">{index}</Typography>
            </Box>
            <Box sx={{ ml: 10 }}>
                <Typography variant="h5">{user.username}</Typography>
            </Box>
            <Box sx={{ ml: "auto", mr: 2 }}>
                <Typography variant="h5">{user.sale_count}</Typography>
            </Box>
        </Item>
    }

    const component = (
        <AutoSizer>
        {({ height, width }) => (
          <List
            className="List"
            height={height}
            itemCount={limit || users.length}
            itemSize={100}
            width={width}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    );

    // component when data has not been loaded yet
    const componentSkeleton = (
        <Stack spacing={4} >
            {Array(limit || 10).fill().map(()=><Skeleton variant="rectangular"  width={"100%"} height={50}/>)}
        </Stack>
    )

    return loading ? componentSkeleton : component;
}

export default UserList;
