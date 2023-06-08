import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import LeaveForm from "../../sections/auth/LeaveForm";
// ----------------------------------------------------------------------

export default function BenefitCreatePage() {
    const { themeStretch } = useSettingsContext();

    return (
        <>
            <Helmet>
                <title> Create Leave</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Create a new leave"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        {
                            name: 'E-Commerce',
                            href: PATH_DASHBOARD.leave.root,
                        },
                        { name: 'New leave' },
                    ]}
                />
                <LeaveForm />
            </Container>
        </>
    );
}
