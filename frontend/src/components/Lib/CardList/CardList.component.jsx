import React, { useState } from "react";
import {
    makeStyles,
    Box,
    GridList,
    GridListTile,
    GridListTileBar,
    IconButton,
    Paper,
    Typography,
    Collapse,
    Card,
    CardMedia,
    Menu,
    MenuItem,
    CardHeader,
    CardActions,
    CardContent,
    ListItemIcon,
    Fade,
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useEffect } from "react";
import { sendToSrvr } from "../connections";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "space-around",
        overflow: "hidden auto",
        backgroundColor: theme.palette.background.default,
        minHeight: 0,
        alignItems: "flex-start",
        flexWrap: "wrap",
        position: "absolute",
    },
    card: {
        backgroundColor: theme.palette.background.paper,
        paddingBottom: theme.spacing(2),
        boxSizing: "border-box",
    },
    titleBar: {
        background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
            "rgba(0,0,0,0.0) 70%, rgba(0,0,0,0) 100%",
    },
    icon: {
        color: "white",
    },
    media: {
        height: 0,
        paddingTop: "56.25%",
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    outerBox: {
        padding: theme.spacing(4),
    },
}));

export const CollectionItem = ({
    img,
    title,
    desc,
    featured,
    index,
    handleOpen,
}) => {
    const classes = useStyles();
    const [show, setShow] = useState(false);

    const handleToggle = () => setShow(!show);

    return (
        <Box className={classes.outerBox}>
            <Card className={classes.card}>
                <CardHeader
                    action={
                        <IconButton
                            aria-label={`settings-${title}`}
                            onClick={handleOpen}
                            data-idx={index}
                        >
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={title}
                />
                <CardMedia
                    className={classes.media}
                    src={img}
                    title={title}
                    component="img"
                />
                <CardActions disableSpacing>
                    <IconButton
                        onClick={handleToggle}
                        aria-expanded={show}
                        className={
                            show
                                ? `${classes.expand} ${classes.expandOpen}`
                                : classes.expand
                        }
                        aria-label={"Show more"}
                        data-idx={index}
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={show} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography>{desc}</Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </Box>
    );
};

const OptionMenu = ({
    selectedIndex,
    onDelete,
    onEdit,
    onClose,
    anchorEl,
    open,
}) => {
    const handleClose = () => {
        onClose();
    };

    const handleDelete = () => {
        onDelete(selectedIndex);
        handleClose();
    };

    const handleEdit = () => {
        onEdit(selectedIndex);
        handleClose();
    };

    return (
        <Menu
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            anchorEl={anchorEl}
            onClose={handleClose}
            open={open}
        >
            <MenuItem onClick={handleEdit}>
                <ListItemIcon>
                    <EditIcon />
                </ListItemIcon>
                <Typography variant="inherit">Edit</Typography>
            </MenuItem>
            <MenuItem onClick={handleDelete}>
                <ListItemIcon>
                    <DeleteIcon />
                </ListItemIcon>
                <Typography variant="inherit">Delete</Typography>
            </MenuItem>
        </Menu>
    );
};

export const CollectionList = ({ tiles, onDelete, onEdit }) => {
    const classes = useStyles();
    const [indexOpen, setIndexOpen] = useState(-1);
    const [card, setCard] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleOpen = (e) => {
        setCard(e.currentTarget);
        const idx = Number(e.currentTarget.getAttribute("data-idx"));
        if (idx === indexOpen) {
            setIndexOpen(-1);
            return;
        }
        setMenuOpen(true);
        setIndexOpen(idx);
    };

    const handleClose = () => {
        setMenuOpen(false);
        setIndexOpen(-1);
    };

    return (
        <Box className={classes.root}>
            {tiles.map(([image, title, desc, featured], index) => (
                <CollectionItem
                    title={title}
                    img={image}
                    desc={desc}
                    featured={featured}
                    index={index}
                    handleOpen={handleOpen}
                    key={index}
                />
            ))}
            <OptionMenu
                anchorEl={card}
                onClose={handleClose}
                open={menuOpen}
                selectedIndex={indexOpen}
                onDelete={onDelete}
                onEdit={onEdit}
            />
        </Box>
    );
};
