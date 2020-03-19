window.addEventListener("load", () => {
    const nav = document.querySelector("nav");
    nav.addEventListener("click", e => {
        e.preventDefault();
        const page = e.srcElement.getAttribute("value");
        const mainContent = document.querySelector(".center");
        if (mainContent.parentElement.getAttribute("data-curr") === page) {
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