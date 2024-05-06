import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { RootState } from '../store';

export default function LandingPage() {
    const mode = useSelector((state: RootState) => state.app.mode)
    const defaultTheme = createTheme({ palette: { mode } });

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Outlet />
        </ThemeProvider>
    );
}