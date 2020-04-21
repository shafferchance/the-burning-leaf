let landing_pics;
let cigars;
let events;
let announces;

function sendToServer (path, body, method = "GET", headers = {'content-type':'application/json'}) {
    return fetch(`https://${window.location.host}/${path}`, {
        method: method,
        body: method === "GET" ? undefined : body,
        headers: headers
    })
    .then(raw => raw.json())
}

function submitImages (pic) {
    landing_pics[pic.idx] = pic;
    sendToServer("landing_pictures", JSON.stringify(landing_pics), "POST")
        .then(data => {
            console.log(data);
        });
}

function handleImgSub (e) {
    let container = e.target.parentElement;
    let idx = e.target.parentElement.parentElement.getAttribute("data-idx");
    let img = e.target.parentElement.parentElement.children[0];

    let body = {
        idx: idx,
        desc: container.children[0].value,
        img: img.src
    }
    submitImages(body);
}

const validTypes = ["image/png", "image/jpeg", "image/pjpeg", "image/apng"];

function handleUpload (e) {
    let img = e.target.parentElement.parentElement.children[0];
    const currFiles = e.target.files;

    if (currFiles.length === 0) {
        alert("File not uploaded for preview! Please try again");
    }

    const file = currFiles.item(0);
    if (!validTypes.includes(file.type)) {
        alert("Invalid file uploaded");
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
        img.src = reader.result;
    }, false);
    reader.readAsDataURL(file);
}

function carosuelFactory (pic) {
    let parent = document.createElement("div");
    let contain = document.createElement("div");
    let h3 = document.createElement("h3");
    let p = document.createElement("p");
    let butt = document.createElement("input");
    let submit = document.createElement("button");
    let img = new Image();
    
    parent.setAttribute("data-idx", pic.idx);
    parent.classList.add("carousel-item");
    contain.classList.add("carousel-caption", "d-none", "d-md-block");
    img.classList.add("d-block", "w-100");
    img.src = pic.img;
    img.alt = pic.desc;
    h3.setAttribute("contenteditable", "true");
    h3.innerText = pic.desc;
    butt.type = "file";
    butt.accept = ".jpg, .jpeg, .png";
    butt.classList.add("btn", "btn-secondary");
    butt.addEventListener("change", handleUpload);
    submit.type = "Submit";
    submit.value = "Submit";
    submit.classList.add("btn", "btn-primary");
    submit.addEventListener("click", handleImgSub);

    contain.append(h3, p, butt, submit);
    parent.append(img, contain);
    return parent;   
}

function renderCarousel (pics) {
    let pics_carousel = document.querySelector(".carousel-inner");

    if (pics.length > 4) {
        throw SyntaxError("Too many pictures");
    }

    let frag = document.createDocumentFragment();
    let new_carousel = document.createElement("div");

    new_carousel.classList.add("carousel-inner");
    pics.map((val,idx) => {
        let entry = carosuelFactory(val);
        if (idx === 0) {
            entry.classList.add("active");
        }
        frag.append(carosuelFactory(val));
    
    });
    new_carousel.append(frag);
    pics_carousel.replaceWith(new_carousel);
}

function dateFactory(date) {
    let dateTrans = new Date(date ? date * 1000 : 0);
    const input = document.createElement("input");
    input.type = "date";
    input.value = dateTrans.toISOString().split('T')[0];
    return dateTrans;
}

function tableRowFactroy (...row) {
    const rowEle = document.createElement("tr");
    for (const eles of row) {
        const td = document.createElement("td");
        td.setAttribute("contenteditable")
        rowEle.append(eles);
    }
    return rowEle;
}

function deleteEvent (e) {
    sendToServer("api/v1/general/events", JSON.stringify({
        id: e.target.parentElement.getAttribute("data-id")
    }), "DELETE")
    .then(result => {
        if (result === "success") {
            e.target.parentElement("data-selected", "false");
            e.target.removeEventListener("click", deleteEvent);
            e.target.remove();
        }
    })
    .catch(err => console.error(err));
}

function preconfigDeleteEvent (e) {
    if (e.target.getAttribute("data-selected") === "true") {
        let del = e.target.querySelector(".delete");
        del.removeEventListener("click", deleteEvent);
        del.remove();
        e.target.setAttribute("data-selected", "false");
        return;
    }
    let delEle = document.createElement("td");
    delEle.classList.add("delete");
    delEle.innerHTML = "&x1f5d1;"
    delEle.addEventListener("click", deleteEvent, false);
    e.target.setAttribute("data-selected", "true");
    e.target.append(delEle);
}

