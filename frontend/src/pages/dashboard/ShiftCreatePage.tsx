import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import ShiftNewEditForm from "../../sections/dashboard/shift/ShiftNewEditForm";

// ----------------------------------------------------------------------

export default function ShiftCreatePage() {
const {themeStretch} = useSettingsContext();

    return (
        <>
            <Helmet>
                <title> Shifts: Create a new shift</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Create a new shift"
                    links={[
                        {
                            name: 'Dashboard',
                            href: PATH_DASHBOARD.root,
                        },
                        {
                            name: 'Shifts',
                            href: PATH_DASHBOARD.shift.list,
                        },
                        {
                            name: 'New shift',
                        },
                    ]}
                />

                <ShiftNewEditForm/>
            </Container>
        </>
    );
}