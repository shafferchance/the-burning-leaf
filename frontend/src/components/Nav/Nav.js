import { createStyles, makeStyles } from "@material-ui/core";

export const navStyles = makeStyles((theme) =>
    createStyles({
        nav: {
            top: 0,
            position: "fixed",
            width: "100vw",
            listStyle: "none",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: theme.palette.background.paper,
            zIndex: 1,
            minHeight: "45px",
            height: "10vh",
            "& .mobile-menu, #hamburger": {
                display: "none",
                cursor: "pointer",
            },
            "& menu": {
                display: "flex",
                listStyleType: "none",
                margin: 0,
                paddingRight: "1em",
            },
            "& menu li": {
                padding: "0.5em",
                boxSizing: "border-box",
                backgroundColor: theme.palette.background.paper,
                cursor: "pointer",
                "-webkit-user-select": "none",
                "-moz-user-select": "none",
                userSelect: "none",
            },
        },
        socials: {
            display: "inline-flex",
            "& > *": {
                padding: "0 0.2em",
            },
        },
        address: {
            "& input": {
                display: "none",
            },
            "& #addressA": {
                display: "none",
            },
            "& input:checked ~ #addressA": {
                display: "block",
                position: "absolute",
                backgroundColor: "#F2F3F4",
                border: "1em #F2F3F4",
                borderRadius: "0.5em",
            },
        },
        icon: {
            height: "1.5em",
            width: "1.5em",
            "& #location:hover": {
                boxShadow: "2px -1px 4px black",
                borderRadius: "12px",
            },
            "& #facebook:hover": {
                boxShadow: "2px -1px 4px black",
                borderRadius: "12px",
            },
            "& #insta:hover": {
                boxShadow: "2px -1px 4px black",
                borderRadius: "8px",
            },
        },
        navInfo: {
            display: "inline-flex",
            zIndex: 0,
            "& h1": {
                padding: "0em 1em",
                alignSelf: "center",
            },
            "& .pn": {
                alignSelf: "center",
            },
        },
        fullContainer: {
            width: "100%",
            height: "100%",
        },
        "@media screen and (max-width: 768px)": {
            navInfo: {
                zIndex: 1,
                display: "inline-flex",
                "& h1": {
                    padding: "0em 1em",
                    fontSize: "large",
                },
                "& .pn": {
                    alignSelf: "center",
                },
            },
            ".pn": {
                fontSize: "0.75em",
            },
            nav: {
                position: "fixed",
                top: "auto",
                bottom: 0,
                transition: "ease-in-out",
                display: "inline-flex",
                flexDirection: "row-reverse",
                backgroundColor: theme.palette.background.paper,
                "& h1": {
                    paddingRight: "0.3em",
                },
                "& .mobile-menu": {
                    display: "inline-block",
                    color: "#000000",
                    fontStyle: "normal",
                    fontSize: "1.2em",
                    padding: "0.5em",
                },
                "& menu": {
                    display: "none",
                    padding: 0,
                },
                "& menu li": {
                    display: "block",
                    borderTop: "1px solid #333333",
                },
                "& menu.mobile": {
                    display: "flex",
                    flexDirection: "column",
                    position: "absolute",
                    bottom: "100%",
                    zIndex: 0,
                    left: 0,
                    boxShadow: "3px 2px 3px grey",
                },
                "& menu.mobile::after": {
                    height: "1em",
                    width: "100%",
                    background: theme.palette.background.paper,
                    content: "",
                    position: "absolute",
                    bottom: "-6px",
                    left: 0,
                    zIndex: 0,
                },
            },
        },
    })
);
