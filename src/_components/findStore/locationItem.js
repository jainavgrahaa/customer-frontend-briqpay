/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Accordion, AccordionDetails, AccordionSummary, Button } from "@mui/material";
import { Fragment, useEffect, useState } from "react";

const timeData = [1, 2, 3, 4, 5];

const LocationItem = ({
	data = {},
	onBookAppointment,
	onSelectLocation,
	domainName,
	expanAccordion,
	index
}) => {
	const [expanded, setExpanded] = useState(false);
	const handleChange = (accordionId) => {
		setExpanded(prev => (prev === accordionId ? false : accordionId));
	};

	useEffect(() => {
		handleChange(`panel-${expanAccordion}`)
	}, [expanAccordion])

	const handleSelectLocation = (event) => {
		event.preventDefault();
		onSelectLocation(data);
	};

	const handleClick = (event) => {
		event.preventDefault();
		event.stopPropagation();

		if (typeof onBookAppointment === "function") {
			onBookAppointment(data);
		}
	};
	const isPanelExpanded = expanded === `panel-${data.index}`;

	return (
		<>
			{domainName === "df" ? (
				<Accordion
					expanded={isPanelExpanded}
					onChange={() => handleChange(`panel-${data.index}`)}
					key={`${data.index}-faqList`}
					data-index={data.index}
					sx={{
						boxShadow: 'none',
						border: 'none',
						'&:before': {
							display: 'none',
						}
					}}
					index={index}
				>
					<AccordionSummary
						expandIcon={
							<>
								<span
									className={`material-icons-outlined ${isPanelExpanded ? "minus-icon" : "plus-icon"
										}`}
								>
									{isPanelExpanded ? "remove" : "add"}
								</span>
							</>

						}
						aria-controls={`panel-${data.index}bh-content`}
						id={`panel-${data.index}bh-header`}
						sx={{
							border: 'none',
							backgroundColor: isPanelExpanded ? "#F4E8DA" : "white",
							"&:hover": {
								backgroundColor: !isPanelExpanded && "#F4E8DA"
							}
						}}
					>
						<p className="acc-tl mb-0" style={{ fontSize: "16px", fontWeight: "400" }} >{data.locname}</p>
					</AccordionSummary>
					<AccordionDetails sx={{
						border: 'none',
						backgroundColor: isPanelExpanded ? "#F4E8DA" : "#F4E8DA"
					}}>
						<div className="location-item"
							data-index={data.index}
							onClick={handleSelectLocation}>
							<div className="address">
								<img src="/assets/images/icons/location-icon.svg" className="mr-10" />
								{data.address1} {data.address2}
							</div>
							<div className="time-and-button">
								<div className="time-section">
									{timeData.map((num, index) =>
										data[`open${num}`] ? (
											<div className="times" key={index}>
												<span className="locleft f-14">{data[`open${num}`]}</span>
												<span className="locright f-14">{data[`time${num}`]}</span>
											</div>
										) : (
											<Fragment key={index} />
										)
									)}
								</div>
								<div className="appointment">
									<Button
										variant="text"
										data-name={data.locname}
										className="brown-color-btn plain-text-btn"
										href={`#select-appointment/${data.locname}`}
									>
										Book an appointment
									</Button>
								</div>
							</div>
						</div>
					</AccordionDetails>
				</Accordion>
			) : (
				<li
					className="location-item"
					data-index={data.index}
					onClick={handleSelectLocation}
				>
					<button className="select-location">
						<h2 className="name">{data.locname}</h2>
					</button>
					<div className="address">
						<img src="/assets/images/icons/location-icon.svg" className="mr-10" />
						{data.address1} {data.address2}
					</div>
					<div className="time-and-button">
						<div className="time-section">
							{timeData.map((num, index) =>
								data[`open${num}`] ? (
									<div className="times" key={index}>
										<span className="locleft">{data[`open${num}`]}</span>
										<span className="locright">{data[`time${num}`]}</span>
									</div>
								) : (
									<Fragment key={index} />
								)
							)}
						</div>
						<div className="appointment">
							<a
								data-name={data.locname}
								className="border-btn white-btn"
								href={`#select-appointment/${data.locname}`}
							>
								Book an appointment
							</a>
						</div>
					</div>
					<hr />
				</li>
			)}
		</>
	);
};

export default LocationItem;
