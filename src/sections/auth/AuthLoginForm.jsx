import {useState} from 'react';
import {Link, Stack, Alert, IconButton, InputAdornment} from '@mui/material';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Iconify from '../../components/iconify';
import {LoadingButton} from '@mui/lab';
 import {useAuthContext} from "../../auth/useAuthContext";
import {FormProvider, RHFTextField} from "../../components/hook-form";

export default function AuthLoginForm() {

    const {login} = useAuthContext();

    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        cuenta: Yup.string().required('se requiere cuenta'),
        password: Yup.string().required('se requiere contraseña'),
    });

    const defaultValues = {
        cuenta: 'rf.solutions',
        password: 'demo1234',
    };

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const {
        reset,
        setError,
        handleSubmit,
        formState: {errors, isSubmitting, isSubmitSuccessful},
    } = methods;

    const onSubmit = async ({cuenta, password}) => {
        try {
            await login(cuenta, password);
        } catch (error) {
            console.error(error);
            reset();
            setError('afterSubmit', {
                ...error,
                message: error.message,
            });
        }
    };


    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
                <RHFTextField name="cuenta"
                              label="Cuenta"/>
                <RHFTextField name="password"
                              label="Contraseña"
                              type={showPassword ? 'text' : 'password'}
                              InputProps={{
                                  endAdornment: (
                                      <InputAdornment position="end">
                                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                              <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                                          </IconButton>
                                      </InputAdornment>
                                  ),
                              }}/>
            </Stack>
            <Stack alignItems="flex-end" sx={{my: 2}}>

            </Stack>
            <LoadingButton
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitSuccessful || isSubmitting}
                sx={{
                    bgcolor: 'text.primary',
                    color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                    '&:hover': {
                        bgcolor: 'text.primary',
                        color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                    },
                }}>
                Ingresar
            </LoadingButton>
        </FormProvider>
    )
}
