import { Button } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";

const ContentSlider = ({ children }) => {
  const contentRef = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const hasOverflow = contentRef.current.scrollWidth > contentRef.current.clientWidth;
        setIsOverflow(hasOverflow);
      }
    };

    // Initial check
    checkOverflow();

    // Use ResizeObserver for better overflow detection
    const resizeObserver = new ResizeObserver(() => {
      checkOverflow();
    });

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        resizeObserver.unobserve(contentRef.current);
      }
    };
  }, []);

  const handleScrollNext = () => {
    if (contentRef.current && !scrolling) {
      const newTranslateX = translateX - 50; // Adjust step for smoothness
      const maxTranslateX = contentRef.current.scrollWidth - contentRef.current.clientWidth;
      if (Math.abs(newTranslateX) <= maxTranslateX) {
        setScrolling(true);
        setTranslateX(newTranslateX);
        setTimeout(() => setScrolling(false), 300); // Duration of the transition
      } else {
        setScrolling(true);
        setTranslateX(-maxTranslateX);
        setTimeout(() => setScrolling(false), 300);
      }
    }
  };

  const handleScrollBack = () => {
    if (contentRef.current && !scrolling) {
      const newTranslateX = translateX + 50; // Adjust step for smoothness
      if (newTranslateX <= 0) {
        setScrolling(true);
        setTranslateX(newTranslateX);
        setTimeout(() => setScrolling(false), 300); // Duration of the transition
      } else {
        setScrolling(true);
        setTranslateX(0);
        setTimeout(() => setScrolling(false), 300);
      }
    }
  };

  return (
    <div className={`${isOverflow ? "overflow" : ""}`}>
      <div
        ref={contentRef}
        style={{
          transform: `translateX(${translateX}px)`,
          transition: 'transform 0.3s ease',
        }}
      >
        {children}
      </div>
      {isOverflow && (
        <>
          <Button
            className="content-slider-buttons prev icon-rounded icon-circle-bg-hover"
            variant="text"
            onClick={handleScrollBack}
          >
            <span className="material-icons-outlined">chevron_left</span>
          </Button>
          <Button
            className="content-slider-buttons next icon-rounded icon-circle-bg-hover"
            variant="text"
            onClick={handleScrollNext}
          >
            <span className="material-icons-outlined">chevron_right</span>
          </Button>
        </>
      )}
    </div>
  );
};

export default ContentSlider;
