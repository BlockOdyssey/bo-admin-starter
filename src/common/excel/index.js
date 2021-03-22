import React, { useState } from "react";
import Workbook from "react-excel-workbook";
import moment from "moment";

import { IconButton } from "@material-ui/core";
import buttonStyles from "styles/customize/ButtonStyles";

const exampleData = [
    {
        No: 123,
        "Column 1": 456,
        "Column 2": 456,
        "Column 3": 456,
        "Column 4": 456
    },
    {
        No: 123,
        "Column 1": 456,
        "Column 2": 456,
        "Column 3": 456,
        "Column 4": 456
    },
    {
        No: 123,
        "Column 1": 456,
        "Column 2": 456,
        "Column 3": 456,
        "Column 4": 456
    }
];

export default function ExcelExport() {
    const classes = buttonStyles();
    const [data, setData] = useState([]);

    const download = async () => {
        console.log("downloading excel file...");
        // fetch data
        setData(exampleData);

        let e = document.createEvent("MouseEvents");
        e.initEvent("click", true, true);
        document.querySelector(".file-download").dispatchEvent(e);
    };

    return (
        <>
            <IconButton className={classes.excel} onClick={download}>
                엑셀 다운로드
            </IconButton>

            <Workbook filename={`${moment().format("YYYYMMDDhhmmss")}.xlsx`} element={<i className="file-download"></i>}>
                <Workbook.Sheet data={data} name="Sheet1">
                    <Workbook.Column label="No" value={(row) => row["No"]} />
                    <Workbook.Column label="Column 1" value={(row) => row["Column 1"]} />
                    <Workbook.Column label="Column 2" value={(row) => row["Column 2"]} />
                    <Workbook.Column label="Column 3" value={(row) => row["Column 3"]} />
                    <Workbook.Column label="Column 4" value={(row) => row["Column 4"]} />
                </Workbook.Sheet>
            </Workbook>
        </>
    );
}