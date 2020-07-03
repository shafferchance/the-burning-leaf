import React from "react";

import { rotatingPic } from "./RotatingPics";

const RotatingPics = ({ pics }) => {
    const classes = rotatingPic({ landing_pictures: pics });

    console.log(pics);
    if (!Array.isArray(pics)) throw new Error("Expected picture urls");
    if (pics.length > 4) throw new Error("Four picture maximum");

    return (
        <div className={classes.rotatingImgs}>
            {pics.map((val, idx) => (
                <img src={val} key={idx} />
            ))}
            {pics.map((val, idx) => (
                <div
                    className={`${classes.rotatingImgs} mobile`}
                    key={pics.length + idx}
                />
            ))}
        </div>
    );
};

export default RotatingPics;
