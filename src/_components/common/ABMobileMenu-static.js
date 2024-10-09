/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState, useEffect, createRef, forwardRef } from "react";
import { Button } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";

const routes = [
    {
        label: "Engagement Rings",
        link: "engagement-rings",
        rootRoutes: [
            {
                label: "Design Your Own Engagement Ring",
                link: "design",
                subRoutes: [
                    {
                        label: "Start with the setting",
                        link: "start-setting",
                        svg: "/assets/icons/icons.svg#black_diamond",
                    },
                    {
                        label: "Start with a Natural Diamond",
                        link: "start",
                        svg: "/assets/icons/icons.svg#black_diamond",
                    },
                    {
                        label: "Start with a Lab-Grown Diamond",
                        link: "start",
                        svg: "/assets/icons/icons.svg#black_diamond",
                    },
                    {
                        label: "Start  with a Gemstone",
                        link: "start",
                        svg: "/assets/icons/icons.svg#black_diamond",
                    },
                    {
                        label: "Bestsellers",
                        link: "bestsellers",
                    },
                    {
                        label: "Bestsellers",
                        link: "bestsellers",
                    },
                    {
                        label: "View all Engagement Rings",
                        link: "view-all",
                        viewAll: true,
                    },
                ],
            },
            {
                label: "Shop by Style",
                link: "shop-by-style",
                subRoutes: [
                    {
                        label: "Solitaire",
                        link: "solitaire",
                    },
                    {
                        label: "Triology",
                        link: "triology",
                    },
                    {
                        label: "Side Stone",
                        link: "side-stone",
                    },
                    {
                        label: "View all Styles",
                        link: "view-all",
                        viewAll: true,
                    },
                ],
            },
            {
                label: "Shop by Metal",
                link: "shop-by-metal",
                subRoutes: [
                    {
                        label: "Silver",
                        link: "silver",
                    },
                    {
                        label: "Yellow Gold",
                        link: "yellow-gold",
                    },
                    {
                        label: "Yellow Gold",
                        link: "yellow-gold",
                    },
                    {
                        label: "Yellow Gold",
                        link: "yellow-gold",
                    },
                    {
                        label: "Yellow Gold",
                        link: "yellow-gold",
                    },
                    {
                        label: "Yellow Gold",
                        link: "yellow-gold",
                    },
                ],
            },
            {
                label: "Shop by Shape",
                link: "shop-by-shape",
                subRoutes: [
                    {
                        label: "Round",
                        link: "round",
                        svg: "/assets/icons/icons.svg#round_shape",
                    },
                    {
                        label: "Oval",
                        link: "oval",
                        svg: "/assets/icons/icons.svg#oval_shape",
                    },
                    {
                        label: "Emerald",
                        link: "emerald",
                        svg: "/assets/icons/icons.svg#emerald_shape",
                    },
                    {
                        label: "Pear",
                        link: "pear",
                        svg: "/assets/icons/icons.svg#pear_shape",
                    },
                    {
                        label: "Cushion",
                        link: "cushion",
                        svg: "/assets/icons/icons.svg#cushion_shape",
                    },
                    {
                        label: "Marquise",
                        link: "marquise",
                        svg: "/assets/icons/icons.svg#marquise_shape",
                    },
                    {
                        label: "View all Shapes",
                        link: "view-all",
                        viewAll: true,
                    },
                ],
            },
        ],
        moreActions: [
            {
                label: "Engagement Ring Guides",
                link: "#",
            },
            {
                label: "Get Expert Advice",
                link: "#",
            },
        ],
        banner: true,
    },
    {
        label: "Diamond Rings",
        link: "diamond-rings",
        rootRoutes: [
            {
                label: "Design Your Own Engagement Ring",
                link: "design",
                subRoutes: [
                    {
                        label: "Start with the setting",
                        link: "start-setting",
                        svg: "/assets/icons/icons.svg#black_diamond",
                    },
                    {
                        label: "Start with a Natural Diamond",
                        link: "start",
                        svg: "/assets/icons/icons.svg#black_diamond",
                    },
                    {
                        label: "Start with a Lab-Grown Diamond",
                        link: "start",
                        svg: "/assets/icons/icons.svg#black_diamond",
                    },
                    {
                        label: "Start  with a Gemstone",
                        link: "start",
                        svg: "/assets/icons/icons.svg#black_diamond",
                    },
                    {
                        label: "Bestsellers",
                        link: "bestsellers",
                    },
                    {
                        label: "Bestsellers",
                        link: "bestsellers",
                    },
                    {
                        label: "View all Engagement Rings",
                        link: "view-all",
                        viewAll: true,
                    },
                ],
            },
            {
                label: "Shop by Style",
                link: "shop-by-style",
                subRoutes: [
                    {
                        label: "Solitaire",
                        link: "solitaire",
                    },
                    {
                        label: "Triology",
                        link: "triology",
                    },
                    {
                        label: "Side Stone",
                        link: "side-stone",
                    },
                    {
                        label: "View all Styles",
                        link: "view-all",
                        viewAll: true,
                    },
                ],
            },
            {
                label: "Shop by Shape",
                link: "shop-by-shape",
                subRoutes: [
                    {
                        label: "Round",
                        link: "round",
                        svg: "/assets/icons/icons.svg#round_shape",
                    },
                    {
                        label: "Oval",
                        link: "oval",
                        svg: "/assets/icons/icons.svg#oval_shape",
                    },
                    {
                        label: "Emerald",
                        link: "emerald",
                        svg: "/assets/icons/icons.svg#emerald_shape",
                    },
                    {
                        label: "Pear",
                        link: "pear",
                        svg: "/assets/icons/icons.svg#pear_shape",
                    },
                    {
                        label: "Cushion",
                        link: "cushion",
                        svg: "/assets/icons/icons.svg#cushion_shape",
                    },
                    {
                        label: "Marquise",
                        link: "marquise",
                        svg: "/assets/icons/icons.svg#marquise_shape",
                    },
                    {
                        label: "View all Shapes",
                        link: "view-all",
                        viewAll: true,
                    },
                ],
            },
            {
                label: "Shop by Metal",
                link: "shop-by-metal",
                subRoutes: [
                    {
                        label: "Silver",
                        link: "silver",
                    },
                    {
                        label: "Yellow Gold",
                        link: "yellow-gold",
                    },
                    {
                        label: "Yellow Gold",
                        link: "yellow-gold",
                    },
                    {
                        label: "Yellow Gold",
                        link: "yellow-gold",
                    },
                    {
                        label: "Yellow Gold",
                        link: "yellow-gold",
                    },
                    {
                        label: "Yellow Gold",
                        link: "yellow-gold",
                    },
                ],
            },
        ],
        moreActions: [
            {
                label: "Diamond Ring Guides",
                link: "#",
            },
            {
                label: "Get Expert Advice",
                link: "#",
            },
        ],
        banner: true,
    },
    {
        label: "Wedding Rings",
        link: "wedding-rings",
        rootRoutes: [
            {
                label: "Shop by Style",
                link: "shop-by-style",
                title: "WOMEN",
                subRoutes: [
                    {
                        label: "Solitaire",
                        link: "solitaire",
                    },
                    {
                        label: "Triology",
                        link: "triology",
                    },
                    {
                        label: "Side Stone",
                        link: "side-stone",
                    },
                    {
                        label: "View all Styles",
                        link: "view-all",
                        viewAll: true,
                    },
                ],
            },

            {
                label: "Shop by Metal",
                link: "shop-by-metal",
                subRoutes: [
                    {
                        label: "Silver",
                        link: "silver",
                    },
                    {
                        label: "Yellow Gold",
                        link: "yellow-gold",
                    },
                    {
                        label: "Yellow Gold",
                        link: "yellow-gold",
                    },
                    {
                        label: "Yellow Gold",
                        link: "yellow-gold",
                    },
                    {
                        label: "Yellow Gold",
                        link: "yellow-gold",
                    },
                    {
                        label: "Yellow Gold",
                        link: "yellow-gold",
                    },
                ],
            },
            {
                label: "Shop by Style",
                link: "shop-by-style",
                title: "MEN",
                subRoutes: [
                    {
                        label: "Solitaire",
                        link: "solitaire",
                    },
                    {
                        label: "Triology",
                        link: "triology",
                    },
                    {
                        label: "Side Stone",
                        link: "side-stone",
                    },
                    {
                        label: "View all Styles",
                        link: "view-all",
                        viewAll: true,
                    },
                ],
            },

            {
                label: "Shop by Metal",
                link: "shop-by-metal",
                subRoutes: [
                    {
                        label: "Silver",
                        link: "silver",
                    },
                    {
                        label: "Yellow Gold",
                        link: "yellow-gold",
                    },
                    {
                        label: "Yellow Gold",
                        link: "yellow-gold",
                    },
                    {
                        label: "Yellow Gold",
                        link: "yellow-gold",
                    },
                    {
                        label: "Yellow Gold",
                        link: "yellow-gold",
                    },
                    {
                        label: "Yellow Gold",
                        link: "yellow-gold",
                    },
                ],
            },
            {
                label: "Explore",
                link: "explore",
                title: " ",
                subRoutes: [
                    {
                        label: "Bespoke Design",
                        link: "bespoke-design",
                    },
                    {
                        label: "Bespoke Design",
                        link: "bespoke-design",
                    },
                    {
                        label: "Bespoke Design",
                        link: "bespoke-design",
                    },
                    {
                        label: "Bespoke Design",
                        link: "bespoke-design",
                    },
                ],
            },
        ],
        moreActions: [
            {
                label: "How to choose the perfect Wedding Ring",
                link: "#",
            },
            {
                label: "Get Expert Advice",
                link: "#",
            },
        ],
        banner: true,
    },
    {
        label: "Jewellery",
        link: "jewellery",
        rootRoutes: [
            {
                label: "Create Your Own",
                link: "create-your-own",
                title: "Earrings",
                subRoutes: [
                    {
                        label: "Stud",
                        link: "stud",
                    },
                    {
                        label: "Stud",
                        link: "stud",
                    },
                    {
                        label: "Stud",
                        link: "stud",
                    },
                    {
                        label: "Stud",
                        link: "stud",
                    },
                    {
                        label: "View All Earrings",
                        link: "view-all",
                        viewAll: true,
                    },
                ],
            },
            {
                label: "Create Your Own",
                link: "create-your-own",
                title: "Necklaces",
                subRoutes: [
                    {
                        label: "Stud",
                        link: "stud",
                    },
                    {
                        label: "Stud",
                        link: "stud",
                    },
                    {
                        label: "Stud",
                        link: "stud",
                    },
                    {
                        label: "Stud",
                        link: "stud",
                    },
                    {
                        label: "View All Neclaces",
                        link: "view-all",
                        viewAll: true,
                    },
                ],
            },
            {
                label: "Create Your Own",
                link: "create-your-own",
                title: "Bracelets",
                subRoutes: [
                    {
                        label: "Stud",
                        link: "stud",
                    },
                    {
                        label: "Stud",
                        link: "stud",
                    },
                    {
                        label: "Stud",
                        link: "stud",
                    },
                    {
                        label: "Stud",
                        link: "stud",
                    },
                    {
                        label: "View All Bracelets",
                        link: "view-all",
                        viewAll: true,
                    },
                ],
            },
            {
                label: "Explore",
                link: "explore",
                title: " ",
                subRoutes: [
                    {
                        label: "Bespoke Design",
                        link: "bespoke-design",
                    },
                    {
                        label: "Bespoke Design",
                        link: "bespoke-design",
                    },
                    {
                        label: "Bespoke Design",
                        link: "bespoke-design",
                    },
                    {
                        label: "Bespoke Design",
                        link: "bespoke-design",
                    },
                ],
            },
            {
                label: "Shop by Price",
                link: "shop-by-price",
                subRoutes: [
                    {
                        label: "Under £500",
                        link: "under-5000",
                    },
                    {
                        label: "Under £500",
                        link: "under-5000",
                    },
                    {
                        label: "Under £500",
                        link: "under-5000",
                    },
                    {
                        label: "Under £500",
                        link: "under-5000",
                    },
                ],
            },
        ],
        moreActions: [
            {
                label: "Jewellery Trends in 2022",
                link: "#",
            },
            {
                label: "Get Expert Advice",
                link: "#",
            },
        ],
        banner: true,
    },
    {
        label: "Gifting",
        link: "gifting",
        rootRoutes: [
            {
                label: "Most Gifted",
                link: "#",
                subRoutes: [
                    {
                        label: "Bracelets",
                        link: "bracelets",
                    },
                    {
                        label: "Bracelets",
                        link: "bracelets",
                    },
                    {
                        label: "Bracelets",
                        link: "bracelets",
                    },
                    {
                        label: "Bracelets",
                        link: "bracelets",
                    },
                ],
            },
            {
                label: "Shop For",
                link: "shop-for",
                subRoutes: [
                    {
                        label: "For Her",
                        link: "for-her",
                    },
                    {
                        label: "For Her",
                        link: "for-her",
                    },
                    {
                        label: "For Her",
                        link: "for-her",
                    },
                    {
                        label: "For Her",
                        link: "for-her",
                    },
                ],
            },
            {
                label: "Shop by Occasion",
                link: "shop-by-occasion",
                subRoutes: [
                    {
                        label: "Birthday",
                        link: "birthday",
                    },
                    {
                        label: "Birthday",
                        link: "birthday",
                    },
                    {
                        label: "Birthday",
                        link: "birthday",
                    },
                    {
                        label: "Birthday",
                        link: "birthday",
                    },
                    {
                        label: "Birthday",
                        link: "birthday",
                    },
                ],
            },
            {
                label: "Shop by Price",
                link: "shop-by-price",
                subRoutes: [
                    {
                        label: "Under £500",
                        link: "under-5000",
                    },
                    {
                        label: "Under £500",
                        link: "under-5000",
                    },
                    {
                        label: "Under £500",
                        link: "under-5000",
                    },
                    {
                        label: "Under £500",
                        link: "under-5000",
                    },
                ],
            },
            {
                label: "BirthStones (TBC)",
                link: "birthstones",
                subRoutes: [
                    {
                        label: "Earrings",
                        link: "earrings",
                    },
                    {
                        label: "Earrings",
                        link: "earrings",
                    },
                    {
                        label: "Earrings",
                        link: "earrings",
                    },
                    {
                        label: "Earrings",
                        link: "earrings",
                    },
                    {
                        label: "Earrings",
                        link: "earrings",
                    },
                    {
                        label: "View All",
                        link: "view-all",
                        viewAll: true,
                    },
                ],
            },
            {
                label: "Explore",
                link: "explore",
                subRoutes: [
                    {
                        label: "Bespoke Design",
                        link: "bespoke-design",
                    },
                    {
                        label: "Bespoke Design",
                        link: "bespoke-design",
                    },
                    {
                        label: "Bespoke Design",
                        link: "bespoke-design",
                    },
                    {
                        label: "Bespoke Design",
                        link: "bespoke-design",
                    },
                ],
            },
        ],
        moreActions: [
            {
                label: "The Christmas Gift Guide 2022",
                link: "#",
            },
            {
                label: "Get Expert Advice",
                link: "#",
            },
        ],
        banner: true,
    },
    {
        label: "Jewellery Guides",
        link: "jewellery-guides",
        rootRoutes: [
            {
                label: "Guides",
                link: "guides",
                subRoutes: [
                    {
                        label: "Diamond Guide",
                        link: "diamond-guide",
                    },
                    {
                        label: "Diamond Guide",
                        link: "diamond-guide",
                    },
                    {
                        label: "Diamond Guide",
                        link: "diamond-guide",
                    },
                    {
                        label: "Diamond Guide",
                        link: "diamond-guide",
                    },
                ],
            },
            {
                label: "Latest Stories",
                link: "latest-stories",
                subRoutes: [
                    {
                        label: "How To Size An Engagement Ring",
                        link: "how-to-size-an-engagement-ring",
                    },
                    {
                        label: "How To Size An Engagement Ring",
                        link: "how-to-size-an-engagement-ring",
                    },
                    {
                        label: "How To Size An Engagement Ring",
                        link: "how-to-size-an-engagement-ring",
                    },
                    {
                        label: "How To Size An Engagement Ring",
                        link: "how-to-size-an-engagement-ring",
                    },
                ],
            },
            {
                label: "About Us",
                link: "about-us",
                subRoutes: [
                    {
                        label: "Customer reveiws",
                        link: "customer-reveiws",
                    },
                    {
                        label: "Customer reveiws",
                        link: "customer-reveiws",
                    },
                    {
                        label: "Customer reveiws",
                        link: "customer-reveiws",
                    },
                    {
                        label: "Customer reveiws",
                        link: "customer-reveiws",
                    },
                ],
            },
        ],
        moreActions: [
            {
                label: "Contact Us",
                link: "#",
            },
        ],
        banner: false,
    },
    {
        label: "Visit Our Store",
        link: "visit-our-store",
        rootRoutes: [
            {
                label: "Visit Us",
                link: "visit-us",
                subRoutes: [
                    {
                        label: "Manchester",
                        link: "manchester",
                    },
                    {
                        label: "Manchester",
                        link: "manchester",
                    },
                    {
                        label: "Manchester",
                        link: "manchester",
                    },
                    {
                        label: "Manchester",
                        link: "manchester",
                    },
                ],
            },
            {
                label: "Contact Us",
                link: "contact-us",
                subRoutes: [
                    {
                        label: "020 7660 1529",
                        link: "#",
                    },
                    {
                        label: "020 7660 1529",
                        link: "#",
                    },
                ],
            },
        ],
        moreActions: [
            {
                label: "Book an appointment",
                link: "#book-appointment",
            },
            {
                label: "Video appointment",
                link: "#virtual-appointment",
            },
        ],
        banner: true,
    },
];

