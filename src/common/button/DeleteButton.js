import React from "react";

import { ThemeProvider, IconButton } from "@material-ui/core";
import theme from "styles/theme/button";
import { Close } from "@material-ui/icons";

export default function DeleteButton({ handleSubmit }) {
    return (
        <ThemeProvider theme={theme}>
            <IconButton onClick={handleSubmit}>
                <Close style={{ color: "#DE5D5D" }} />
                삭제
            </IconButton>
        </ThemeProvider>
    );
}
