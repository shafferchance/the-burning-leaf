import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useCustomContext } from "react-global-light";
import { Badge, IconButton, Typography } from "@material-ui/core";
import ScheduleIcon from "@material-ui/icons/Schedule";
import EventIcon from "@material-ui/icons/Event";
import NotificationsIcons from "@material-ui/icons/Notifications";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";

import rightSideStyles from "./RightSideStyles";
import { useWindowDimensions, useDarkTheme } from "../hooks";

const CalendarPanel = ({
    header,
    data,
    noData,
    className,
    styles = { textAlign: "center" },
}) => {
    const [date, setDate] = useState(new Date());

    const changeDate = (newDate) => setDate(newDate);

    return (
        <article>
            <h2 className={className || ""} style={styles}>
                {header}
            </h2>
            {/* <Calendar
                onChange={changeDate}
                value={date}
            /> */}
            {data.length > 0 ? data : <h3>{noData}</h3>}
        </article>
    );
};

const SideBarOption = ({ name, entries, className }) => {
    const { width } = useWindowDimensions();

    const mobile = width <= 768;

    return (
        <div
            style={{ margin: "0 auto", textAlign: "center" }}
            className={mobile ? "upper-right mobile-item" : null}
        >
            <Typography variant="h2" color="textPrimary">
                {name}
            </Typography>
            <br />
            {entries || (
                <Typography variant="body1" color="textSecondary">
                    Coming soon
                </Typography>
            )}
        </div>
    );
};

const Icon = ({ name, icon, setComponent, comp, ImgComp, className }) => {
    const handleSelect = () => {
        setComponent((old) => {
            if (!old) return comp;
            if (old.props.name === comp.props.name) {
                return null;
            }
            return comp;
        });
    };

    if (ImgComp) {
        return (
            <ImgComp
                aria-label={name}
                onClick={handleSelect}
                className={className}
            ></ImgComp>
        );
    }
    return (
        <IconButton
            aria-label={name}
            onClick={handleSelect}
            className={className}
        >
            {icon}
        </IconButton>
    );
};

const LocationSVG = () => {
    return (
        <span style={{ width: "100%", display: "inline-flex" }}>
            <svg
                version="1.1"
                id="Layer_1"
                xmlns="https://www.w3.org/2000/svg"
                xmlnsXlink="https://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                enableBackground={"new 0 0 512 512"}
                xmlSpace="preserve"
            >
                <circle style={{ fill: "#324A5E" }} cx="256" cy="256" r="256" />
                <path
                    style={{ fill: "#2B3B4E" }}
                    d="M504.601,317.269L330.128,142.796l-72.692-11.205l-80.162,80.162l72.252,165.348l-114.067,26.293
                                l107.872,108.292c4.198,0.205,8.42,0.314,12.667,0.314C376.265,512,477.141,429.063,504.601,317.269z"
                />
                <ellipse
                    style={{ fill: "#90DFAA" }}
                    cx="256"
                    cy="398.222"
                    rx="123.259"
                    ry="24.652"
                />
                <path
                    style={{ fill: "#6FC186" }}
                    d="M256,373.57c-0.193,0-0.381,0.003-0.574,0.003v49.299c0.193,0,0.381,0.003,0.574,0.003
                            c68.074,0,123.259-11.036,123.259-24.652C379.259,384.608,324.074,373.57,256,373.57z"
                />
                <path
                    style={{ fill: "#FFD15D" }}
                    d="M256,108.606c-54.269,0-98.263,43.994-98.263,98.263c0,83.375,98.263,196.525,98.263,196.525
                            s98.263-107.941,98.263-196.525C354.263,152.6,310.269,108.606,256,108.606z M256,256c-27.134,0-49.131-21.997-49.131-49.131
                            s21.997-49.131,49.131-49.131s49.131,21.997,49.131,49.131S283.134,256,256,256z"
                />
                <path
                    style={{ fill: "#F9B54C" }}
                    d="M354.263,206.869c0-54.269-43.994-98.263-98.263-98.263c-0.193,0-0.381,0.014-0.574,0.014v49.131
                            c0.191-0.002,0.381-0.014,0.574-0.014c27.134,0,49.131,21.997,49.131,49.131S283.134,256,256,256c-0.193,0-0.383-0.012-0.574-0.014
                            v146.739c0.371,0.434,0.574,0.669,0.574,0.669S354.263,295.453,354.263,206.869z"
                />
            </svg>
        </span>
    );
};

const RightSideBarComp = ({ comp, in: inProp }) => {
    const classes = rightSideStyles();
    console.log("--> ", inProp);
    return (
        <CSSTransition
            in={inProp}
            timeout={1000}
            classNames={classes.rightBannerContent}
        >
            <div
                className={
                    inProp
                        ? `${classes.rightBannerContentInner} ${classes.rightBannerContentInner}-expanded`
                        : classes.rightBannerContentInner
                }
            >
                {comp}
            </div>
        </CSSTransition>
    );
};

export const RightSideBar = () => {
    const [comp, setComp] = useState();
    const [{ annoucements, events, hours }] = useCustomContext("global");
    const [theme, toggleTheme] = useDarkTheme();
    const classes = rightSideStyles();

    const renderedAnnouncements =
        annoucements.length > 0
            ? annoucements.map((val, idx) => <span key={idx}>{val}</span>)
            : null;

    const renderedEvents =
        events.length > 0
            ? events.map((val, idx) => <span key={idx}>{val}</span>)
            : null;

    const renderedHours =
        annoucements.length > 0
            ? hours.map((val, idx) => <span key={idx}>{val}</span>)
            : null;

    const toggleDarkMode = () => toggleTheme();

    return (
        <>
            <aside className={classes.rightBannerParent}>
                <div className={classes.rightBanner}>
                    <div className={classes.rightBarIcons}>
                        <Icon
                            icon={
                                <Badge
                                    badgeContent={annoucements.length}
                                    color={"primary"}
                                >
                                    <NotificationsIcons />
                                </Badge>
                            }
                            setComponent={setComp}
                            comp={
                                <SideBarOption name={"Announcements"} key={0} />
                            }
                            name={"Announcements"}
                        />
                        <Icon
                            icon={<ScheduleIcon />}
                            setComponent={setComp}
                            comp={<SideBarOption name={"Hours"} key={0} />}
                            name={"Hours"}
                        />
                        <Icon
                            icon={<EventIcon />}
                            setComponent={setComp}
                            comp={<SideBarOption name={"Events"} key={0} />}
                            name={"Events"}
                        />
                        <Icon
                            icon={<LocationOnIcon />}
                            name={"Location"}
                            setComponent={setComp}
                            comp={
                                <SideBarOption
                                    name={"Location"}
                                    key={0}
                                    entries={[
                                        <address key={0}>
                                            1730 George Washington Memorial Hwy
                                            Suite E, Yorktown, VA 23693
                                        </address>,
                                    ]}
                                />
                            }
                        />
                        <IconButton onClick={toggleDarkMode}>
                            {theme === "light" ? (
                                <Brightness4Icon />
                            ) : (
                                <Brightness7Icon />
                            )}
                        </IconButton>
                    </div>
                </div>
                <RightSideBarComp in={!!comp} comp={comp} />
            </aside>
        </>
    );
};
