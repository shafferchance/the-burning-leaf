const { useEffect, useReducer, useState } = React;

function sendToSrvr (path, body, method = "GET", headers = {'content-type':'application/json'}) => {
    return fetch(`https://${window.location.host}/${path}`, {
        method: method,
        body: method === "GET" ? undefined : body,
        headers: headers
    })
    .then(raw => raw.json());
}

function reducer (state, action) {
    switch (action.type) {
        case 'set':
            return {
                ...state,
                [action.key]: action.value
            }
        default:
            return state;
    }
}

const App = () => {
    const [state, setState] = useReducer(reducer, {
        announces: [],
        events: [],
        landing_pics: [],
        pictures: [],
        products: []
    });
    const [loggedIn, setLoggedIn] = useState(false);


    
}

const Login = ({ setState, setLogin, loggedIn }) => {
    const [user, setUser] = useState("");
    const [pword, setPword] = useState("");

    const handleClose = () => {

        return;
    }

    const handleEmail = e => {
        setUser(e.target.value);
    }

    const handleLogin = e => {
        e.preventDefault();
        sendToSrvr(
            "api/v1/general/login", 
            JSON.stringify({
                user: e.target[0].value,
                pword: e.target[1].value
            }
        ), "POST")
        .then(result => {
            if (result.result === "success") {
                Promise.all([
                    sendToServer("api/v1/general/landing_pictures"),
                    sendToServer("api/v1/general/events"),
                    sendToServer("api/v1/general/announcements"),
                    sendToServer("api/v1/inv/products")
                ]).then(results => {
                    setState({
                        type: 'set',
                        key: 'landing_pics',
                        value: results[0].data
                    });
                    setState({
                        type: 'set',
                        key: 'events',
                        value: results[1].data
                    });
                    setState({
                        type: 'set',
                        key: 'announces',
                        value: results[2].data
                    });
                    setState({
                        type: 'set',
                        key: 'cigars',
                        value: results[3].data
                    });
                    setLogin(true);
                });
            }
        });
    }

    const handlePassword = e => {
        setPword(e.target.value);
    }

    return (
        React.createElement(React.Fragment, null,
            React.createElement(Form, null, 
                React.createElement(Modal, {
                    id: "login",
                    tabIndex: 0,
                    "aria-labelledby": "login",
                    toggle: handleClose,
                    isOpen: !loggedIn
                },  React.createElement(ModalHeader, {
                        toggle: handleClose
                    }, "Login"),
                    React.createElement(ModalBody, null,
                        React.createElement(FormGroup, null, 
                            React.createElement(Label, {
                                for: "user",
                            }, "Username: "),
                            React.createElement(Input, {
                                type: "email",
                                name: "email",
                                id: "username",
                                onChange: handleEmail
                            }),
                        ),
                        React.createElement(FormGroup, null,
                            React.createElement(Label, {
                                for: "pword"
                            }, "Password: "),
                            React.createElement(Input, {
                                type: "password",
                                name: "password",
                                onChange: handlePassword
                            })
                        ),
                        React.createElement(Button, {
                            type: "submit",
                            onClick: handleLogin
                        }, "Login")
                    )
                )
            )
        )
    );
}

const GenTable = ({ headers, elements,  row, AddForm }) => {
    const [selectedIdx, setSelected] = useState([]);
    const [data, setData] = useState(elements || []);


    const handleSelect = e => {
        setSelected(old => {
            let idx = Number(e.target.getAttribute("data-key"));
            let val = old.indexOf(idx);
            if ( val !== -1) {
                old.splice(idx, 1);
                setSelected([...old]);
            } else {
                setSelected([...old, idx]);
            } 
        });
    }

    return (
        React.createElement(Table, { hover: true }, 
            React.createElement("thead", null, 
                React.createElement("tr", null, 
                    headers.map((ele, idx) => React.createElement("th", {key: idx}, ele)
                )
            ),
            React.createElement("tbody", null, 
                data.map((ele, idx) => React.createElement(row, {
                    selected: selectedIdx.indexOf(idx) !== -1,
                    elements: ele,
                    key: idx,
                    onClick: handleSelect,
                    mutate: setData,
                    "data-key": idx.toString()
                }, null)),
                React.createElement(AddForm, {mutate: setData}, null))
            )
        )
    );

    const GenRow = ({ content, mutate, selected }) => {

        const handleBlur = e => {

        }

        const handleFocus = e => {

        }
        
        if (selected) {
            return (

            );
        }

        return (
            React.createElement(tr, null,
                content.map((ele, idx) => React.createElement("td", {key: idx}, ele)))
        )
    }
}

ReactDOM.render(React.createElement(App, null, null), document.getElementById("root"));