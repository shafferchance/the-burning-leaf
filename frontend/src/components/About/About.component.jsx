import React, { useEffect, useState } from 'react';

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

    return (
        <>
            <div>
                <div>
                    <h2>Amenities</h2>
                    <article title={"amenities"}>
                        {amenties.list ?
                            <ul>
                                {amenties.list.map((val, idx) => <li key={idx}>{val}</li>)}
                            </ul>
                        :
                            "List coming soon"}
                    </article>        
                    <article title={"Humidor"}>
                        {amenties.humidor || "Humidor coming soon"}
                    </article>
                    <article title={"staff"}>
                        {amenties.staff || "Staff coming soon"}
                    </article>
                </div>
            </div>
            <div>
                <article title={"founding"}>
                    {about.founding || "Founding story coming soon"}
                </article>
                <article title={"mission"}>
                    {about.mission || "Mission coming soon"}
                </article>
                <article title={"About Kamul"}>
                    {about.bio || "Biography coming soon"}
                </article>
            </div>
        </>
    )
}

export default About;