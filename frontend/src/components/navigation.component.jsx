import React, { useEffect, useState } from "react";
import { Landing } from './landing.component.jsx';
import { Inv } from './inv.component.jsx';
import { About } from './about.component.jsx';

export const NavBar = () => {
    const [CurrEle, setCurrEle] = useState("home");

    useEffect(() => {
        console.log(`${CurrEle.name} is currently active`);
        window.onpopstate = storeLast;
    }, [CurrEle]);

    const eles = {
        home: Landing,
        inv: Inv,
        about: About
    }

    // Routing now I guess?
    const handleClick = e => {
        e.preventDefault();
        window.history.pushState(
            {},
            undefined,
            `http://${window.location.host}/${e.target.value === "Landing" ? undefined : e.target.value}`);
        setCurrEle(e.target.value);
    }

    const storeLast = e => {
        e.preventDefault();
        let eleArr = window.location.pathname.split("/");
        // Current component will always be last part of URL in this system (quite crude :/)
        setCurrEle(eleArr[eleArr.length - 1] === "" ? "Landing" : eleArr[eleArr.length - 1]);
    }

    // May not need the class actually, due to use of nav tag! :/
    return (
        <>
            <nav className={"navBar"}>
                {Object.keys(eles).forEach(elem => {
                    return <Link name={eles[elem].name}
                                elementKey={elem}
                                handleClick={handleClick} />
                })}
            </nav>
            <CurrEle />
        </>
    );
}

const Link = ({name, elementKey, handleClick }) => {
    return (
        <button className={"navButt"} 
                onClick={handleClick}
                value={elementKey}>{name}</button>
    );
}