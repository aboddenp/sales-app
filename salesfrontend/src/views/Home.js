import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import UserList from "../components/UserList";


function createCardData(title, content) {
    return { title, content };
}

function Home({users,summary}) {

    const stats = [
        createCardData(
            "totalSale",
            "USD " + summary?.saleTotal
        ),
        createCardData("totalProducts", summary?.productCount),
        createCardData("totalUsers", summary?.userCount),
    ];

    return (
        <Box sx={{ width: "100%", height:"80vh" }}>
            <Box sx={{ m: { xs: 2, lg: 8 } ,height:"55%" }}>
                <UserList users={users.slice(0,4)}/>
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
