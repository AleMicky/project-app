import PropTypes from 'prop-types';
import * as Yup from 'yup';
import {useCallback, useEffect, useMemo} from 'react';
import {useSnackbar} from 'notistack';
import {useNavigate} from 'react-router-dom';
// form
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
// @mui
import {LoadingButton} from '@mui/lab';
import {Box, Card, Grid, Stack, Switch, Typography, FormControlLabel} from '@mui/material';
// utils
// routes
// _mock
///import { countries } from '../../../_mock';
// components
//import {FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar} from '../../../components/hook-form';
import Label from "../../components/Label";
import {fData} from "../../utils/formatNumberr";
import {PATH_DASHBOARD} from "../../routes/paths";
import {FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar} from "../../components/hook-form";

// ----------------------------------------------------------------------

MercaderiaNewEditForm.propTypes = {
    isEdit: PropTypes.bool,
    currentUser: PropTypes.object,
};

export default function MercaderiaNewEditForm({isEdit, currentUser}) {
    const navigate = useNavigate();

    const {enqueueSnackbar} = useSnackbar();

    const NewUserSchema = Yup.object().shape({
        warehouse : Yup.string().required('Se requiere el Warehouse'),
        descripcion : Yup.string().required('Se requiere el Descripcion'),
        cant : Yup.string().required('Se requiere el Cantida'),
        origen : Yup.string().required('Se requiere el Origen'),
        marca : Yup.string().required('Se requiere el Marca'),
        estado : Yup.string().required('Se requiere el Estado'),
        preciounit : Yup.string().required('Se requiere el Precio unitario'),
        preciototal : Yup.string().required('Se requiere el precio total')
    });

    const defaultValues = useMemo(
        () => ({
            warehouse: currentUser?.warehouse || '',
            descripcion: currentUser?.descripcion || '',
            cant: currentUser?.cant || '',
            origen: currentUser?.origen || '',
            marca: currentUser?.marca || '',
            estado: currentUser?.estado || '',
            preciounit: currentUser?.preciounit || '',
            preciototal: currentUser?.preciototal || '',

        }),
        [currentUser]
    );

    const methods = useForm({
        resolver: yupResolver(NewUserSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        control,
        setValue,
        handleSubmit,
        formState: {isSubmitting},
    } = methods;

    const values = watch();

    useEffect(() => {
        if (isEdit && currentUser) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
    }, [isEdit, currentUser]);

    const onSubmit = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            reset();
            enqueueSnackbar(!isEdit ? 'Crear éxito!' : 'Actualización exitosa\n!');
            navigate(PATH_DASHBOARD.mercaderia.list);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            if (file) {
                setValue(
                    'avatarUrl',
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );
            }
        },
        [setValue]
    );

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    {/*<Card sx={{py: 10, px: 3}}>*/}
                    {/*    {isEdit && (*/}
                    {/*        <Label*/}
                    {/*            color={values.status !== 'active' ? 'error' : 'success'}*/}
                    {/*            sx={{textTransform: 'uppercase', position: 'absolute', top: 24, right: 24}}*/}
                    {/*        >*/}
                    {/*            {values.status}*/}
                    {/*        </Label>*/}
                    {/*    )}*/}

                    {/*    <Box sx={{mb: 5}}>*/}
                    {/*        <RHFUploadAvatar*/}
                    {/*            name="avatarUrl"*/}
                    {/*            maxSize={3145728}*/}
                    {/*            onDrop={handleDrop}*/}
                    {/*            helperText={*/}
                    {/*                <Typography*/}
                    {/*                    variant="caption"*/}
                    {/*                    sx={{*/}
                    {/*                        mt: 2,*/}
                    {/*                        mx: 'auto',*/}
                    {/*                        display: 'block',*/}
                    {/*                        textAlign: 'center',*/}
                    {/*                        color: 'text.secondary',*/}
                    {/*                    }}*/}
                    {/*                >*/}
                    {/*                    Permito *.jpeg, *.jpg, *.png, *.gif*/}
                    {/*                    <br/> max size of {fData(3145728)}*/}
                    {/*                </Typography>*/}
                    {/*            }*/}
                    {/*        />*/}
                    {/*    </Box>*/}

                    {/*    {isEdit && (*/}
                    {/*        <FormControlLabel*/}
                    {/*            labelPlacement="start"*/}
                    {/*            control={*/}
                    {/*                <Controller*/}
                    {/*                    name="status"*/}
                    {/*                    control={control}*/}
                    {/*                    render={({field}) => (*/}
                    {/*                        <Switch*/}
                    {/*                            {...field}*/}
                    {/*                            checked={field.value !== 'active'}*/}
                    {/*                            onChange={(event) => field.onChange(event.target.checked ? 'banned' : 'active')}*/}
                    {/*                        />*/}
                    {/*                    )}*/}
                    {/*                />*/}
                    {/*            }*/}
                    {/*            label={*/}
                    {/*                <>*/}
                    {/*                    <Typography variant="subtitle2" sx={{mb: 0.5}}>*/}
                    {/*                        Banned*/}
                    {/*                    </Typography>*/}
                    {/*                    <Typography variant="body2" sx={{color: 'text.secondary'}}>*/}
                    {/*                        Apply disable account*/}
                    {/*                    </Typography>*/}
                    {/*                </>*/}
                    {/*            }*/}
                    {/*            sx={{mx: 0, mb: 3, width: 1, justifyContent: 'space-between'}}*/}
                    {/*        />*/}
                    {/*    )}*/}

                    {/*    <RHFSwitch*/}
                    {/*        name="isVerified"*/}
                    {/*        labelPlacement="start"*/}
                    {/*        label={*/}
                    {/*            <>*/}
                    {/*                <Typography variant="subtitle2" sx={{mb: 0.5}}>*/}
                    {/*                    Email Verified*/}
                    {/*                </Typography>*/}
                    {/*                <Typography variant="body2" sx={{color: 'text.secondary'}}>*/}
                    {/*                    Disabling this will automatically send the user a verification email*/}
                    {/*                </Typography>*/}
                    {/*            </>*/}
                    {/*        }*/}
                    {/*        sx={{mx: 0, width: 1, justifyContent: 'space-between'}}*/}
                    {/*    />*/}
                    {/*</Card>*/}
                </Grid>

                <Grid item xs={12} md={8}>
                    <Card sx={{p: 3}}>
                        <Box
                            sx={{
                                display: 'grid',
                                columnGap: 2,
                                rowGap: 3,
                                gridTemplateColumns: {xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)'},
                            }}
                        >
                            <RHFTextField name="warehouse" label="Warehouse"/>
                            <RHFTextField name="descripcion" label="Descripcion"/>
                            <RHFTextField name="cant" label="Cantidad"/>
                            <RHFTextField name="origen" label="Origen"/>
                            <RHFTextField name="estado" label="Estado"/>
                            <RHFTextField name="marca" label="Marca"/>
                            <RHFTextField name="preciounit" label="Precio Unitario"/>
                            <RHFTextField name="preciototal" label="Precio Total"/>

                            {/*<RHFSelect name="country" label="Country" placeholder="Country">*/}
                            {/*    <option value="" />*/}
                            {/*    {countries.map((option) => (*/}
                            {/*        <option key={option.code} value={option.label}>*/}
                            {/*            {option.label}*/}
                            {/*        </option>*/}
                            {/*    ))}*/}
                            {/*</RHFSelect>*/}


                        </Box>

                        <Stack alignItems="flex-end" sx={{mt: 3}}>
                            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                {!isEdit ? 'Crear Item' : 'Guardar cambios\n'}
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
