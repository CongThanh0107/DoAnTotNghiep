import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import EmployeeNewEditForm from "../../sections/dashboard/employee/EmployeeNewEditForm";

// ----------------------------------------------------------------------

export default function EmployeeCreatePage() {
    const { themeStretch } = useSettingsContext();

    return (
        <>
            <Helmet>
                <title> Create Employee</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Create a new benefit"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        {
                            name: 'Employee',
                            href: PATH_DASHBOARD.employee.root,
                        },
                        { name: 'New Employee' },
                    ]}
                />
                <EmployeeNewEditForm />
            </Container>
        </>
    );
}
