import React, { useCallback, useEffect, useState, useRef } from "react";
import { string, func, number, oneOfType } from "prop-types";
import debounce from "lodash/debounce";

const DebounceInput = ({
  value,
  debounceTimeout = 1000,
  onChange,
  type,
  ...props
}) => {
  const [stateValue, setStateValue] = useState(value);
  const prevValueRef = useRef(null);

  const debouncedOnChange = useCallback(
    debounce((event) => {
      onChange(event);
    }, debounceTimeout),
    [onChange]
  );

  const innerOnChange = useCallback(
    (event) => {
      event.persist();
      setStateValue(event.target.value);
      debouncedOnChange(event);
    },
    [debouncedOnChange]
  );

  useEffect(() => {
    if (prevValueRef) {
      prevValueRef.current = value;
    }
  });

  if (
    typeof value !== "undefined" &&
    prevValueRef &&
    prevValueRef.current !== value &&
    stateValue !== value
  ) {
    setStateValue(value);
  }

  if (type !== "textarea") {
    return (
      <input
        type={type}
        value={stateValue}
        onChange={innerOnChange}
        {...props}
      />
    );
  } else {
    return <textarea value={stateValue} onChange={innerOnChange} {...props} />;
  }
};

DebounceInput.propTypes = {
  type: string,
  onChange: func.isRequired,
  value: oneOfType([string, number]),
  debounceTimeout: number,
};

DebounceInput.defaultPropTypes = {
  type: "text",
  value: "",
  debounceTimeout: 300,
};

export default DebounceInput;
