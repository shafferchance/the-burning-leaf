import { createStyles, makeStyles } from "@material-ui/core";

export const rotatingPic = makeStyles((theme) =>
    createStyles({
        "@-webkit-keyframes cf4FadeInOut": {
            "0%": {
                opacity: 0,
                "-webkit-animation-timing-function": "ease-in",
            },
            "8%": {
                opacity: 0,
                "-webkit-animation-timing-function": "ease-out",
            },
            "17%": {
                opacity: 1,
            },
            "35%": {
                opacity: 0,
            },
            "100%": {
                opacity: 0,
            },
        },
        "@-moz-keyframes cf4FadeInOut": {
            "0%": {
                /* 0 */ opacity: 0,
                "-moz-animation-timing-function": "ease-in",
            },
            "8%": {
                /* (a/t*100%) */ opacity: 1,
                "-moz-animation-timing-function": "ease-out",
            },
            "17%": {
                /* (a+b)/t*100% */ opacity: 1,
            },
            "35%": {
                /* 100%-(b/t*100%) */ opacity: 0,
            },
            "100%": {
                /* 100% */ opacity: 0,
            },
        },
        "@-o-keyframes cf4FadeInOut": {
            "0%": {
                /* 0 */ opacity: 0,
                "-o-animation-timing-function": "ease-in",
            },
            "8%": {
                /* (a/t*100%) */ opacity: 1,
                "-o-animation-timing-function": "ease-out",
            },
            "17%": {
                /* (a+b)/t*100% */ opacity: 1,
            },
            "35%": {
                /* 100%-(b/t*100%) */ opacity: 0,
            },
            "100%": {
                /* 100% */ opacity: 0,
            },
        },
        "@keyframes cf4FadeInOut": {
            "0%": {
                /* 0 */ opacity: 0,
                "animation-timing-function": "ease-in",
            },
            "8%": {
                /* (a/t*100%) */ opacity: 1,
                "animation-timing-function": "ease-out",
            },
            "17%": {
                /* (a+b)/t*100% */ opacity: 1,
            },
            "35%": {
                /* 100%-(b/t*100%) */ opacity: 0,
            },
            "100%": {
                /* 100% */ opacity: 0,
            },
        },

        rotatingImg: {
            position: "absolute",
            left: 0,
            right: 0,
            marginLeft: "auto",
            marginRight: "auto",
            objectFit: "contain",
        },
        rotatingImgs: {
            width: "100vw",
            height: "94vh",
            paddingTop: "10vh",
            // "& h1": {
            //     textAlign: "center",
            //     position: "absolute",
            //     color: "white",
            //     top: "50%",
            //     left: "50%",
            //     transform: "translate(-50%, -50%)",
            // },
            "& img": {
                position: "absolute",
                width: "inherit",
                height: "inherit",
                left: 0,
                right: 0,
                marginLeft: "auto",
                marginRight: "auto",
                opacity: 0,
                zIndex: -1,

                "-moz-animation-name": "cf4FadeInOut",
                "-moz-animation-iteration-count": "infinite",
                "-moz-animation-duration": "24s",

                "-o-animation-name": "cf4FadeInOut",
                "-o-animation-iteration-count": "infinite",
                "-o-animation-duration": "24s",

                "animation-name": "cf4FadeInOut",
                "animation-iteration-count": "infinite",
                "animation-duration": "24s",
            },
            // "& div": {
            //     position: "absolute",
            //     width: "inherit",
            //     height: "inherit",
            //     left: 0,
            //     right: 0,
            //     marginLeft: "auto",
            //     marginRight: "auto",
            //     opacity: 0,
            //     zIndex: -1,

            //     "-moz-animation-name": "cf4FadeInOut",
            //     "-moz-animation-iteration-count": "infinite",
            //     "-moz-animation-duration": "24s",

            //     "-o-animation-name": "cf4FadeInOut",
            //     "-o-animation-iteration-count": "infinite",
            //     "-o-animation-duration": "24s",

            //     "animation-name": "cf4FadeInOut",
            //     "animation-iteration-count": "infinite",
            //     "animation-duration": "24s",

            //     backgroundRepeat: "no-repeat",
            //     backgroundSize: "cover",
            //     backgroundPosition: "center",
            // },
            // "& > div:nth-of-type(1)": {
            //     backgroundImage: (props) => `url(${props.landing_pictures[0]})`,
            // },
            // "& > div:nth-of-type(2)": {
            //     "-webkit-animation-delay": "6s",
            //     "-moz-animation-delay": "6s",
            //     "-o-animation-delay": "6s",
            //     "animation-delay": "6s",

            //     backgroundImage: (props) => `url(${props.landing_pictures[1]})`,
            // },
            // "& > div:nth-of-type(3)": {
            //     "-webkit-animation-delay": "12s",
            //     "-moz-animation-delay": "12s",
            //     "-o-animation-delay": "12s",
            //     "animation-delay": "12s",

            //     backgroundImage: (props) => `url(${props.landing_pictures[2]})`,
            // },
            // "& > div:nth-of-type(4)": {
            //     "-webkit-animation-delay": "18s",
            //     "-moz-animation-delay": "18s",
            //     "-o-animation-delay": "18s",
            //     "animation-delay": "18s",

            //     backgroundImage: (props) => `url(${props.landing_pictures[3]})`,
            // },
            // "&.mobile": {
            //     display: "none",
            // },
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
                transition: "opacity 500ms",
            },
        },

        /* anim delay either t/n or a+b, t=(a+b)*n; where a is presentation time for img
                                                          b is duration of cross fade
                                                          n is num of imgs*/

        "@media screen and (max-width: 768px)": {
            rotatingImgs: {
                paddingTop: 0,
                "&.mobile": {
                    display: "block",
                },
                "& img": {
                    objectFit: "cover",
                },
            },
        },
    })
);
