import {
    KeyboardDateTimePicker,
    KeyboardTimePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MUIDataTable from "mui-datatables";
import Carousel from "react-material-ui-carousel";
import React, { useState, useReducer } from "react";
import { useCustomContext } from "react-global-light";
import PublishIcon from "@material-ui/icons/Publish";
import AddIcon from "@material-ui/icons/Add";
import Login from "../Lib/Login/Login.component";
import {
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    Button,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    TextField,
    Typography,
    IconButton,
    Input,
    Fade,
    Backdrop,
    makeStyles,
    Checkbox,
    CardMedia,
    Tooltip,
    withStyles,
    ThemeProvider,
    useMediaQuery,
    createMuiTheme,
} from "@material-ui/core";

import Cigars from "../App/cigars.jpeg";
import Lounge from "../App/lounge.jpeg";
import PepBurn from "../App/people_burning.jpeg";
import Store from "../App/store_front.jpeg";
import { sendToSrvr } from "../Lib/connections";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    rootForm: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 3, 4),
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const LandingPics = ({ pictures, mutate }) => {
    const classes = useStyles();
    const handleChange = (e) => {
        const { id, files } = e.target;
        if (files.length > 0) {
            handleFile(files[0])
                .then((result) => (pictures[id] = result))
                .catch(console.error);
        }
        console.log("No file found");
    };

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={"Landing-Images-content"}
                id={"Landing-Images-header"}
            >
                <Typography className={classes.heading}>
                    Landing Pictures
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Carousel animation="slide">
                    {pictures.map((val, idx) => (
                        <ImageUpload
                            src={val}
                            value={null}
                            onChange={handleChange}
                            idx={idx}
                            key={idx}
                        />
                    ))}
                </Carousel>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

const handleFile = (file) => {
    return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => res(reader.result), false);
        reader.addEventListener("error", () => rej(reader.error), false);
        reader.readAsDataURL(file);
    });
};

const EditModal = ({ editFields, reducer }) => {
    const [state, dispatch] = reducer;
    const classes = useStyles();

    const handleClose = () => {
        dispatch({
            type: "SET",
            key: "editing",
            value: false,
        });
    };

    const handleValue = (e, val) => {
        console.log("--> Idx: ", val);
        console.log(e.constructor);
        switch (e.constructor.name) {
            case "Date":
                dispatch({
                    type: "SET",
                    key: "tmpData",
                    idx: val,
                    value: e,
                });
                break;
            case "File":
                handleFile(e)
                    .then((result) =>
                        dispatch({
                            type: "SET",
                            key: "tmpData",
                            idx: val,
                            value: result,
                        })
                    )
                    .catch(console.error);
                break;
            case "SyntheticEvent":
                const { id, value } = e.target;
                console.log("--> Syn Eve: ", id, value);
                dispatch({
                    type: "SET",
                    key: "tmpData",
                    idx: id,
                    value: value,
                });
                break;
            default:
                console.log(e);
                break;
        }
    };

    const handleSubmit = () => {
        state.tmpData = state.tmpData.map((val) => {
            if (val instanceof Object) {
                return val.toString();
            }
            return val;
        });
        dispatch({
            type: "SET",
            key: "data",
            value: state.tmpData,
        });
        dispatch({
            type: "SET",
            key: "currIdx",
            value: -1,
        });
        dispatch({
            type: "SET",
            key: "tmpData",
            value: [],
        });
        handleClose();
    };
    const renderFields = () => {
        return editFields.map((val, idx) => {
            console.log("--> Val at index ", idx, ": ", state.tmpData[idx]);
            return !val.comp ? (
                <TextField
                    id={String(idx)}
                    type={val.type}
                    label={val.label}
                    value={state.tmpData?.[idx] || ""}
                    onChange={handleValue}
                />
            ) : typeof val.comp === "function" ? (
                val.comp(
                    state.tmpData?.[idx] || null,
                    (e) => handleValue(e, idx),
                    String(idx)
                )
            ) : (
                val.comp
            );
        });
    };

    // console.log(state.tmpData);
    console.log(reducer);
    return (
        <Dialog
            id={"edit-dialog"}
            tabIndex={0}
            aria-labelledby={"edit-dialog-title"}
            aria-describedby={"edit-dialog-description"}
            className={classes.modal}
            onClose={handleClose}
            open={state.editing}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <>
                    <DialogTitle>Edit Row</DialogTitle>
                    <DialogContent>{renderFields()}</DialogContent>
                    <DialogActions>
                        <Button onClick={handleSubmit} color={"primary"}>
                            Submit
                        </Button>
                    </DialogActions>
                </>
            </Fade>
        </Dialog>
    );
};

