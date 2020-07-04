import { createStyles, makeStyles } from "@material-ui/core";

export const pageStyles = makeStyles((theme) =>
    createStyles({
        pageContent: {
            "&-enter": {
                opacity: 0,
                transform: "translateX(-100%)",
            },
            "&-enter-active": {
                opacity: 1,
                transform: "translateX(0%)",
            },
            "&-exit": {
                opacity: 1,
                transform: "translateX(0%)",
            },
            "&-exit-active": {
                opacity: 0,
                transform: "translateX(100%)",
                display: "none",
            },
            "&-enter-active, &-exit-active": {
                transition: "opacity 500ms, transform 500ms",
            },
        },
        fullContainer: {
            width: "100%",
            height: "100%",
        },
        center: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            position: "absolute",
        },
        horizontalFlex: {
            display: "inline-flex",
        },
    })
);
