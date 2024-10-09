import Image from "next/image";
import Link from "next/link";
import React from "react";

const Resizing = () => {
  return (
    <section className="freesizing-section">
      <div className="container">
        <div className="freesizing-container">
          <div className="row">
            <div className="col-lg-6">
              <div className="d-flex justify-content-center align-items-center border-box h-100">
                <img src="/assets/icons/raw-svgs/resize-icon.svg" alt="" />
                <p className="ms-2 mb-0">FREE RESIZING</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="offer-box">
                <p> We offer resizing options depending on your ring type.</p>
                <Link href="#" className="link-primary">
                  Learn more{" "}
                  <span className="material-icons-outlined">
                    chevron_right
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resizing;
