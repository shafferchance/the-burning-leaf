let interval;
let pollData;

onmessage = function (e) {
    console.log("Worker: Message recieved");
    switch(e.data.action) {
        case "startPoll":
            if (interval !== "") {
                stopPolling(interval);
            }
            startPollingInterval(e.data.url);
            break;
        case "stopPoll":
            stopPolling(interval);
            interval = "";
            break;
    }
}

function poll (url) {
    fetch(url)
        .then(data => data.json())
        .then(result => {
            let objs = Object.keys(pollData);
            let test = Object.keys(result).filter((val, idx) => {
                if (val === objs[idx]) {
                    return true;
                }
            });

            if (test.length === objs.length) {
                postMessage({msg: "no-change"});
                return;
            }

            pollData = result;
            postMessage({msg: "started", content: result});
        });
}

function startPollingInterval (path) {
    poll(path);
    interval = setInterval(poll, 10000, path);
}

function stopPolling (id) {
    clearInterval(id);
    postMessage({msg: "stopped"});
}
