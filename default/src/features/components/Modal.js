import React from "react";
import { useDispatch } from "react-redux";
import useMenu from "hooks/useMenu";

import { setMessage, setMsgConfirm, setDetail, setClose } from "slices/modalSlice";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import DetailModal from "common/modal/DetailModal";
import MessageModal from "common/modal/MessageModal";
import ConfirmModal from "common/modal/ConfirmModal";

const useStyles = makeStyles((theme) => ({
    container: {
        width: "100%",
        margin: "0 auto",
        padding: 20,
        background: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "column"
    },
    componentContainer: {
        marginBottom: 30,
        "&:last-child": {
            marginBottom: 0
        }
    },
    title: {
        marginBottom: 20
    },
    spacer: {
        marginRight: 20
    },
    cursor: {
        cursor: "pointer",
        textDecoration: "underline"
    },
    background: {
        width: "100%",
        marginBottom: 50,
        fontSize: 16,
        fontWeight: 600,
        lineHeight: "24px",
        color: "black"
    },
    table: {
        width: "100%",
        marginBottom: 80,
        color: "black",
        borderCollapse: "collapse",
        "& thead": {
            color: theme.palette.primary.main,
            "& th": {
                height: 40
            }
        },
        "& th": {
            fontWeight: 600,
            padding: "5px 20px",
            borderBottom: `1px solid ${theme.palette.border["opacity0.2"]}`
        },
        "& td": {
            height: 45,
            padding: "5px 20px",
            borderBottom: `1px solid ${theme.palette.border["opacity0.2"]}`,
            textAlign: "center"
        },
        "& tbody th": {
            width: "20%"
        },
        "& td:first-child": {
            width: "20%"
        },
        "& td:last-child": {
            width: "60%"
        }
    }
}));

export default function Modal() {
    const classes = useStyles();
    const dispatch = useDispatch();

    // ?????????(??????) ????????????
    useMenu({ page: "Modal Component Demo", menu: "components", title: "Modal", num: 7 });

    // ????????? ????????? ????????????
    const handleDelete = () => {
        dispatch(setClose());
        dispatch(setMessage({ open: true, message: "?????????????????????." }));
    };

    // ????????? ?????? ??????
    const onMessage = () => {
        dispatch(setMessage({ open: true, message: "Alert!" }));
    };

    // ?????? ?????? ??????
    const onConfirmMsg = () => {
        dispatch(setMsgConfirm({ open: true, message: "Confirm Message?" }));
    };

    const onDetail = () => {
        dispatch(setDetail({ open: true, data: { title: "Detail Modal Demo", type: "quantity", quantity: 7777777 } }));
    };

    // ?????? ??????
    const onClose = () => {
        dispatch(setClose());
    };

    return (
        <div className={classes.container}>
            <Typography className={classes.title} variant="h3" component="h3" color="inherit">
                ????????? ??????
            </Typography>
            <Grid className={classes.componentContainer} container alignItems="center" justify="flex-start">
                <Grid item>
                    <Typography className={classes.cursor} variant="body2" color="inherit" onClick={onMessage}>
                        Message
                    </Typography>
                </Grid>
            </Grid>
            <Typography className={classes.title} variant="h3" component="h3" color="inherit">
                Confirm ??????
            </Typography>
            <Grid className={classes.componentContainer} container alignItems="center" justify="flex-start">
                <Grid item>
                    <Typography className={classes.cursor} variant="body2" color="inherit" onClick={onConfirmMsg}>
                        Confirm
                    </Typography>
                </Grid>
            </Grid>
            <Typography className={classes.title} variant="h3" component="h3" color="inherit">
                ?????? ??????
            </Typography>
            <Grid className={classes.componentContainer} container alignItems="center" justify="flex-start">
                <Grid item>
                    <Typography className={classes.cursor} variant="body2" color="inherit" onClick={() => onDetail("quantity")}>
                        ?????? ??????
                    </Typography>
                </Grid>
            </Grid>
            <Typography className={classes.title} variant="h3" component="h3" color="inherit">
                Modal Props Guide
            </Typography>
            <code className={classes.background}>
                import MessageModal from "common/modal/MessageModal"; <br />
                <br />
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>onClose</th>
                            <td>function</td>
                            <td>{`() => console.log("close modal")`}</td>
                        </tr>
                    </tbody>
                </table>
                import ConfirmModal from "common/modal/ConfirmModal"; <br />
                <br />
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>handleConfirm</th>
                            <td>function</td>
                            <td>{`() => console.log("deleting dessert")`}</td>
                        </tr>
                        <tr>
                            <th>onClose</th>
                            <td>function</td>
                            <td>{`() => console.log("closing modal")`}</td>
                        </tr>
                    </tbody>
                </table>
                import DetailModal from "common/modal/DetailModal";
                <br />
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>onClose</th>
                            <td>function</td>
                            <td>{`() => console.log("closing modal")`}</td>
                        </tr>
                    </tbody>
                </table>
            </code>
            <MessageModal onClose={onClose} />
            <ConfirmModal handleConfirm={handleDelete} onClose={onClose} />
            <DetailModal onClose={onClose} />
        </div>
    );
}
