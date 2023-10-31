/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { forwardRef } from "react";
import { useTheme } from "@mui/material/styles";
import DatePicker from "react-datepicker";
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import "react-datepicker/dist/react-datepicker.css";
import styled from "@emotion/styled";

const SelectField = (props) => {
  const handleChange = (e, value) => {
    const selectedValue = value || null;
    props.onChange({ target: { name: props.name, value: selectedValue } });
  };

  return (
    <Autocomplete
      fullWidth
      {...props}
      onChange={handleChange}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <li {...props} key={option.value}>
          {option.label}
        </li>
      )}
      isOptionEqualToValue={(option, value) => option.value === value?.value}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          required={props.required}
          placeholder={props.placeholder || "Select..."}
        />
      )}
    />
  );
};

// eslint-disable-next-line react/display-name
const CustomDateInput = forwardRef((props, ref) => {
  return <TextField fullWidth inputRef={ref} {...props} />;
});

const DateField = ({ name, label, ...props }) => {
  const { direction } = useTheme();
  const dateFormat = props.showTimeSelect ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd";
  const popperPlacement = direction === "ltr" ? "bottom-start" : "bottom-end";

  const handleChange = (date) => {
    props.onChange({ target: { name, value: date } });
  };

  return (
    <DatePicker
      {...props}
      selected={props.value}
      popperPlacement={popperPlacement}
      dateFormat={dateFormat}
      onChange={handleChange}
      id={`date-picker}`}
      placeholderText="Click to select a date"
      customInput={<CustomDateInput label={label} />}
    />
  );
};

const DateRangeField = ({ name, label, value, ...props }) => {
  const { direction } = useTheme();
  const dateFormat = props.showTimeSelect ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd";
  const popperPlacement = direction === "ltr" ? "bottom-start" : "bottom-end";

  const handleChange = (dates) => {
    props.onChange({ target: { name, value: dates } });
  };

  if (!value) {
    value = [null, null];
  }

  return (
    <DatePicker
      {...props}
      selectsRange
      selected={value[0]}
      startDate={value[0]}
      endDate={value[1]}
      shouldCloseOnSelect={false}
      onChange={handleChange}
      dateFormat={dateFormat}
      popperPlacement={popperPlacement}
      id={`date-range-picker}`}
      placeholderText="Click to select a dates"
      customInput={<CustomDateInput label={label} />}
    />
  );
};

const CheckboxField = ({ name, label, ...props }) => {
  const { onChange } = props;

  const handleChange = (e) => {
    onChange({ target: { name, value: e.target.checked } });
  };

  return (
    <FormControlLabel
      label={label}
      control={<Checkbox name={name} onChange={handleChange} />}
    />
  );
};

const SwitchField = ({ name, label, ...props }) => {
  const { value, onChange } = props;

  const handleChange = (e) => {
    onChange({ target: { name, value: e.target.checked } });
  };

  return (
    <FormControlLabel
      label={label}
      control={<Switch name={name} checked={value} onChange={handleChange} />}
    />
  );
};

const StyledInputField = styled.input`
  border: 1px dotted #ccc;
  padding: 0.8rem 0.75rem;
  border-radius: 0.5rem;
  width: 100%;
  box-sizing: border-box;
  font-size: 1rem;
  font-family: inherit;
  &:focus {
    outline: none;
    border-color: #333;
  }
`;

const FileField = ({ name, label, ...props }) => {
  const { onChange } = props;

  const handleChange = (e) => {
    const values = e.target.files;
    if (props?.multiple) {
      onChange({ target: { name, value: values } });
    } else {
      onChange({ target: { name, value: values[0] } });
    }
  };

  return (
    <Box>
      <Typography variant="subtitle1">{label}</Typography>
      <StyledInputField
        {...props}
        value={null}
        type="file"
        name={name}
        onChange={handleChange}
      />
    </Box>
  );
};

export const useFormData = (initData = {}) => {
  const [formData, setFormData] = React.useState(initData);

  const onChange = (e) =>
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const onNumberChange = (e) => {
    const { value, name } = e.target;
    const rex = /^[0-9\b]+$/;
    if (rex.test(value) || value === "") {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const createField = (name, label, props = {}) => {
    const { required = true, type = "text", ...otherProps } = props;
    const changeFunc = type === "number" ? onNumberChange : onChange;

    return {
      fullWidth: true,
      name,
      label,
      type,
      value: formData[name],
      onChange: changeFunc,
      required,
      ...otherProps,
    };
  };

  return { formData, setFormData, onChange, createField };
};

const getField = (field) => {
  let f = {};

  // copy all props except grow and hidden
  Object.keys(field).forEach((key) => {
    if (key !== "grow" && key !== "hidden") {
      f[key] = field[key];
    }
  });

  switch (f.type) {
    case "select":
      return <SelectField {...f} />;
    case "multi-select":
      return <SelectField {...f} multiple />;
    case "date":
      return <DateField {...f} />;
    case "date-time":
      return <DateField showTimeSelect {...f} />;
    case "date-range":
      return <DateRangeField {...f} />;
    case "date-time-range":
      return <DateRangeField showTimeSelect {...f} />;
    case "checkbox":
      return <CheckboxField {...f} />;
    case "switch":
      return <SwitchField {...f} />;
    case "custom":
      return React.cloneElement(f.render());
    case "textarea":
      return <TextField multiline rows={4} {...f} />;
    case "file":
      return <FileField {...f} />;
    default:
      return <TextField {...f} />;
  }
};

export const FieldRender = ({ fields }) => {
  return (
    <Grid container rowGap={2} columnSpacing={2}>
      {fields
        .filter((f) => !f.hidden)
        .map((f, index) => {
          const grow = f.grow || { xs: 12 };

          return (
            <Grid key={index} item {...grow}>
              {getField(f)}
            </Grid>
          );
        })}
    </Grid>
  );
};
