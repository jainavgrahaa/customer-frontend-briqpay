/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { Button } from "@mui/material";

export function Menu(props) {
    const children = React.Children.toArray(props.children);
    return (
        <nav className="menu ab-menu">
            <div className="menu-mobile">
                {/* <FontAwesomeIcon icon={faBars} /> */}
            </div>
            <ul className="menu-list">
                {children.map((item, index) => {
                    return (
                        <MenuItem name={item.props.name} key={index}>
                            {item}
                        </MenuItem>
                    );
                })}
            </ul>
        </nav>
    );
}
export function MenuDropdown(props) {
    const classNames = ["menu-dropdown"];
    if (props.megaMenu) {
        classNames.push("mega-menu");
    }
    return <div className={classNames.join(" ")}>{props.render()}</div>;
}

MenuDropdown.defaultProps = {
    render: () => { },
};
function MenuItem(props) {
    const { name } = props;
    return (
        <li className="menu-item">
            <Link href="#">
                <span className="menu-link">{name}</span>
            </Link>
            {props.children}
        </li>
    );
}

MenuItem.defaultProps = {
    children: () => { },
};

export function EngagementRingsMenu() {
    return (
        <section className="menu-grid-container">
            <div className="menu-grid-items">
                <div className="menu-grid-item">
                    <div className="grid-item-category">
                        <div className="grid-item-title">
                            <h4>Design Your Own Engagement Ring</h4>
                        </div>
                        <div className="grid-items grid-items-with-icon">
                            <Link href="#">
                                <svg>
                                    <use href={`/assets/icons/icons.svg#black_diamond`} />
                                </svg>{" "}
                                <span>Start with the Setting</span>
                            </Link>
                            <Link href="#">
                                <svg>
                                    <use href={`/assets/icons/icons.svg#black_diamond`} />
                                </svg>{" "}
                                <span>Start with a Natural Diamond</span>
                            </Link>
                            <Link href="#">
                                <svg>
                                    <use href={`/assets/icons/icons.svg#grey_diamond`} />
                                </svg>{" "}
                                <span>Start with a Lab-Grown Diamond</span>
                            </Link>
                            <Link href="#">
                                <svg>
                                    <use href={`/assets/icons/icons.svg#green_diamond`} />
                                </svg>
                                <span>Start with a Gemstone</span>
                            </Link>
                            <Link href="#">Bestsellers</Link>
                            <Link href="#">Bestsellers</Link>
                            <Link href="#">Bestsellers</Link>
                            <Link href="#">Bestsellers</Link>
                        </div>
                        <div className="view-all-action">
                            <Link href="#" className="view-all-link">
                                <span>View All Engagement Rings</span>
                                <span className="material-icons-outlined icons-small">
                                    chevron_right
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="menu-grid-item">
                    <div className="grid-item-category">
                        <div className="grid-item-title">
                            <h4>Shop by Style</h4>
                        </div>
                        <div className="grid-items">
                            <Link href="#">Solitare</Link>
                            <Link href="#">Solitare</Link>
                            <Link href="#">Gemstone Rings</Link>
                            <Link href="#">Solitare</Link>
                            <Link href="#">Solitare</Link>
                            <Link href="#">Solitare</Link>
                            <Link href="#">Solitare</Link>
                            <Link href="#">Solitare</Link>
                        </div>
                        <div className="view-all-action">
                            <Link href="#" className="view-all-link">
                                View All Styles
                            </Link>
                            <span className="material-icons-outlined icons-small">
                                chevron_right
                            </span>
                        </div>
                    </div>
                </div>
                <div className="menu-grid-item">
                    <div className="grid-item-category">
                        <div className="grid-item-title">
                            <h4>Shop by Shape</h4>
                        </div>
                        <div className="grid-items grid-items-with-icon">
                            <Link href="#">
                                <svg>
                                    <use href={`/assets/icons/icons.svg#round_shape`} />
                                </svg>
                                <span>Round</span>
                            </Link>
                            <Link href="#">
                                <svg>
                                    <use href={`/assets/icons/icons.svg#oval_shape`} />
                                </svg>
                                <span>Oval</span>
                            </Link>

                            <Link href="#">
                                <svg>
                                    <use href={`/assets/icons/icons.svg#pear_shape`} />
                                </svg>
                                <span>Emerald</span>
                            </Link>
                            <Link href="#">
                                <svg>
                                    <use href={`/assets/icons/icons.svg#emerald_shape`} />
                                </svg>
                                <span>Pear</span>
                            </Link>
                            <Link href="#">
                                <svg>
                                    <use href={`/assets/icons/icons.svg#cushion_shape`} />
                                </svg>{" "}
                                <span>Cushion</span>
                            </Link>
                            <Link href="#">
                                <svg>
                                    <use href={`/assets/icons/icons.svg#marquise_shape`} />
                                </svg>{" "}
                                <span>Marquise</span>
                            </Link>
                        </div>
                        <div className="view-all-action">
                            <Link href="#" className="view-all-link">
                                View All Shapes
                            </Link>
                            <span className="material-icons-outlined icons-small">
                                chevron_right
                            </span>
                        </div>
                    </div>
                </div>
                <div className="menu-grid-item">
                    <div className="grid-item-category">
                        <div className="grid-item-title">
                            <h4>Shop by Metal</h4>
                        </div>
                        <div className="grid-items">
                            <Link href="#">White Gold</Link>
                            <Link href="#">White Gold</Link>
                            <Link href="#">White Gold</Link>
                            <Link href="#">White Gold</Link>
                            <Link href="#">Yellow Gold</Link>
                        </div>
                        <div className="view-all-action">
                            <Link href="#" className="view-all-link">
                                View All Metals
                            </Link>
                            <span className="material-icons-outlined icons-small">
                                chevron_right
                            </span>
                        </div>
                    </div>
                </div>
                <div className="menu-grid-item">
                    <div className="grid-item-category">
                        <div className="view-all-action">
                            <Link href="#" className="view-all-link">
                                Engagement Ring Guides
                            </Link>
                            <span className="material-icons-outlined icons-small">
                                chevron_right
                            </span>
                        </div>
                        <div className="view-all-action">
                            <Link href="#" className="view-all-link">
                                Get expert advice
                            </Link>
                            <span className="material-icons-outlined icons-small">
                                chevron_right
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="menu-grid-banner">
                <div className="grid-banner">
                    <img src="/assets/images/megamenu-banner.png" />
                    <div className="grid-banner-items">
                        <h3>
                            Autumn <i>Sale</i>
                        </h3>
                        <p>10% off everything</p>
                        <Button variant="outlined" sx={{ mt: 2, mb: 2 }} size="large">
                            Shop the Sale
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export const DiamondRingsMenu = () => {
    return (
        <section className="menu-grid-container">
            <div className="menu-grid-items">
                <div className="menu-grid-item">
                    <div className="grid-item-category">
                        <div className="grid-item-title">
                            <h4>Design Your Own Engagement Ring</h4>
                        </div>
                        <div className="grid-items grid-items-with-icon">
                            <Link href="#">
                                <svg>
                                    <use href={`/assets/icons/icons.svg#black_diamond`} />
                                </svg>{" "}
                                <span>Start with the Setting</span>
                            </Link>
                            <Link href="#">
                                <svg>
                                    <use href={`/assets/icons/icons.svg#black_diamond`} />
                                </svg>{" "}
                                <span>Start with a Natural Diamond</span>
                            </Link>
                            <Link href="#">
                                <svg>
                                    <use href={`/assets/icons/icons.svg#grey_diamond`} />
                                </svg>{" "}
                                <span>Start with a Lab-Grown Diamond</span>
                            </Link>
                            <Link href="#">
                                <svg>
                                    <use href={`/assets/icons/icons.svg#green_diamond`} />
                                </svg>
                                <span>Start with a Gemstone</span>
                            </Link>
                            <Link href="#">Bestsellers</Link>
                            <Link href="#">Bestsellers</Link>
                            <Link href="#">Bestsellers</Link>
                            <Link href="#">Bestsellers</Link>
                        </div>
                        <div className="view-all-action">
                            <Link href="#" className="view-all-link">
                                View All Engagement Rings
                            </Link>
                            <span className="material-icons-outlined icons-small">
                                chevron_right
                            </span>
                        </div>
                    </div>
                </div>
                <div className="menu-grid-item">
                    <div className="grid-item-category">
                        <div className="grid-item-title">
                            <h4>Shop by Style</h4>
                        </div>
                        <div className="grid-items">
                            <Link href="#">Solitare</Link>
                            <Link href="#">Solitare</Link>
                            <Link href="#">Gemstone Rings</Link>
                            <Link href="#">Solitare</Link>
                            <Link href="#">Solitare</Link>
                            <Link href="#">Solitare</Link>
                            <Link href="#">Solitare</Link>
                            <Link href="#">Solitare</Link>
                        </div>
                        <div className="view-all-action">
                            <Link href="#" className="view-all-link">
                                View All Styles
                            </Link>
                            <span className="material-icons-outlined icons-small">
                                chevron_right
                            </span>
                        </div>
                    </div>
                </div>
                <div className="menu-grid-item">
                    <div className="grid-item-category">
                        <div className="grid-item-title">
                            <h4>Shop by Shape</h4>
                        </div>
                        <div className="grid-items grid-items-with-icon">
                            <Link href="#">
                                <svg>
                                    <use href={`/assets/icons/icons.svg#round_shape`} />
                                </svg>
                                <span>Round</span>
                            </Link>
                            <Link href="#">
                                <svg>
                                    <use href={`/assets/icons/icons.svg#oval_shape`} />
                                </svg>
                                <span>Oval</span>
                            </Link>

                            <Link href="#">
                                <svg>
                                    <use href={`/assets/icons/icons.svg#pear_shape`} />
                                </svg>
                                <span>Emerald</span>
                            </Link>
                            <Link href="#">
                                <svg>
                                    <use href={`/assets/icons/icons.svg#emerald_shape`} />
                                </svg>
                                <span>Pear</span>
                            </Link>
                            <Link href="#">
                                <svg>
                                    <use href={`/assets/icons/icons.svg#cushion_shape`} />
                                </svg>{" "}
                                <span>Cushion</span>
                            </Link>
                            <Link href="#">
                                <svg>
                                    <use href={`/assets/icons/icons.svg#marquise_shape`} />
                                </svg>{" "}
                                <span>Marquise</span>
                            </Link>
                        </div>
                        <div className="view-all-action">
                            <Link href="#" className="view-all-link">
                                View All Shapes
                            </Link>
                            <span className="material-icons-outlined icons-small">
                                chevron_right
                            </span>
                        </div>
                    </div>
                </div>
                <div className="menu-grid-item">
                    <div className="grid-item-category">
                        <div className="grid-item-title">
                            <h4>Shop by Metal</h4>
                        </div>
                        <div className="grid-items">
                            <Link href="#">White Gold</Link>
                            <Link href="#">White Gold</Link>
                            <Link href="#">White Gold</Link>
                            <Link href="#">White Gold</Link>
                            <Link href="#">Yellow Gold</Link>
                        </div>
                        <div className="view-all-action">
                            <Link href="#" className="view-all-link">
                                View All Metals
                            </Link>
                            <span className="material-icons-outlined icons-small">
                                chevron_right
                            </span>
                        </div>
                    </div>
                </div>
                <div className="menu-grid-item">
                    <div className="grid-item-category">
                        <div className="view-all-action">
                            <Link href="#" className="view-all-link">
                                Engagement Ring Guides
                            </Link>
                            <span className="material-icons-outlined icons-small">
                                chevron_right
                            </span>
                        </div>
                        <div className="view-all-action">
                            <Link href="#" className="view-all-link">
                                Get expert advice
                            </Link>
                            <span className="material-icons-outlined icons-small">
                                chevron_right
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="menu-grid-banner">
                <div className="grid-banner">
                    <img src="/assets/images/megamenu-banner.png" />
                    <div className="grid-banner-items">
                        <h3>
                            Autumn <i>Sale</i>
                        </h3>
                        <p>10% off everything</p>
                        <Button variant="outlined" sx={{ mt: 2, mb: 2 }} size="large">
                            Shop the Sale
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const WeddingRingsMenu = () => {
    return (
        <section className="menu-grid-container wedding-rings-menu-container">
            <div className="menu-grid-items">
                <div className="menu-grid-item">
                    <div className="grid-item-category">
                        <div className="grid-item-category-title">
                            <h3>WOMEN</h3>
                        </div>
                        <div className="grid-item-title">
                            <h4>Shop by Style</h4>
                        </div>
                        <div className="grid-items">
                            <Link href="#">
                                <span>Contemporary</span>
                            </Link>
                            <Link href="#">
                                <span>Contemporary</span>
                            </Link>
                            <Link href="#">
                                <span>Contemporary</span>
                            </Link>
                            <Link href="#">
                                <span>Diamond</span>
                            </Link>
                        </div>
                        <div className="view-all-action">
                            <Link href="#" className="view-all-link">
                                View All Styles
                            </Link>
                            <span className="material-icons-outlined icons-small">
                                chevron_right
                            </span>
                        </div>
                    </div>

                    <div className="grid-item-category">
                        <div className="grid-item-title">
                            <h4>Shop by Metal</h4>
                        </div>
                        <div className="grid-items">
                            <Link href="#">White Gold</Link>
                            <Link href="#">White Gold</Link>
                            <Link href="#">White Gold</Link>
                            <Link href="#">White Gold</Link>
                            <Link href="#">Yellow Gold</Link>
                        </div>
                    </div>
                </div>
                <div className="menu-grid-item">
                    <div className="grid-item-category">
                        <div className="grid-item-category-title">
                            <h3>MEN</h3>
                        </div>
                        <div className="grid-item-title">
                            <h4>Shop by Style</h4>
                        </div>
                        <div className="grid-items">
                            <Link href="#">
                                <span>Contemporary</span>
                            </Link>
                            <Link href="#">
                                <span>Contemporary</span>
                            </Link>
                            <Link href="#">
                                <span>Contemporary</span>
                            </Link>
                            <Link href="#">
                                <span>Diamond</span>
                            </Link>
                        </div>
                        <div className="view-all-action">
                            <Link href="#" className="view-all-link">
                                View All Styles
                            </Link>
                            <span className="material-icons-outlined icons-small">
                                chevron_right
                            </span>
                        </div>
                    </div>

                    <div className="grid-item-category">
                        <div className="grid-item-title">
                            <h4>Shop by Metal</h4>
                        </div>
                        <div className="grid-items">
                            <Link href="#">White Gold</Link>
                            <Link href="#">White Gold</Link>
                            <Link href="#">White Gold</Link>
                            <Link href="#">White Gold</Link>
                            <Link href="#">Yellow Gold</Link>
                        </div>
                    </div>
                </div>
                <div className="menu-grid-item">
                    <div className="grid-item-category">
                        <div className="grid-item-title">
                            <h4>Explore</h4>
                        </div>
                        <div className="grid-items">
                            <Link href="#">
                                <span>Ready to Deliver</span>
                            </Link>
                            <Link href="#">
                                <span>New Arrivals</span>
                            </Link>
                            <Link href="#">
                                <span>New Arrivals</span>
                            </Link>
                            <Link href="#">
                                <span>New Arrivals</span>
                            </Link>
                            <Link href="#">
                                <span>New Arrivals</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="menu-grid-item">
                    <div className="grid-item-category">
                        <div className="view-all-action">
                            <Link href="#" className="view-all-link">
                                How to choose the perfect Wedding Ring
                            </Link>
                            <span className="material-icons-outlined icons-small">
                                chevron_right
                            </span>
                        </div>
                        <div className="view-all-action">
                            <Link href="#" className="view-all-link">
                                Get expert advice
                            </Link>
                            <span className="material-icons-outlined icons-small">
                                chevron_right
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="menu-grid-banner">
                <div className="grid-banner">
                    <img src="/assets/images/megamenu-banner.png" />
                    <div className="grid-banner-items">
                        <h3>
                            Autumn <i>Sale</i>
                        </h3>
                        <p>10% off everything</p>
                        <Button variant="outlined" sx={{ mt: 2, mb: 2 }} size="large">
                            Shop the Sale
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const JewelleryMenu = () => {
    return (
        <section className="menu-grid-container jewellery-menu-container">
            <div className="menu-grid-items">
                <div className="menu-grid-item">
                    <div className="grid-item-category">
                        <div className="grid-item-category-title">
                            <h3>EARRINGS</h3>
                        </div>
                        <div className="grid-item-title">
                            <h4>Create Your Own</h4>
                        </div>
                        <div className="grid-items">
                            <Link href="#">
                                <span>Gemstone Earrings</span>
                            </Link>
                            <Link href="#">
                                <span>Gemstone Earrings</span>
                            </Link>
                            <Link href="#">
                                <span>Gemstone Earrings</span>
                            </Link>
                            <Link href="#">
                                <span>Drop</span>
                            </Link>
                        </div>
                        <div className="view-all-action">
                            <Link href="#" className="view-all-link">
                                View All Earrings
                            </Link>
                            <span className="material-icons-outlined icons-small">
                                chevron_right
                            </span>
                        </div>
                    </div>
                </div>
                <div className="menu-grid-item">
                    <div className="grid-item-category">
                        <div className="grid-item-category-title">
                            <h3>Necklaces</h3>
                        </div>
                        <div className="grid-item-title">
                            <h4>Create Your Own</h4>
                        </div>
                        <div className="grid-items">
                            <Link href="#">
                                <span>Gemstone Pendants</span>
                            </Link>
                            <Link href="#">
                                <span>Gemstone Pendants</span>
                            </Link>
                            <Link href="#">
                                <span>Gemstone Pendants</span>
                            </Link>
                            <Link href="#">
                                <span>Solitaire</span>
                            </Link>
                        </div>
                        <div className="view-all-action">
                            <Link href="#" className="view-all-link">
                                View All Necklaces
                            </Link>
                            <span className="material-icons-outlined icons-small">
                                chevron_right
                            </span>
                        </div>
                    </div>
                </div>
                <div className="menu-grid-item">
                    <div className="grid-item-category">
                        <div className="grid-item-category-title">
                            <h3>Bracelets</h3>
                        </div>
                        <div className="grid-items">
                            <Link href="#">
                                <span>Tennis</span>
                            </Link>
                            <Link href="#">
                                <span>Tennis</span>
                            </Link>
                            <Link href="#">
                                <span>Bangle</span>
                            </Link>
                        </div>
                        <div className="view-all-action">
                            <Link href="#" className="view-all-link">
                                View All Bracelets
                            </Link>
                            <span className="material-icons-outlined icons-small">
                                chevron_right
                            </span>
                        </div>
                    </div>
                </div>
                <div className="menu-grid-item">
                    <div className="grid-item-category">
                        <div className="grid-item-title">
                            <h4>Explore</h4>
                        </div>
                        <div className="grid-items">
                            <Link href="#">
                                <span>Ready to Deliver</span>
                            </Link>
                            <Link href="#">
                                <span>New Arrivals</span>
                            </Link>
                            <Link href="#">
                                <span>New Arrivals</span>
                            </Link>
                            <Link href="#">
                                <span>New Arrivals</span>
                            </Link>
                        </div>
                    </div>

                    <div className="grid-item-category">
                        <div className="grid-item-title">
                            <h4>Shop by Price</h4>
                        </div>
                        <div className="grid-items">
                            <Link href="#">
                                <span>£1,000 - £2,500</span>
                            </Link>
                            <Link href="#">
                                <span>Under £500</span>
                            </Link>
                            <Link href="#">
                                <span>Under £500</span>
                            </Link>
                            <Link href="#">
                                <span>Under £500</span>
                            </Link>
                        </div>
                        <div className="view-all-action">
                            <Link href="#" className="view-all-link">
                                Get expert advice
                            </Link>
                            <span className="material-icons-outlined icons-small">
                                chevron_right
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="menu-grid-banner">
                <div className="grid-banner">
                    <img src="/assets/images/megamenu-banner.png" />
                    <div className="grid-banner-items">
                        <h3>
                            Autumn <i>Sale</i>
                        </h3>
                        <p>10% off everything</p>
                        <Button variant="outlined" sx={{ mt: 2, mb: 2 }} size="large">
                            Shop the Sale
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const GiftingMenu = () => {
    return (
        <section className="menu-grid-container gifting-menu-container">
            <div className="menu-grid-items">
                <div className="menu-grid-item">
                    <div className="grid-item-category">
                        <div className="grid-item-title">
                            <h4>Most Gifted</h4>
                        </div>
                        <div className="grid-items">
                            <Link href="#">
                                <span>Earrings</span>
                            </Link>
                            <Link href="#">
                                <span>Earrings</span>
                            </Link>
                            <Link href="#">
                                <span>Earrings</span>
                            </Link>
                            <Link href="#">
                                <span>Rings</span>
                            </Link>
                        </div>
                    </div>
                    <div className="grid-item-category">
                        <div className="grid-item-title">
                            <h4>Shop For</h4>
                        </div>
                        <div className="grid-items">
                            <Link href="#">
                                <span>For Girlfriend</span>
                            </Link>
                            <Link href="#">
                                <span>For Girlfriend</span>
                            </Link>
                            <Link href="#">
                                <span>For Girlfriend</span>
                            </Link>
                            <Link href="#">
                                <span>For Girlfriend</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="menu-grid-item">
                    <div className="grid-item-category">
                        <div className="grid-item-title">
                            <h4>Shop by Occasion</h4>
                        </div>
                        <div className="grid-items">
                            <Link href="#">
                                <span>Anniversary</span>
                            </Link>
                            <Link href="#">
                                <span>Anniversary</span>
                            </Link>
                            <Link href="#">
                                <span>Anniversary</span>
                            </Link>
                            <Link href="#">
                                <span>Birthday</span>
                            </Link>
                        </div>
                    </div>
                    <div className="grid-item-category">
                        <div className="grid-item-title">
                            <h4>Shop by Price</h4>
                        </div>
                        <div className="grid-items">
                            <Link href="#">
                                <span>£1,000 - £2,500</span>
                            </Link>
                            <Link href="#">
                                <span>£1,000 - £2,500</span>
                            </Link>
                            <Link href="#">
                                <span>Under £500</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="menu-grid-item">
                    <div className="grid-item-category">
                        <div className="grid-item-category-title">
                            <h3>Birthstones</h3>
                        </div>
                        <div className="grid-items">
                            <Link href="#">
                                <span>Earrings</span>
                            </Link>
                            <Link href="#">
                                <span>Earrings</span>
                            </Link>
                            <Link href="#">
                                <span>Necklaces</span>
                            </Link>
                        </div>
                        <div className="view-all-action">
                            <Link href="#" className="view-all-link">
                                View All
                            </Link>
                            <span className="material-icons-outlined icons-small">
                                chevron_right
                            </span>
                        </div>
                    </div>
                </div>
                <div className="menu-grid-item">
                    <div className="grid-item-category">
                        <div className="grid-item-title">
                            <h4>Explore</h4>
                        </div>
                        <div className="grid-items">
                            <Link href="#">
                                <span>Ready to Deliver</span>
                            </Link>
                            <Link href="#">
                                <span>New Arrivals</span>
                            </Link>
                            <Link href="#">
                                <span>New Arrivals</span>
                            </Link>
                            <Link href="#">
                                <span>New Arrivals</span>
                            </Link>
                        </div>
                        <div className="view-all-action">
                            <Link href="#" className="view-all-link">
                                Our Gift Guide
                            </Link>
                            <span className="material-icons-outlined icons-small">
                                chevron_right
                            </span>
                        </div>
                        <div className="view-all-action">
                            <Link href="#" className="view-all-link">
                                Get expert advice
                            </Link>
                            <span className="material-icons-outlined icons-small">
                                chevron_right
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="menu-grid-banner">
                <div className="grid-banner">
                    <img src="/assets/images/megamenu-banner.png" />
                    <div className="grid-banner-items">
                        <h3>
                            Autumn <i>Sale</i>
                        </h3>
                        <p>10% off everything</p>
                        <Button variant="outlined" sx={{ mt: 2, mb: 2 }} size="large">
                            Shop the Sale
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const EducationMenu = () => {
    return (
        <section className="menu-grid-container education-menu-container">
            <div className="menu-grid-items">
                <div className="menu-grid-item">
                    <div className="grid-item-category">
                        <div className="grid-item-title">
                            <h4>Guides</h4>
                        </div>
                        <div className="grid-items">
                            <Link href="#">
                                <span>Ring Size Guide</span>
                            </Link>
                            <Link href="#">
                                <span>Ring Size Guide</span>
                            </Link>
                            <Link href="#">
                                <span>Ring Size Guide</span>
                            </Link>
                            <Link href="#">
                                <span>Hallmarks</span>
                            </Link>
                            <Link href="#">
                                <span>Hallmarks</span>
                            </Link>
                        </div>
                        <div className="view-all-action">
                            <Link href="#" className="view-all-link">
                                Find my Ring Size
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="menu-grid-item">
                    <div className="grid-item-category">
                        <div className="grid-item-title">
                            <h4>Latest Stories</h4>
                        </div>
                        <div className="grid-items">
                            <Link href="#">
                                <span>
                                    What is better for an engagement ring — white gold or silver?
                                </span>
                            </Link>
                            <Link href="#">
                                <span>
                                    What is better for an engagement ring — white gold or silver?
                                </span>
                            </Link>
                            <Link href="#">
                                <span>
                                    What is better for an engagement ring — white gold or silver?
                                </span>
                            </Link>
                            <Link href="#">
                                <span>Best places to propose in London</span>
                            </Link>
                        </div>
                        <div className="view-all-action">
                            <Link href="#" className="view-all-link">
                                View All
                            </Link>
                            <span className="material-icons-outlined icons-small">
                                chevron_right
                            </span>
                        </div>
                    </div>
                </div>
                <div className="menu-grid-item">
                    <div className="grid-item-category">
                        <div className="grid-item-title">
                            <h4>About Us</h4>
                        </div>
                        <div className="grid-items">
                            <Link href="#">
                                <span>Our Story</span>
                            </Link>
                            <Link href="#">
                                <span>Our Story</span>
                            </Link>
                            <Link href="#">
                                <span>Customer Reviews</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="menu-grid-item">
                    <div className="grid-item-category">
                        <div className="grid-item-title">
                            <h4>Contact Us</h4>
                        </div>
                        <div className="grid-items">
                            <Link href="#">
                                <span>020 7660 1529</span>
                            </Link>
                            <Link href="#">
                                <span>service@austenblake.com</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export const VisitStoreMenu = () => {
    return (
        <section className="menu-grid-container visit-store-menu-container">
            <div className="menu-grid-items">
                <div className="menu-grid-item">
                    <div className="grid-item-category">
                        <div className="grid-item-title">
                            <h4>Visit Us</h4>
                        </div>
                        <div className="grid-items">
                            <Link href="#">
                                <span>Glasgow</span>
                            </Link>
                            <Link href="#">
                                <span>Glasgow</span>
                            </Link>
                            <Link href="#">
                                <span>Glasgow</span>
                            </Link>
                            <Link href="#">
                                <span>Glasgow</span>
                            </Link>
                            <Link href="#">
                                <span>Newcastle</span>
                            </Link>
                        </div>

                    </div>
                </div>
                <div className="menu-grid-item">
                    <div className="grid-item-category">

                        <div className="grid-items">
                            <Link href="#">
                                <span>Glasgow</span>
                            </Link>
                            <Link href="#">
                                <span>Glasgow</span>
                            </Link>
                            <Link href="#">
                                <span>Glasgow</span>
                            </Link>
                            <Link href="#">
                                <span>Glasgow</span>
                            </Link>
                            <Link href="#">
                                <span>Newcastle</span>
                            </Link>
                        </div>

                    </div>
                </div>
                <div className="menu-grid-item">
                    <div className="grid-item-category">
                        <div className="grid-items">
                            <Link href="#">
                                <span>Glasgow</span>
                            </Link>
                            <Link href="#">
                                <span>Glasgow</span>
                            </Link>
                            <Link href="#">
                                <span>Glasgow</span>
                            </Link>
                            <Link href="#">
                                <span>Glasgow</span>
                            </Link>
                            <Link href="#">
                                <span>Newcastle</span>
                            </Link>
                        </div>

                    </div>
                </div>
                <div className="menu-grid-item">
                    <div className="grid-item-category">
                        <div className="grid-item-title">
                            <h4>Contact Us</h4>
                        </div>
                        <div className="grid-items">
                            <Link href="#">
                                <span>020 7660 1529</span>
                            </Link>
                            <Link href="#">
                                <span>service@austenblake.com</span>
                            </Link>
                        </div>
                        <div className="view-all-action">
                            <span className="material-icons-outlined icons-small">
                                calendar_month
                            </span>
                            <Link href="#book-appointment" className="view-all-link">
                                Book an appointment
                            </Link>
                        </div>
                        <div className="view-all-action">
                            <span className="material-icons-outlined icons-small">call</span>
                            <Link href="#virtual-appointment" className="view-all-link">
                                Video appointment
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="menu-grid-banner">
                <div className="grid-banner">
                    <img src="/assets/images/visit-our-store-dbanner.png" />
                </div>
            </div>
        </section>
    );
};

export const ABDesktopMenuStatic = () => {
    return (
        <Menu>
            <MenuDropdown
                name="Engagement Rings"
                megaMenu
                render={() => <EngagementRingsMenu />}
            />
            <MenuDropdown
                name="Diamond Rings"
                megaMenu
                render={() => <DiamondRingsMenu />}
            />
            <MenuDropdown
                name="Wedding Rings"
                megaMenu
                render={() => <WeddingRingsMenu />}
            />
            <MenuDropdown
                name="Jewellery"
                megaMenu
                render={() => <JewelleryMenu />}
            />
            <MenuDropdown name="Gifts" megaMenu render={() => <GiftingMenu />} />
            <MenuDropdown
                name="Education"
                megaMenu
                render={() => <EducationMenu />}
            />
            <MenuDropdown
                name="Visit Our Store"
                megaMenu
                render={() => <VisitStoreMenu />}
            />
        </Menu>
    );
};

