import { makeStyles } from "@material-ui/core/styles";

const layoutStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        minHeight: "100%"
    },
    content: {
        width: "calc(100% - 240px)"
    },
    appBarSpacer: {
        minHeight: 130
    },
    main: {
        flexGrow: 1,
        height: "calc(100vh - 80px)",
        width: "100%"
    },
    container: {
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column"
    },
    fixedHeight: {
        height: 240
    },
    containerRoot: {
        minWidth: 1145,
        width: "100%",
        margin: "0 auto",
        padding: "0 30px"
    }
}));

export default layoutStyles;
