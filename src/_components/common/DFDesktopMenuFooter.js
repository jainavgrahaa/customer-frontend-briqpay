/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import useAuthHelper from "@/_hooks/useAuthHelper";
import { translationValue } from "@/_store/translation.slice";
import { dfFooterTranslation } from "@/_utils/customApiData";
import { FormControl, MenuItem, Select } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";

export default function DFDesktopMenuFooter({
  siteComponentNavigations,
  footerData,
  storeId,
  pageData,
  domain,
  translateId,
  cookieToken
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [languages, setLanguages] = useState([])
  const [defaultTranslate, setDefaultTranslate] = useState()
  const { getStoreTranslations, getNavigationHierarchy } = useAuthHelper()
  const { translationValue: translateCode } = useSelector((state) => state?.translation);
  const sortedMenu = siteComponentNavigations?.sort(
    (a, b) => a.sequence - b.sequence
  );
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setScrollPosition(window.scrollY);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if(storeId) {
      getStoreTranslations({storeId, cookieToken}).then(res => {
        const allowedTranslates = res?.allowedTranslates || [];
        const lang = [
          ...allowedTranslates,
          res?.defaultTranslate
        ]
        setDefaultTranslate(lang.filter(ele => ((ele?.translate_id === translateCode || ele?.code === translateCode)))?.[0])
        setLanguages([
          ...allowedTranslates,
          res?.defaultTranslate
        ])
      })
    }
  }, [storeId])

  useEffect((
  )=>  setIsOpen(false)
  ,[scrollPosition])
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = async (event) => {
    let urlSlug = event?.target?.value;
    if (!urlSlug.startsWith('http://') && !urlSlug.startsWith('https://')) {
      urlSlug = `https://${urlSlug}`;
    }
    window.open(urlSlug, '_blank');
  };

  return (
    <div className="footer-menu">
      {sortedMenu?.map((sectionData, index) => (
        <div className="footer-info footer-info-desktop" key={index}>
          <h6 className="color-light-brown mb-4 text-uppercase f-14">{sectionData.label}</h6>
          <ul>
            {sectionData?.section?.map((item, index) => {
              return (
                <li key={index}>
                  <Link href={item?.labelLink || "#"}>{item.label}</Link>
                </li>
              );
            })}
          </ul>
          {index === 0 && (
            <div className="footer-mid-df">
              <h6 className="color-light-brown mb-3 text-uppercase f-14"><FormattedMessage id="common.followus" /></h6>
              <ul className="social-list-df">
                {footerData?.socialMedias?.map((obj, index) => {
                  return (
                    <li className="social-lists" key={index}>
                      <Link href={obj?.link ? obj?.link : "#"}>
                        <img
                          style={{ minWidth: "1rem" }}
                          src={
                            obj?.iconsLink ||
                            "assets/icons/raw-svgs/facebook_icon.svg"
                          }
                          alt={obj?.alt}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <h6 style={{ marginTop: "30px" }} className="color-light-brown mb-0 text-uppercase f-14"> <FormattedMessage id="common.changelocationtitle" /></h6>
              {
                domain ?
              <ul>
                <div className="flag-list-df">
                  <h6 className="f-14">You’re in:</h6>
                  <FormControl variant="standard" className="country-dropdown" >
                    <Select
                    
                      IconComponent={(props) => {
                        return isOpen ? (
                          <span onClick={()=>setIsOpen(!isOpen)} style={{color:"white",cursor:"pointer"}} className="material-icons-outlined icons-small">
                            expand_less{" "}
                          </span>
                        ) : (
                          <span onClick={()=>setIsOpen(!isOpen)} style={{color:"white",cursor:"pointer" }} className="material-icons-outlined icons-small">
                            expand_more
                          </span>
                        );
                      }}
                      defaultValue={domain}
                      onOpen={toggleDropdown}
                      onClose={toggleDropdown}
                      open={isOpen}
                      value={domain}
                      onChange={(e) => handleChange(e)}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 200,  
                            overflowY: 'auto',  
                            width: 208,
                          },
                        },
                      }}
                    >
                      {dfFooterTranslation?.map((ele) => (
                      <MenuItem value={ele?.value} key={ele?.value} >
                      <div style={{ display: "flex", alignItems: "center",  overflowY: "auto" }}>
                        <span style={{ paddingRight: "4px" }}>
                          <i className={`${ele?.flag}`}></i>
                        </span>
                        <span style={{ color: isOpen ? "#000" : "#fff" }}>{ele?.lable}</span>
                      </div>
                    </MenuItem>
                    ))}
                    </Select>
                  </FormControl>
                </div> 
              </ul> : null
              }
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
