import React, {useState, useEffect} from 'react';

export const Landing = () => {
    const [events, setEvents] = useState();
    const [popular, setPopular] = useState();

    useEffect(() => {
        Promise.all([
            fetch("/general/events").then(rawEve => rawEve.json()),
            fetch("/inventory/products/popular").then(rawProducts => rawProducts.json())
        ]).then(results => {
            setEvents(results[0]);
            setPopular(results[1]);
        });
    }, []);

    return (
        <main>
            <Carosuel />
            <section aria-label={"welcome"}>
                <h2>Welcome!</h2>
                <span>Consider leaving us a reivew on your favorite site</span>
            </section>
            <Announcemnts />
            <Events />
        </main>
    );
}

const Announcemnts = () => {
    const [announce, setAnnounce] = useState();

    useEffect(() => {
        fetch("/general/announcements")
            .then(raw => raw.json())
            .then(data => setAnnounce(data));
    }, []);

    return (
        <section aria-label={"announcements"}>
            {announce.forEach(ele => {
                return <Announcement name={ele.name}
                                     msg={ele.desc}
                                     date={ele.date} />
            })}
        </section>
    )
}

const Announcement = ({name, msg, date}) => {
    return (
        <article aria-label={name}>
            <h2 className={"card-date"}>{date}</h2>
            <p className={"card-desc"}>{msg}</p>
        </article>
    )
}

const Carosuel = () => {
    const [imgs, setImgs] = useState();

    useEffect(() => {
        fetch("/landing_pictures")
            .then(raw => raw.json())
            .then(data => setImgs(data));
    }, []);

    return (
        <div className="Carosuel"></div>
    )
}

const Events = () => {
    const [events, setEvents] = useState(); // No initial state on purpose
    
    useEffect(() => {
        fetch("/general/events", {
            method: "GET",
            headers: {
                "Content-Type":"application/json"
            }
        })
        .then(raw => raw.json())
        .then(data => setEvents(data));
    }, []); // Empty should ensure that only refresh with component?

    return (
        <section aria-label={"events"}>
            {events.map(eve => {
                return <Event name={eve.name}
                              description={eve.desc}
                              date={eve.date} />
            })}
        </section>
    )
}

// Pure functional component
const Event = ({ name, description, date }) => {
    return (
        <article aria-label={name}>
            <h3 className={"card-date"}>{date}</h3>
            <p className={"card-desc"}>{description}</p>
        </article>
    )
}
