import {Navigate, useRoutes} from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import {PATH_AFTER_LOGIN} from '../config';
//
import {Page404, PageOne, LoginPage, PageTwo} from './elements';

// ----------------------------------------------------------------------

export default function Router() {
    return useRoutes([
        {
            path: '/',
            children: [
                {element: <Navigate to="/dashboard/mercaderia/list" replace/>, index: true},
                {
                    path: 'login',
                    element: (
                        <GuestGuard>
                            <LoginPage/>
                        </GuestGuard>
                    ),
                },
            ],
        },
        {
            path: '/dashboard',
            element: (
                <AuthGuard>
                    <DashboardLayout/>
                </AuthGuard>
            ),
            children: [
                { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
                {
                    path: 'mercaderia',
                    children: [
                        {element: <Navigate to="/dashboard/mercaderia/list" replace/>, index: true},
                        {path: 'list', element: <PageOne/>}, 
                        { path: 'new', element: <PageTwo /> },
                    ],
                },
            ],
        },
        {
            element: <CompactLayout/>,
            children: [{path: '404', element: <Page404/>}],
        },
        {path: '*', element: <Navigate to="/404" replace/>},
    ]);
}
