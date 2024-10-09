/* eslint-disable @next/next/no-img-element */
import React from 'react'

const BannerWithSocialIcon = ({ image, heading, subHead, facebook, insta, twitter, share }) => {
    return (
        <section className='BannerWithSocialIcon'>
            <img src={image} alt='Headng-Image' />
            <div className='image-over-content'>
                <h1 className='heading'>{heading}</h1>
                <p className='subHeading'>{subHead}</p>
                <p className='socialIcon'>
                    <img src={share} alt='social-media-icon' />
                    <img src={facebook} alt='social-media-icon' />
                    <img src={insta} alt='social-media-icon' />
                    <img src={twitter} alt='social-media-icon' />
                </p>
            </div>
        </section>
    )
}

export default BannerWithSocialIcon
