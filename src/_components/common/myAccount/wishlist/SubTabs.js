/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { wishlist } from "@/_utils/customApiData";
import Order from "../../../staticLayout/my-account/Order";

import Address from "../../../staticLayout/my-account/Address";
import ProfileSetting from "../../../staticLayout/my-account/Profilesetting";
import { stepCheck } from "@/_utils";
import { ASM_TOKEN_KEY } from "@/_utils/userToken";
import { getCookie } from "cookies-next";

const SubTabs = ({ storeId }) => {
  const [toggleState, setToggleState] = useState(1);
  const [toggleComponent, setToggleComponent] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="wishlist_page">
      <div
        className={
          stepCheck(toggleComponent, 1)
            ? "container content  active-content"
            : "content"
        }
      >
        {/* <div className='home_toggle'>
              <h1>Start adding to your wishlist!</h1>
              <p>You currently have no saved pieces. Click on the heart icon to save them for later, you’ll find them here.</p>
              <button>Explore All Jewellery</button>
            </div> */}
      </div>

      <div
        className={
          stepCheck(toggleComponent, 2) ? "content  active-content" : "content"
        }
      >
        <ul className="bloc-tabs">
          <li
            className={
              stepCheck(toggleState, 1)
                ? "tabs active-tabs mob_menu"
                : "tabs hide_tab"
            }
            onClick={() => toggleTab(1)}
          >
            <span className="material-icons-outlined">favorite_border</span>
            Wishlist
            <span className="material-icons-outlined hide_desk">
              expand_more
            </span>
          </li>
          <li
            className={
              stepCheck(toggleState, 2)
                ? "tabs active-tabs mob_menu"
                : "tabs hide_tab"
            }
            onClick={() => toggleTab(2)}
          >
            <span className="material-icons-outlined">list_alt</span>Order
          </li>
          <li
            className={
              stepCheck(toggleState, 3)
                ? "tabs active-tabs mob_menu"
                : "tabs hide_tab"
            }
            onClick={() => toggleTab(3)}
          >
            <span className="material-icons-outlined">home</span>Address
          </li>
          <li
            className={
              stepCheck(toggleState, 4)
                ? "tabs active-tabs mob_menu"
                : "tabs hide_tab"
            }
            onClick={() => toggleTab(4)}
          >
            <span className="material-icons-outlined">settings</span>Profile
            Settingg
          </li>
          <li
            className={
              stepCheck(toggleState, 5) ? "tabs active-tabs" : "tabs hide_tab"
            }
            onClick={() => toggleTab(5)}
            disabled
          >
            <span className="material-icons-outlined">logout</span>logout
          </li>
        </ul>
        <p>
          <span className="material-icons-outlined">drafts</span>Share your
          wishlist
        </p>
        <div className="content-tabs container">
          {stepCheck(wishlist.length, 0) ? (
            <div className="add_wishlist">
              <h3>Start adding to your wishlist!</h3>
              <p>
                You currently have no saved pieces. Click on the heart icon to
                save them for later, you’ll find them here.
              </p>
              <button>Explore All Jewellery</button>
            </div>
          ) : (
            <div
              className={
                stepCheck(toggleState, 1)
                  ? "content  active-content"
                  : "content"
              }
            >
              <section className="follow-us-sec">
                <div className="thumbNail">
                  {wishlist.map((wishlistData) => {
                    return (
                      <div key={wishlistData.label} className="wishlistData">
                        <img
                          src={wishlistData.url}
                          alt={wishlistData.alt || wishlistData.label}
                        />
                        <h5>{wishlistData.label}</h5>
                        <p>{wishlistData.details.price}</p>
                        {stepCheck(wishlistData.bestseller, 1) ? (
                          <p className="bestseller">Bestseller</p>
                        ) : null}
                        {stepCheck(wishlistData.favourite, 1) ? (
                          <p className="favourite">
                            <span className="material-icons-outlined">
                              favorite
                            </span>
                          </p>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          )}
          <div
            className={
              stepCheck(toggleState, 2) ? "content  active-content" : "content"
            }
          >
            <Order />
          </div>
          <div
            className={
              stepCheck(toggleState, 3) ? "content  active-content" : "content"
            }
          >
            <Address storeId={storeId} />
          </div>
          <div
            className={
              stepCheck(toggleState, 4) ? "content  active-content" : "content"
            }
          >
            {!getCookie(ASM_TOKEN_KEY) && <ProfileSetting storeId={storeId} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubTabs;
