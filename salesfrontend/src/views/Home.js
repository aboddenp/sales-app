import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import UserList from "../components/UserList";



function createUserData(username, saleCount) {
    return { username, saleCount };
}

function createCardData(title, content) {
    return { title, content };
}

function Home(props) {
    const users = [
        createUserData("Hector", 25),
        createUserData("Aster", 12),
        createUserData("Jimmy", 8),
        createUserData("Mario", 4),
    ];

    const stats = [
        createCardData(
            "totalSale",
            "USD " + parseFloat(Math.random() * 100000).toFixed(2)
        ),
        createCardData("totalProducts", Math.round(Math.random() * 100000)),
        createCardData("totalUsers", Math.round(Math.random() * 100)),
    ];

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ m: { xs: 2, lg: 8 } }}>
                <UserList users={users}/>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ mt: 10 }}>
                <Stack
                    spacing={2}
                    justifyContent="space-around"
                    direction={{ xs: "column", sm: "row" }}
                    alignItems="stretch"
                >
                    {stats.map((stat, index) => {
                        return (
                            <Card
                                sx={{ minWidth: { lg: 250, md: 200 } }}
                                key={stat.title}
                            >
                                <CardContent>
                                    <Typography
                                        sx={{ fontSize: 14 }}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        {stat.title}
                                    </Typography>
                                    <Typography
                                        sx={{ textAlign: "center", mt: 5 }}
                                    >
                                        {stat.content}
                                    </Typography>
                                </CardContent>
                            </Card>
                        );
                    })}
                </Stack>
            </Box>
        </Box>
    );
}

export default Home;
