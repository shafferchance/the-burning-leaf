import React, { useState } from "react";
import {
    Backdrop,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fade,
    TextField,
    makeStyles,
} from "@material-ui/core";
import { useSnackbar } from "notistack";

import { sendToSrvr } from "../connections";
import { useCustomContext } from "react-global-light";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}));

const Login = ({ setState, setLogin, open, onLogin, onClose }) => {
    const { enqueueSanckbar } = useSnackbar();
    const [usr, setUsr] = useState("");
    const [pword, setPword] = useState("");
    const [, setGlobalState] = useCustomContext("global");
    const [errors, setErrors] = useState({ user: "", pass: "" });
    const classes = useStyles();
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
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
                if (result.message === "invalidUser") {
                    setErrors({ user: "Incorrect Email Used", pass: "" });
                }
                if (result.message === "invalidPassword") {
                    setErrors({ user: "", pass: "Incorrect Password" });
                }
                if (result.message === "success") {
                    setErrors({ user: "", pass: "" });
                    console.log(result.jwt_token);
                    setGlobalState({
                        type: "settoken",
                        token: result.jwt_token,
                    });
                    if (setLogin) {
                        setLogin(true);
                    }
                    onLogin(result);
                }
                console.log(result);
            })
            .catch((err) => {
                enqueueSanckbar("Fatal Login Error", {
                    varaint: "error",
                });
                console.error(err);
            });
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
            open={open}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
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

export default Login;
