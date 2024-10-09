/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

const VisitUsBlock = () => {
  return (
    <section className="visit-us-sec">
      <div className="visit-over-group">
        <img src="/assets/images/map-sec.png" alt="map" />
        <div className="visit-over">
          <div className="heading-sec">
            <h2 className="heading">Find a store</h2>
            <p>Come see us in one of our 10+ stores across the UK. Our Diamond Experts are here to help.</p>
          </div>
          <div className="sec-in">
            <div className="search-sec">
              <div className="input-group">
                <span className="material-icons-outlined">search</span>
                <input type="text" defaultValue="" placeholder="Search by city or postcocde" />
              </div>
              <button type="submit" className="btn-link-primary">Search</button>
            </div>
            <Link href="#" className="has-icon"><span className="material-icons-outlined">near_me</span> Use my location</Link>
          </div>
          <div className="sec-in">
            <div className="vid-link">
              <p>You can choose a Virtual Appointment.</p>
              <Link href="#virtual-appointment" className="has-icon"><span className="material-icons-outlined">videocam</span> Video appointment</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitUsBlock;
