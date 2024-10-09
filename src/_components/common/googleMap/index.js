import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { domainWiseMap } from "./constant";
import Marker from "./Marker";
import environment from '@/_utils/environment';

const GOOGLE_MAP_SECRET_KEY = environment.googleMap.apiKey;
const mapLibraries = ["places", "geometry"];

const GoogleMapWrapper = ({
	width = "100%",
	height = "400px",
	defaultCenter = domainWiseMap[domain] ? domainWiseMap[domain].mapOptions.center : domainWiseMap['default'].mapOptions.center,
	markerLocations = [],
	onMarkerClick,
	setIsMapLoaded,
	domain
}) => {
	const [center, setCenter] = useState();
	const [zoom, setZoom] = useState(domainWiseMap[domain] ? domainWiseMap[domain].mapOptions.zoom : domainWiseMap['default'].mapOptions.zoom);
	const mapRef = useRef(null);
	const markerIcon = domainWiseMap[domain] ? domainWiseMap[domain]?.locations?.marker: domainWiseMap['default']?.locations?.marker 
	useEffect(() => {
		setCenter(defaultCenter);
	}, [defaultCenter]);

	const handleOnLoad = useCallback((map) => {
		mapRef.current = map;
		setIsMapLoaded && setIsMapLoaded(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleUnmount = useCallback(() => {
		mapRef.current = null;
	}, []);

	const handleMakerClick = (data) => {
		if (typeof onMarkerClick === "function") {
			onMarkerClick(data);
		}
	}
	// width: 100%;height: 700px;position: relative;overflow: hidden;filter: grayscale(80);

	return (
		<div className="google-map-wrapper" style={ domainWiseMap[domain] ? domainWiseMap[domain].mapinlineStyle : {filter: "grayscale(80)"} }>
			<LoadScript
				googleMapsApiKey={GOOGLE_MAP_SECRET_KEY}
				libraries={mapLibraries}
			>
				<GoogleMap
					mapContainerStyle={{ width, height }}
					center={center}
					zoom={zoom}
					onLoad={handleOnLoad}
					onUnmount={handleUnmount}
					options={domainWiseMap[domain] ? domainWiseMap[domain].mapOptions : domainWiseMap['default']}
				>
					{
						markerLocations.map(item =>
							<Marker
								key={item.index}
								data={item}
								onClick={handleMakerClick}
								icon={markerIcon}
							/>
						)
					}
				</GoogleMap>
			</LoadScript>
		</div>
	)
};

export default GoogleMapWrapper;
