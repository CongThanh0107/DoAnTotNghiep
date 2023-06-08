// scroll bar
import 'simplebar/src/simplebar.css';

// lightbox
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// map
import './utils/mapboxgl';
import 'mapbox-gl/dist/mapbox-gl.css';

// editor
import 'react-quill/dist/quill.snow.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------
import {BrowserRouter} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
// @mui
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers';
// redux
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import {store, persistor} from './redux/store';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import {StyledChart} from './components/chart';
import SnackbarProvider from './components/snackbar';
import ScrollToTop from './components/scroll-to-top';
import {MotionLazyContainer} from './components/animate';
import {SettingsProvider, ThemeSettings} from './components/settings';

import {AuthProvider} from './auth/JwtContext';
// import { AuthProvider } from './auth/Auth0Context';
// import { AuthProvider } from './auth/FirebaseContext';
// import { AuthProvider } from './auth/AwsCognitoContext';

// ----------------------------------------------------------------------

export default function App() {
    return (
        <AuthProvider>
            <HelmetProvider>
                <ReduxProvider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <SettingsProvider>
                                <BrowserRouter>
                                    <ScrollToTop/>
                                    <MotionLazyContainer>
                                        <ThemeProvider>
                                            <ThemeSettings>
                                                <SnackbarProvider>
                                                    <StyledChart/>
                                                    <Router/>
                                                </SnackbarProvider>
                                            </ThemeSettings>
                                        </ThemeProvider>
                                    </MotionLazyContainer>
                                </BrowserRouter>
                            </SettingsProvider>
                        </LocalizationProvider>
                    </PersistGate>
                </ReduxProvider>
            </HelmetProvider>
        </AuthProvider>
    );
}
