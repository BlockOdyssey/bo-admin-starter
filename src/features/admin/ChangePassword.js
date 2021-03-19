import React, { useState, useEffect } from "react";
import MenuRedux from "common/menu/MenuRedux";

import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid, Typography } from "@material-ui/core";

import Modal from "react-modal";
import MessageModal from "common/modal/MessageModal";

const useStyles = makeStyles((theme) => ({
    container: {
        width: "calc(100% - 60px)",
        height: 560,
        margin: "0 30px",
        background: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    grid: {
        width: 322
    },
    title: {
        marginBottom: 40,
        fontWeight: 300,
        fontSize: 30,
        lineHeight: "38px",
        letterSpacing: "-1.8px"
    },
    curPassword: {
        width: "100%",
        height: 48,
        marginBottom: 20
    },
    newPassword: {
        width: "100%",
        height: 48,
        marginBottom: 4
    },
    pwCheck: {
        width: "100%",
        height: 48,
        marginBottom: 32
    },
    input: {
        width: "100%",
        height: "100%",
        "& > div": {
            height: "100%"
        }
    },
    submitContainer: {
        width: "100%",
        height: 48
    },
    submitButton: {
        width: "100%",
        height: "100%",
        backgroundColor: theme.palette.primary.main,
        cursor: "pointer",
        fontSize: 13,
        letterSpacing: "-0.26px",
        fontWeight: 500,
        color: "#ffffff",
        border: "none",
        borderRadius: 4,
        outline: "none"
    }
}));

export default function ChangePassword() {
    const classes = useStyles();

    const [pw, setPw] = useState("");
    const [newPw, setNewPw] = useState("");
    const [pwCheck, setPwCheck] = useState("");

    const [modal, setModal] = useState(false);
    const [modalStatus, setModalStatus] = useState("");

    useEffect(() => {
        Modal.setAppElement("body");
    }, []);

    const handleSubmit = () => {
        console.log(pw, pwCheck, newPw);
        handleModal("success", true);
    };

    const handleModal = (status, isOpen) => {
        setModalStatus(status);
        setModal(isOpen);
    };

    return (
        <>
            <MenuRedux menu={null} title="비밀번호 변경" num={0} />
            <div className={classes.container}>
                <Grid container justify="center" alignItems="center" direction="column" className={classes.grid}>
                    <Grid item>
                        <Typography variant="h3" component="h3" className={classes.title}>
                            주기적인 <span style={{ fontWeight: 500 }}>비밀번호 변경</span>으로 <br />
                            안전하게 <span style={{ fontWeight: 500 }}>정보</span>를 <span style={{ fontWeight: 500 }}>보호</span>하세요
                        </Typography>
                    </Grid>
                    <Grid item className={classes.curPassword}>
                        <TextField
                            className={classes.input}
                            id="outlined-pw"
                            label=""
                            size="small"
                            type="password"
                            placeholder="현재 비밀번호"
                            onChange={(e) => setPw(e.target.value)}
                            value={pw}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item className={classes.newPassword}>
                        <TextField
                            className={classes.input}
                            id="outlined-new-pw"
                            label=""
                            size="small"
                            type="password"
                            placeholder="새 비밀번호"
                            value={newPw}
                            onChange={(e) => setNewPw(e.target.value)}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item className={classes.pwCheck}>
                        <TextField
                            className={classes.input}
                            id="outlined-pw-check"
                            label=""
                            size="small"
                            type="password"
                            placeholder="새 비밀번호 확인"
                            value={pwCheck}
                            onChange={(e) => setPwCheck(e.target.value)}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item className={classes.submitContainer}>
                        <button className={classes.submitButton} onClick={handleSubmit}>
                            변경
                        </button>
                    </Grid>
                </Grid>
                <MessageModal
                    open={modal}
                    setModal={setModal}
                    message={modalStatus === "success" ? "비밀번호가 변경되었습니다." : modalStatus === "fail" ? "비밀번호 변경에 실패하였습니다." : "비밀번호를 다시 확인해주시기 바랍니다."}
                />
            </div>
        </>
    );
}
