import React, { useEffect, useState } from 'react';

function getWindowDimensions () {
    const { innerWidth: width, innerHeigth: height } = window;
    return {
        width,
        height
    }
}

export const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    const handleResize = e => {
        setWindowDimensions(getWindowDimensions());
    }

    return windowDimensions;
}