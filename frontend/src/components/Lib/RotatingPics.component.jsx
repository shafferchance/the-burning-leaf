import React from 'react';

const RotatingPics = ({ pics }) => {
    console.log(pics);
    if (!Array.isArray(pics)) throw new Error("Expected picture urls");
    if (pics.length > 4) throw new Error("Four picture maximum");

    return (
        <div className={"rotating-imgs"}>
            {pics.map((val, idx) => <img src={val} key={idx} />)}
            {pics.map((val, idx) => <div className={"rotating-imgs mobile"} 
                                             key={pics.length + idx} />)}
        </div>
    );
}

export default RotatingPics;