function sumbitEvent (e) {
    let id = e.target.getAttribute("data-id");
    let body = {
        id: id === "tmp" ? idGen() : id,
        date: e.target.children[0].innerText,
        msg: e.target.children[1].innerText
    }
    sendToServer("api/v1/general/events", JSON.stringify(body), id === "tmp" ? "POST" : "PUT")
        .then(result => console.log(result))
        .catch(err => console.error(err));
}

function addEvents (e) {
    let target = e.target;
    let td = document.createElement("td"); let td2 = document.createElement("td");
    let tr = document.createElement("tr"); let span = document.createElement("span");
    span.contentEditable = true;
    td.append(dateFactory()); td2.append(span);
    tr.append(td); 
    tr.append(td2);
    row.addEventListener("focusout", sumbitEvent);
    target.parentElement.append(row);
    row.focus();
}

function renderEvents (events) {
    let contain = document.querySelector("#announceContain");
    let frag = document.createDocumentFragment();
    for(const ele of events) {
        let row = tableRowFactroy(ele.img, ele.brand, ele.desc, input);
        row.setAttribute("data-id",ele.id);
        row.addEventListener("click", preconfigDeleteEvent)
        row.addEventListener("focusout", sumbitEvent);
        frag.append(row);
    }
    let add = document.createElement("span");
    add.innerHTML = "&#10133;";
    add.addEventListener("click", addEvents);
    frag.append(add);
    contain.append(frag);
}

function deleteAnnounce (e) {
    sendToServer("api/v1/general/announcements", JSON.stringify({
        id: e.target.parentElement.getAttribute("data-id")
    }), "DELETE")
    .then(result => {
        if (result === "success") {
            e.target.parentElement("data-selected", "false");
            e.target.removeEventListener("click", deleteAnnounce);
            e.target.remove();
        }
    })
    .catch(err => console.error(err));
}

function preconfigDeleteAnnounce (e) {
    if (e.target.getAttribute("data-selected") === "true") {
        let del = e.target.querySelector(".delete");
        del.removeEventListener("click", deleteAnnounce);
        del.remove();
        e.target.setAttribute("data-selected", "false");
        return;
    }
    let delEle = document.createElement("td");
    delEle.classList.add("delete");
    delEle.innerHTML = "&x1f5d1;"
    delEle.addEventListener("click", deleteAnnounce, false);
    e.target.setAttribute("data-selected", "true");
    e.target.append(delEle);
}

function sumbitAnnouncement (e) {
    let id = e.target.getAttribute("data-id");
    let body = {
        id: id === "tmp" ? idGen() : id,
        date: e.target.children[0].innerText,
        msg: e.target.children[1].innerText
    }
    sendToServer("api/v1/inv/products", JSON.stringify(body), id === "tmp" ? "POST" : "PUT")
        .then(result => console.log(result))
        .catch(err => console.error(err));
}

function addAnnouncement (e) {
    let target = e.target;
    let td = document.createElement("td"); let td2 = document.createElement("td");
    let tr = document.createElement("tr"); let span = document.createElement("span");
    span.contentEditable = true;
    td.append(dateFactory()); td2.append(span);
    tr.append(td); 
    tr.append(td2);
    row.addEventListener("focusout", sumbitAnnouncement);
    target.parentElement.append(row);
    row.focus();
}

function renderAnnouncments (announcements) {
    let contain = document.querySelector("#announceContain");
    let frag = document.createDocumentFragment();
    for(const ele of announcements) {
        let td = document.createElement("td");
        td.append(dateFactory(ele.date));
        let row = tableRowFactroy(ele.msg);
        row.setAttribute("data-id",ele.id);
        row.addEventListener("click", preconfigDeleteAnnounce);
        row.append(td);
        frag.append(row);
    }
    let add = document.createElement("span");
    add.innerHTML = "&#10133;";
    add.addEventListener("click", addAnnouncement);
    frag.append(add);
    contain.append(frag);
}

