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
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "space-around",
        overflow: "hidden auto",
        backgroundColor: theme.palette.background.paper,
        minHeight: 0
    },
    card: {
        paddingBottom: theme.spacing(2),
        boxSizing: 'border-box',
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
        paddingTop: '56.25%',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)'
    }
}));

export const CollectionItem = ({ img, title, desc, featured }) => {
    const classes = useStyles();
    const [show, setShow] = useState(false);

    const handleToggle = () => setShow(!show);
    const handleSettings = () => console.log("settings");

    return (
        <Box>
            <Card className={classes.card}>
                <CardHeader
                    action={
                        <IconButton 
                            aria-labels={`settings-${title}`}
                            onClick={handleSettings}
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
                    component='img'
                />
                <CardActions disableSpacing>
                    <IconButton
                        onClick={handleToggle}
                        aria-expanded={show}
                        className={show ? `${classes.expand} ${classes.expandOpen}` : classes.expand }
                        aria-label={"Show more"}
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

export const CollectionList = ({ tiles }) => {
    const classes = useStyles();
    const [indexOpen, setIndexOpen] = useState(-1);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleOpen = e => {
        console.log(e.currentTarget);
        const idx = Number(e.currentTarget.getAttribute('data-idx'));
        setMenuOpen(false);
        if (idx === indexOpen) {
            setIndexOpen(-1);
            return;
        }
        setIndexOpen(idx);
    }

    const handleSettings = () => menuOpen(!menuOpen)

    return (
        <Box className={classes.root}>
            {tiles.map(([image, title, desc, featured], index) => (
                <CollectionItem title={title} img={image} desc={desc} featured={featured} />
            ))}
        </Box>
    );
};
