import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React from 'react'
import { FormattedMessage } from 'react-intl'

const MaterialCheckbox = ({name, handleChange, checked, label, strLabel}) => {
	return (
		<FormGroup className="checkbox-wrapper">
			<FormGroup className="checkbox-wrapper">
				<FormControlLabel
					name={name}
					control={<Checkbox checked={checked} onChange={handleChange} />}
					label={strLabel ? strLabel : <FormattedMessage id={label} />}
				/>
			</FormGroup>
		</FormGroup>
	)
}

export default MaterialCheckbox