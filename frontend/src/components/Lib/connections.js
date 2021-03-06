export function sendToSrvr(
    path,
    body,
    method = "GET",
    headers = { "content-type": "application/json" }
) {
    const url = window.location.host.includes("localhost")
        ? `http://${SERVICE_URL}/${path}`
        : `https://${SERVICE_URL}/${path}`;
    // const url = `http://${SERVICE_URL}/${path}`;
    return fetch(url, {
        method: method,
        body: method === "GET" ? undefined : body,
        headers: headers,
    }).then((raw) => raw.json());
}
