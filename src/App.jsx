import Router from './routes';
import ThemeProvider from './theme';
import ThemeLocalization from './locales';
import SnackbarProvider from './components/snackbar';
import { ThemeSettings } from './components/settings';
import { MotionLazyContainer } from './components/animate';
function App() {

    return (
        <MotionLazyContainer>
            <ThemeProvider>
                <ThemeSettings>
                    <ThemeLocalization>
                        <SnackbarProvider>
                            <Router />
                        </SnackbarProvider>
                    </ThemeLocalization>
                </ThemeSettings>
            </ThemeProvider>
        </MotionLazyContainer>

    )
}

export default App
