import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import agent from "../../app/api/agent";

export default function AboutPage() {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    function getValidationErrors() {
        agent.TestErrors.getValidationError()
            .then(() => console.log('should not see this'))
            .catch(error =>setValidationErrors(error));
    }
    return (
        <Container>
            <Typography gutterBottom variant="h2">Errors for testing purposes</Typography>
            <ButtonGroup fullWidth>
                <Button variant="contained" onClick={() => agent.TestErrors.get400Error().catch(error=>console.log(error))}>Test 400</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get401Error().catch(error=>console.log(error))}>Test 401</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get404Error().catch(error=>console.log(error))}>Test 404</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get500Error().catch(error=>console.log(error))}>Test 500</Button>
                <Button variant="contained" onClick={getValidationErrors}>Test Validation Error</Button>
            </ButtonGroup>
            {
                validationErrors.length > 0 &&
                <Alert>
                        <AlertTitle>Validation Errors</AlertTitle>
                        <List>
                            {
                                validationErrors.map(error => (
                                    <ListItem key={error}>
                                        <ListItemText>{error}</ListItemText>
                                    </ListItem>
                                ))
                            }
                        </List>
                </Alert>
            }
        </Container>
    )
}