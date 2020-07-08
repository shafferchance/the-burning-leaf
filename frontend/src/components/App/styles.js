import { createStyles, makeStyles, fade } from "@material-ui/core";
import { RightSideBar } from "../Lib/RightSideBar/RightSideBar.component";

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
                backgroundColor: theme.palette.background.default,
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
        center: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            position: "absolute",
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
        fullContainer: {
            width: "100%",
            height: "100%",
        },
        infoPanel: {
            background: fade(theme.palette.background.paper, 0.5),
            borderRadius: "15px",
            boxShadow: "2px 2px 7px rgba(0,0,0,0.6)",
            padding: "2ch",
            color: theme.palette.text.primary,
            fontFamily: "Roboto, sans-serif",
            "&.center": {
                textAlign: "center",
            },
            "&.center > span": {
                padding: "2px 0",
            },
        },
        leftBanner: {
            position: "fixed",
            right: 0,
            top: "10vh",
            height: "90vh",
            width: "10vw",
            marginLeft: "5px",
            display: "flex",
            flexDirection: "row",
            "& img:(:nth-of-type(1))": {
                marginTop: "5px",
            },
        },
    })
);
