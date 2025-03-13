import React, {useState} from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/roboto";
import OrderDetails from "./pages/OrderDetails";
import ParametersForm from "./pages/ParametersForm";
import {Box} from "@mui/material";
import OrdersList from "./pages/OrdersList";

const theme = createTheme({
    typography: {
        fontFamily: "Roboto, Arial, sans-serif",
        subtitle1: {
            fontSize: "1rem",
            lineHeight: "150%",
            letterSpacing: "0.15px"
        },
        body1: {
            fontSize: "1rem",
            lineHeight: "175%",
            letterSpacing: "0.15px",
            color: "hsla(0, 0%, 0%, 0.87)"
        }
    }
});

const App = () => {
    const [step, setStep] = useState(0);

    const handleNext = () => {
        setStep((prev) => prev + 1);
    };

    const components = [
        <OrderDetails onNext={handleNext} />,
        <ParametersForm onNext={handleNext} />,
        <OrdersList />
    ];

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    width: 360, maxWidth: "100%", bgcolor: "white", boxShadow: 24, mx: "auto", minHeight: "100vh", position: "relative"
                }}
            >
                {components[step]}
            </Box>
        </ThemeProvider>
    );
};

export default App;