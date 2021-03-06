import React from "react";
import useMenu from "hooks/useMenu";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(() => ({
    container: {
        width: "100%",
        margin: "0 auto 30px",
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
    usage: {
        color: "#039BE5",
        fontWeight: 600,
        fontSize: 14
    },
    spacer: {
        marginBottom: 5
    }
}));

export default function TypographyComponent() {
    const classes = useStyles();

    useMenu({ page: "Typography Component Demo", menu: "components", title: "Typography", num: 8 });

    return (
        <div className={classes.container}>
            <Typography className={classes.title} variant="h5" component="h3" color="inherit">
                Typography variant h1
            </Typography>
            <Grid className={classes.componentContainer} container alignItems="center" justify="flex-start">
                <Grid item>
                    <Typography variant="h1" component="h1">
                        LOGO
                    </Typography>
                </Grid>
            </Grid>
            <Typography className={classes.title} variant="h5" component="h3" color="inherit">
                Typography variant h2 <br />
                <Typography variant="body1" className={classes.usage}>
                    Header
                </Typography>
            </Typography>
            <Grid className={classes.componentContainer} container alignItems="center" justify="flex-start">
                <Grid item>
                    <Typography variant="h2" component="h2">
                        Dashboard
                    </Typography>
                    <div className={classes.spacer} />
                    <Typography variant="h2" component="h2">
                        Summary
                    </Typography>
                </Grid>
            </Grid>
            <Typography className={classes.title} variant="h5" component="h3" color="inherit">
                Typography variant body1 <br />
                <Typography variant="body1" className={classes.usage}>
                    MessageModal, MsgConfirmModal
                </Typography>
            </Typography>
            <Grid className={classes.componentContainer} container alignItems="center" justify="flex-start">
                <Grid item>
                    <Typography variant="body1" display="block">
                        ?????? ???????????? ?????????????????????????
                    </Typography>
                    <div className={classes.spacer} />
                    <Typography variant="body1" display="block">
                        ???????????? ?????????????????????.
                    </Typography>
                </Grid>
            </Grid>
            <Typography className={classes.title} variant="h5" component="h3" color="inherit">
                Typography variant body2 <br />
                <Typography variant="body1" className={classes.usage}>
                    ChangeInfo, EditModal
                </Typography>
            </Typography>
            <Grid className={classes.componentContainer} container alignItems="center" justify="flex-start">
                <Grid item>
                    <Typography variant="body2" display="block">
                        ??????
                    </Typography>
                    <div className={classes.spacer} />
                    <Typography variant="body2" display="block">
                        ????????????
                    </Typography>
                    <div className={classes.spacer} />
                    <Typography variant="body2" display="block">
                        ?????????
                    </Typography>
                    <div className={classes.spacer} />
                    <Typography variant="body2" display="block">
                        ????????????
                    </Typography>
                </Grid>
            </Grid>
            <Typography className={classes.title} variant="h5" component="h3" color="inherit">
                Typography variant button <br />
                <Typography variant="body1" className={classes.usage}>
                    ???????????? ?????????, Filter??? ?????? ??????
                </Typography>
            </Typography>
            <Grid className={classes.componentContainer} container alignItems="center" justify="flex-start">
                <Grid item>
                    <Typography variant="button">?????????????????????</Typography>
                    <div className={classes.spacer} />
                    <Typography variant="button">??????</Typography>
                </Grid>
            </Grid>
            <Typography className={classes.title} variant="h5" component="h3" color="inherit">
                Typography variant caption <br />
                <Typography variant="body1" className={classes.usage}>
                    ??????
                </Typography>
            </Typography>
            <Grid className={classes.componentContainer} container direction="row" alignItems="center" justify="flex-start">
                <Grid item>
                    <Typography variant="caption">??????</Typography>
                    <div className={classes.spacer} />
                    <Typography variant="caption">??????</Typography>
                    <div className={classes.spacer} />
                    <Typography variant="caption">????????????</Typography>
                </Grid>
            </Grid>
        </div>
    );
}
