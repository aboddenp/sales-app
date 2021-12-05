import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

function AlertFallback() {
    const [open, setOpen] = useState(true);
    return (
        <Box sx={{ width: "100%" }}>
            <Collapse in={open}>
                <Alert
                    severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    Something went wrong!
                </Alert>
            </Collapse>
        </Box>
    );
}

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            error: { message: "", stack: "" },
            info: { componentStack: "" },
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch = (error, info) => {
        this.setState({ error, info });
      };

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <AlertFallback />
                </>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
