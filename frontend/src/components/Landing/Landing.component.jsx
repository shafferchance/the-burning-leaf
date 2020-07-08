import React, { useEffect, useState } from "react";

import { app } from "../App/styles";
import Page from "../Lib/Page/Page.component";
import { RightSideBar } from "../Lib/RightSideBar/RightSideBar.component";

const InfoPanel = ({
    header,
    data,
    noData,
    className,
    styles = { textAlign: "center" },
}) => {
    return (
        <article className={className}>
            <h2 style={styles}>{header}</h2>
            {data || noData}
        </article>
    );
};

const Landing = () => {
    const [announces, setAnnounces] = useState([]);
    const [events, setEvents] = useState([]);
    const classes = app();

    // useEffect(() => {
    //     Promise.all([fetch('api/v1/annoucements'),
    //                  fetch('api/v1/events')])
    //            .then(results => {
    //                 setAnnounces(results[0]);
    //                 setEvents(results[1]);
    //            })
    // },[]);

    // TODO: impl. code for rendering

    let eventsRendered, announcesRendered;

    if (announces.length > 0) {
    }

    return (
        <main className={`${classes.center} ${classes.fullContainer}`}>
            <div className={"banner left-banner"}></div>
            <Page
                components={[
                    <h1 style={{ textAlign: "center", color: "white" }}>
                        <span className={classes.radialText}>
                            A Relaxing Experience
                        </span>
                        <span className={classes.radialText}>
                            Created &amp; Driven
                        </span>
                        <span className={classes.radialText}>By You</span>
                        <span
                            className={`${classes.tagline} ${classes.radialText}`}
                        >
                            Your Neighborhood Cigar Lounge
                        </span>
                    </h1>,
                    <InfoPanel
                        header={"Welcome"}
                        data={
                            <>
                                <p>Welcome to the Burning Leaf Cigar Lounge</p>
                                <p>Please take a look at our fine cigars</p>
                                <p>
                                    If any interest you, why not come visit us
                                    soon.
                                </p>
                                <p>
                                    Thank you for stopping by. Looking forward
                                    to see you soon.
                                </p>
                            </>
                        }
                        className={`${classes.infoPanel}`}
                        noData={"Error loading welcome"}
                    />,
                ]}
            />
        </main>
    );
};

export default Landing;
