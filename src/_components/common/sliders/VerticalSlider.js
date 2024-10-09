import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Mousewheel } from "swiper";
import "swiper/css";
import { useState } from "react";
import Head from "next/head";
import { Box } from "@mui/material";

const slides = [
	"https://picsum.photos/1920/1080",
	"https://picsum.photos/1920/1081",
	"https://picsum.photos/1920/1082",
	"https://picsum.photos/1920/1083",
	"https://picsum.photos/1920/1084",
	"https://www.diamondsfactory.com/video/engagement-rings/clrn349_02/rnd_0.20_ww.mp4",
];

const VerticalSlider = () => {
	const [imagesNavSlider, setImagesNavSlider] = useState(null);
	return (
		<>
			<Head>
				<link rel="stylesheet" href="/assets/css/vertical-slider.css" />
			</Head>
			<div className="product-slider">
				<section className="slider">
					<div className="slider__flex">
						<div className="slider__col">

							<Box className="slider__prev" textAlign={"center"}>
								<span className="material-icons-outlined icons-small">
									keyboard_arrow_up
								</span>
							</Box>

							<div className="slider__thumbs">
								<Swiper
									onSwiper={setImagesNavSlider}
									direction="vertical"
									spaceBetween={24}
									slidesPerView={3}
									navigation={{
										nextEl: ".slider__next",
										prevEl: ".slider__prev"
									}}
									className="swiper-container1"
									breakpoints={{
										0: {
											direction: "horizontal"
										},
										768: {
											direction: "vertical"
										}
									}}
									modules={[Navigation, Thumbs]}
								>
									{slides.map((slide, index) => {
										return (
											<SwiperSlide key={slide?.title?.replace(/-/g, ' ') + index}>
												<div className="slider__image">
													{slide.endsWith(".mp4") ? (
														<video
															width="70"
															height="70"
															autoPlay
															loop
															controls
															muted
															playsInline
															src={slide}
														>
															<source src={slide} type="video/mp4" />
														</video>
													) : (
														<img src={slide} alt="" />
													)}
												</div>
											</SwiperSlide>
										);
									})}
								</Swiper>
							</div>

							<Box className="slider__next" textAlign={"center"}>
								<span className="material-icons-outlined icons-small">
									keyboard_arrow_down
								</span>
							</Box>
						</div>

						<div className="slider__images">
							<Swiper
								thumbs={{ swiper: imagesNavSlider }}
								direction="horizontal"
								slidesPerView={1}
								spaceBetween={32}
								mousewheel={true}
								navigation={{
									nextEl: ".slider__next",
									prevEl: ".slider__prev"
								}}
								breakpoints={{
									0: {
										direction: "horizontal"
									},
									768: {
										direction: "horizontal"
									}
								}}
								className="swiper-container2"
								modules={[Navigation, Thumbs, Mousewheel]}
							>
								{slides.map((slide, index) => {
									return (
										<SwiperSlide key={index}>
											<div className="slider__image">
												{slide.endsWith(".mp4") ? (
													<video
														width="430"
														height="430"
														autoPlay
														loop
														controls
														muted
														playsInline
														src={slide}
													>
														<source src={slide} type="video/mp4" />
													</video>
												) : (
													<img src={slide} alt="" />
												)}
											</div>
										</SwiperSlide>
									);
								})}
							</Swiper>
						</div>
					</div>
				</section>
			</div>
		</>

	);
}
export default VerticalSlider