const MenuItemComponent = (props) => {
    const { className, onClick, link, children, linkLevel } = props;
    const ref = createRef;
    // If link is not set return the orinary ListItem
    //   if (linkLevel && (!link || typeof link !== 'string')) {
    if (!linkLevel) {
        return (
            <ListItemButton
                className={className}
                // eslint-disable-next-line react/display-name
                component={forwardRef((props, ref) => (
                    <Link {...props} ref={ref} activeclassname="active" />
                ))}
                onClick={onClick}
                to={link}
            >
                {children}
            </ListItemButton>
        );
    }

    // Return a LitItem with a link component
    return (
        <ListItemButton
            className={className}
            // children={children}
            // eslint-disable-next-line react/display-name
            component={forwardRef((props, ref) => (
                <Link {...props} ref={ref} activeclassname="active" />
            ))}
            href={link || "#"}
            onClick={onClick}
        >
            {children}
        </ListItemButton>
    );
};

const MenuItemMobile = (props) => {
    const {
        label,
        link,
        subRoutes = [],
        secondLevel = false,
        parentLink = null,
        toggleActiveEvent,
        currentActive,
        svg,
        viewAll,
    } = props;
    const isExpandable = subRoutes && subRoutes.length > 0;
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (currentActive === link) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentActive]);

    const handleClick = (event) => {
        const linkDisabled = !secondLevel;
        if (linkDisabled && isExpandable) {
            event.preventDefault();
        } else {
        }
        if (!open && !secondLevel) {
            toggleActiveEvent(link);
        }
        setOpen(!open);
    };
    const MenuItemRoot = (
        <MenuItemComponent
            linkLevel={secondLevel}
            link={secondLevel ? `#/${parentLink}/${link}` : `/${link}`}
            onClick={(e) => handleClick(e)}
            className="mobile-menu-item"
        >
            {/* { secondLevel && <ListItemIcon><span className="material-icons text-white">arrow_right</span></ListItemIcon>} */}
            {secondLevel && svg && (
                <svg>
                    <use href={svg} />
                </svg>
            )}
            <ListItemText
                primary={label}
                className={` ${viewAll === true ? "view-all-link" : ""}`}
            />
            {viewAll && <span className="material-icons">keyboard_arrow_right</span>}
            {/* Display the expand menu if the item has children */}
            {isExpandable && !open && (
                <span className="material-icons-outlined icons-small">
                    chevron_right
                </span>
            )}
            {isExpandable && open && (
                <span className="material-icons-outlined icons-small">
                    keyboard_arrow_down
                </span>
            )}
        </MenuItemComponent>
    );

    const MenuItemChildren = isExpandable ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
            {/* <Divider /> */}
            <List component="div" disablePadding>
                {subRoutes?.map((item, index) => (
                    <MenuItemMobile
                        {...item}
                        parentLink={link}
                        secondLevel={true}
                        key={index}
                    />
                ))}
            </List>
        </Collapse>
    ) : null;

    return (
        <>
            {MenuItemRoot}
            {MenuItemChildren}
        </>
    );
};

