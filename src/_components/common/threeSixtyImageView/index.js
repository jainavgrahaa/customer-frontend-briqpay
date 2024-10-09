/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";

const ThreeSixtyImageView = ({
    images = [],
    alt = "",
    className = "",
    width = "458",
    height = "458"
}) => {
    const [loadedImages, setLoadedImages] = useState([]);
    const [xInitial, setXInitial] = useState(null);
    const [xLast, setXLast] = useState(null);
    const [animation, setAnimation] = useState(null);
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewReady, setIsViewReady] = useState(false);
    const canvasRef = useRef(null);
    const newFrame = useRef(null);

    useEffect(() => {
        initialLoad();

        // return removeEvents;
    }, [images.length]);

    useEffect(() => {
        registerEvent();

        return removeEvents;
    }, [xInitial, xLast, animation, currentImage, isViewReady]);

    useEffect(() => {
        if (loadedImages.length) {
            drawImage(0);
        }
    }, [loadedImages]);

    const registerEvent = () => {
        const canvas = canvasRef.current;
        // Register events to get updated state
        canvas.addEventListener("mousedown", handleMouseDown, false);
        canvas.addEventListener("touchstart", handleTouchStart, false);
        canvas.addEventListener("mousemove", handleMouseMove, false);
        canvas.addEventListener("touchmove", handleTouchMove, false);
        canvas.addEventListener("mouseup", handleMouseUp, false);
        canvas.addEventListener("touchend", handleMouseUp, false);
    }

    const initialLoad = () => {
        // Resize the canvas to fit the container it's inside
        const canvas = canvasRef.current;
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        loadImages().then(() => {
            registerEvent();
            setIsViewReady(true);
            drawImage(0);
        });
    }

    const removeEvents = () => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        // Remove all event listeners when update state
        canvas.removeEventListener("mousedown", handleMouseDown, false);
        canvas.removeEventListener("touchstart", handleTouchStart, false);
        canvas.removeEventListener("mousemove", handleMouseMove, false);
        canvas.removeEventListener("touchmove", handleTouchMove, false);
        canvas.removeEventListener("mouseup", handleMouseUp, false);
        canvas.removeEventListener("touchend", handleMouseUp, false);
    }

    const handleMouseDown = event => {
        setXInitial(event.pageX);
        // setIsStartMove(true);
    };

    const handleTouchStart = event => {
        setXInitial(event.touches[0].pageX);
        // setIsStartMove(true);
    };

    const handleMouseMove = event => {
        if (xInitial !== null) {
            const delta = event.pageX - (!xLast ? xInitial : xLast);
            setXLast(event.pageX);

            let startingFrame = currentImage;
            if (currentImage === loadedImages.length - 1) {
                startingFrame = 0;
            } else if (currentImage === 0) {
                startingFrame = loadedImages.length - 1;
            }

            let moveFrame = startingFrame;
            if (delta > 0) {
                moveFrame = startingFrame + 1;
            } else if (delta < 0) {
                moveFrame = startingFrame - 1;
            }

            newFrame.current = Math.min(
                Math.max(moveFrame, 0),
                loadedImages.length - 1
            );

            if (animation === null) {
                setAnimation(requestAnimationFrame(animationFrame))
            }
        }
    }

    const animationFrame = () => {
        drawImage(newFrame.current);

        setAnimation(requestAnimationFrame(animationFrame));
    };

    const handleTouchMove = event => handleMouseMove(event.touches[0]);

    const loadImages = () => {
        return new Promise(resolve => {
            const loadedImgs = [];
            images.forEach(image => {
                const img = new Image();
                img.src = image;
                img.addEventListener("load", () => {
                    // Add the loaded image to the array to be used later.
                    loadedImgs.push(img);

                    // Resolve the promise, if all the images have been loaded. Otherwise, draw the loading bar to show the progress.
                    if (loadedImgs.length === images.length) {
                        setLoadedImages(loadedImgs);
                        resolve(loadedImgs);
                    } else {
                        drawLoadingBar((loadedImgs.length * 100) / images.length);
                    }
                }, false);
            });
        });
    }

    const drawLoadingBar = (progress) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const barWidth = Math.round(window.innerWidth / 5);
        const barHeight = Math.round(barWidth / 10);
        const barPosX = (canvas.width - barWidth) / 2;
        const barPosY = (canvas.height - barHeight) / 2;

        // Draw the progress bar background.
        context.fillStyle = "#1d1f1e";
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillRect(barPosX, barPosY, barWidth, barHeight);

        // Draw the progress bar fill.
        context.fillStyle = "#ffffff";
        const fillVal = Math.min(Math.max(progress / 100, 0), 1);
        context.fillRect(
            barPosX + 1,
            barPosY + 1,
            fillVal * (barWidth - 2),
            barHeight - 2
        );
    }

    const drawImage = (frame) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        // Clear the canvas before starting to draw
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Get the image element to draw on canvas from the pre-loaded images array.        
        const newImage = loadedImages[frame];
        if (!newImage) {
            return;
        }

        // Resize the image depending on the canvas's size.
        const imageSizeScale = newImage.width / newImage.height;
        let newWidth = canvas.width;
        let newHeight = newWidth / imageSizeScale;

        if (newHeight > canvas.height) {
            newHeight = canvas.height;
            newWidth = newHeight * imageSizeScale;
        }

        // Draw the image on canvas
        context.drawImage(newImage, 0, 0, newWidth, newHeight);
        setCurrentImage(frame);
    }

    const handleMouseUp = () => {
        setXInitial(null);
        setXLast(null)
        animation && cancelAnimationFrame(animation);
        setAnimation(null);
    };

    return (
        <div className={`three-sixty-image-view ${className}`}>
            {
                images[0] && <img src={images[0]} alt={alt} />
            }
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
            />
        </div>
    );
}

export default ThreeSixtyImageView;
