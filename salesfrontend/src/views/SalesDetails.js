import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

function createRow(id, product, quantity, sale, date) {
    return { id, product, quantity, sale, date };
}

function createColumn(field, type) {
    return {
        field,
        type,
        headerName: field.toUpperCase(),
        headerAlign: "center",
        flex:1,
        align: "center",
    };
}

function SalesDetails(props) {
    const columns = [
        createColumn("product"),
        createColumn("quantity", "number"),
        createColumn("sale", "number"),
        createColumn("date", "date"),
    ];

    console.log(columns);

    const d = new Date();
    console.log(d.getTime());
    const rows = [
        createRow(1, "game", 2, 203, d),
        createRow(2, "toy", 32, 2430, d),
        createRow(3, "joy", 52, 23450, d),
        createRow(4, "afsd", 65, 52340, d),
        createRow(5, "ag", 87, 320, d),
        createRow(6, "has", 24, 340, d),
        createRow(7, "man", 22, 30, d),
    ];

    let params = useParams();
    let user = {
        name: "John Doe",
        username: "Johnnyboy",
        phone: 123456789,
        sales: 12344556,
    };
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <Box>
                <Box sx={{ alignSelf: "start", mt: 4, mb: 15 }}>
                    <Typography sx={{ lineHeight: 2 }}>
                        Name: {user.name}
                        <br />
                        User Name: {user.username}
                        <br />
                        Phone: {user.phone}
                        <br />
                        Sales: {user.sales}
                    </Typography>
                </Box>
                <Box>
                <Box sx={{ height: 400, minWidth:{xs:"89vw",sm:"50vw",md:"80vw"} }}>
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
