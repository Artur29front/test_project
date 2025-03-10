import { useState } from "react";
import {
    Stack, Accordion, AccordionSummary, AccordionDetails,
    Typography, Button, Alert, TextField, Box, IconButton
} from "@mui/material";
import {ChevronLeft, Close, DeleteRounded, Check, Add, ArrowDropDown} from "@mui/icons-material";

const OrderDetails = () => {

    const [error, setError] = useState(true);
    const [material, setMaterial] = useState("");
    const [article, setArticle] = useState("");
    const [showMessage, setShowMessage] = useState(error);


    const handleConfirm = () => {
        if (material && article) {
            setError(false);
            alert("Заказ подтвержден!");
        } else if (!material && article) {
            alert("Введите Материал");
            setError(true);
        } else if (!article && material) {
            alert("Введите Артикул");
            setError(true);
        } else {
            setError(true);
            alert("Введите данные");
        }
    };

    const handleMaterialChange = (e: any) => {
        setMaterial(e.target.value);
        if (e.target.value) {
            setError(false);
        }
    };

    const handleArticleChange = (e: any) => {
        setArticle(e.target.value);
        if (e.target.value) {
            setError(false);
        }
    };


    return (
        <Box
            sx={{
                width: 360, bgcolor: "white", boxShadow: 24, mx: "auto", minHeight: "96vh"
            }}
        >
            <Stack sx={{p:2, justifyContent: "start"}}>
                <Button variant="outlined"
                        sx={{display: "flex", justifyContent: "center", alignItems: "center", width: "40px", minWidth: "40px", height: "40px", p: 0, boxShadow: 4 }}
                >
                            <ChevronLeft sx={{margin: 0, width: "24px", height: "24px", borderRadius: "1px"}} />
                </Button>
            </Stack>

            <Accordion defaultExpanded disableGutters aria-controls="panel1-content" component="form"
                       id="panel1-header" sx={{ boxShadow: "none", '&:before':{height:'0px'} }}>
                <AccordionSummary
                    expandIcon={<ChevronLeft sx={{transform: "rotate(90deg)" }} />}
                    sx={{height: "40px", m: 0, minHeight: "unset" }}
                >
                    <Typography variant="subtitle1" sx={{color: "hsla(0, 0%, 0%, 0.87)", m: 0,'&$expanded': {
                            my: 0}}}>Детали заказа</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{background: 'hsla(204, 15%, 94%, 1)', borderTop: "1px solid hsla(0, 0%, 0%, 0.12)"}}>
                    <Typography variant="body1" sx={{py: '10.5px'}}>Итого: 0 руб.</Typography>
                    <Typography variant="body1" sx={{py: '10.5px'}}>Цена за кв. метр: 2 790 руб.</Typography>
                    <Typography variant="body1" sx={{py: '10.5px'}}>Дата изготовления: до 27.03.2025</Typography>
                    <Typography variant="body1" sx={{py: '10.5px'}}>Цена доставки: 2750 руб.</Typography>


                    {showMessage && (
                        <Alert
                            severity="warning"
                            sx={{display: "flex", justifyContent: "center", alignItems: "center"}}
                            action={
                                <IconButton
                                    aria-label="close"
                                    onClick={() => setShowMessage(false)}
                                >
                                    <Close fontSize="inherit" sx={{width: "20px", height: "20px"}} />
                                </IconButton>
                            }
                        >
                            Укажите Материал и Артикул
                        </Alert>
                    )}

                    <Accordion disableGutters aria-controls="panel2-content"
                               id="panel2-header"
                               sx={{background: "inherit", boxShadow: "none", mb: "10px", '&:before':{height:'0px'}}}>
                        <AccordionSummary expandIcon={<ArrowDropDown />} sx={{px: 0, borderBottom: !material ? "2px solid hsla(0, 65%, 51%, 1)" : "none", minHeight: "45px", height: "45px", "& .MuiAccordionSummary-content": {m: 0}, mt: 2, mb: "2px", "&.Mui-expanded": {borderBottom: "none"}}} >
                            <Typography sx={{ color: !material ? "hsla(0, 65%, 51%, 1)" : "black"}}>Материал</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{p: 0}}>
                            <TextField
                                label="Материал"
                                variant="outlined"
                                fullWidth
                                error={!material}
                                onChange={handleMaterialChange}
                                helperText={!material ? "Введите материал" : ""}
                            />
                        </AccordionDetails>
                    </Accordion>

                    <Accordion disableGutters aria-controls="panel3-content"
                               id="panel3-header"
                               sx={{background: "inherit", boxShadow: "none", mb: "10px", '&:before':{height:'0px'}}}>
                        <AccordionSummary expandIcon={<ArrowDropDown />} sx={{px: 0, borderBottom: !article ? "2px solid hsla(0, 65%, 51%, 1)" : "none", minHeight: "45px", "& .MuiAccordionSummary-content": {m: 0}, mt: 2, mb: "2px", "&.Mui-expanded": {borderBottom: "none"}}} >
                            <Typography sx={{ color: !article ? "hsla(0, 65%, 51%, 1)" : "black" }}>Артикул</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{p: 0}}>
                            <TextField
                                label="Артикул"
                                variant="outlined"
                                fullWidth
                                error={!article}
                                sx={{ mt: 1 }}
                                onChange={handleArticleChange}
                                helperText={!article ? "Введите артикул" : ""}
                            />
                        </AccordionDetails>
                    </Accordion>


                    <Box sx={{ display: "flex", justifyContent: "space-between", pt: "20px", pb: "10px", columnGap: "10px" }}>
                        <Button
                            startIcon={<DeleteRounded />}
                            fullWidth
                            sx={{borderRadius: "10px"}}
                            variant="outlined"
                            color="primary"
                        >
                            Удалить
                        </Button>
                        <Button
                            startIcon={<Check />}
                            fullWidth
                            sx={{borderRadius: "10px"}}
                            variant="outlined"
                            color="primary"
                            onClick={handleConfirm}>
                            Подтвердить
                        </Button>
                    </Box>
                </AccordionDetails>
            </Accordion>

            <Box sx={{ display: "flex", justifyContent: "end", mx: "10px", pb: "32px" }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<Add sx={{minWidth: "24px", minHeight: "24px"}} />}
                    size="large"
                    sx={{ mt: "10px", boxShadow: "6", borderRadius: "16px", width: "max-content", py: "12px", px: "16px" }}
                >
                    Добавить
                </Button>
            </Box>
        </Box>
    );
};

export default OrderDetails;
