import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import DepartmentNewEditForm from "../../sections/dashboard/department/DepartmentNewEditForm";

// ----------------------------------------------------------------------

export default function DepartmentCreatePage() {
    const { themeStretch } = useSettingsContext();

    return (
        <>
            <Helmet>
                <title> Department: Create a new department</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Create a new department"
                    links={[
                        {
                            name: 'Dashboard',
                            href: PATH_DASHBOARD.root,
                        },
                        {
                            name: 'Department',
                            href: PATH_DASHBOARD.department.list,
                        },
                        { name: 'New department' },
                    ]}
                />
                <DepartmentNewEditForm />
            </Container>
        </>
    );
}