import { createStyles, makeStyles } from "@material-ui/core";

const picContainHeight = 300;
const picContainWidth = "auto";

export const app = makeStyles((theme) =>
    createStyles({
        "@global": {
            body: {
                margin: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                overflow: "hidden scroll",
            },
            main: {
                display: "flex",
                minHeight: "50vh",
                width: "95vw",
            },
        },
        root: {
            backgroundColor: theme.palette.background.default,
            width: "100%",
            height: "100%",
        },
        parallaxContain: {
            width: "inherit",
            height: "inherit",
            borderBottom: "10px solid black",
            paddingTop: "20vh",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
        },
        parallaxOverlay: {
            height: "60vh",
            width: "60vw",
            margin: "auto",
            backgroundColor: "ivory",
        },
        tagline: {
            paddingTop: "0.3em",
            fontSize: "1.4ch",
            fontVariant: "small-caps",
        },
        radialText: {
            display: "block",
            textShadow: "0.2em 0.1em 0.2em rgba(217, 119, 0, 0.5)",
        },
    })
);
