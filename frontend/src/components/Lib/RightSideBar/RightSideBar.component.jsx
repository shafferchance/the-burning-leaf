import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useCustomContext } from "react-global-light";
import Calendar from "react-calendar";
import {
    Badge,
    IconButton,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    CircularProgress,
} from "@material-ui/core";
import ScheduleIcon from "@material-ui/icons/Schedule";
import EventIcon from "@material-ui/icons/Event";
import NotificationsIcons from "@material-ui/icons/Notifications";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";

import rightSideStyles from "./RightSideStyles";
import "react-calendar/dist/Calendar.css";
import { useWindowDimensions, useDarkTheme } from "../hooks";
import { useEffect } from "react";
import { sendToSrvr } from "../connections";

const CalendarPanel = () => {
    const events = useGrabData("api/v1/general/events_list");
    const [date, setDate] = useState(new Date());
    const [data, setData] = useState(null);

    useEffect(() => {
        const event = events
            ? events.filter(
                  (val) =>
                      val?.Date.value.split(" ")[0] ===
                      date.toLocaleDateString().replace(/\//g, "-")
              )
            : [];
        setData(
            event.map((val, idx) => (
                <Typography key={idx}>{val.Message.value}</Typography>
            ))
        );
    }, [date]);

    const changeDate = (newDate) => setDate(newDate);
    // console.log(date.toLocaleString().replace(",", "").replace(/\//g, "-"));

    return (
        <Box
            style={{
                display: "flex",
                justifyContent: "center",
                paddingLeft: "20px",
            }}
        >
            <Calendar onChange={changeDate} value={date} />
            {data || "No events found"}
        </Box>
    );
};

const SideBarOption = ({ name, comp, className }) => {
    const { width } = useWindowDimensions();

    const mobile = width <= 768;

    return (
        <div
            style={{ margin: "0 auto", textAlign: "center" }}
            className={mobile ? "upper-right mobile-item" : null}
        >
            <Typography variant="h3" color="textPrimary">
                {name}
            </Typography>
            <br />
            {comp || (
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

const useGrabData = (url, prop = "data") => {
    const [data, setData] = useState(null);

    useEffect(() => {
        sendToSrvr(url).then((results) => {
            setData(results.data.map((val) => val[prop] || val));
        });
    }, [url]);

    return data;
};

const Announcements = () => {
    const annoucements = useGrabData("api/v1/general/announcement_list");

    console.log(annoucements);

    return annoucements ? (
        <List>
            {annoucements.map((results, idx) => (
                <ListItem key={idx}>
                    <ListItemText primary={results[1]} secondary={results[0]} />
                </ListItem>
            ))}
        </List>
    ) : (
        <CircularProgress />
    );
};

const Hours = () => {
    const hours = useGrabData("api/v1/about/hours");
    const headers = ["Day", "Open", "Close"];

    return hours ? (
        <TableContainer component={Box}>
            <Table aria-label={"Hours of Operation"}>
                <TableHead>
                    <TableRow>
                        {headers.map((val) => (
                            <TableCell>{val}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {hours.map((val, idx) => (
                        <TableRow key={idx}>
                            <TableCell>{val[0]}</TableCell>
                            <TableCell>{val[1]}</TableCell>
                            <TableCell>{val[2]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    ) : (
        <CircularProgress />
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
                                <SideBarOption
                                    name={"Announcements"}
                                    key={0}
                                    comp={<Announcements />}
                                />
                            }
                            name={"Announcements"}
                        />
                        <Icon
                            icon={<ScheduleIcon />}
                            setComponent={setComp}
                            comp={
                                <SideBarOption
                                    name={"Hours"}
                                    key={0}
                                    comp={<Hours />}
                                />
                            }
                            name={"Hours"}
                        />
                        <Icon
                            icon={<EventIcon />}
                            setComponent={setComp}
                            comp={
                                <SideBarOption
                                    name={"Events"}
                                    key={0}
                                    comp={<CalendarPanel />}
                                />
                            }
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
                                    comp={
                                        <address key={0}>
                                            1730 George Washington Memorial Hwy
                                            Suite E, Yorktown, VA 23693
                                        </address>
                                    }
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
