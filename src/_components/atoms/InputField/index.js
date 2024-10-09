import { TextField } from '@mui/material'
import React from 'react'
import { FormattedMessage } from 'react-intl'

const InputField = ({ fullWidth, name, label, onChange, onBlur, variant, autoComplete, value, error, helperText, type, className }) => {
  return (
    <TextField
      fullWidth={fullWidth}
      label={<FormattedMessage id={label} />}
      name={name}
      type={type ?? "text"}
      variant={variant}
      autoComplete
      value={value}
      onChange={(e) => {
        onChange(e)
      }}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      className={className}
    />)
}

export default InputField