import Page from "../components/Page";
import {Link as RouterLink, useNavigate} from 'react-router-dom';

import {useSettingsContext} from '../components/settings';
import {useTheme} from "@emotion/react";
import {
    Box,
    Tab,
    Tabs,
    Card,
    Table,
    Stack,
    Switch,
    Button,
    Tooltip,
    Divider,
    TableBody,
    Container,
    IconButton,
    TableContainer,
    TablePagination,
    FormControlLabel,
} from '@mui/material';
import {PATH_DASHBOARD} from "../routes/paths";
import Iconify from "../components/iconify";
import Scrollbar from '../components/Scrollbar';
import HeaderBreadcrumbs from "../components/HeaderBreadcrumbs";
import useTable, {emptyRows, getComparator} from "../hooks/useTable";
import {useState} from "react";
import useTabs from "../hooks/useTabs";
import {TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions} from "../components/table";
import MercaderiaTableRow from "../sections/merdaceria/UserTableRow";


const TABLE_HEAD = [
    {id: 'warehouse', label: 'Warehouse', align: 'left'},
    {id: 'descripcion', label: 'Descripcion', align: 'left'},
    {id: 'cant', label: 'Cant', align: 'left'},
    {id: 'origen', label: 'Origen', align: 'left'},
    {id: 'estado', label: 'Estado', align: 'left'},
    {id: 'marca', label: 'Marca', align: 'left'},
    {id: 'preciounit', label: 'Precio Unit', align: 'center'},
    {id: 'preciototal', label: 'Precio Total', align: 'center'},
    {id: ''},
];

