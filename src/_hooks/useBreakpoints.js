import { useState, useEffect, useRef } from 'react';

const useBreakPoints = (breakpoints, defaultBreakPoints) => {
  const [swiper, setSwiper] = useState();
  const [breakpointsData, setBreakpoints] = useState(defaultBreakPoints);
  const prevRef = useRef();
  const nextRef = useRef();

  useEffect(() => {
    if (breakpoints) {
      setBreakpoints(breakpoints);
    } else {
      setBreakpoints(defaultBreakPoints);
    }
  }, [breakpoints, defaultBreakPoints]);

  useEffect(() => {
    if (swiper && swiper.params && swiper.params.navigation) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation?.init();
      swiper.navigation?.update();
    }
  }, [swiper]);

  return {
    breakpointsData, setSwiper,prevRef,nextRef
  };
};

export default useBreakPoints;
