import { Button, Divider, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate, useLocation } from "react-router-dom";

export default function ServerError() {
    const navigate = useNavigate();
    const { state } = useLocation();
    return (
        <Container component={Paper}>
            {/* <Typography variant="h5" gutterBottom>Server error</Typography> */}
            {state?.error ? (
                <>
                    <Typography variant="h5" gutterBottom>Server error</Typography>
                    <Divider />
                    <Typography>{state.error.detail || 'Internal server error'}</Typography>
                </>

            ) : (
                <Typography variant="h5" gutterBottom>Server error</Typography>
            )}
            <Button onClick={() => navigate('/catalog')}>Go back to the store</Button>
        </Container>
    )
}
