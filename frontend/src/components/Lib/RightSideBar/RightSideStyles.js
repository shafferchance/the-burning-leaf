import { createStyles, makeStyles, fade } from "@material-ui/core";

export const rightSideStyles = makeStyles((theme) =>
    createStyles({
        rightBanner: {
            position: "absolute",
            right: 0,
            paddingTop: "10vh",
            height: "90vh",
            width: "4vw",
            backgroundColor: fade(theme.palette.background.paper, 0.5),
        },
        rightBannerContentInner: {
            "&-expanded": {
                width: "20vw",
            },
            position: "absolute",
            right: "4vw",
            paddingTop: "10vh",
            height: "90vh",
            width: "0vw",
            backgroundColor: fade(theme.palette.background.paper, 0.5),
        },
        rightBannerContent: {
            "&-enter": {
                transform: "translateX(12vw)",
                opacity: 0,
                position: "absolute",
            },
            "&-enter-active": {
                transform: "translateX(0)",
                width: "20vw",
                opacity: 1,
                transition: "all 500ms 500ms",
            },
            "&-exit": {
                transform: "translateX(0)",
                width: "20vw",
                opacity: 1,
            },
            "&-exit-active": {
                transform: "translateX(12vw)",
                opacity: 0,
                transition: "all 500ms",
            },
        },
        rightBarIcons: {
            display: "flex",
            flexDirection: "column",
            fontSize: "xx-large",
            alignItems: "center",
            textAlign: "center",
            alignContent: "center",
            paddingRight: 3,
        },
        rightBannerParent: {
            zIndex: 1,
            transform: "translateZ(0)",
        },
        "@media screen and (max-width: 768px)": {
            rightBanner: {
                top: "auto",
                height: "240px",
                paddingTop: 0,
            },
            rightBannerContent: {
                width: "3vw",
                minWidth: "48px",
                top: "auto",
                bottom: "10vh",
                height: "173px",
                paddingTop: 0,
            },
            rightBannerParent: {
                position: "absolute",
                bottom: "10vh",
                right: 0,
                height: 240,
            },
        },
    })
);

export default rightSideStyles;
