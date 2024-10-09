/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Link from "next/link";

import {
  FooterLinks,
  FooterSocialLinks,
  FooterFlags,
  FooterPagesLink,
} from "@/_utils/customApiData";

import NewsLetterForm from "@/_components/common/NewsLetterForm";

const Footer = () => {
  const [currecy, setCurrecy] = React.useState("");

  const handleChange = (event) => {
    setCurrecy(event.target.value);
  };
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 176) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <footer className="footerab">
        <div id="footer">
          <div className="container">
            <div className="footer-top">
              {FooterLinks.map((items, index) => {
                return (
                  <div className="footer-info" key={items.id}>
                    <h4>{items.title}</h4>
                    <ul className={`${items.extraClass}`}>
                      {items.links.map((item, index) => {
                        return (
                          <li key={item.id}>
                            <Link href="#">{item.link}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
              <div className="footer-subscription-form form-container">
                <NewsLetterForm
                  variant="footer"
                  fLabel="Name"
                  buttonLabel="Subscribe Newsletter"
                />
              </div>
            </div>
            <div className="footer-mid">
              <ul className="social-list">
                {FooterSocialLinks.map(({ img, id, href }) => {
                  return (
                    <li key={id}>
                      <Link href={href || "#"}>
                        <img src={img} alt="" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <ul className="flag-list">
                {FooterFlags.map(({ img, id, href }) => {
                  return (
                    <li key={id}>
                      <Link href={href || "#"}>
                        <img src={img} alt="" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {/* <div className="dropdown-sec">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">Currecy</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={currecy}
                    onChange={handleChange}
                    label="USD"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'usd'}>USD</MenuItem>
                    <MenuItem value={'inr'}>INR</MenuItem>
                  </Select>
                </FormControl>
              </div> */}
            </div>
            <div className="footer-bt-ab">
              <p className="copy">&copy; 2022 Austen & Blake. All Rights</p>
              <ul>
                {FooterPagesLink.map(({ link, id, href }) => {
                  return (
                    <li key={id}>
                      <Link href={href || "#"}>{link}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </footer>{" "}
      {showTopBtn && (
        <div className="top-to-btm" id="scroll-btn" onClick={goToTop}>
          <span className="material-icons-outlined">arrow_upward</span>
        </div>
      )}{" "}
    </>
  );
};

export default Footer;
