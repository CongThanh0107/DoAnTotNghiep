import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import BenefitNewEditForm from "../../sections/dashboard/benefit/BenefitNewEdit";

// ----------------------------------------------------------------------

export default function BenefitCreatePage() {
    const { themeStretch } = useSettingsContext();

    return (
        <>
            <Helmet>
                <title> Create Benefit</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Create a new benefit"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        {
                            name: 'E-Commerce',
                            href: PATH_DASHBOARD.benefit.root,
                        },
                        { name: 'New benefit' },
                    ]}
                />
                <BenefitNewEditForm />
            </Container>
        </>
    );
}
