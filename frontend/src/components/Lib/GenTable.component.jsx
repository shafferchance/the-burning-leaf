import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label, 
         Modal, ModalHeader, ModalBody, Table } from 'reactstrap';

import { sendToSrvr } from '../Lib/connections';
import { useCustomContext } from 'react-global-light';

const GenTable = ({ name, content, elements, headers, mutate, endpoint, token }) => {
    const [selectedIdx, setSelected] = useState([]);
    const [open, setOpen] = useState(false);

    const handleSelect = e => {
        setSelected(old => {
            let idx = Number(e.target.getAttribute("data-key"));
            let val = old.indexOf(idx);

            if (val !== -1) {
                old.splice(idx, 1);
                return [...old];
            } else {
                return [...old, idx];
            }
        });
    }

    const eles = elements ? elements.map((ele, idx) => 
                    <GenRow content={ele} selected={selectedIdx.indexOf(idx) !== -1}
                            key={idx} onClick={handleSelect} mutate={mutate}
                            data-key={idx.toString()} />)
                    : null;

    return (
        <>
            <h1>{name}</h1>
            <Table hover={true}>
                <thead>
                    <tr>
                        {headers.map((ele, idx) => <th key={idx}>{ele}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {eles}
                    <GenAddRow setOpen={setOpen} />
                </tbody>
            </Table>
            <GenAddModal content={content} open={open} setOpen={setOpen}
                         endpoint={endpoint} mutate={mutate} token={token} />
        </>
    )
}

const GenAddRow = ({ setOpen }) => {
    const handleToggle = () => {
        setOpen(old => !old);
    }

    return (
        <tr>
            <td>
                <Button onClick={handleToggle}>{String.fromCharCode(10133)}</Button>
            </td>
        </tr>
    );
}

const GenAddModal = ({ content, open, mutate, name, stateKey, setOpen, endpoint, token }) => {
    const [state, setState] = useState({...content});

    const handleChange = e => {
        let target = e.target;
        setState(old => {
            let res = state[target.name];
            res.value = target.value;
            return {
                ...old,
                [target.name]: res
            }
        })
    }

    const handleToggle = () => {
        setOpen(old => !old);
    }

    const handleSubmit = e => {
        e.preventDefault();
        sendToSrvr(endpoint, JSON.stringify(state), "POST", {
            'content-type':'application/json',
            'Authorization': `Bearer ${token}`
        })
        .then(() => {
            mutate({
                action: "setValue",
                [stateKey]: state
            });
        })
        .catch(err => { throw new Error("Submission failed: " + err.message)});
    }

    const formBody = Object.keys(state).map((ele, idx) => 
        <FormGroup key={idx}>
            <Label for={ele}>{ele}</Label>
            <Input name={ele} type={state[ele].type} value={state[ele].value}
                   onChange={handleChange} />
        </FormGroup>
    );

    return (
        <Modal isOpen={open} toggle={handleToggle}>
            <ModalHeader toggle={handleToggle}>
                Add Row: {name}
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    {formBody}
                    <Button type={"submit"} color={"primary"}>Submit</Button>
                </Form>
            </ModalBody>
        </Modal>
    );
}

const GenRow = ({ content, mutate, stateKey, selected }) => {
    const [state,] = useCustomContext();

    const handleDelete = e => {
        let tmp = state[stateKey];
        if (Array.isArray(tmp)) {
            let idx = tmp.indexOf(content)
            tmp.splice(idx, 1);
        } else {
            console.log("");
        }

        mutate({
            type: `setValue`,
            [stateKey]: tmp
        })
    }

    const handleValueChange = e => {
        let target = e.target;
        let key = e.target.getAttribute("data-key");
        
        content[key].value = target.value;
        if (content[key].type === "file") {
            content[key].file = target.files[0];
        }

        mutate({
            type: `setValue`,
            [stateKey]: content
        });
    }

    if (selected) {
        let contents = Object.keys(content).filter(idx => idx !== "_id")
                             .map((ele, idx) => {
                                return (
                                    <td key={idx}>
                                        <Input data-key={ele} onChange={handleValueChange}
                                            value={content[ele].value}
                                            type={content[ele].type || "text"} />
                                    </td>
                                );
                             })
        return (
            <tr>
                {contents}
                <Button type={"submit"} color={"primary"} className={"delete-button"}
                        onClick={handleDelete}>
                    {String.fromCharCode(128465)}
                </Button>
            </tr>
        );
    }

    let contents = Object.keys(content).filter(idx => idx !== "_id")
                         .map((ele, idx) => <td key={idx}>{content[ele].value}</td>)
    return (
        <tr>
            {contents}
        </tr>
    )
}

export default GenTable;