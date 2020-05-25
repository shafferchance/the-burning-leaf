const { useEffect, useReducer, useState } = React;
const { Button, Carousel, CarouselCaption, CarouselControl, 
        CarouselIndicators, CarouselItem, Form, FormGroup, Input, 
        Label, Modal, ModalHeader, ModalBody, Table } = Reactstrap;

function sendToSrvr (path, body, method = "GET", headers = {'content-type':'application/json'}) {
    return fetch(`https://${window.location.host}/${path}` /*`https://cigar.temporaltech.app/${path}`*/, {
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
        console.log(e.target);
        sendToSrvr(
            "api/v1/users/login", 
            JSON.stringify({
                user: e.target[0].value,
                pword: e.target[1].value
            }
        ), "POST")
        .then(result => {
            if (result.result === "success") {
                Promise.all([
                    sendToSrvr("api/v1/general/landing_pictures"),
                    sendToSrvr("api/v1/general/events"),
                    sendToSrvr("api/v1/general/announcements"),
                    sendToSrvr("api/v1/inv/products")
                ]).then(results => {
                    setState({
                        type: 'set',
                        key: 'landing_pics',
                        value: results[0].data.length === 0 ? promises : results[0].data
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
                React.createElement(Modal, {
                    id: "login",
                    tabIndex: 0,
                    "aria-labelledby": "login",
                    toggle: handleClose,
                    isOpen: !loggedIn
                },  
                    React.createElement(ModalHeader, {
                        toggle: handleClose
                    }, "Login"),
                    React.createElement(ModalBody, null,
                        React.createElement(Form, { onSubmit: handleLogin},
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
                            React.createElement(Input, {
                                type: "submit",
                                value: "Login"
                            })
                        )
                    )
                )
            )
        );
}

const LandingPics = ({ pictures, mutate }) => {
    const [activeIdx, setActiveIdx] = useState(0);
    const [animActive, setAnimActive] = useState(false);

    const next = () => {
        if (animActive) return;
        setActiveIdx(old => old === pictures.length - 1  ? 0 : old + 1);
    }

    const prev = () => {
        if (animActive) return;
        setActiveIdx(old => old === 0 ? pictures.length - 1 : old - 1);
    }

    const idxDirect = newIdx => {
        if (animActive) return;
        setActiveIdx(newIdx);
    }

    const handleChange = e => {
        let img = e.target.getAttribute("data-src");

    }

    const exitg = () => setAnimActive(true);
    const exitd = () => setAnimActive(false);

    console.log(pictures);
    
    return (
        React.createElement(Carousel, {
            activeIndex: activeIdx,
            next: next,
            previous: prev,
            pause: 'hover',
            interval: 180000
        },
            React.createElement(CarouselIndicators, {
                items: pictures,
                activeIndex: activeIdx,
                onClickHandler: idxDirect
            }, null),
            pictures.map((ele, idx) => 
                React.createElement(CarouselItem, {
                    onExiting: exitg,
                    onExited: exitd,
                    key: idx
                }, 
                    React.createElement("img", {
                        src: ele.data,
                        "data-target": idx,
                        style: {objectFit: "contain", width: '100%', height: '20vh'}
                    }, null),
                    React.createElement("div", {
                        className:"carousel-caption d-none d-md-block"
                    },
                        React.createElement(Input, {
                            type: "file",
                            accept: ".jpg, .jpeg, .png",
                            onChange: handleChange,
                            "data-src": idx,
                            style: {color: 'black', float: 'left'}
                        }, null)
                    )
                )
            )
        )
    )
}

const GenTable = ({ content, elements, headers, mutate, endpoint }) => {
    const [selectedIdx, setSelected] = useState([]);
    const [data, setData] = useState(elements || []);
    const [open, setOpen] = useState(false);

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
        React.createElement(React.Fragment, null, 
            React.createElement(Table, { hover: true }, 
                React.createElement("thead", null, 
                    React.createElement("tr", null, 
                        headers.map((ele, idx) => React.createElement("th", {key: idx}, ele))
                    )
                ),
                React.createElement("tbody", null, 
                    data.map((ele, idx) => React.createElement(GenRow, {
                        selected: selectedIdx.indexOf(idx) !== -1,
                        elements: ele,
                        key: idx,
                        onClick: handleSelect,
                        mutate: setData,
                        "data-key": idx.toString()
                    }, null)),
                    React.createElement(GenAddRow, { setOpen: setOpen }, null)
                )
            ),
            React.createElement(GenAddModal, {
                content: content,
                open: open,
                setOpen: setOpen,
                endpoint: endpoint
            }, null)
        )
    );
}

const GenAddRow = ({ setOpen }) => {
    const handleToggle = () => {
        setOpen(old => !old);
    } 

    return (
        React.createElement("tr", null, 
            React.createElement("td", null,
                React.createElement(Button, { onClick: handleToggle }, String.fromCharCode(10133)
            ))
        )
    );
}

const GenAddModal = ({ content, open, setOpen, endpoint }) => {
    const [state, setState] = useState({...content})

    const handleChange = e => {
        let target = e.target;
        setState(old => {
            let results = state[target.name];
            results.value = target.value;
            console.log({...old, [target.name]: results});
            return {
                ...old,
                [target.name]: results
            }
        })
    }

    const handleToggle = () => {
        setOpen(old => !old);
    }

    const handleSubmit = e => {
        e.preventDefault();
        sendToSrvr(endpoint, JSON.stringify(state), "POST")
            .then(() => console.log("Success"))
            .catch(err => alert(err));
    }
    return (
        React.createElement(Modal, {isOpen: open, toggle: handleToggle},
            React.createElement(ModalHeader, {toggle: handleToggle}, "Add Row"),
            React.createElement(ModalBody, null, 
                React.createElement(Form, {onSubmit: handleSubmit}, 
                    Object.keys(state).map((ele, idx) => 
                        React.createElement(FormGroup, { key: idx },
                            React.createElement(Label, {
                                for: ele
                            }, ele),
                            React.createElement(Input, {
                                name: ele, 
                                type: state[ele].type,
                                value: state[ele].value,
                                onChange: handleChange
                            }, null)
                        )
                    ),
                    React.createElement(Input, {type: "submit"}, null)
                )
            )     
        )
    );
}

const GenRow = ({ content, mutate, selected }) => {

    // const handleBlur = e => {

    // }

    const handleDelete = e => {
        mutate(old => {
            let target = e.target.getAttribute("data-key");
            delete old[target];
            return old;
        });
    }

    // const handleFocus = e => {

    // }

    const handleValueChange = e => {
        mutate(old => {
            let target = e.target;
            let key = target.getAttribute("data-key");
            let tmp = content[key];
            tmp.value = e.target.value;
            if (tmp.type === "file") {
                tmp.file = e.target.files[0];
            }
            return {
                ...old,
                ...tmp
            }
        })
    }
    console.log(Button);
    console.log(Input);
    if (selected) {
        return (
            React.createElement("tr", null,
                Object.keys(content).map((ele, idx) => 
                    React.createElement("td", {key: idx}, 
                        React.createElement(Input, {
                            "data-key": ele,
                            onChange: handleValueChange,
                            value: content[ele].value,
                            type: content[ele].type || "text"
                        }, null)
                    )
                ),
                React.createElement("td", null,
                    React.createElement(Button, {
                        "data-key": ele, 
                        className: 'delete-button',
                        onClick: handleDelete
                    }, String.fromCharCode(128465))
                )
            )
        );
    }

    return (
        React.createElement("tr", null,
            Object.keys(content)
                    .map((ele, idx) => React.createElement("td", { key: idx }, content[ele].value)))
    )
}

const App = () => {
    const [state, setState] = useReducer(reducer, {
        announces: [],
        events: [],
        landing_pics: [],
        products: []
    });
    const [loggedIn, setLoggedIn] = useState(false);

    const handleFile = e => {
        const input = e.target;
        if (input.files.length === 0) {
            return;
        }

        const file = input.files[0];
        const img = input.parentElement.parentElement.childnodes[0];
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            img.src = reader.result;
            sendToSrvr("products", JSON.stringify({
                src: reader.result,
            }), "PUT")
            .then(result => console.log(result))
            .catch(err => console.error(err)); 
        }, false);
        reader.readAsDataURL(file);
    }

    return (
        React.createElement(React.Fragment, null,
            React.createElement(LandingPics, {
                pictures: state.landing_pics,
                mutate: handleFile
            }, null),
            React.createElement(GenTable, {
                headers: ["date", "msg"],
                elements: state.announces,
                mutate: setState,
                content: {
                    "Date": {
                        type: 'date',
                        value: ''
                    },
                    "Message": {
                        type: 'text',
                        value: ''
                    }
                },
                endpoint: 'api/v1/general/announcements'
            }, null),
            React.createElement(GenTable, {
                headers: ["date", "msg"],
                elements: state.events,
                content: {
                    "Date": {
                        type: 'date',
                        value: ''
                    },
                    "Message": {
                        type: 'text',
                        value: ''
                    }
                },
                endpoint: 'api/v1/general/events'
            }, null),
            React.createElement(GenTable, {
                headers: ["img","brand","desc"],
                elements: state.products,
                content: {
                    "Brand Image": {
                        type: 'file',
                        value: ''
                    },
                    "Brand": {
                        type: "text",
                        value: ''
                    },
                    "Desc": {
                        type: "text",
                        value: ''
                    }
                },
                endpoint: 'api/v1/products'
            }, null),
            !loggedIn ? React.createElement(Login, {
                setState: setState,
                setLogin: setLoggedIn,
                loggedIn: loggedIn
            }) : null
        )
    );
}

ReactDOM.render(React.createElement(App, null, null), document.getElementById("root"));