const _mercaderiaList = [
    {
        "id": 1,
        "warehouse": 100620,
        "descripcion": "RELOJ PARA HOMBRE",
        "cant": 1,
        "origen": "CHINA",
        "estado": "NUEVO",
        "marca": "STEEL DRIVE",
        "preciounit": 87.64,
        "preciototal": 87.64
    },
    {
        "id": 2,
        "warehouse": 100931,
        "descripcion": "HELICOPTERO A ESCALA ",
        "cant": 1,
        "origen": "CHINA",
        "estado": "NUEVO ",
        "marca": "ITALERI",
        "preciounit": 18.08,
        "preciototal": 18.08
    },
    {
        "id": 3,
        "warehouse": 100681,
        "descripcion": "AUTO DE JUGUETE ",
        "cant": 1,
        "origen": "CHINA",
        "estado": "NUEVO ",
        "marca": "MATCHBOX",
        "preciounit": 49.06,
        "preciototal": 49.06
    },
    {
        "id": 4,
        "warehouse": 100743,
        "descripcion": "AUTOMOVIL A ESCALA NISSAN XTRAIL ",
        "cant": 1,
        "origen": "CHINA",
        "estado": "NUEVO",
        "marca": "JUMAJO",
        "preciounit": 28.46,
        "preciototal": 28.46
    },
    {
        "id": 5,
        "warehouse": 100883,
        "descripcion": "FIGURA DE ACCION AUTOBOT ",
        "cant": 1,
        "origen": "CHINA",
        "estado": "NUEVO ",
        "marca": "HASBRO ",
        "preciounit": 32.1,
        "preciototal": 32.1
    },
    {
        "id": 6,
        "warehouse": 100899,
        "descripcion": "AUTOMOVIL DE CARRERAS ",
        "cant": 1,
        "origen": "CHINA",
        "estado": "NUEVO",
        "marca": "SPEED RACER",
        "preciounit": 10.7,
        "preciototal": 10.7
    },
    {
        "id": 7,
        "warehouse": 100854,
        "descripcion": "CINTURON DE TAEKWONDO ",
        "cant": 1,
        "origen": "JAPAN",
        "estado": "NUEVO",
        "marca": "Kyoto",
        "preciounit": 43.35,
        "preciototal": 43.35
    },
    {
        "id": 8,
        "warehouse": 100902,
        "descripcion": "AUTO DE JUEGUETE ",
        "cant": 1,
        "origen": "CHINA",
        "estado": "NUEVO",
        "marca": "MATCHBOX",
        "preciounit": 11.66,
        "preciototal": 11.66
    },
    {
        "id": 9,
        "warehouse": 100881,
        "descripcion": "AUTO DE JUGUETE ",
        "cant": 1,
        "origen": "CHINA",
        "estado": "NUEVO ",
        "marca": "MATCHBOX",
        "preciounit": 23.69,
        "preciototal": 23.69
    },
    {
        "id": 10,
        "warehouse": 100933,
        "descripcion": "CADENA DEL TIEMPO PARA SISTEMA DE DISTRIBUCION",
        "cant": 1,
        "origen": "ALEMANIA ",
        "estado": "USADO ",
        "marca": "BMW",
        "preciounit": 44.92,
        "preciototal": 44.92
    },
    {
        "id": 11,
        "warehouse": 100891,
        "descripcion": "BODY FEMENINO SIN COSTURAS ",
        "cant": 1,
        "origen": "CHINA",
        "estado": "NUEVO ",
        "marca": "TBLEAGUE",
        "preciounit": 53.07,
        "preciototal": 53.07
    },
    {
        "id": 12,
        "warehouse": 100889,
        "descripcion": "CATETERES DE DESINFECCION ",
        "cant": 2,
        "origen": "CHINA",
        "estado": "NUEVO",
        "marca": "SIN MARCA ",
        "preciounit": 88.75,
        "preciototal": 177.5
    },
    {
        "id": 13,
        "warehouse": 100874,
        "descripcion": "CSCO DE MOTOCICLISTA ",
        "cant": 1,
        "origen": "CHINA",
        "estado": "NUEVO ",
        "marca": "SCHUBERTH",
        "preciounit": 300,
        "preciototal": 300
    },
    {
        "id": 14,
        "warehouse": 100906,
        "descripcion": "ZAPATILLAS DEPORTIVAS ",
        "cant": 1,
        "origen": "CHINA",
        "estado": "NUEVO",
        "marca": "NIKE ",
        "preciounit": 30,
        "preciototal": 30
    },
    {
        "id": 15,
        "warehouse": 100340,
        "descripcion": "ZAPATILLAS DEPORTIVAS ",
        "cant": 1,
        "origen": "CHINA",
        "estado": "NUEVO",
        "marca": "ADIDAS",
        "preciounit": 30,
        "preciototal": 30
    },
    {
        "id": 16,
        "warehouse": 100815,
        "descripcion": "GUITARRA ACUSTICA ",
        "cant": 1,
        "origen": "USA",
        "estado": "NUEVO ",
        "marca": "FENDER",
        "preciounit": 300,
        "preciototal": 300
    },
    {
        "id": 17,
        "warehouse": 100929,
        "descripcion": "JUEGO PARA CONSOLA PS4",
        "cant": 1,
        "origen": "CHINA",
        "estado": "NUEVO ",
        "marca": "ELECTRONIC ARTS",
        "preciounit": 16.96,
        "preciototal": 16.96
    },
    {
        "id": 18,
        "warehouse": 100930,
        "descripcion": "SET DE CARGADORES DE BATERIA PARA PARED ",
        "cant": 1,
        "origen": "CHINA",
        "estado": "NUEVO",
        "marca": "LEICA",
        "preciounit": 41.67,
        "preciototal": 41.67
    },
    {
        "id": 19,
        "warehouse": 100855,
        "descripcion": "KIT DE EMBRAHUE PARA VEHICULO ",
        "cant": 1,
        "origen": "CHINA",
        "estado": "NUEVO ",
        "marca": "BMW",
        "preciounit": 300,
        "preciototal": 300
    },
    {
        "id": 20,
        "warehouse": 100928,
        "descripcion": "BILLETERA DE CUERO SINTETICO ",
        "cant": 1,
        "origen": "CHINA",
        "estado": "NUEVO",
        "marca": "SIN MARCA ",
        "preciounit": 5,
        "preciototal": 5
    },
    {
        "id": 21,
        "warehouse": 100927,
        "descripcion": "VESTIDO DE NOVIA",
        "cant": 1,
        "origen": "CHINA",
        "estado": "NUEVO ",
        "marca": "SIN MARCA ",
        "preciounit": 50,
        "preciototal": 50
    }
]


