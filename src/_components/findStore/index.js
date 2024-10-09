import React, { useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import GoogleMap from "../common/googleMap";
import { domainWiseMap } from "../common/googleMap/constant";
import { useRouter } from "next/router";
import SearchLocation from "./searchLocation";
import LocationItem from "./locationItem";
import TextTitle from '@/_components/atoms/TextTitle';
import { getStoreType } from "@/_utils";
import { storeTypes } from "@/_utils";
import { Button } from "@mui/material";
const FindStore = ({ translateId, storeId, domain }) => {
  const [locations, setLocations] = useState([]);
  const [mapCenter, setMapCenter] = useState({});
  const [isLocationVisible, setIsLocationVisible] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(null);
  const [expendedAccordion, setExpendedAccordion] = useState(0)
  const router = useRouter();
  const listRef = useRef();
  const domainName = getStoreType(domain);
  useEffect(() => {
    const specificDomain = domainWiseMap[domain];
    if (specificDomain) {
      setMapCenter(specificDomain?.mapOptions.center)
    }
  }, [])

  useEffect(() => {
    const specificDomain = domainWiseMap[domain];
    const locs =
      specificDomain?.locations[router.locale] || specificDomain?.locations.en;
    setLocations(locs);
  }, [router.locale]);

  const handleMarkerClick = (markerData) => {
    setIsLocationVisible(true);
    const el = listRef.current.querySelector(
      `[data-index='${markerData.index}']`
    );
    setExpendedAccordion(markerData.index)
    if (el) {      
      listRef.current.scrollTop = el.offsetTop - 330;
    }
  };
  
  const handleMyLocation = (position) => {
    setMapCenter({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };

  const handleSelectLocation = (loc) => {
    const { lat, lng } = loc.coords;
    setMapCenter({ lat: lat, lng: lng - 3 });
  };

  const handleSearch = ({ lat, lng, name }) => {
    if(name){
      const searchData = locations?.find((data) => data?.locname == name);
      searchData && handleMarkerClick(searchData)
    }
    
    setMapCenter({lat, lng});
  };
  return (
    <div className="find-store">
      {storeTypes[domain] === "ab" &&
        <>
          <div className="find-store-content">
            <div className="find-store-title">
              <TextTitle variant="h1" name="common.findStore" />
              <p>
                <FormattedMessage id="common.findStoreDescription" />
              </p>
            </div>
            <SearchLocation
              onMyLocation={handleMyLocation}
              onSearch={handleSearch}
              isMapLoaded={isMapLoaded}
              domainValue={storeTypes[domain]}
            />
            <div className={`location-list ${isLocationVisible ? "open" : ""}`}>
              <ul ref={listRef}>
                {locations?.map((item, index) => (
                  <LocationItem
                    key={`${item.locid}-${index}`}
                    data={item}
                    onSelectLocation={handleSelectLocation}
                    domainName={domainName}
                    index={index}
                  />
                ))}
              </ul>
            </div>
            {!isLocationVisible && (
              <div className="virtual-appoint-wp mt-3">
                <div className="virtual-appoint">
                  <p className="mb-0">
                    <FormattedMessage id="findStore.chooseVirtualAppointment" />
                  </p>
                  <Button variant="text" className="f-14 semi-bold text-style-normal" href="#virtual-appointment">
                    <img src="/assets/images/icons/camera-black.svg" className="mr-10" />
                    <span className="underline"><FormattedMessage id="common.virtualAppointment" /></span>
                  </Button>
                </div>
              </div>
            )}
          </div>
          <GoogleMap
            height="700px"
            onMarkerClick={handleMarkerClick}
            markerLocations={locations}
            defaultCenter={mapCenter}
            setIsMapLoaded={setIsMapLoaded}
            domain={domain}
          />
        </>
      }
      {storeTypes[domain] === "df" &&
        <>
          <div className="row align-items-center">
            <div className="col-xl-4 col-lg-4 col-sm-12">
              <TextTitle variant="h2" name="dFVisitShowRoom.title" className={"mb-5"} />
              <div className="search-location" style={{ border: "none" }}>
                <SearchLocation
                  onMyLocation={handleMyLocation}
                  onSearch={handleSearch}
                  isMapLoaded={isMapLoaded}
                  domainValue={storeTypes[domain]}
                />
              </div>
              <h4 className="mt-4 mb-4">All stores (15)</h4>
              <div className={`location-list  ${isLocationVisible ? "open" : ""}`}>
                <ul ref={listRef}>
                  {locations?.map((item, index) => (
                    <LocationItem
                      key={`${item.locid}-${index}`}
                      data={item}
                      ref={listRef}
                      onSelectLocation={handleSelectLocation}
                      domainName={domainName}
                      expanAccordion={expendedAccordion}
                    />
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-xl-8 col-lg-8 col-sm-12">
              <GoogleMap
                height="700px"
                onMarkerClick={handleMarkerClick}
                markerLocations={locations}
                defaultCenter={mapCenter}
                setIsMapLoaded={setIsMapLoaded}
                domain={domain}
              />
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default FindStore;
