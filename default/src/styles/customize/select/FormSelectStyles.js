// 참고: https://react-select.com/styles#style-object
import { palette } from "styles/theme/palette";

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        height: 32,
        padding: "8px 10px",
        color: palette.text["primary"],
        backgroundColor: state.isSelected ? palette.primary["main"] : palette.neutral["white"],
        "&:hover": {
            backgroundColor: state.isSelected ? palette.primary["main"] : palette.primary["opacity0.2"]
        }
    }),
    container: (provided) => ({
        ...provided,
        width: 120,
        height: 32,
        display: "inline-block",
        fontSize: 12
    }),
    control: (provided) => ({
        ...provided,
        minHeight: 32,
        height: 32,
        lineHeight: "32px",
        boxShadow: "unset",
        borderColor: palette.border["main"],
        "&:hover": {
            borderColor: palette.border["main"]
        }
    }),
    valueContainer: (provided) => ({
        ...provided,
        height: 32
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        width: 24,
        padding: "2px 6px 2px 2px"
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        height: 32,
        padding: 0
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        alignSelf: "unset"
    })
};

export default customStyles;
