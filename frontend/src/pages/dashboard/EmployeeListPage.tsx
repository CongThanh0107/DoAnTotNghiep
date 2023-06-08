import {Helmet} from 'react-helmet-async';
import {paramCase} from 'change-case';
import React, {useEffect, useState} from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
// @mui
import {
    Button,
    Card,
    Container,
    Divider,
    IconButton,
    Tab,
    Table,
    TableBody,
    TableContainer,
    Tabs,
    Tooltip,
} from '@mui/material';
// routes
import {PATH_DASHBOARD} from '../../routes/paths';
// @types
import {IEmployeeData} from '../../@types/employee';
// redux
import {useDispatch, useSelector} from '../../redux/store';
import {getEmployees} from '../../redux/slices/employee';
// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import ConfirmDialog from '../../components/confirm-dialog';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import {useSettingsContext} from '../../components/settings';
import {
    emptyRows,
    getComparator,
    TableEmptyRows,
    TableHeadCustom,
    TableNoData,
    TablePaginationCustom,
    TableSelectedAction,
    useTable,
} from '../../components/table';
// sections
import {EmployeeTableRow, EmployeeTableToolbar} from "../../sections/dashboard/employee/list";
// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['all', 'active', 'deleted'];


const TABLE_HEAD = [
    {id: 'id', label: 'ID', align: 'left'},
    {id: 'name', label: 'Name', align: 'left'},
    {id: 'email', label: "Email", align: 'left'},
    {id: 'phone', label: "Phone", align: 'left'},
    {id: 'address', label: "Address", align: 'left'},
    {id: 'job_title', label: "Job Title", align: 'left'},
    {id: 'gender', label: "Gender", align: 'left'},
    {id: 'salary', label: "Salary", align: 'left'},
    {id: 'date_of_hire', label: "Date of Hire", align: 'left'},
    {id: 'date_of_birth', label: "Date of Birth", align: 'left'},
    {id: 'created_at', label: "Created At", align: 'left'},
    {id: 'updated_at', label: "Updated At", align: 'left'},
    {id: 'deleted_at', label: "Deleted At", align: 'left'},
    {id: ''},
];

// ----------------------------------------------------------------------

