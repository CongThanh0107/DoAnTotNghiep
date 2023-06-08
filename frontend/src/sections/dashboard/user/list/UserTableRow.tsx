import {useState} from 'react';
// @mui
import {Avatar, Button, Checkbox, IconButton, MenuItem, Stack, TableCell, TableRow, Typography,} from '@mui/material';
// @types
import {IUserData} from '../../../../@types/user';
// components
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';
import {fDate} from "../../../../utils/formatTime";

// ----------------------------------------------------------------------

type Props = {
    row: IUserData;
    selected: boolean;
    onEditRow: VoidFunction;
    onSelectRow: VoidFunction;
    onDeleteRow: VoidFunction;
};

export default function UserTableRow({
                                         row,
                                         selected,
                                         onEditRow,
                                         onSelectRow,
                                         onDeleteRow,
                                     }: Props) {

    const {id, name, email, avatar, role, createdAt, updatedAt, deletedAt} = row;

    const [openConfirm, setOpenConfirm] = useState(false);

    const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
        setOpenPopover(event.currentTarget);
    };

    const handleClosePopover = () => {
        setOpenPopover(null);
    };

    return (
        <>
            <TableRow hover selected={selected}>
                <TableCell padding="checkbox">
                    <Checkbox checked={selected} onClick={onSelectRow}/>
                </TableCell>

                <TableCell>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar alt={name} src={avatar}/>

                        <Typography variant="subtitle2" noWrap>
                            {id}
                        </Typography>
                    </Stack>
                </TableCell>

                <TableCell align="left">{name}</TableCell>

                <TableCell align="left">{email}</TableCell>

                <TableCell align="left" sx={{textTransform: 'capitalize'}}>
                    {role.toUpperCase()}
                </TableCell>

                <TableCell align="left">
                    <Typography variant="body2" sx={{minWidth: 120}}>
                        {fDate(createdAt)}
                    </Typography>
                </TableCell>

                <TableCell align="left">
                    <Typography variant="body2" sx={{minWidth: 120}}>
                        {fDate(updatedAt)}
                    </Typography>
                </TableCell>

                {
                    deletedAt ? (
                        <TableCell align="left">
                            <Typography variant="body2" sx={{minWidth: 120}}>
                                {fDate(deletedAt)}
                            </Typography>
                        </TableCell>
                    ) : (
                        <TableCell align="center">
                            <Typography variant="body2" sx={{minWidth: 120}}>
                                -
                            </Typography>
                        </TableCell>
                    )
                }

                <TableCell align="right">
                    <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
                        <Iconify icon="eva:more-vertical-fill"/>
                    </IconButton>
                </TableCell>
            </TableRow>

            <MenuPopover
                open={openPopover}
                onClose={handleClosePopover}
                arrow="right-top"
                sx={{width: 140}}
            >
                <MenuItem
                    onClick={() => {
                        handleOpenConfirm();
                        handleClosePopover();
                    }}
                    sx={{color: 'error.main'}}
                >
                    <Iconify icon="eva:trash-2-outline"/>
                    Delete
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        onEditRow();
                        handleClosePopover();
                    }}
                >
                    <Iconify icon="eva:edit-fill"/>
                    Edit
                </MenuItem>
            </MenuPopover>

            <ConfirmDialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                title="Delete"
                content="Are you sure want to delete?"
                action={
                    <Button variant="contained" color="error" onClick={onDeleteRow}>
                        Delete
                    </Button>
                }
            />
        </>
    );
}
