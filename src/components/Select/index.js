import * as React from "react";

import { Autocomplete } from "@material-ui/lab";
import { Fade, CircularProgress } from "@material-ui/core";

import { Field } from "./styles";

const Select = (props) => {
  const {
    options,
    value,
    label,
    handleChange,
    disabled,
    getOptionLabel,
    loading,
  } = props;

  return (
    <Fade in>
      <Autocomplete
        options={options}
        value={value}
        loading={loading}
        disabled={disabled}
        getOptionLabel={getOptionLabel}
        renderInput={(params) => (
          <Field
            {...params}
            label={label}
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        disableClearable
        onChange={(event, newValue) => handleChange(newValue)}
      />
    </Fade>
  );
};

export default Select;
