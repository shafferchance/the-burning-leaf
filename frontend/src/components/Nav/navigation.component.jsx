import React, { useState } from 'react';
import { Link } from 'react-global-light';

import Logo from './logo_attempt7.png';
import Insta from './insta.png';
import FB from './f_logo_RGB-Blue_58.png';

import './Nav.css';

const SocialLink = ({ img, link, className }) => {
    return (
        <a rel={"noopener noreferrer"}
           target={"_blank"}
           href={link}>
            <img className={`icon ${className}`}
                 src={img} />
        </a>
    );
}

const Nav = () => {
    const [open, setOpen] = useState(false);

    const toggleMobileMenu = () => setOpen(!open);

    return (
        <nav className={"nav"}>
            <span aria-label={"Name and Phone"} className={"nav-info full-container"}>
                <img src={Logo} style={{height: '100%', objectFit: 'contain'}} />
                <h1>The Burning Leaf Cigar Lounge</h1>
                <address className={"pn"} aria-label={"Phone Number"}>
                    (757) 292 -4823
                </address>
            </span>
            <label htmlFor="hamburger" className={"mobile-menu"} onClick={toggleMobileMenu}>&#9776;</label>
            <menu className={open ? "mobile" : null}>
                <li className={"socials"} value={"pass"}>
                    <SocialLink img={FB} 
                                link={"https://www.facebook.com/The-Burning-Leaf-Cigar-Lounge-100238971575979/"} 
                                className={"facebook"} />
                    <SocialLink img={Insta}
                                link={"https://www.instagram.com/theburningleafcigarlounge/"}
                                className={"insta"} />
                </li>
                <li>
                    <Link name={"Home"} Button={"span"} url={'/'} />
                </li>
                <li>
                    <Link name={"Cigars"} Button={"span"} url={'/cigars'} />
                </li>
                <li>
                    <Link name={"Exp"} Button={"span"} url={'/experience'} />
                </li>
                <li>
                    <Link name={"About"} Button={"span"} url={'/about'} />
                </li>
                <li>
                    <Link name={"Admin"} Button={"span"} url={"/dashboard"} />
                </li>
            </menu>
        </nav>
    );
}

export default Nav;