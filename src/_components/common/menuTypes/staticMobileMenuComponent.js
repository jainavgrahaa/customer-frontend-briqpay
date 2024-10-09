/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'

const StaticMobileMenuComponent = () => {
	return (
		<div className='mobile-menu-actions'>
			<div className='account-actions'>
                <Link href="#">
                    <img src={'/assets/icons/raw-svgs/search.svg'}/>
                    <span>Search</span>
                </Link>
                <Link href="#">
                    <img src={'/assets/icons/raw-svgs/heart.svg'}/>
                    <span>Wishlist</span>
                </Link>
                <Link href="#">
                    <img src={'/assets/icons/raw-svgs/account.svg'}/>
                    <span>Account</span>
                </Link>
            </div>
            <div className='contact-actions'>
                <Link href="tel:+02071383672">
                    <img src={'/assets/icons/raw-svgs/telephone-icon.svg'}/>
                    <span>020 7138 3672</span>
                </Link>
                <Link href="#">
                    <img src={'/assets/icons/raw-svgs/location-icon.svg'}/>
                    <span>Our Stores</span>
                </Link>
                <Link href="#select-appointment">
                    <img src={'/assets/icons/raw-svgs/calendar.svg'}/>
                    <span>Book an Appointment</span>
                </Link>
            </div>
		</div>
	)
}

export default StaticMobileMenuComponent
