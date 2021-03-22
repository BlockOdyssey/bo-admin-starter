import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: 99,
        marginBottom: 20,
        padding: 20,
        backgroundColor: "#ffffff",
        color: theme.palette.text.primary,
        boxShadow: "0px 2px 5px #E8E8E888",
        "& hr": {
            margin: "19px 10px 0 0"
        }
    },
    divider: {
        height: 40,
        alignSelf: "center"
    },
    searchTextField: {
        width: 160
    },
    spacer: {
        height: 20
    },
    dash: {
        display: "block",
        height: 40,
        marginTop: 19,
        textAlign: "center",
        font: "normal normal 400 12px/40px Roboto",
        letterSpacing: 0,
        color: "#333333",
        opacity: 1
    }
}));

export default useStyles;