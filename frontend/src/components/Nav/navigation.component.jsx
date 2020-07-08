import React, { useState } from "react";
import { Link } from "react-global-light";
import { Typography } from "@material-ui/core";

import Logo from "./logo_attempt7.png";
import Insta from "./insta.png";
import FB from "./f_logo_RGB-Blue_58.png";

import { navStyles } from "./Nav";
import { RightSideBar } from "../Lib/RightSideBar/RightSideBar.component";

const SocialLink = ({ img, link, className }) => {
    return (
        <a rel={"noopener noreferrer"} target={"_blank"} href={link}>
            <img className={`icon ${className}`} src={img} />
        </a>
    );
};

const Nav = () => {
    const [open, setOpen] = useState(false);
    const classes = navStyles();
    const toggleMobileMenu = () => setOpen(!open);

    return (
        <>
            <nav className={classes.nav}>
                <span
                    aria-label={"Name and Phone"}
                    className={`${classes.navInfo} ${classes.fullContainer}`}
                >
                    <img
                        src={Logo}
                        style={{ height: "100%", objectFit: "contain" }}
                    />
                    <Typography variant="h5" color="textPrimary">
                        The Burning Leaf Cigar Lounge
                    </Typography>
                    <address className={"pn"} aria-label={"Phone Number"}>
                        <Typography variant="caption" color="textSecondary">
                            (757) 292 -4823
                        </Typography>
                    </address>
                </span>
                <label
                    htmlFor="hamburger"
                    className={"mobile-menu"}
                    onClick={toggleMobileMenu}
                >
                    &#9776;
                </label>
                <menu className={open ? "mobile" : null}>
                    <li className={classes.socials} value={"pass"}>
                        <SocialLink
                            img={FB}
                            link={
                                "https://www.facebook.com/The-Burning-Leaf-Cigar-Lounge-100238971575979/"
                            }
                            id={"facebook"}
                            className={classes.icon}
                        />
                        <SocialLink
                            img={Insta}
                            link={
                                "https://www.instagram.com/theburningleafcigarlounge/"
                            }
                            id={"insta"}
                            className={classes.icon}
                        />
                    </li>
                    <li>
                        <Link url={"/"}>
                            <Typography variant="body1" color="textPrimary">
                                Home
                            </Typography>
                        </Link>
                    </li>
                    <li>
                        <Link url={"/cigars"}>
                            <Typography variant="body1" color="textPrimary">
                                Cigars
                            </Typography>
                        </Link>
                    </li>
                    <li>
                        <Link url={"/experience"}>
                            <Typography variant="body1" color="textPrimary">
                                Experience
                            </Typography>
                        </Link>
                    </li>
                    <li>
                        <Link url={"/about"}>
                            <Typography variant="body1" color="textPrimary">
                                About
                            </Typography>
                        </Link>
                    </li>
                    <li>
                        <Link url={"/dashboard"}>
                            <Typography variant="body1" color="textPrimary">
                                Admin
                            </Typography>
                        </Link>
                    </li>
                </menu>
            </nav>
            <RightSideBar />
        </>
    );
};

export default Nav;
