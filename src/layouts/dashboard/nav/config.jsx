import {PATH_DASHBOARD} from '../../../routes/paths';
import SvgColor from '../../../components/svg-color';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{width: 1, height: 1}}/>;

const ICONS = {
    user: icon('ic_user'),
    ecommerce: icon('ic_ecommerce'),
    analytics: icon('ic_analytics'),
    dashboard: icon('ic_dashboard'),
};

const navConfig = [
    {
        subheader: 'general',
        items: [
            {
                title: 'mercaderia',
                path: PATH_DASHBOARD.mercaderia.list,
                icon: ICONS.ecommerce,
               /* children: [
                    {title: 'list', path: PATH_DASHBOARD.mercaderia.list},
                    {title: 'create', path: PATH_DASHBOARD.mercaderia.new},
                ],*/
            },
        ],
    },

];

export default navConfig;
