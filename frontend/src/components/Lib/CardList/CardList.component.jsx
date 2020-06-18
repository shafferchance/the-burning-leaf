import React, { useState } from "react";
import {
    makeStyles,
    GridList,
    GridListTile,
    GridListTileBar,
    IconButton,
    Paper,
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flex: "1 0",
        transform: "translateZ(0)",
    },
    titleBar: {
        background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
            "rgba(0,0,0,0.0) 70%, rgba(0,0,0,0) 100%",
    },
    icon: {
        color: "white",
    },
}));

export const CollectionItem = ({ img, title, desc, featured }) => {
    const classes = useStyles();

    return (
        <GridListTile cols={featured ? 2 : 1} rows={featured ? 2 : 1}>
            <img src={img} alt={title} />
            <GridListTileBar
                title={title}
                titlePosition={"top"}
                actionIcon={
                    <IconButton
                        aria-label={`Expand-${title}`}
                        className={classes.icon}
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                }
                actionPosition={"left"}
                className={classes.titleBar}
            />
        </GridListTile>
    );
};

export const CollectionList = ({ tiles }) => {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <GridList cellHeight={200} spacing={1} className={classes.gridList}>
                {tiles.map((tile, index) => (
                    <GridListTile
                        cols={tile[3] ? 2 : 1}
                        rows={tile[3] ? 2 : 1}
                        key={index}
                    >
                        <img src={tile[0]} alt={tile[1]} />
                        <GridListTileBar
                            title={tile[1]}
                            titlePosition={"top"}
                            actionIcon={
                                <IconButton
                                    aria-label={`Expand-${tile[1]}`}
                                    className={classes.icon}
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            }
                            actionPosition={"left"}
                            className={classes.titleBar}
                        />
                    </GridListTile>
                ))}
            </GridList>
        </Paper>
    );
};
