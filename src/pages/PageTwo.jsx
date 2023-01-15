import { paramCase, capitalCase } from 'change-case';

import {useSettingsContext} from '../components/settings';
import Page from "../components/Page";
import {Container} from "@mui/material";
import {useLocation} from "react-router-dom";
import HeaderBreadcrumbs from "../components/HeaderBreadcrumbs";
import {PATH_DASHBOARD} from "../routes/paths";
import MercaderiaNewEditForm from "../sections/merdaceria/MercaderiaNewEditForm";

export default function PageTwo() {
    const {themeStretch} = useSettingsContext();
    const { pathname } = useLocation();


    const isEdit = pathname.includes('edit');


    return (
        <Page title="Mercaderia: Crear">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading={!isEdit ? 'Crear Item' : 'Editar Item'}
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Mercaferia', href: PATH_DASHBOARD.mercaderia.list },
                        { name: !isEdit ? 'Nuevo Item' : capitalCase(name) },
                    ]}
                />
                <MercaderiaNewEditForm/>
            </Container>
        </Page>
    );
}