// Breaking DRY here
function cigarUpload (e) {
    let img = e.target.parentElement.children[3];
    const currFiles = e.target.files;
    let target = e.target;

    if (currFiles.length === 0) {
        alert("File not uploaded for preview! Please try again");
    }

    const file = currFiles.item(0);
    if (!validTypes.includes(file.type)) {
        alert("Invalid file uploaded");
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
        img.src = reader.result;
        sendToServer("products", JSON.stringify({
            id: target.getAttribute("data-id"),
            data: JSON.stringify({
                img: reader.result,
                brand: target.parentElement.children[1].innerText,
                desc: target.parentElement.children[2].innerText,
            }, "PUT")
        })).then(result => console.log(result))
           .catch(err => console.error(err));
    }, false);
    reader.readAsDataURL(file);
}

function deleteCigar (e) {
    sendToServer("api/v1/inv/products", JSON.stringify({
        id: e.target.parentElement.getAttribute("data-id")
    }), "DELETE")
    .then(result => {
        if (result === "success") {
            e.target.parentElement("data-selected", "false");
            e.target.removeEventListener("click", deleteCigar);
            e.target.remove();
        }
    })
    .catch(err => console.error(err));
}

function preconfigDeleteCigar (e) {
    if (e.target.getAttribute("data-selected") === "true") {
        let del = e.target.querySelector(".delete");
        del.removeEventListener("click", deleteCigar);
        del.remove();
        e.target.setAttribute("data-selected", "false");
        return;
    }
    let delEle = document.createElement("td");
    delEle.classList.add("delete");
    delEle.innerHTML = "&x1f5d1;"
    delEle.addEventListener("click", deleteCigar, false);
    e.target.setAttribute("data-selected", "true");
    e.target.append(delEle);
}

function sumbitCigar (e) {
    let id = e.target.getAttribute("data-id");
    let body = {
        id: id === "tmp" ? idGen() : id,
        img: e.target.children[0].src,
        brand: e.target.children[1].innerText,
        desc: e.target.children[2].innerText
    }
    sendToServer("api/v1/inv/products", JSON.stringify(body), id === "tmp" ? "POST" : "PUT")
        .then(result => console.log(result))
        .catch(err => console.error(err));
}

function addCigar (e) {
    let target = e.target;
    const input = document.createElement("input");
    input.setAttribute("data-id", "tmp");
    input.addEventListener("change", cigarUpload);
    let row = tableRowFactroy("", "", "", input);
    row.addEventListener("focusout", sumbitCigar);
    target.parentElement.append(row);
    row.focus();
}

function renderCigars (cigars) {
    let contain = document.querySelector("#cigarContain");
    let frag = document.createDocumentFragment();
    for(const ele of cigars) {
        const input = document.createElement("input");
        input.setAttribute("data-id", ele.id);
        input.addEventListener("change", cigarUpload);
        let row = tableRowFactroy(ele.img, ele.brand, ele.desc, input);
        row.setAttribute("data-id",ele.id);
        row.addEventListener("click", preconfigDeleteCigar);
        row.addEventListener("focusout", sumbitCigar);
        frag.append(row);
    }
    let add = document.createElement("span");
    add.innerHTML = "&#10133;";
    add.addEventListener("click", addCigar);
    frag.append(add);
    contain.append(frag);
}

function idGen () {
    return '_' + Math.random().toString(12).substring(2,9);
}    

$(window).on("load", function() {
    $("#login").modal('show');
    $("#loginModalForm").submit(function (e){
        e.preventDefault();
	console.log(e);
        let body = {
            user: e.target[0].value,
            pword: e.target[1].value
        };
        sendToServer("api/v1/general/login", JSON.stringify(body), "POST")
            .then(result => {
                if (result.result === "success") {
                    $("#login").modal('hide');
                    Promise.all([
                        sendToServer("api/v1/general/landing_pictures").then(raw => raw.json()),
                        sendToServer("api/v1/general/events").then(raw => raw.json()),
                        sendToServer("api/v1/general/announcements").then(raw => raw.json()),
                        sendToServer("api/v1/inv/products").then(raw => raw.json())
                    ]).then(results => {
                        landing_pics = results[0];
                        events = results[1];
                        announces = results[2];
                        cigars = results[3];
                    
                        console.log("Rendering Carosuel");
                        renderCarousel(landing_pics);
                        console.log("Rendering Events");
                        renderEvents(events);
                        console.log("Rendering Announcements");
                        renderAnnouncments(announces);
                        console.log("Rendering Cigars");
                        renderCigars(cigars);
                    });
                } else {
                    alert("Invalid username and password");
                }
            })
    });
});

