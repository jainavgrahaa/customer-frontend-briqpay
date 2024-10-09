import React from 'react'
import { LoadingButton } from '@mui/lab'
import { FormattedMessage } from 'react-intl'

const LoaderButton = ({ loader, name, className }) => {
  return (
    <>
      <LoadingButton
        type="submit"
        variant="outlined"
        className={className}
        loading={loader}
      >
        <FormattedMessage id={name} />
      </LoadingButton>
    </>
  )
}

export default LoaderButton