import React, { useEffect, useState } from 'react';

import Page from '../Lib/Page.component';
import { sendToSrvr } from '../Lib/connections';

const About = () => {
    const [about, setAbout] = useState();
    const [amenties, setAmenties] = useState();

    useEffect(() => {
        Promise.all([
            sendToSrvr("api/v1/about/"),
            sendToSrvr("api/v1/about/amenties")
        ])
        .then(data => {
            setAbout(data[0]);
            setAmenties(data[1]);
        })
        .catch(err => console.error(err));
    });

    let amentiesList, humidor, staff;
    let founding, mission, bio;

    if (amenties) {
        amentiesList = amenties.list((val, idx) => <li key={idx}>{val}</li>);
        humidor = amenties.humidor;
        staff = amenties.staff;
    }

    if (about) {
        founding = about.founding;
        mission = about.mission;
        bio = about.bio;
    }

    return (
        <Page components={[
            <div className={"vertical-flex-alignment"}>
                <div>
                    <h2>Amenities</h2>
                    <article title={"Amenities"}>
                        {amentiesList ?
                            <ul>
                                {amentiesList}
                            </ul>
                        :
                            "List coming soon"}
                    </article>        
                    <article title={"Humidor"}>
                        {humidor || "Humidor coming soon"}
                    </article>
                    <article title={"staff"}>
                        {staff || "Staff coming soon"}
                    </article>
                </div>
            </div>,
            <div>
                <article title={"founding"}>
                    {founding || "Founding story coming soon"}
                </article>
                <article title={"mission"}>
                    {mission || "Mission coming soon"}
                </article>
                <article title={"About Kamul"}>
                    {bio || "Biography coming soon"}
                </article>
            </div>]} />
    )
}

export default About;