export default function PageOne() {

    const theme = useTheme();
    const {themeStretch} = useSettingsContext();
    const {
        dense,
        page,
        order,
        orderBy,
        rowsPerPage,
        setPage,
        //
        selected,
        setSelected,
        onSelectRow,
        onSelectAllRows,
        //
        onSort,
        onChangeDense,
        onChangePage,
        onChangeRowsPerPage,
    } = useTable();

    const navigate = useNavigate();

    const [tableData, setTableData] = useState(_mercaderiaList);
    const [filterName, setFilterName] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const {currentTab: filterStatus, onChangeTab: onChangeFilterStatus} = useTabs('all');

    const handleFilterName = (filterName) => {
        setFilterName(filterName);
        setPage(0);
    };

    const handleFilterRole = (event) => {
        setFilterRole(event.target.value);
    };

    const handleDeleteRow = (id) => {
        const deleteRow = tableData.filter((row) => row.id !== id);
        setSelected([]);
        setTableData(deleteRow);
    };

    const handleDeleteRows = (selected) => {
        const deleteRows = tableData.filter((row) => !selected.includes(row.id));
        setSelected([]);
        setTableData(deleteRows);
    };

    const handleEditRow = (id) => {
        // navigate(PATH_DASHBOARD.user.edit(paramCase(id)));
    };

    const dataFiltered = applySortFilter({
        tableData,
        comparator: getComparator(order, orderBy),
        filterName,
        filterRole,
        filterStatus,
    });

    const denseHeight = dense ? 52 : 72;

    const isNotFound =
        (!dataFiltered.length && !!filterName) ||
        (!dataFiltered.length && !!filterRole) ||
        (!dataFiltered.length && !!filterStatus);

    return (
        <Page title="Mercaderia: Listar">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Mercaderia Listar"
                    links={[
                        {name: 'Dashboard', href: PATH_DASHBOARD.root},
                        {name: 'Mercaferia', href: PATH_DASHBOARD.mercaderia.root},
                        {name: 'Listar'},
                    ]}
                    action={
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to={PATH_DASHBOARD.mercaderia.new}
                            startIcon={<Iconify icon={'eva:plus-fill'}/>}>
                            Nuevo Item
                        </Button>
                    }/>
                <Card>
                    <Divider/>
                    {/*<UserTableToolbar*/}
                    {/*    filterName={filterName}*/}
                    {/*    filterRole={filterRole}*/}
                    {/*    onFilterName={handleFilterName}*/}
                    {/*    onFilterRole={handleFilterRole}*/}
                    {/*    optionsRole={ROLE_OPTIONS}*/}
                    {/*/>*/}
                    <Scrollbar>
                        <TableContainer sx={{minWidth: 800, position: 'relative'}}>
                            {selected.length > 0 && (
                                <TableSelectedActions
                                    dense={dense}
                                    numSelected={selected.length}
                                    rowCount={tableData.length}
                                    onSelectAllRows={(checked) =>
                                        onSelectAllRows(
                                            checked,
                                            tableData.map((row) => row.id)
                                        )
                                    }
                                    actions={
                                        <Tooltip title="Delete">
                                            <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                                                <Iconify icon={'eva:trash-2-outline'}/>
                                            </IconButton>
                                        </Tooltip>
                                    }
                                />
                            )}
                            <Table size={dense ? 'small' : 'medium'}>
                                <TableHeadCustom
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={tableData.length}
                                    numSelected={selected.length}
                                    onSort={onSort}
                                    onSelectAllRows={(checked) =>
                                        onSelectAllRows(
                                            checked,
                                            tableData.map((row) => row.id)
                                        )
                                    }
                                />
                                <TableBody>

                                    {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                        <MercaderiaTableRow
                                            key={row.id}
                                            row={row}
                                            selected={selected.includes(row.id)}
                                            onSelectRow={() => onSelectRow(row.id)}
                                            onDeleteRow={() => handleDeleteRow(row.id)}
                                            onEditRow={() => handleEditRow(row.warehouse)}
                                        />
                                    ))}

                                    <TableEmptyRows height={denseHeight}
                                                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}/>
                                    <TableNoData isNotFound={isNotFound}/>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>
                    <Box sx={{position: 'relative'}}>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={dataFiltered.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={onChangePage}
                            onRowsPerPageChange={onChangeRowsPerPage}
                        />

                        <FormControlLabel
                            control={<Switch checked={dense} onChange={onChangeDense}/>}
                            label="Dense"
                            sx={{px: 3, py: 1.5, top: 0, position: {md: 'absolute'}}}
                        />
                    </Box>
                </Card>
            </Container>
        </Page>
    );
}

function applySortFilter({tableData, comparator, filterName, filterStatus, filterRole}) {
    const stabilizedThis = tableData.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    tableData = stabilizedThis.map((el) => el[0]);
    if (filterName) {
        tableData = tableData.filter((item) => item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
    }
    if (filterStatus !== 'all') {
        tableData = tableData.filter((item) => item.status === filterStatus);
    }
    if (filterRole !== 'all') {
        tableData = tableData.filter((item) => item.role === filterRole);
    }
    return tableData;
}
