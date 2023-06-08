import {useState} from 'react';
// @mui
import {Button, Checkbox, IconButton, MenuItem, Stack, TableCell, TableRow, Typography,} from '@mui/material';
// @types
import {ILeaveData} from '../../../../@types/leave';
// components
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';
import {fDate} from "../../../../utils/formatTime";

// ----------------------------------------------------------------------

type Props = {
    row: ILeaveData;
    selected: boolean;
    onEditRow: VoidFunction;
    onSelectRow: VoidFunction;
    onDeleteRow: VoidFunction;
};

export default function LeaveTableRow({
                                            row,
                                            selected,
                                            onEditRow,
                                            onSelectRow,
                                            onDeleteRow,
                                        }: Props) {
    const {
        id,
        employee_id,
        leave_type_id,
        start_date,
        end_date,
        status,
        created_at,
        updated_at,
        deleted_at,
    } = row;

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
                        <Typography variant="subtitle2" noWrap>
                            {id}
                        </Typography>
                    </Stack>
                </TableCell>

                <TableCell align="left">{employee_id}</TableCell>

                <TableCell align="left">{leave_type_id}</TableCell>

                <TableCell align="left">{start_date}</TableCell>

                <TableCell align="left">{end_date}</TableCell>

                <TableCell align="left">{status}</TableCell>

                <TableCell align="left">
                    <Typography variant="body2" sx={{minWidth: 120}}>
                        {fDate(created_at)}
                    </Typography>
                </TableCell>

                <TableCell align="left">
                    <Typography variant="body2" sx={{minWidth: 120}}>
                        {fDate(updated_at)}
                    </Typography>
                </TableCell>

                {
                    deleted_at ? (
                        <TableCell align="left">
                            <Typography variant="body2" sx={{minWidth: 120}}>
                                {fDate(deleted_at)}
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
                    Reject
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        onEditRow();
                        handleClosePopover();
                    }}
                >
                    <Iconify icon="eva:edit-fill"/>
                    Approve
                </MenuItem>
            </MenuPopover>

            <ConfirmDialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                title="Reject Leave"
                content="Are you sure want to reject?"
                action={
                    <Button variant="contained" color="error" onClick={onDeleteRow}>
                        Reject
                    </Button>
                }
            />
        </>
    );
}
