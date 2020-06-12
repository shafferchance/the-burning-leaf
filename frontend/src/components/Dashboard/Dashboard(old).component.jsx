import React, { useEffect, useState } from 'react';
import { useCustomContext } from 'react-global-light';
import { Button, Carousel, CarouselCaption, CarouselControl, 
         CarouselIndicators, CarouselItem, Form, FormGroup, Input, 
         Label, Modal, ModalHeader, ModalBody, Table } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import GenTable from '../Lib/GenTable.component';
import { sendToSrvr } from '../Lib/connections';
import Cigars from '../App/cigars.jpeg';
import Lounge from '../App/lounge.jpeg';
import PepBurn from '../App/people_burning.jpeg';
import Store from '../App/store_front.jpeg';

const Login = ({ setState, setLogin, loggedIn }) => {
    const [usr, setUsr] = useState("");
    const [pword, setPword] = useState("");

    const handleClose = () => {
        return;
    }

    const handleEmail = e => {
        setUsr(e.target.value);
    }

    const handleLogin = e => {
        e.preventDefault();
        sendToSrvr(
            "api/v1/users/login",
            JSON.stringify({
                user: usr,
                pword: pword
            }),
            "POST"
        )
        .then(result => {
            if (result.message === "success") {
                setState({
                    type: 'setValue',
                    token: result.jwt_token
                });
                Promise.all([
                    sendToSrvr("api/v1/general/landing_pictures"),
                    sendToSrvr("api/v1/general/events_list"),
                    sendToSrvr("api/v1/general/announcement_list"),
                    sendToSrvr("api/v1/inv/products")
                ]).then(results => {
                    setState({
                        type: 'setValue',
                        landing_pics: results[0].data.length === 0 ? 
                            [PepBurn, 
                             Cigars,
                             Lounge,
                             Store]
                                : results[0].data
                    });
                    setState({
                        type: 'setValue',
                        events: results[1].data
                    });
                    setState({
                        type: 'setValue',
                        annoucements: results[2].data
                    });
                    setState({
                        type: 'setValue',
                        cigars: results[3].data
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
        <>
            <Modal id={"login"} tabIndex={0} aria-labelledby={"login"}
                   toggle={handleClose} isOpen={!loggedIn}>
                <ModalHeader toggle={handleClose}>
                    <Form onSubmit={handleLogin}>
                        <FormGroup>
                            <Label for={"user"}>Username:</Label>
                            <Input type={"email"} name={"email"}
                                   id={"username"} onChange={handleEmail} />
                        </FormGroup>
                        <FormGroup>
                            <Label for={"pword"}>Password:</Label>
                            <Input type={"password"} name={"password"}
                                   onChange={handlePassword} />
                        </FormGroup>
                        <Input type={"submit"} value={"Login"} />
                    </Form>
                </ModalHeader>
            </Modal>
        </>
    )
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
        <Carousel activeIndex={activeIdx} next={next}  previous={prev}
                  pause={'hover'} interval={180000}>
            <CarouselIndicators items={pictures} activeIndex={activeIdx}
                                onClickHandler={idxDirect} />
            {pictures.map((ele, idx) => 
                <CarouselItem onExiting={exitg} onExited={exitd} key={idx}>
                    <img src={ele} data-target={idx} 
                         style={{objectFit: "contain", width: '100%', height: '20vh'}} />
                    <div className={"carousel-caption d-none d-md-block"}>
                        <Input type={"file"} accept={".jpg, .jpeg, .png"}
                               onChange={handleChange}
                               data-src={idx} style={{color: 'black', float: 'left'}} />
                    </div>
                </CarouselItem>
            )}
        </Carousel>
    )
}

const Dashboard = () => {
    const [state,setState] = useCustomContext("global");
    const [login, setLogin] = useState(false);

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
                src: reader.result
            }), "PUT", {
                'content-type':'application/json',
                'Authoriztion':`Bearer ${state.token}`
            })
            .then(result => console.log(result))
            .catch(err => console.error(err));
        }, false);
        reader.readAsDataURL(file);
    }

    return (
        <div style={{
                position: 'fixed', 
                backgroundColor: 'white', 
                border: "1px solid black",
                borderRadius: "5px",
                width: "100vw",
                height: "100vh",
                zIndex: 999
            }} className={"center"}>
            <LandingPics pictures={state.landing_pics} mutate={handleFile}
                         token={state.token} />
            <GenTable name={"Announcements"} headers={["data", "msg"]}
                      elements={state.annoucements} mutate={setState}
                      content={{Date: {type: 'date', value: ''},
                                Message: {type: 'text', value: ''}}}
                      endpoint={'api/v1/general/annoucements'}
                      token={state.token} />
            <GenTable name={"Events"} headers={["data", "msg"]}
                      elements={state.events} mutate={setState}
                      content={{Date: {type: 'date', value: ''},
                                Message: {type: 'text', value: ''}}}
                      endpoint={'api/v1/general/events'}
                      token={state.token} />
            <GenTable name={"Products"} headers={["img", "brand", "desc"]}
                      elements={state.products} mutate={setState}
                      content={{"Brand Image": {type: 'file', value: ''},
                                Brand: {type: 'text', value: ''},
                                Desc: {type: 'text', value: ''}}}
                      endpoint={'api/v1/inv/products'}
                      token={state.token} />
            {!login ? 
                <Login setState={setState} setLogin={setLogin} loggedIn={login} />
                    : null }
        </div>
    );
}

export default Dashboard;