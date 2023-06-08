import orderBy from 'lodash/orderBy';
import {Helmet} from 'react-helmet-async';
import {Link as RouterLink} from 'react-router-dom';
import {useEffect, useState} from 'react';
// @mui
import {Grid, Button, Container, Stack} from '@mui/material';
// routes
import {PATH_DASHBOARD} from '../../routes/paths';
// @types
import {IDepartmentData} from "../../@types/department";
// redux
import {useDispatch, useSelector} from '../../redux/store';
import {getDepartments} from "../../redux/slices/department";
// components
import Iconify from '../../components/iconify';
import {SkeletonPostItem} from '../../components/skeleton';
import {useSettingsContext} from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import {DepartmentCard, DepartmentSort} from '../../sections/dashboard/department/list';
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
    {value: 'latest', label: 'Latest'},
    {value: 'popular', label: 'Popular'},
    {value: 'oldest', label: 'Oldest'},
];

// ----------------------------------------------------------------------

export default function DepartmentListPage() {
    const {themeStretch} = useSettingsContext();

    const dispatch = useDispatch();

    const {departments} = useSelector((state) => state.department);

    const [sortBy, setSortBy] = useState('latest');

    const sortedPosts = applySortBy(departments, sortBy);

    useEffect(() => {
        dispatch(getDepartments(100, 1));
    }, [dispatch]);

    const handleChangeSortBy = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSortBy(event.target.value);
    };

    return (
        <>
            <Helmet>
                <title> Department: List</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Department "
                    links={[
                        {
                            name: 'Dashboard',
                            href: PATH_DASHBOARD.root,
                        },
                        {
                            name: 'Department',
                            href: PATH_DASHBOARD.department.root,
                        },
                        {
                            name: 'List',
                        },
                    ]}
                    action={
                        <Button
                            component={RouterLink}
                            to={PATH_DASHBOARD.department.create}
                            variant="contained"
                            startIcon={<Iconify icon="eva:plus-fill"/>}
                        >
                            New Department
                        </Button>
                    }
                />

                <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
                    <DepartmentSort sortBy={sortBy} sortOptions={SORT_OPTIONS} onSort={handleChangeSortBy}/>
                </Stack>

                <Grid container spacing={3}>
                    {(!departments.length ? [...Array(12)] : sortedPosts).map((department, index) =>
                        department ? (
                            <Grid key={department.id} item xs={12} sm={6} md={(index === 0 && 6) || 3}>
                                <DepartmentCard department={department} index={index}/>
                            </Grid>
                        ) : (
                            <SkeletonPostItem key={index}/>
                        )
                    )}
                </Grid>
            </Container>
        </>
    );
}

// ----------------------------------------------------------------------

const applySortBy = (department: IDepartmentData[], sortBy: string) => {
    if (sortBy === 'latest') {
        return orderBy(department, ['createdAt'], ['desc']);
    }

    if (sortBy === 'oldest') {
        return orderBy(department, ['createdAt'], ['asc']);
    }

    if (sortBy === 'popular') {
        return orderBy(department, ['view'], ['desc']);
    }
    return department;
};
