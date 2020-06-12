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
  Input,
  Fade,
  Backdrop,
  makeStyles,
  Checkbox,
  CardMedia,
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

const Login = ({ setState, setLogin, loggedIn }) => {
  const [usr, setUsr] = useState("");
  const [pword, setPword] = useState("");
  const [errors, setErrors] = useState({ user: "", pass: "" });
  const classes = useStyles();

  const handleClose = () => {
    return;
  };

  const handleEmail = (e) => {
    setUsr(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    sendToSrvr(
      "api/v1/users/login",
      JSON.stringify({
        user: usr,
        pword: pword,
      }),
      "POST"
    )
      .then((result) => {
        if (result.message === "success") {
          setErrors({ user: "", pass: "" });
          setState({
            type: "setValue",
            token: result.jwt_token,
          });
          Promise.all([
            sendToSrvr("api/v1/general/landing_pictures"),
            sendToSrvr("api/v1/general/events_list"),
            sendToSrvr("api/v1/general/announcement_list"),
            sendToSrvr("api/v1/inv/products"),
          ]).then((results) => {
            setState({
              type: "setValue",
              landing_pics:
                results[0].data.length === 0
                  ? [PepBurn, Cigars, Lounge, Store]
                  : results[0].data,
            });
            setState({
              type: "setValue",
              events: results[1].data,
            });
            setState({
              type: "setValue",
              annoucements: results[2].data,
            });
            setState({
              type: "setValue",
              cigars: results[3].data,
            });
            setLogin(true);
          });
        }
        console.log(result);
        if (result.message === "invalidUser") {
          setErrors({ user: "Incorrect Email Used", pass: "" });
        }
        if (result.message === "invalidPassword") {
          setErrors({ user: "", pass: "Incorrect Password" });
        }
      })
      .catch((err) => console.error(err));
  };

  const handlePassword = (e) => {
    setPword(e.target.value);
  };

  const renderUser = (errs) => (
    <TextField
      id={"email-input"}
      label={"Email"}
      type={"email"}
      value={usr}
      error={!!errs["user"]}
      helperText={errs["user"]}
      onChange={handleEmail}
      autoComplete={"email"}
      required
    />
  );

  const renderPassword = (errs) => (
    <TextField
      id={"password-input"}
      label={"Password"}
      type={"password"}
      value={pword}
      error={!!errs["pass"]}
      helperText={errs["pass"]}
      onChange={handlePassword}
      autoComplete={"current-password"}
      required
    />
  );

  return (
    <Dialog
      id={"login"}
      tabIndex={0}
      aria-labelledby={"login-modal-title"}
      aria-describedby={"login-modal-description"}
      className={classes.modal}
      onClose={handleClose}
      open={loggedIn}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={loggedIn}>
        <>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            {renderUser(errors)}
            {renderPassword(errors)}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleLogin} color={"primary"}>
              Login
            </Button>
          </DialogActions>
        </>
      </Fade>
    </Dialog>
  );
};

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
        <Typography className={classes.heading}>Landing Pictures</Typography>
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
      return { ...state, [action.key]: [...state[action.key], action.value] };
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

const DataTable = ({ name, columns, data, reducer, setContextData }) => {
  const classes = useStyles();
  const [state, dispatch] = reducer;

  const handleEdit = (rowData, rowMeta) => {
    console.log(rowData, rowMeta);
    dispatch({
      type: "SET",
      key: "currIdx",
      value: rowMeta.dataIndex,
    });
    dispatch({
      type: "SET",
      key: "tmpData",
      reset: true,
      value: rowData,
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
      }}
    />
  );
};

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
      <Button htmlFor={idx} component={"label"} className={"shapefile-icon"}>
        <PublishIcon />
        {/* <Typography variant="body1">
          
        </Typography> */}
      </Button>
    </>
  );
};

const Dashboard = () => {
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
    setState,
  ] = useCustomContext("global");
  const [login, setLogin] = useState(false);
  const [testState, setTestState] = useState([["", "test"]]);
  const classes = useStyles();

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
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDateTimePicker
                    autoOk={true}
                    variant={"inline"}
                    label={"Date"}
                    format={"dd/MM/yyyy HH:mm"}
                    value={val}
                    onChange={onChange}
                    InputAdornmentProps={{ position: "start" }}
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
                  format={"hh:mm dd.mm.yyyy"}
                  value={val}
                  onChange={onChange}
                  autoOk
                  InputAdornmentProps={{ position: "start" }}
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
              <Checkbox checked={val} onChange={onChange} color={"primary"} />
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
      {/* TODO: Add in About and Amenties tables */}
      <Login setState={setState} setLogin={setLogin} loggedIn={!login} />
    </div>
  );
};

export default Dashboard;
