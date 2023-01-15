import PropTypes from 'prop-types';
import {useState} from 'react';
import {useTheme} from '@mui/material/styles';
import {Checkbox, TableRow, TableCell, MenuItem} from '@mui/material';
import {TableMoreMenu} from '../../components/table';
import Iconify from "../../components/iconify";


MercaderiaTableRow.propTypes = {
    row: PropTypes.object,
    selected: PropTypes.bool,
    onEditRow: PropTypes.func,
    onSelectRow: PropTypes.func,
    onDeleteRow: PropTypes.func,
};

export default function MercaderiaTableRow({row, selected, onEditRow, onSelectRow, onDeleteRow}) {
    const theme = useTheme();

    const {
        warehouse,
        descripcion,
        cant,
        origen,
        estado,
        marca,
        preciounit,
        preciototal
    } = row;

    console.log(row)

    const [openMenu, setOpenMenuActions] = useState(null);

    const handleOpenMenu = (event) => {
        setOpenMenuActions(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpenMenuActions(null);
    };

    return (
        <TableRow hover selected={selected}>
            <TableCell padding="checkbox">
                <Checkbox checked={selected} onClick={onSelectRow}/>
            </TableCell>
            <TableCell align="left">{warehouse}</TableCell>
            <TableCell align="left">{descripcion}</TableCell>
            <TableCell align="left">{cant}</TableCell>
            <TableCell align="left">{origen}</TableCell>
            <TableCell align="left">{estado}</TableCell>
            <TableCell align="left">{marca}</TableCell>
            <TableCell align="left">{preciounit}</TableCell>
            <TableCell align="left">{preciototal}</TableCell>
            <TableCell align="right">
                <TableMoreMenu
                    open={openMenu}
                    onOpen={handleOpenMenu}
                    onClose={handleCloseMenu}
                    actions={
                        <>
                            <MenuItem
                                onClick={() => {
                                    onDeleteRow();
                                    handleCloseMenu();
                                }}
                                sx={{color: 'error.main'}}
                            >
                                <Iconify icon={'eva:trash-2-outline'}/>
                                Borrar
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    onEditRow();
                                    handleCloseMenu();
                                }}
                            >
                                <Iconify icon={'eva:edit-fill'}/>
                                Editar
                            </MenuItem>
                        </>
                    }
                />
            </TableCell>
        </TableRow>
    );
}
