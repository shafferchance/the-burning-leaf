window.addEventListener("load", () => {
    const menu = document.querySelector("menu");
    menu.addEventListener("pointerdown", e => {
        if(e.srcElement.getAttribute("value") === null) {
            return;
        }
        const page = e.srcElement.getAttribute("value");
        const mainContent = document.querySelector(".center");
        if (mainContent.parentElement.getAttribute("data-curr") === page || page === "pass") {
            return;
        }
        fetch(`pages/${page}.html`)
            .then(raw => raw.text())
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, "text/html");
                mainContent.parentElement.setAttribute("data-curr", page);
                mainContent.replaceWith(doc.body.querySelector(".center"));
            })
    });
});