import {Stack, Typography, Alert} from "@mui/material";
import LoginLayout from "../../layouts/login/LoginLayout";
import AuthLoginForm from "./AuthLoginForm";

export default function Login() {
    return (
        <LoginLayout>
            <Stack spacing={2} sx={{mb: 5, position: 'relative'}}>
                <Typography variant="h4">Iniciar Sesion</Typography>
            </Stack>
            <Alert severity="info" sx={{ mb: 3 }}>
                Use cuenta : <strong>rf.solutions</strong> / contraseña :<strong> mundolibre</strong>
            </Alert>
            <AuthLoginForm />
        </LoginLayout>
    )
}
