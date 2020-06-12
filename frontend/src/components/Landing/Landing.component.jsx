    import React, { useEffect, useState } from 'react';

import 'react-calendar/dist/Calendar.css';

import Page from '../Lib/Page/Page.component';
import { RightSideBar } from '../Lib/RightSideBar/RightSideBar.component';

const InfoPanel = ({ header, data, noData, className, styles={textAlign: "center"}}) => {
    return (
        <article className={className}>
            <h2 style={styles}>{header}</h2>
            {data || noData}
        </article>
    );
}

const Landing = () => {
    const [announces, setAnnounces] = useState([]);
    const [events, setEvents] = useState([]);

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
        <main className={"center"} style={{position: "absolute"}}>
            <div className={"banner left-banner"}></div>
            <Page components={[
            <h1 className={"center"} style={{position: "absolute", textAlign: "center", color: 'white'}}>
                <span className={"radial-text"}>A Relaxing Experience</span>
                <span className={"radial-text"}>Created &amp; Driven</span>
                <span className={"radial-text"}>By You</span>
                <span className={"tagline radial-text"}>
                    Your Neighborhood Cigar Lounge
                </span>
            </h1>,
            <InfoPanel header={"Welcome"}
                        data={
                            <>
                                <p>Welcome to the Burning Leaf Cigar Lounge</p>
                                <p>Please take a look at our fine cigars</p>
                                <p>If any interest you, why not come visit us soon.</p>
                                <p>Thank you for stopping by. Looking forward to see you soon.</p>
                            </>
                        }
                        className={"info-panel center"}
                        noData={"Error loading welcome"} />
            ]} />
            <RightSideBar />
        </main>
    );
}

export default Landing;