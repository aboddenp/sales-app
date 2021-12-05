import { Box, Typography, Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Api from "../utils/api";

function createRow(id, product, quantity, sale, date) {
    return { id, product, quantity, sale, date };
}

function createColumn(field, type, align="center") {
    return {
        field,
        type,
        headerName: field.toUpperCase(),
        headerAlign: "center",
        flex: 1,
        align,
    };
}

function SalesDetails(props) {
    let [userSales, setUserSales] = useState([]);
    let [loading, setLoading] = useState(true);
    let [user,setUser] = useState();
    let { id } = useParams();

    useEffect(() => {
        let api = new Api();
        api.getUserSales(id).then((response) => {
            setUserSales(response.data);
            api.getUser(id).then((response)=>{
                    setUser(response.data)
                    setLoading(false)
            })
        });
    }, [id]);

    const columns = [
        createColumn("product",undefined,"left"),
        createColumn("quantity", "number"),
        createColumn("sale", "number"),
        createColumn("date", "date"),
    ];

    const rows = userSales.map((sale) =>
        createRow(
            sale.id,
            sale.product.name,
            sale.quantity,
            new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(sale.total),
            sale.date
        )
    );

    const textSkeleton = <Skeleton width={45} sx ={{display:'inline-block'}}/>

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                height:"80vh"
            }}
        >
            <Box>
                <Box sx={{ alignSelf: "start", mt: 4, mb: 15 }}>
                    <Typography sx={{ lineHeight: 2, color:"text.primary" }}>
                        Name: {loading? textSkeleton : user?.full_name }
                        <br />
                        User Name: {loading? textSkeleton: user?.username }
                        <br />
                        Phone: {loading? textSkeleton : user?.profile?.phone}
                        <br />
                        Sales: {loading? textSkeleton : new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(user?.sale_total) }
                    </Typography>
                </Box>
                <Box>
                    <Box
                        sx={{
                            height: 400,
                            minWidth: { xs: "89vw", sm: "50vw", md: "80vw" },
                        }}
                    >
                        <div style={{ display: "flex", height: "100%" }}>
                            <div style={{ flexGrow: 1 }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                />
                            </div>
                        </div>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default SalesDetails;
