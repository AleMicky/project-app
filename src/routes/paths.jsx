function path(root, sublink) {
    return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';


export const PATH_AUTH = {
    login: '/login',
};

export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    mercaderia: {
        root: path(ROOTS_DASHBOARD, '/mercaderia'),
        list: path(ROOTS_DASHBOARD, '/mercaderia/list'),
        new: path(ROOTS_DASHBOARD, '/mercaderia/new')
    },
};
