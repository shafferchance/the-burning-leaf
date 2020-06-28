import React, { useEffect, useState } from "react";
import { useRef } from "react";

function getWindowDimensions() {
    const { innerWidth: width, innerHeigth: height } = window;
    return {
        width,
        height,
    };
}

export const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleResize = (e) => {
        setWindowDimensions(getWindowDimensions());
    };

    return windowDimensions;
};

export const useDarkTheme = () => {
    const [theme, setTheme] = useState("light");
    const setMode = (mode) => {
        window.localStorage.setItem("theme", mode);
        const themeEvent = new Event("storage", { bubbles: true });
        window.dispatchEvent(themeEvent);
        setTheme(mode);
    };

    const toggleTheme = () => {
        if (theme === "light") {
            setMode("dark");
        } else {
            setMode("light");
        }
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem("theme");
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches &&
        !localTheme
            ? setMode("dark")
            : localTheme
            ? setTheme(localTheme)
            : setMode("light");
    }, []);

    return [theme, toggleTheme];
};

export const usePrevious = (value) => {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    });

    const manuallyUpdateRef = (value) => {
        ref.current = value;
    };

    return [ref.current, manuallyUpdateRef];
};

// Not a hook!
export function objectEquality(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== key2.length) {
        return false;
    }

    for (const key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }
    return true;
}
