import React, { useEffect, useRef, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { rotatingPic } from "./RotatingPics";

const ImageContainer = ({ className, src }) => {
    return <img className={className} src={src} />;
};

const RotatingPics = ({ pics }) => {
    const classes = rotatingPic({ landing_pictures: pics });
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIdx((idx) => (idx + 1 === pics.length ? 0 : idx + 1));
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    if (!Array.isArray(pics)) throw new Error("Expected picture urls");
    if (pics.length > 4) throw new Error("Four picture maximum");

    const [image] = pics.filter((val, index) => index === idx);

    return (
        <TransitionGroup className={classes.rotatingImg}>
            <CSSTransition
                key={idx}
                classNames={classes.rotatingImgs}
                unmountOnExit
                timeout={1000}
            >
                <img src={image} />
            </CSSTransition>
        </TransitionGroup>
    );
};

export default RotatingPics;
