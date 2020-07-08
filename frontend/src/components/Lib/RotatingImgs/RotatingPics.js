import { createStyles, makeStyles } from "@material-ui/core";

export const rotatingPic = makeStyles((theme) =>
    createStyles({
        rotatingImg: {
            width: "100%",
            paddingTop: "10vh",
            height: "90vh",
            "& img": {
                width: "100%",
                height: "90%",
                position: "absolute",
                left: 0,
                right: 0,
                marginLeft: "auto",
                marginRight: "auto",
                objectFit: "fill",
            },
        },
        rotatingImgs: {
            "&-enter": {
                opacity: 0,
            },
            "&-enter-active": {
                opacity: 1,
            },
            "&-exit": {
                opacity: 1,
            },
            "&-exit-active": {
                opacity: 0,
            },
            "&-exit-active, &-enter-active": {
                transition: "opacity 1000ms ease-in",
            },
        },

        /* anim delay either t/n or a+b, t=(a+b)*n; where a is presentation time for img
                                                          b is duration of cross fade
                                                          n is num of imgs*/

        "@media screen and (max-width: 768px)": {
            rotatingImg: {
                paddingTop: 0,
                "&.mobile": {
                    display: "block",
                },
                "& img": {
                    objectFit: "cover",
                    height: "100%",
                },
            },
        },
    })
);
