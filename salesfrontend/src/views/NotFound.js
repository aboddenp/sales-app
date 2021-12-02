import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import SentimentDissatisfiedSharpIcon from '@mui/icons-material/SentimentDissatisfiedSharp';



function NotFound(props) {

    return (
        <Box sx={{ width: "100%",height:"80vh"}}>
            <Box sx={{ m: { xs: 2, lg: 8 },height:"100%", textAlign:"center"}}>
                <Typography variant="h1">
                    Page not found
                </Typography>
                <SentimentDissatisfiedSharpIcon sx={{ fontSize: "20rem"}}/>
            </Box>
        </Box>
    );
}

export default NotFound;
