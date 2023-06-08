import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Avatar, Typography, CardContent, Stack, Link } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths'
// hooks
import useResponsive from '../../../../hooks/useResponsive';
// @types
import { IDepartmentData } from "../../../../@types/department";
// components
import Image from '../../../../components/image';
import Iconify from '../../../../components/iconify';
import TextMaxLine from '../../../../components/text-max-line';
import SvgColor from '../../../../components/svg-color';

// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
    top: 0,
    zIndex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------

type Props = {
    department: IDepartmentData,
    index?: number;
};

export default function DepartmentCard({ department, index }: Props) {
    const isDesktop = useResponsive('up', 'md');

    const {id, name, description, location, number_of_employees, head_of_department, image} = department;

    const latestPost = index === 0 || index === 1 || index === 2;

    if (isDesktop && latestPost) {
        return (
            <Card>
                <Avatar
                    alt={name}
                    src={image}
                    sx={{
                        top: 24,
                        left: 24,
                        zIndex: 9,
                        position: 'absolute',
                    }}
                />

                <DepartmentContent
                    id={id}
                    name={name}
                    description={description}
                    location={location}
                    number_of_employees={number_of_employees}
                    head_of_department={head_of_department}
                    index={index}
                />

                <StyledOverlay />

                <Image alt="cover" src={image} sx={{ height: 360 }} />
            </Card>
        );
    }

    return (
        <Card>
            <Box sx={{ position: 'relative' }}>
                <SvgColor
                    src="/assets/shape_avatar.svg"
                    sx={{
                        width: 80,
                        height: 36,
                        zIndex: 9,
                        bottom: -15,
                        position: 'absolute',
                        color: 'background.paper',
                    }}
                />

                <Avatar
                    alt={name}
                    src={image}
                    sx={{
                        left: 24,
                        zIndex: 9,
                        width: 32,
                        height: 32,
                        bottom: -16,
                        position: 'absolute',
                    }}
                />

                <Image alt="cover" src={image} ratio="4/3" />
            </Box>

            <DepartmentContent
                id={id}
                name={name}
                description={description}
                location={location}
                number_of_employees={number_of_employees}
                head_of_department={head_of_department}
                index={index}
            />
        </Card>
    );
}

// ----------------------------------------------------------------------

type DepartmentContentProps = {
    id: string;
    name: string;
    description: string;
    location: string;
    number_of_employees: number;
    head_of_department: string;
    index?: number;
};

export function DepartmentContent({ id, name, description, head_of_department, location, number_of_employees, index  }: DepartmentContentProps) {
    const isDesktop = useResponsive('up', 'md');

    const linkTo = PATH_DASHBOARD.department.view(paramCase(id));

    const latestPostLarge = index === 0;

    const latestPostSmall = index === 1 || index === 2;

    const DEPARTMENT_INFO = [
        { id: 'head_of_department', value: head_of_department, icon: 'mdi:person-card-details' },
        { id: 'number_of_employee', value: number_of_employees, icon: 'clarity:employee-group-solid' },
        { id: 'location', value: location, icon: 'ic:baseline-location-city' },
    ];

    return (
        <CardContent
            sx={{
                pt: 4.5,
                width: 1,
                ...((latestPostLarge || latestPostSmall) && {
                    pt: 0,
                    zIndex: 9,
                    bottom: 0,
                    position: 'absolute',
                    color: 'common.white',
                }),
            }}
        >

            <Link color="inherit" component={RouterLink} to={linkTo}>
                <TextMaxLine
                    variant={isDesktop && latestPostLarge ? 'h5' : 'subtitle2'}
                    line={2}
                    persistent
                >
                    {name}
                </TextMaxLine>
            </Link>

            <Typography
                gutterBottom
                variant="caption"
                component="div"
                sx={{
                    color: 'text.disabled',
                    ...((latestPostLarge || latestPostSmall) && {
                        opacity: 0.64,
                        color: 'common.white',
                    }),
                }}
            >
                {description}
            </Typography>

            <Stack
                flexWrap="wrap"
                direction="row"
                justifyContent="flex-end"
                sx={{
                    mt: 3,
                    color: 'text.disabled',
                    ...((latestPostLarge || latestPostSmall) && {
                        opacity: 0.64,
                        color: 'common.white',
                    }),
                }}
            >
                {DEPARTMENT_INFO.map((info) => (
                    <Stack
                        key={info.id}
                        direction="row"
                        alignItems="center"
                        sx={{ typography: 'caption', ml: info.id === 'comment' ? 0 : 1.5 }}
                    >
                        <Iconify icon={info.icon} width={16} sx={{ mr: 0.5 }} />
                        {info.value}
                    </Stack>
                ))}
            </Stack>
        </CardContent>
    );
}
