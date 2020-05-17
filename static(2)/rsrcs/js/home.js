'use strict';

function eventFactory (eve) {
    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const time = document.createElement("time");
    const p = document.createElement("p");
    const date = new Date(eve.date);
    
    h3.innerText = eve.title;
    time.dateTime = date.toTimeString();
    p.innerText = eve.desc;

    li.append(time, h3, p);
    return li;
}

function announceFactory (announce) {
    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const msg = document.createElement("p");

    h3.innerText = announce.title;
    msg.innerText = announce.desc;
    li.append(h3, msg);
    return li;
}

function renderAnnounce (announcements) {
    const frag = document.createDocumentFragment();
    const ul = document.createElement("ul");
    ul.classList.add("announce");
    announcements.map(val => {
        frag.append(announceFactory(val));
    });
    ul.append(frag);
    document.querySelector(".announcement").replaceWith(ul);
}

function renderEvents (events) {
    const frag = document.createDocumentFragment();
    const ul = document.createElement("ul");
    ul.classList.add("events");
    events.map(val => {
        frag.append(eventFactory(val));
    });
    ul.append(frag);
    document.querySelector(".events").replaceWith(ul);
}

let evePoll = new Worker("./polling.js");
let announcePoll = new Worker("./polling.js");

evePoll.addEventListener("message", renderEvents);
announcePoll.addEventListener("message", renderAnnounce);

evePoll.postMessage({type: "startPoll", url: `https://${window.location.host}/api/v1/general/events`});
announcePoll.postMessage({type: "startPoll", url: `https://${window.location.host}/api/v1/general/announcements`});