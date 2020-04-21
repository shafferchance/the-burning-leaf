'use strict';

function createLoading () {
    const loading = document.createElement("div");
    loading.classList.add("spinning-loader");
    return loading;
}

function liFactory (cigar) {
    const li = document.createElement("li");
    const brand = document.createElement("h2");
    const p = document.createElement("p");
    const img = new Image();
    
    p.innerText = cigar.desc;
    img.src = cigar.img;
    brand.innerText = cigar.brand;
    brand.classList.add("brand");

    li.setAttribute("data-brand", cigar.brand);
    li.append(img, brand, p);
    return li;
}

function renderList (data) {
    let frag = document.createDocumentFragment();
    let cigars = document.querySelector(".available_cigars");
    data.map((val) => {
        frag.append(liFactory(val));
    });
    const section = document.createElement("section");
    const ul = document.createElement("ul");
    ul.append(frag);
    cigars.children[0].replaceWith(ul);
}

function handleMessage (e) {
    switch (e.data.msg) {
        case "started":
            console.log("Polling started");
            renderList(e.data.content);
        case "stopped":
            console.log("Polling stopped");
            break;
        case "no-change":
            console.log("No changes found");
            break;
        default:
            console.error("Unexpected message");
            break;
    }
}

let cigarList = document.querySelector(".available_cigars");
let wrkr = new Worker("./polling.js");

wrkr.addEventListener("message", handleMessage);

wrkr.postMessage({type: "startPoll", url: `https://${window.location.host}/api/v1/inv/products`});