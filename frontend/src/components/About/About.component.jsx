import React, { useEffect, useState } from "react";

import Page from "../Lib/Page/Page.component";
import { sendToSrvr } from "../Lib/connections";

const About = () => {
  const [[founding, mission, bio], setAbout] = useState();
  const [[amentiesList, humidor, staff], setAmenties] = useState();

  useEffect(() => {
    Promise.all([
      sendToSrvr("api/v1/about/"),
      sendToSrvr("api/v1/about/amenties"),
    ])
      .then((data) => {
        setAbout(data[0]);
        setAmenties(data[1]);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Page
      components={[
        <div className={"vertical-flex-alignment"}>
          <div>
            <h2>Amenities</h2>
            <article title={"Amenities"}>
              {amentiesList ? <ul>{amentiesList}</ul> : "List coming soon"}
            </article>
            <article title={"Humidor"}>
              {humidor || "Humidor coming soon"}
            </article>
            <article title={"staff"}>{staff || "Staff coming soon"}</article>
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
        </div>,
      ]}
    />
  );
};

export default About;