const BackLink = ({ getToRoot }) => {
    return (
        <Link
            className="mobile-menu-link mobile-menu-close"
            href="#"
            onClick={getToRoot}
        >
            <span className="material-icons icons-small">chevron_left</span> Back
        </Link>
    );
};

export const ABMobileMenuStatic = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [currentActiveNav, setCurrentActiveNav] = useState(null);
    const [currentActiveParent, setCurrentActiveParent] = useState(null);

    const toggleActive = (data) => {
        setCurrentActiveNav(data);
    };

    const toggleParent = (data) => {
        setCurrentActiveParent(data);
    };

    const toggleRootLinks = (link) => {
        toggleParent(link);
    };

    const getToRoot = () => {
        setCurrentActiveParent("");
        setCurrentActiveNav(null);
    };

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
        setCurrentActiveParent("");
        setCurrentActiveNav(null);
    };

    return (
        <>
            {/* {JSON.stringify(routes)} */}
            <div className="menu-mobile ab-menu-mobile">
                {!showMobileMenu && (
                    <button className="mobileMenuToggle" onClick={toggleMobileMenu}>
                        <span className="material-icons icons-small">menu</span>
                    </button>
                )}
                {showMobileMenu && (
                    <div id="mobileNav">
                        <button
                            className={`mobileMenuToggle closeToggle ${!currentActiveParent ? "is-active" : ""
                                }`}
                            onClick={toggleMobileMenu}
                        >
                            <span className="material-icons">close</span>
                        </button>
                        <ul className="nav root-nav has-searchBox">
                            <li>
                                <div className="search-box">
                                    <span className="material-icons-outlined icons-small">
                                        search
                                    </span>
                                    <input type="text" defaultValue="" placeholder="Search" />
                                </div>
                            </li>
                        </ul>
                        <ul className="nav root-nav">
                            {routes?.map((item, index) => (
                                <li key={index} className="mobile-menu-item">
                                    <Link
                                        id={`nav${index}`}
                                        href="#"
                                        className="mobile-menu-link"
                                        onClick={() => toggleRootLinks(`nav${index}`)}
                                    >
                                        <span>{item.label}</span>
                                        <span className="material-icons">chevron_right</span>
                                    </Link>
                                    <div
                                        className={`mobile-subnav ${currentActiveParent === `nav${index}` ? "is-active" : ""
                                            }`}
                                    >
                                        <BackLink getToRoot={getToRoot} />
                                        <div className={`collapsible-nav`}>
                                            <div className="w-100">
                                                <ul className="collapsible-nav-menu nav flex-column">
                                                    {item?.rootRoutes?.map((subitem, subindex) => (
                                                        <li key={subindex}>
                                                            {subitem?.title && (
                                                                <h4 className="collapsible-nav-subtitle">
                                                                    {subitem.title}
                                                                </h4>
                                                            )}
                                                            <MenuItemMobile
                                                                {...subitem}
                                                                currentActive={currentActiveNav}
                                                                toggleActiveEvent={(data) => toggleActive(data)}
                                                            />
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="more-actions">
                                            <ul className="more-actions-list">
                                                {item?.moreActions?.map((subitem, subindex) => (
                                                    <li key={subindex}>
                                                        <Link href="#">
                                                            <span>{subitem.label}</span>
                                                            <span className="material-icons-outlined icons-small">
                                                                chevron_right
                                                            </span>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                            {item?.banner && (
                                                <div className="mobile-menu-banner">
                                                    <img src="/assets/images/megamenu-banner.png" />
                                                    <div className="mobile-banner-items">
                                                        <h3>
                                                            Autumn <i>Sale</i>
                                                        </h3>
                                                        <p>10% off everything</p>
                                                        <Button
                                                            variant="outlined"
                                                            sx={{ mt: 2, mb: 2 }}
                                                            size="large"
                                                        >
                                                            Shop the Sale
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <ul className="level-specific-menu-items">
                            <li
                                className={`mobile-menu-actions ${!currentActiveParent ? "is-active" : ""
                                    }`}
                            >
                                <div className="menu-actions-1">
                                    <Link href="#">
                                        <span className="material-icons-outlined icons-small">
                                            person
                                        </span>{" "}
                                        <span>My account</span>
                                    </Link>
                                    <Link href="#">
                                        <span className="material-icons-outlined icons-small">
                                            favorite_border
                                        </span>{" "}
                                        <span>Wishlist</span>
                                    </Link>
                                </div>
                                <div className="menu-actions-2">
                                    <div>
                                        <Link href="#">
                                            <span className="material-icons-outlined icons-small">
                                                location_on
                                            </span>{" "}
                                            <span>Our Stores</span>
                                        </Link>
                                        <Link href="#">
                                            <span className="material-icons-outlined icons-small">
                                                call
                                            </span>{" "}
                                            <span>020 7660 1529</span>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link href="#">
                                            <span className="material-icons-outlined icons-small">
                                                calendar_month
                                            </span>{" "}
                                            <span>Book an appointment</span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="menu-actions-3">
                                    <Link href="#">
                                        <span>Guides</span>
                                    </Link>
                                    <Link href="#">
                                        <span>Reviews</span>
                                    </Link>
                                    <Link href="/faqs">
                                        <span>FAQs</span>
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

