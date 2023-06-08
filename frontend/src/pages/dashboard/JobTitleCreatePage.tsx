import {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
// @mui
import {Container} from '@mui/material';
// routes
import {PATH_DASHBOARD} from '../../routes/paths';
// components
import {useSettingsContext} from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import JobTitleNewEditForm from "../../sections/dashboard/jobTitle/JobTitleNewEdit";
// redux
import {useDispatch, useSelector} from '../../redux/store';
import {getBenefits} from "../../redux/slices/benefit";

// ----------------------------------------------------------------------

export default function JobTitleCreatePage() {
    const {themeStretch} = useSettingsContext();
    const dispatch = useDispatch();

    const {benefits} = useSelector((state) => state.benefit);

    useEffect(() => {
        dispatch(getBenefits());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <>
            <Helmet>
                <title> Create Job Title</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Create a new job title"
                    links={[
                        {name: 'Dashboard', href: PATH_DASHBOARD.root},
                        {
                            name: 'E-Commerce',
                            href: PATH_DASHBOARD.jobTitle.create,
                        },
                        {name: 'New job title'},
                    ]}
                />
                <JobTitleNewEditForm benefits={benefits}/>
            </Container>
        </>
    );
}
