import React from "react";
import PropTypes from "prop-types";

import Select from "react-select";
import customStyles from "styles/customize/FormSelectStyles";
import { Controller } from "react-hook-form";

function FormSelect({ name, defaultValue, control, options }) {
    return (
        <Controller
            defaultValue={defaultValue}
            name={name}
            control={control}
            render={({ onChange }) => <Select isClearable={false} isSearchable={false} styles={customStyles} name={name} defaultValue={defaultValue} options={options} onChange={onChange} />}
        />
    );
}

FormSelect.propTypes = {
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.object.isRequired,
    control: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired
};

export default FormSelect;