const addToItem = (state, action) => {
    // const item = Array.isArray(state[action.key]) ?
    //     [...state[action.key]] : typeof state[action.key] === 'object' ?
    //         {...state[action.key]} : state[action.key];
    switch (state[action.key].constructor) {
        case Array:
            if (action.reset) {
                return { ...state, [action.key]: action.value || [] };
            }
            if (action.idx < state[action.key].length) {
                const old = state[action.key];
                old[action.idx] = action.value;
                return { ...state, [action.key]: old };
            }
            return {
                ...state,
                [action.key]: [...state[action.key], action.value],
            };
        case Object:
            if (action.innerKey) {
                console.log({
                    ...state,
                    [action.key]: {
                        ...state[action.key],
                        [action.innerKey]: action.value,
                    },
                });
                return {
                    ...state,
                    [action.key]: {
                        ...state[action.key],
                        [action.innerKey]: action.value,
                    },
                };
            }
            return { ...state, [action.key]: action.value };
        case Number:
        case String:
        case Boolean:
            return { ...state, [action.key]: action.value };
        default:
            console.error(
                state[action.key].constructor,
                " is not supported at this time"
            );
            return state;
    }
};

const removeFromItem = (state, action) => {
    switch (state[action.key].constructor) {
        case Array:
            const old = [...state[action.key]];
            old.splice(action.value, 1);
            return { ...state, [action.key]: [...old] };
        case Object:
        case Number:
        case String:
        case Boolean:
            delete state[action.key];
            return { ...state };
        default:
            console.error(
                state[action.key].constructor,
                " is not supported at this time"
            );
            return state;
    }
};

const DataTable = ({
    name,
    columns,
    data,
    reducer,
    setContextData,
    addRow,
}) => {
    const classes = useStyles();
    const [state, dispatch] = reducer;

    const handleEdit = (rowData, rowMeta) => {
        console.log(rowData, rowMeta);
        dispatch({
            type: "SET",
            key: "currIdx",
            value: rowMeta?.dataIndex || state.data.length,
        });
        dispatch({
            type: "SET",
            key: "tmpData",
            reset: true,
            value: rowData instanceof Event ? [] : rowData,
        });
        dispatch({
            type: "SET",
            key: "editing",
            value: true,
        });
    };

    return (
        <MUIDataTable
            title={name}
            columns={columns}
            data={state.data}
            className={classes.root}
            options={{
                filterType: "checkbox",
                onRowClick: handleEdit,
                customToolbar: () => {
                    return <CustomToolbar handleClick={handleEdit} />;
                },
            }}
        />
    );
};

const defaultToolbarStyle = {
    iconButton: {},
};

const ToolbarEditor = ({ classes, handleClick }) => {
    return (
        <>
            <Tooltip title={"Add Item"}>
                <IconButton
                    className={classes.iconButton}
                    onClick={handleClick}
                >
                    <AddIcon className={classes.deleteIcon} />
                </IconButton>
            </Tooltip>
        </>
    );
};

const CustomToolbar = withStyles(defaultToolbarStyle, {
    name: "CustomToolbar",
})(ToolbarEditor);

const ExpansionTable = ({
    name,
    columns,
    data,
    setContextData,
    editFields,
    timeout,
}) => {
    const classes = useStyles();
    const [state, dispatch] = useReducer(
        (state, action) => {
            switch (action.type) {
                case "SET":
                    return addToItem(state, action);
                case "DELETE":
                    return removeFromItem(state, action);
                default:
                    return state;
            }
        },
        {
            data: data,
            editing: false,
            currIdx: -1,
            tmpData: [],
        }
    );

    return (
        <div className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`${name}-content`}
                    id={`${name}-header`}
                >
                    <Typography className={classes.heading}>{name}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <DataTable
                        name={name}
                        columns={columns}
                        reducer={[state, dispatch]}
                        setContextData={setContextData}
                    />
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <EditModal
                key="editing-modal"
                editFields={editFields}
                reducer={[state, dispatch]}
            />
        </div>
    );
};

const ImageUpload = ({ value, src, idx, onChange }) => {
    return (
        <>
            <CardMedia src={src || null} />
            <input
                id={idx}
                style={{ display: "none" }}
                type="file"
                files={value}
                onChange={onChange}
                variant="outline"
            />
            <Button
                htmlFor={idx}
                component={"label"}
                className={"shapefile-icon"}
            >
                <PublishIcon />
                {/* <Typography variant="body1">
          
        </Typography> */}
            </Button>
        </>
    );
};

const StateMutate = (state, action) => {
    switch (action.type) {
        case "ADD_ARRAY":
            return {
                ...state,
                [action.key]: [...state[action.key], action.value],
            };
        case "RM_ARRAY":
            state[action.key].splice(action.value, action.number || 1);
            return { ...state };
        case "SET":
            return { ...state, [action.key]: action.value };
        case "RM":
            delete state[action.key];
            return { ...state };
        default:
            return state;
    }
};

