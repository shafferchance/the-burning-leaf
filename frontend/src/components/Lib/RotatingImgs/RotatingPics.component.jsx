import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { rotatingPic } from "./RotatingPics";

const RotatingPics = ({ pics }) => {
    const classes = rotatingPic({ landing_pictures: pics });
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            console.log(idx);
            setIdx((idx) => (idx + 1 === pics.length ? 0 : idx + 1));
            console.log("testing");
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    // console.log(pics);
    if (!Array.isArray(pics)) throw new Error("Expected picture urls");
    if (pics.length > 4) throw new Error("Four picture maximum");

    const [image] = pics.filter((val, index) => index === idx);

    return (
        <CSSTransition in={idx} unmountOnExit classNames={classes.rotatingImgs}>
            <img className={classes.rotatingImg} src={image} />
        </CSSTransition>
    );
};

export default RotatingPics;
