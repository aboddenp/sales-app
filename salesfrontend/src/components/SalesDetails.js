import { Typography } from "@mui/material";
import {useParams} from "react-router-dom"

function SalesDetails(props){
    let params = useParams();
    return <Typography> Welcome to {params.id} sales</Typography>
}

export default SalesDetails;