export default function EmployeeListPage() {
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

    const {themeStretch} = useSettingsContext();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {employees} = useSelector((state) => state.employee);

    const [tableData, setTableData] = useState(employees);

    const [filterName, setFilterName] = useState('');

    const [filterRole, setFilterRole] = useState('all');

    const [openConfirm, setOpenConfirm] = useState(false);

    const [filterStatus, setFilterStatus] = useState('all');

    const dataFiltered = applyFilter({
        inputData: tableData,
        comparator: getComparator(order, orderBy),
        filterName,
        filterRole,
        filterStatus,
    });

    const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const denseHeight = dense ? 52 : 72;

    const isFiltered = filterName !== '' || filterRole !== 'all' || filterStatus !== 'all';

    const isNotFound =
        (!dataFiltered.length && !!filterName) ||
        (!dataFiltered.length && !!filterRole) ||
        (!dataFiltered.length && !!filterStatus);

    useEffect(() => {
        dispatch(getEmployees(rowsPerPage, page + 1));
        if (employees.length > 0) {
            setTableData(employees);
        }
        setTableData(employees);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, page, rowsPerPage]);

    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    const handleFilterStatus = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
        setPage(0);
        setFilterStatus(newValue);
    };

    const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const handleDeleteRow = (id: string) => {
        const deleteRow = tableData.filter((row) => row.id !== id);
        setSelected([]);
        setTableData(deleteRow);

        if (page > 0) {
            if (dataInPage.length < 2) {
                setPage(page - 1);
            }
        }
    };

    const handleDeleteRows = (selectedRows: string[]) => {
        const deleteRows = tableData.filter((row) => !selectedRows.includes(row.id));
        setSelected([]);
        setTableData(deleteRows);

        if (page > 0) {
            if (selectedRows.length === dataInPage.length) {
                setPage(page - 1);
            } else if (selectedRows.length === dataFiltered.length) {
                setPage(0);
            } else if (selectedRows.length > dataInPage.length) {
                const newPage = Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
                setPage(newPage);
            }
        }
    };

    const handleEditRow = (email: string) => {
        navigate(PATH_DASHBOARD.user.edit(paramCase(email)));
    };

    const handleResetFilter = () => {
        setFilterName('');
        setFilterRole('all');
        setFilterStatus('all');
    };

    return (
        <>
            <Helmet>
                <title> Employee List </title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Employee List"
                    links={[
                        {name: 'Dashboard', href: PATH_DASHBOARD.root},
                        {name: 'Employee', href: PATH_DASHBOARD.employee.root},
                        {name: 'List'},
                    ]}
                    action={
                        <Button
                            component={RouterLink}
                            to={PATH_DASHBOARD.employee.create}
                            variant="contained"
                            startIcon={<Iconify icon="eva:plus-fill"/>}
                        >
                            New Employee
                        </Button>
                    }
                />

                <Card>
                    <Tabs
                        value={filterStatus}
                        onChange={handleFilterStatus}
                        sx={{
                            px: 2,
                            bgcolor: 'background.neutral',
                        }}
                    >
                        {STATUS_OPTIONS.map((tab) => (
                            <Tab key={tab} label={tab} value={tab}/>
                        ))}
                    </Tabs>

                    <Divider/>

                    <EmployeeTableToolbar
                        isFiltered={isFiltered}
                        filterName={filterName}
                        onFilterName={handleFilterName}
                        onResetFilter={handleResetFilter}
                    />

                    <TableContainer sx={{position: 'relative', overflow: 'unset'}}>
                        <TableSelectedAction
                            dense={dense}
                            numSelected={selected.length}
                            rowCount={tableData.length}
                            onSelectAllRows={(checked) =>
                                onSelectAllRows(
                                    checked,
                                    tableData.map((row) => row.id)
                                )
                            }
                            action={
                                <Tooltip title="Delete">
                                    <IconButton color="primary" onClick={handleOpenConfirm}>
                                        <Iconify icon="eva:trash-2-outline"/>
                                    </IconButton>
                                </Tooltip>
                            }
                        />

                        <Scrollbar>
                            <Table size={dense ? 'small' : 'medium'} sx={{minWidth: 800}}>
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
                                    {dataFiltered
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => (
                                            <EmployeeTableRow
                                                key={row.id}
                                                row={row}
                                                selected={selected.includes(row.id)}
                                                onSelectRow={() => onSelectRow(row.id)}
                                                onDeleteRow={() => handleDeleteRow(row.id)}
                                                onEditRow={() => handleEditRow(row.id)}
                                            />
                                        ))}

                                    <TableEmptyRows
                                        height={denseHeight}
                                        emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                                    />

                                    <TableNoData isNotFound={isNotFound}/>
                                </TableBody>
                            </Table>
                        </Scrollbar>
                    </TableContainer>

                    <TablePaginationCustom
                        count={dataFiltered.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={onChangePage}
                        onRowsPerPageChange={onChangeRowsPerPage}
                        //
                        dense={dense}
                        onChangeDense={onChangeDense}
                    />
                </Card>
            </Container>

            <ConfirmDialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                title="Delete"
                content={
                    <>
                        Are you sure want to delete <strong> {selected.length} </strong> items?
                    </>
                }
                action={
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            handleDeleteRows(selected);
                            handleCloseConfirm();
                        }}
                    >
                        Delete
                    </Button>
                }
            />
        </>
    );
}

// ----------------------------------------------------------------------

function applyFilter({
                         inputData,
                         comparator,
                         filterName,
                         filterStatus,
                         filterRole,
                     }: {
    inputData: IEmployeeData[];
    comparator: (a: any, b: any) => number;
    filterName: string;
    filterStatus: string;
    filterRole: string;
}) {
    const stabilizedThis = inputData.map((el, index) => [el, index] as const);

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    inputData = stabilizedThis.map((el) => el[0]);

    if (filterName) {
        inputData = inputData.filter(
            (user) => user.id.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
        );
    }

    if (filterStatus !== 'all') {
        inputData = inputData.filter((user) => {
            if (user.deleted_at) {
                return filterStatus === 'deleted';
            }
            return filterStatus === 'active';
        });
    }

    return inputData;
}
