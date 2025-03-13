import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    List,
    ListItem,
    ListItemText,
    Box, Button, Menu, MenuItem
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Add, BuildCircle, ChevronLeft, Delete, MoreVert, PhotoSizeSelectSmall, Send} from "@mui/icons-material";
import {useState} from "react";


interface Order {
    id: number;
    width: number;
    height: number;
    quantity: number;
}

const orders: Order[] = [
    { id: 1, width: 200, height: 300, quantity: 1 },
    { id: 2, width: 200, height: 300, quantity: 1 },
    { id: 3, width: 254, height: 354, quantity: 1 }
];

const groupOrders = (orders: Order[]) => {
    const grouped: Record<string, { totalQuantity: number; items: Order[] }> = {};

    orders.forEach(order => {
        const key = `${order.width}x${order.height}`;
        if (!grouped[key]) {
            grouped[key] = { totalQuantity: 0, items: [] };
        }
        grouped[key].totalQuantity += order.quantity;
        grouped[key].items.push(order);
    });

    return Object.entries(grouped).map(([size, { totalQuantity, items }]) => ({
        size,
        totalQuantity,
        items
    }));
};

const OrderMenu: React.FC<{ order: Order }> = ({ order }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button onClick={handleOpen} sx={{p: 0, minWidth: "unset"}}>
                <MoreVert sx={{fill: "#0000008F"}} />
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} sx={{'& .MuiList-root': {p:0}}}>
                <MenuItem onClick={handleClose} sx={{justifyContent: "center", borderBottom: "1px solid rgba(0, 0, 0, 0.12)", maxHeight: "36px", minHeight: "unset", color: "rgba(0, 0, 0, 0.6)"}}>Изменить панель</MenuItem>
                <MenuItem onClick={handleClose} sx={{borderBottom: "1px solid rgba(0, 0, 0, 0.12)", maxHeight: "36px"}} >
                    <Button sx={{color: "#000000DE", width: "220px", justifyContent: "start"}} startIcon={<PhotoSizeSelectSmall sx={{fill:"#2196F3"}}/>}>Размеры</Button>
                </MenuItem>
                <MenuItem onClick={handleClose} sx={{borderBottom: "1px solid rgba(0, 0, 0, 0.12)", maxHeight: "36px"}}>
                    <Button sx={{color: "#000000DE"}} startIcon={<BuildCircle sx={{fill: "#2196F3"}} />} >Отверстия</Button>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Button sx={{color: "#000000DE"}} startIcon={<Delete sx={{ fill: "#EF5350"}} />}>Удалить</Button>
                </MenuItem>
            </Menu>
        </>
    );
};

const OrdersList: React.FC = () => {
    const groupedOrders = groupOrders(orders);

    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <Box sx={{p:2, justifyContent: "space-between", display: "flex"}}>
                <Button variant="outlined"
                        sx={{display: "flex", justifyContent: "center", alignItems: "center", width: "40px", minWidth: "40px", height: "40px", p: 0, boxShadow: 4 }}
                >
                            <ChevronLeft sx={{margin: 0, width: "24px", height: "24px", borderRadius: "1px"}} />
                </Button>
                <Button endIcon={<Send />} variant="outlined" sx={{boxShadow: 4}}>Отправить</Button>
            </Box>

            <Accordion defaultExpanded disableGutters aria-controls="panel1-content" component="form"
                       id="panel1-header" sx={{ boxShadow: "none", '&:before':{height:'0px'} }}>
                <AccordionSummary
                    expandIcon={<ChevronLeft sx={{transform: "rotate(90deg)" }} />}
                    sx={{height: "40px", m: 0, minHeight: "unset" }}
                >
                    <Typography variant="subtitle1" sx={{color: "hsla(0, 0%, 0%, 0.87)", m: 0,'&$expanded': {
                            my: 0}}}>Детали заказа</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{pb: 0}}>
                    {groupedOrders.map(({ size, totalQuantity, items }) => (
                        items.length > 1 ? (
                            <Accordion key={size} expanded={expanded} onChange={() => setExpanded(!expanded)} sx={{background: "#ECEFF1", border: "1px solid #0000001F", "&.MuiAccordion-root": {borderRadius: 2, mb: "10px"}, "& span.Mui-expanded": {my: 1}, "& button.Mui-expanded": {minHeight: "unset"}, boxShadow: 0}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>
                                        {!expanded ? `${size} - ${totalQuantity} шт.` : "Список"}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <List sx={{p: 0}}>
                                        {items.map((order) => (
                                            <ListItem key={order.id} sx={{p: 0, py: "6px"}}>
                                                <Box key={size} sx={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                                                    <Typography>{`${size} - ${order.quantity} шт.`}</Typography>
                                                    <OrderMenu order={items[0]} />
                                                </Box>
                                            </ListItem>
                                        ))}
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        ) : (
                            <Box key={size} sx={{ padding: 2, display: "flex", justifyContent: "space-between", background: "#ECEFF1", border: "1px solid #0000001F", borderRadius: "8px", marginBottom: 1 }}>
                                <Typography>{`${size} - ${totalQuantity} шт.`}</Typography>
                                <OrderMenu order={items[0]} />
                            </Box>
                        )
                    ))}
                </AccordionDetails>
            </Accordion>

            <Box sx={{ display: "flex", justifyContent: "end", mx: "10px", pb: "32px" }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<Add sx={{minWidth: "24px", minHeight: "24px"}} />}
                    size="large"
                    sx={{ mt: "4px", boxShadow: "6", borderRadius: "16px", width: "max-content", py: "12px", px: "16px" }}
                >
                    Добавить
                </Button>
            </Box>
        </>
    );
};

export default OrdersList;
