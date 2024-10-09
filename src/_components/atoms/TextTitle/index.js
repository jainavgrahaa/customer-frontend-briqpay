import { Typography } from '@mui/material';
import React from 'react'
import { FormattedMessage } from 'react-intl';

const TextTitle = ({ name, variant, className }) => {
  return (
    <Typography variant={variant} component={variant} className={className ?? ""}>
      <FormattedMessage id={name} />
    </Typography>
  )
}

export default TextTitle;
