// i18n
import './locales/i18n';

// scroll bar
import 'simplebar/src/simplebar.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

import React from 'react'
import {BrowserRouter} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';

import ReactDOM from 'react-dom/client'
import App from './App'
import ScrollToTop from "./components/scroll-to-top";
import {SettingsProvider} from "./components/settings";
import {AuthProvider} from "./auth/JwtContext";

ReactDOM.createRoot(document.getElementById('root')).render(
     <AuthProvider>
        <HelmetProvider>
            <SettingsProvider>
                <BrowserRouter>
                    <ScrollToTop/>
                    <App/>
                </BrowserRouter>
            </SettingsProvider>
        </HelmetProvider>
     </AuthProvider>
)
