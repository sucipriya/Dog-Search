import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { default as ReactSelect } from "react-select";
import _ from "lodash";

const Dropdown = (props) => {
  const { customLabel, customKey, options } = props;
  const [optionsData, setOptionsData] = useState(options);

  useEffect(() => {
    if (customLabel || customKey) {
      formatOptionData();
    }
  }, [customLabel, customKey, options]);

  const customStyles = {
    option: (base, state) => ({
      ...base,
      color: state.isSelected ? "#fff" : "#hsl(0deg 0% 50%)",
      padding: 10,
      "&:hover": {
        background: "#7bbbbb",
        color: "#fff",
      },
      background: state.isSelected ? "#7bbbbb" : "#fff",
    }),
    control: (base, state) => ({
      ...base,

      border: state.isFocused
        ? ".0625rem solid teal"
        : ".0625rem solid #cdcdcd",
      // Removes weird border around container
      boxShadow: state.isFocused ? "teal" : null,

      "&:hover": {
        // Overwrittes the different states of border
        border: state.isFocused
          ? ".0625rem solid teal"
          : ".0625rem solid #cdcdcd",
      },
    }),
  };

  const formatOptionData = () => {
    const { options } = props;
    const formatedOptionList = options?.map((objectData) => {
      const obj = { ...objectData };
      if (customKey) {
        obj["value"] = obj[customKey];
      }
      if (customLabel) {
        obj["label"] = obj[customLabel];
      }
      return obj;
    });
    setOptionsData(formatedOptionList);
  };

  return <ReactSelect {...props} options={optionsData} styles={customStyles} />;
};

Dropdown.propTypes = {
  options: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func,
  allowSelectAll: PropTypes.bool,
  allOption: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
};

Dropdown.defaultProps = {
  allOption: {
    label: "Select all",
    value: "*",
  },
};

export default Dropdown;