const Dashboard = () => {
    const preferDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const [darkModeOn, setDarkModeOn] = useState(preferDarkMode);
    const [login, setLogin] = useState(false);
    const [testState, setTestState] = useState([["", "test"]]);
    const classes = useStyles();
    const [
        {
            about,
            experience,
            annoucements,
            events,
            landing_pics,
            products,
            hours,
            token,
        },
        reducer,
    ] = useReducer(StateMutate, {
        about: [],
        experience: [],
        annoucements: [],
        events: [],
        landing_pics: [],
        products: [],
        hours: [],
        token: "",
    });

    const theme = React.useMemo(() =>
        createMuiTheme({
            palette: {
                type: preferDarkMode ? "dark" : "light",
            },
        })
    );

    const loginSuccess = () => {
        setLogin(true);
        Promise.all([
            sendToSrvr("api/v1/general/landing_pictures"),
            sendToSrvr("api/v1/general/events_list"),
            sendToSrvr("api/v1/general/announcement_list"),
            sendToSrvr("api/v1/inv/products"),
        ]).then((results) => {
            reducer({
                type: "SET",
                key: "landing_pics",
                value:
                    results[0].data.length === 0
                        ? [PepBurn, Cigars, Lounge, Store]
                        : results[0].data,
            });
            reducer({
                type: "SET",
                key: "events",
                value: results[1].data,
            });
            reducer({
                type: "SET",
                key: "annoucements",
                value: results[2].data,
            });
            reducer({
                type: "setValue",
                key: "cigars",
                value: results[3].data,
            });
            setLogin(true);
        });
    };

    const handleFile = (e) => {
        const input = e.target;
        if (input.files.length === 0) {
            return;
        }

        const file = input.files[0];
        const img = input.parentElement.parentElement.childnodes[0];
        const reader = new FileReader();
        reader.addEventListener(
            "load",
            () => {
                img.src = reader.result;
                sendToSrvr(
                    "products",
                    JSON.stringify({
                        src: reader.result,
                    }),
                    "PUT",
                    {
                        "content-type": "application/json",
                        Authoriztion: `Bearer ${state.token}`,
                    }
                )
                    .then((result) => console.log(result))
                    .catch((err) => console.error(err));
            },
            false
        );
        reader.readAsDataURL(file);
    };

    return (
        <ThemeProvider theme={theme}>
            <div
                style={{
                    position: "fixed",
                    backgroundColor: "white",
                    border: "1px solid black",
                    borderRadius: "5px",
                    width: "100vw",
                    height: "100vh",
                    zIndex: 999,
                }}
                className={"center"}
            >
                <LandingPics pictures={landing_pics} />
                <ExpansionTable
                    columns={["Date", "Message"]}
                    data={events}
                    editFields={[
                        {
                            comp: (val, onChange) => {
                                return (
                                    <MuiPickersUtilsProvider
                                        utils={DateFnsUtils}
                                    >
                                        <KeyboardDateTimePicker
                                            autoOk={true}
                                            variant={"inline"}
                                            label={"Date"}
                                            format={"dd/MM/yyyy HH:mm"}
                                            value={val}
                                            onChange={onChange}
                                            InputAdornmentProps={{
                                                position: "start",
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                );
                            },
                        },
                        {
                            type: "text",
                            label: "Message",
                        },
                    ]}
                    setData={setTestState}
                    name={"Event"}
                />
                <ExpansionTable
                    columns={["Date", "Message"]}
                    data={testState}
                    editFields={[
                        {
                            comp: (val, onChange, idx) => (
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDateTimePicker
                                        autoOk={true}
                                        id={idx}
                                        key={idx}
                                        variant={"inline"}
                                        label={"Date"}
                                        format={"dd/MM/yyyy HH:mm"}
                                        value={val}
                                        onChange={onChange}
                                        autoOk
                                        InputAdornmentProps={{
                                            position: "start",
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            ),
                        },
                        {
                            type: "text",
                            label: "Message",
                        },
                    ]}
                    setData={annoucements}
                    name={"Announcements"}
                />
                <ExpansionTable
                    columns={["Brand Name", "Logo", "Description", "Popular"]}
                    data={products}
                    setData={setTestState}
                    name={"Products"}
                    editFields={[
                        {
                            type: "text",
                            label: "Brand Name: ",
                        },
                        {
                            // TODO: Add image proper here
                            type: "text",
                            label: "Logo",
                        },
                        {
                            type: "text",
                            label: "Description: ",
                        },
                        {
                            comp: (val, onChange) => (
                                <Checkbox
                                    checked={val}
                                    onChange={onChange}
                                    color={"primary"}
                                />
                            ),
                        },
                    ]}
                />
                <ExpansionTable
                    columns={["Day of the Week", "Open", "Close"]}
                    data={hours}
                    setData={setTestState}
                    name={"Hours"}
                    editFields={[
                        {
                            comp: (val) => (
                                <Typography variant={"h4"} gutterBottom>
                                    {val}
                                </Typography>
                            ),
                        },
                        {
                            comp: (val, onChange) => (
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardTimePicker
                                        label={"Open"}
                                        mask={"__:__ _M"}
                                        value={val}
                                        onChange={onChange}
                                    />
                                </MuiPickersUtilsProvider>
                            ),
                        },
                        {
                            comp: (val, onChange) => (
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardTimePicker
                                        label={"Close"}
                                        mask={"__:__ _M"}
                                        value={val}
                                        onChange={onChange}
                                    />
                                </MuiPickersUtilsProvider>
                            ),
                        },
                    ]}
                />

                <Login
                    setState={reducer}
                    open={!login}
                    onLogin={loginSuccess}
                />
            </div>
        </ThemeProvider>
    );
};

export default Dashboard;
