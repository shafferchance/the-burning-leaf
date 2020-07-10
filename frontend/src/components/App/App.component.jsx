import React, { useEffect, useState } from "react";
import { Routing, GlobalStore } from "react-global-light";
import { SnackbarProvider } from "notistack";

import About from "../About/About.component";
import Dashboard from "../Dashboard/Dashboard.component";
import Nav from "../Nav/navigation.component";
import Landing from "../Landing/Landing.component";
import Products from "../Products/Products.component";
import RotatingPics from "../Lib/RotatingImgs/RotatingPics.component";

import Cigars from "./cigars.jpeg";
import Lounge from "./lounge.jpeg";
import PepBurn from "./people_burning.jpeg";
import Store from "./store_front.jpeg";
import { app } from "./styles";
import { sendToSrvr } from "../Lib/connections";

import {
    makeStyles,
    createMuiTheme,
    ThemeProvider,
    Box,
} from "@material-ui/core";
import { useDarkTheme } from "../Lib/hooks";

const routes = [
    { id: 0, path: ["/"], name: "Landing", component: <Landing /> },
    { id: 1, path: ["/cigars"], name: "Cigars", component: <Products /> },
    { id: 3, path: ["/about"], name: "About", component: <About /> },
    {
        id: 4,
        path: ["/dashboard"],
        name: "Dashboard",
        component: <Dashboard />,
    },
];

const initialState = {
    about: [],
    experience: [],
    annoucements: [],
    events: [],
    landing_pics: [Cigars, Lounge, PepBurn, Store],
    products: [],
    hours: [],
    token: "",
    dashboard: false,
};

const Header = ({ pics }) => {
    return (
        <>
            <Nav />
            <RotatingPics
                pics={pics.length < 4 ? [Cigars, Lounge, PepBurn, Store] : pics}
            />
        </>
    );
};

const App = () => {
    const [pics, setPics] = useState([]);
    const [theme, setTheme] = useState("light");
    const classes = app();
    useDarkTheme();

    useEffect(() => {
        sendToSrvr("api/v1/general/landing_pictures").then((formatted) =>
            setPics(formatted["data"].map((val) => val.data[0]))
        );

        const localTheme = window.localStorage.getItem("theme");
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches &&
        !localTheme
            ? setTheme("dark")
            : localTheme
            ? setTheme(localTheme)
            : setTheme("light");
        window.addEventListener("storage", handleThemeChange);
        return () => window.removeEventListener("storage", handleThemeChange);
    }, []);

    const applicationTheme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: theme,
                },
            }),
        [theme]
    );

    const handleThemeChange = () => {
        console.log("storage change detectes");
        try {
            setTheme(window.localStorage.getItem("theme"));
        } catch (e) {
            console.error(e.message);
        }
    };

    return (
        <ThemeProvider theme={applicationTheme}>
            <SnackbarProvider maxSnack={3}>
                <GlobalStore stateI={initialState}>
                    <Routing
                        className={classes.root}
                        Header={<Header pics={pics || []} />}
                        routes={routes}
                    ></Routing>
                </GlobalStore>
            </SnackbarProvider>
        </ThemeProvider>
    );
};

export default App;
