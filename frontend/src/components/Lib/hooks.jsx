import React, { useEffect, useState } from "react";

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
