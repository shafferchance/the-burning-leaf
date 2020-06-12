import React, { useEffect, useState } from "react";
import { Routing, GlobalStore } from "react-global-light";

import About from "../About/About.component";
import Dashboard from "../Dashboard/Dashboard.component";
import Nav from "../Nav/navigation.component";
import Landing from "../Landing/landing.component";
import Products from "../Products/Products.component";
import RotatingPics from "../Lib/RotatingImgs/RotatingPics.component";

import Cigars from "./cigars.jpeg";
import Lounge from "./lounge.jpeg";
import PepBurn from "./people_burning.jpeg";
import Store from "./store_front.jpeg";
import { sendToSrvr } from "../Lib/connections";

import "../../assets/index.css";

const routes = [
  { id: 0, path: ["/"], name: "Landing", component: <Landing /> },
  { id: 1, path: ["/cigars"], name: "Cigars", component: <Products /> },
  { id: 3, path: ["/about"], name: "About", component: <About /> },
  { id: 4, path: ["/dashboard"], name: "Dashboard", component: <Dashboard /> },
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

  useEffect(() => {
    sendToSrvr("api/v1/general/landing_pictures").then((formatted) =>
      setPics(formatted)
    );
  }, []);

  return (
    <GlobalStore stateI={initialState}>
      <Routing
        className={"full-container"}
        Header={<Header pics={pics["data"] || []} />}
        routes={routes}
      ></Routing>
    </GlobalStore>
  );
};

export default App;
