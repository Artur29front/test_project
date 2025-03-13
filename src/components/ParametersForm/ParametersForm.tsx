import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    Button,
    Typography,
    Slide,
    Box,
    IconButton,
    Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ParametersForm: React.FC = () => {
    const [step, setStep] = useState(1);
    const [width, setWidth] = useState<string>("");
    const [height, setHeight] = useState<string>("");
    const [hasHoles, setHasHoles] = useState<boolean | null>(null);
    const [componentType, setComponentType] = useState<string | null>(null);
    const [position, setPosition] = useState<string | null>(null);
    const [open, setOpen] = useState(true);
    const [inputMode, setInputMode] = useState<"width" | "height" | null>(null);

    const handleNextStep = (nextStep: number) => setStep(nextStep);
    const handleClose = () => setOpen(false);

    // Открыть клавиатуру для ввода размера
    const openKeyboard = (mode: "width" | "height") => {
        setInputMode(mode);
    };

    // Добавить цифру к текущему значению
    const handleKeyPress = (num: string) => {
        if (inputMode === "width") {
            setWidth((prev) => prev + num);
        } else if (inputMode === "height") {
            setHeight((prev) => prev + num);
        }
    };

    // Удалить последний символ
    const handleBackspace = () => {
        if (inputMode === "width") {
            setWidth((prev) => prev.slice(0, -1));
        } else if (inputMode === "height") {
            setHeight((prev) => prev.slice(0, -1));
        }
    };

    // Подтвердить ввод
    const handleConfirmInput = () => {
        setInputMode(null);
        if (width && height) {
            handleNextStep(3);
        }
    };

    return (
        <Dialog open={open} fullWidth maxWidth="sm">
            <DialogContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" color="error">
                        {step === 1
                            ? "Нажмите на кнопку"
                            : step === 2
                                ? "Введите размеры"
                                : step === 3
                                    ? "Выберите наличие отверстий"
                                    : step === 4
                                        ? "Выберите тип компонента"
                                        : "Выберите расположение"}
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {step === 1 && (
                    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                        <Box mt={2}>
                            <Button fullWidth variant="contained" onClick={() => handleNextStep(2)}>
                                ШИРИНА В ММ.
                            </Button>
                            <Button fullWidth variant="contained" onClick={() => handleNextStep(2)}>
                                ВЫСОТА В ММ.
                            </Button>
                        </Box>
                    </Slide>
                )}

                {step === 2 && (
                    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                        <Box mt={2} textAlign="center">
                            <Typography>Введите размеры</Typography>
                            <Button fullWidth variant="contained" onClick={() => openKeyboard("width")}>
                                Ширина: {width || "____"} мм
                            </Button>
                            <Button fullWidth variant="contained" onClick={() => openKeyboard("height")}>
                                Высота: {height || "____"} мм
                            </Button>
                            {width && height && (
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleNextStep(3)}
                                >
                                    Подтвердить размеры
                                </Button>
                            )}
                        </Box>
                    </Slide>
                )}

                {step === 3 && (
                    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                        <Box mt={2}>
                            <Button fullWidth variant="contained" onClick={() => { setHasHoles(false); handleNextStep(4); }}>
                                БЕЗ ОТВЕРСТИЙ
                            </Button>
                            <Button fullWidth variant="contained" onClick={() => { setHasHoles(true); handleNextStep(4); }}>
                                С ОТВЕРСТИЯМИ
                            </Button>
                        </Box>
                    </Slide>
                )}

                {step === 4 && (
                    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                        <Box mt={2}>
                            <Button fullWidth variant="contained" onClick={() => { setComponentType("ящик"); handleNextStep(5); }}>
                                ЯЩИК
                            </Button>
                            <Button fullWidth variant="contained" onClick={() => { setComponentType("дверца"); handleNextStep(5); }}>
                                ДВЕРЦА
                            </Button>
                        </Box>
                    </Slide>
                )}

                {step === 5 && (
                    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                        <Box mt={2}>
                            <Button fullWidth variant="contained" onClick={() => { setPosition("левая"); handleNextStep(6); }}>
                                ЛЕВАЯ
                            </Button>
                            <Button fullWidth variant="contained" onClick={() => { setPosition("правая"); handleNextStep(6); }}>
                                ПРАВАЯ
                            </Button>
                        </Box>
                    </Slide>
                )}

                {inputMode && (
                    <Dialog open={!!inputMode} onClose={() => setInputMode(null)} fullWidth maxWidth="xs">
                        <DialogContent>
                            <Typography align="center">
                                {inputMode === "width" ? "Введите ширину" : "Введите высоту"}
                            </Typography>
                            <Grid container spacing={1} mt={2}>
                                {["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"].map((num) => (
                                    <Grid item xs={4} key={num}>
                                        <Button fullWidth variant="contained" onClick={() => handleKeyPress(num)}>
                                            {num}
                                        </Button>
                                    </Grid>
                                ))}
                                <Grid item xs={6}>
                                    <Button fullWidth variant="contained" onClick={handleBackspace} color="error">
                                        ⌫
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button fullWidth variant="contained" color="primary" onClick={handleConfirmInput}>
                                        OK
                                    </Button>
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </Dialog>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ParametersForm;
