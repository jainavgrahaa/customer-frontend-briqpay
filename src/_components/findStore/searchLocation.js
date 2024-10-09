/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import useDebounce from "@/_hooks/useDebounce";
import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";

const SearchLocation = ({ onMyLocation, onSearch, isMapLoaded, domainValue }) => {
  const [locText, setLocText] = useState("");
  const autoCompleteRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isMapLoaded) {
      bindAutocomplete();
    }
  }, [isMapLoaded]);

  const bindAutocomplete = () => {
    if (typeof window === "undefined" || !window.google) {
      return;
    }

    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {}
    );
    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      const { lat, lng } = place.geometry.location.toJSON();
      const searchName = place?.formatted_address?.split(",")[0].trim();
      
      setLocText({ lat, lng });
      onSearch({ lat, lng, name: searchName })
    });

  };

  const handleSearch = useDebounce(() => {
    onSearch(locText);
  });

  const handleMyLocation = (event) => {
    event.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        onMyLocation(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      {domainValue === "ab" &&
        <div className="locations-box">
          <div className="search-box">
            <div className="search-sec">
              <div className="input-group">
                <span className="material-icons-outlined">search</span>
                <input
                  type="text"
                  placeholder="Search by city or postcocde"
                  ref={inputRef}
                  onChange={handleSearch}
                />
              </div>
              <button
                type="submit"
                className="btn-link-primary"
                onClick={handleSearch}
              >
                <FormattedMessage id="common.search" />
              </button>
            </div>
          </div>
          <Button variant="text" onClick={handleMyLocation} className="f-14 semi-bold text-style-normal">
            <img src="/assets/images/icons/location-arrow.svg" className="mr-10" />
            <span className="underline"><FormattedMessage id="common.useMyLocation" /></span>
          </Button>
        </div>
      }
      {domainValue === "df" &&
        <div style={{backgroundColor:"white"}}>
          <div style={{backgroundColor:'white',display:'flex',flexDirection:'row',borderBottom:"1px solid black",width:'100%'}}>
            <div style={{width:'100%'}}>
              <input
                type="text"
                placeholder="Search by city or postcocde"
                ref={inputRef}
                style={{ border: 'none',
                  backgroundColor: 'transparent',
                  width: '100%',
                  padding: '10px 0px',
                  outline:'none'
                }}
              />
            </div>
            <Button variant="text" onClick={handleSearch} className="icon-rounded icon-circle-bg-hover" type="submit"><span class="material-icons-outlined">search</span></Button>
          </div>
          <Button variant="text" onClick={handleMyLocation} className="f-14 semi-bold text-style-normal color-bistre-brown plain-text-btn mt-3">
            <img src="/assets/images/icons/location-df-icon.svg" className="mr-10" />
            <span className="underline"><FormattedMessage id="common.useMyLocation" /></span>
          </Button>
        </div>
      }
    </>
  );
};

export default SearchLocation;
