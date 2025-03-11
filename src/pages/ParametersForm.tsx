import React, { useState } from "react";
import {Button, Typography, Slide, Box, Grid, IconButton, Alert, Menu} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {ArrowLeft, ArrowLeftOutlined, Check, Close, KeyboardBackspace} from "@mui/icons-material";

const ParametersForm: React.FC = () => {
    const [step, setStep] = useState(1);
    const [hasHoles, setHasHoles] = useState<boolean | null>(null);
    const [componentType, setComponentType] = useState<string | null>(null);
    const [position, setPosition] = useState<string | null>(null);

    const handleNextStep = () => setStep(step + 1);




    const [anchorEl, setAnchorEl] = useState(null); // Для привязки меню к кнопке
    const [inputMode, setInputMode] = useState(null); // Для определения, какое поле редактируется
    const [width, setWidth] = useState(""); // Состояние для ширины
    const [height, setHeight] = useState(""); // Состояние для высоты

    const open = Boolean(anchorEl); // Открыто ли меню

    // Обработчик клика по кнопке "Ширина" или "Высота"
    const handleClick = (event: any, mode: any) => {
        setAnchorEl(event.currentTarget); // Привязываем меню к кнопке
        setInputMode(mode); // Устанавливаем режим ввода (width или height)
    };

    // Закрытие меню
    const handleClose = () => {
        setAnchorEl(null); // Закрываем меню
        setInputMode(null); // Сбрасываем режим ввода
    };

    // Обработчик нажатия на цифру
    const handleKeyPress = (num: any) => {
        if (inputMode === "width") {
            setWidth((prev) => prev + num); // Добавляем цифру к ширине
        } else if (inputMode === "height") {
            setHeight((prev) => prev + num); // Добавляем цифру к высоте
        }
    };

    // Обработчик удаления последнего символа
    const handleBackspace = () => {
        if (inputMode === "width") {
            setWidth((prev) => prev.slice(0, -1)); // Удаляем последний символ ширины
        } else if (inputMode === "height") {
            setHeight((prev) => prev.slice(0, -1)); // Удаляем последний символ высоты
        }
    };

    // Обработчик подтверждения ввода
    const handleConfirmInput = () => {
        handleClose(); // Закрываем меню после подтверждения
    };


    return (
        <Box
            sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "white",
                borderTop: "1px solid #ddd",
                boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
                padding: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Alert
                    severity="warning"
                    sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}
                    action={
                        <IconButton
                            aria-label="close"
                            onClick={() => setStep(1)}
                        >
                            <Close fontSize="inherit" sx={{width: "20px", height: "20px"}} />
                        </IconButton>
                    }
                >
                    Нажмите на кнопку
                </Alert>
            </Box>

            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                <Box sx={{display: "flex"}}>
                    <Button fullWidth variant="outlined" onClick={handleNextStep}>
                        ВЫБРАТЬ РАЗМЕРЫ
                    </Button>
                </Box>
            </Slide>

            {step >= 2 && (
                <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                    <Box>
                        <Box sx={{display: "flex", columnGap: "10px"}}>
                            <Button
                                fullWidth
                                variant="outlined"
                                id="width"
                                aria-controls={open ? "basic-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={(e) => handleClick(e, "width")} // Передаем режим ввода
                            >
                                Ширина: {width || "____"} мм
                            </Button>

                            <Button
                                fullWidth
                                variant="outlined"
                                id="height"
                                aria-controls={open ? "basic-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={(e) => handleClick(e, "height")} // Передаем режим ввода
                            >
                                Высота: {height || "____"} мм
                            </Button>
                        </Box>

                        {width && height && (
                            <Button fullWidth sx={{mt: "10px"}} variant="outlined" color="primary" onClick={handleNextStep}>
                                Подтвердить размеры
                            </Button>
                        )}
                    </Box>
                </Slide>
            )}

            {step >= 3 && (
                <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                    <Box sx={{display: "flex", columnGap: "10px"}}>
                        <Button fullWidth variant="outlined" onClick={() => { setHasHoles(false); handleNextStep(); }}>
                            БЕЗ ОТВЕРСТИЙ
                        </Button>
                        <Button fullWidth variant="outlined" onClick={() => { setHasHoles(true); handleNextStep(); }}>
                            С ОТВЕРСТИЯМИ
                        </Button>
                    </Box>
                </Slide>
            )}

            {step >= 4 && (
                <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                    <Box sx={{display: "flex", columnGap: "10px"}}>
                        <Button fullWidth variant="outlined" onClick={() => { setComponentType("ящик"); handleNextStep(); }}>
                            ЯЩИК
                        </Button>
                        <Button fullWidth variant="outlined" onClick={() => { setComponentType("дверца"); handleNextStep(); }}>
                            ДВЕРЦА
                        </Button>
                    </Box>
                </Slide>
            )}

            {step >= 5 && (
                <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                    <Box sx={{display: "flex", columnGap: "10px"}}>
                        <Button fullWidth variant="outlined" onClick={() => { setComponentType("ящик"); handleNextStep(); }}>
                            ЛЕВАЯ
                        </Button>
                        <Button fullWidth variant="outlined" onClick={() => { setComponentType("дверца"); handleNextStep(); }}>
                            ПРАВАЯ
                        </Button>
                    </Box>
                </Slide>
            )}

            {step >= 6 && (
                <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                    <Box sx={{display: "flex", columnGap: "10px"}}>
                        <Button fullWidth variant="outlined" onClick={() => { setComponentType("ящик"); handleNextStep(); }}>
                            РУЧКА СНИЗУ
                        </Button>
                        <Button fullWidth variant="outlined" onClick={() => { setComponentType("дверца"); handleNextStep(); }}>
                            РУЧКА СВЕРХУ
                        </Button>
                    </Box>
                </Slide>
            )}

            {inputMode && (
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": inputMode,
                        role: 'listbox',
                    }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    sx={{boxShadow: "8", "& .MuiList-root": {m: 0, p: 0}}}
                >
                    <Box p={"10px"} sx={{ backgroundColor: "#f9f9f9", borderRadius: "10px", width: "220px" }}>
                        <Grid container spacing={1}>
                            {["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
                                <Grid item xs={4} key={num} sx={{order: Number(num) * -2}}>
                                    <Button fullWidth sx={{width: "60px", height: "42px"}} variant="contained" onClick={() => handleKeyPress(num)}>
                                        {num}
                                    </Button>
                                </Grid>
                            ))}
                            <Grid item xs={4} sx={{order: "-1"}}>
                                <Button fullWidth sx={{width: "60px", height: "42px"}} variant="outlined" onClick={handleBackspace} >
                                    <KeyboardBackspace />
                                </Button>
                            </Grid>
                            <Grid item xs={4} sx={{order: "1"}}>
                                <Button startIcon={<Check />}fullWidth sx={{width: "60px", height: "42px"}} variant="outlined" onClick={handleConfirmInput}>
                                    OK
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Menu>
            )}
        </Box>
    );
};

export default ParametersForm;
