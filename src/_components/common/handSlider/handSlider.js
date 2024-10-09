import React, { useEffect, useRef, useState } from "react";
import noUiSlider from "nouislider";
import { CARAT_VALUES, BAND_WIDTHS } from "./handSliderHelper";
import Head from "next/head";

const HandSlider = () => {
  const handSliderRef = useRef(null);
  const handCaratSliderRef = useRef(null);
  const handBandSliderRef = useRef(null);

  const [caratValue, setCaratValue] = useState(1);
  const [bandWidth, setBandWidth] = useState("2mm");
  const [handOpacity, setHandOpacity] = useState({ darkBase: 1, darkBase2: 0 });
  
  const [stoneSize, setStoneSize] = useState(
    45
  );
  const [diamondScale, setDiamondScale] = useState(
    0.65
  );
  // const [stoneSize, setStoneSize] = useState(
  //   window?.innerWidth > 1280 ? 57 : 45
  // );
  // const [diamondScale, setDiamondScale] = useState(
  //   window?.innerWidth < 310 ? 0.55 : 0.65
  // );

  useEffect(() => {
    const slider = handSliderRef.current;
    const caratslider = handCaratSliderRef.current;
    const bandslider = handBandSliderRef.current;

    if (slider) {
      const slider_options = {
        start: 0.125,
        orientation: "vertical",
        direction: "rtl",
        range: {
          min: 0,
          "25%": 0.125,
          "50%": 0.5,
          max: 1,
        },
      };
      noUiSlider.create(slider, slider_options);

      slider.noUiSlider.on("update", (values, handle) => {
        const slider_val = parseFloat(values[handle]);
        if (slider_val <= 0.125) {
          setHandOpacity({ darkBase: slider_val * 2, darkBase2: 0 });
        } else if (slider_val > 0.125 && slider_val <= 0.5) {
          setHandOpacity({ darkBase: slider_val * 2, darkBase2: 0 });
        } else {
          setHandOpacity({ darkBase: 1, darkBase2: (slider_val - 0.5) * 2 });
        }
      });
    }

    if (caratslider) {
      const carat_slider_options = {
        start: caratValue,
        step: 0.05,
        tooltips: true,
        range: {
          min: 0.2,
          max: 5.0,
        },
      };
      noUiSlider.create(caratslider, carat_slider_options);

      caratslider.noUiSlider.on("update", (values, handle) => {
        const slider_val = parseFloat(values[handle]);
        setCaratValue(slider_val);
        const valuer_percent = (slider_val - 0.2) / 0.0175;
        const valuer =
          0.2 * valuer_percent + (window?.innerWidth > 1280 ? 57 : 45);
        setStoneSize(valuer);
      });
    }

    if (bandslider) {
      const format = {
        to: (value) => BAND_WIDTHS[Math.round(value)],
        from: (value) => BAND_WIDTHS.indexOf(value),
      };
      const band_slider_options = {
        start: BAND_WIDTHS.indexOf(bandWidth),
        range: {
          min: 0,
          max: BAND_WIDTHS.length - 1,
        },
        step: 1,
        tooltips: true,
        format: format,
      };
      noUiSlider.create(bandslider, band_slider_options);

      bandslider.noUiSlider.on("update", (values, handle) => {
        let slider_val = values[handle];
        if (slider_val === "8.0mm") slider_val = "8mm";
        if (slider_val === "9.0mm") slider_val = "9mm";
        if (slider_val === "10.0mm") slider_val = "10mm";
        setBandWidth(slider_val);
      });
    }

    return () => {
      if (slider) {
        slider.noUiSlider.destroy();
      }
      if (caratslider) {
        caratslider.noUiSlider.destroy();
      }
      if (bandslider) {
        bandslider.noUiSlider.destroy();
      }
    };
  }, [caratValue, bandWidth]);

  const incrementValue = () => {
    const currentScale = diamondScale;
    const currentVal = caratValue;
    if (CARAT_VALUES.includes(currentVal)) {
      const carat_index_pos = CARAT_VALUES.indexOf(currentVal);
      if (carat_index_pos < CARAT_VALUES.length - 1) {
        const updated_val = CARAT_VALUES[carat_index_pos + 1];
        setCaratValue(updated_val);
        setDiamondScale(currentScale + 0.04);
        handCaratSliderRef.current.noUiSlider.set(updated_val);
      }
    }
  };

  const decrementValue = () => {
    const currentScale = diamondScale;
    const currentVal = caratValue;
    if (CARAT_VALUES.includes(currentVal)) {
      const carat_index_pos = CARAT_VALUES.indexOf(currentVal);
      if (carat_index_pos >= 1) {
        const updated_val = CARAT_VALUES[carat_index_pos - 1];
        setCaratValue(updated_val);
        setDiamondScale(currentScale - 0.04);
        handCaratSliderRef.current.noUiSlider.set(updated_val);
      }
    }
  };

  return (
    <>
    <Head>
        <link rel="stylesheet" href="/assets/css/handSliderStyles.css" />
      </Head>
    <div id="hand_slider_cont">
      <div className="hand_view_container">
        <img
          src="/assets/images/hand_view_light.png"
          className="light_base_hand img-responsive lazyload"
          alt="lazyload"
        />
        <img
          src="/assets/images/hand_view_dark.png"
          className="dark_base_hand img-responsive lazyload"
          alt="lazyload"
          style={{ opacity: handOpacity.darkBase }}
        />
        <img
          src="/assets/images/hand_view_dark2.png"
          className="dark_base2_hand img-responsive lazyload"
          alt="lazyload"
          style={{ opacity: handOpacity.darkBase2 }}
        />
        <img
          src="https://www.austenblake.com/catalog/view/theme/anb/image/prod_collection/metal_dia/band_W.png"
          className="hand_ring_overlay lazyload"
          alt="lazyload"
        />
        <img
          alt="RND_W"
          src="https://www.austenblake.com/catalog/view/theme/anb/image/prod_collection/metal_dia/RND_W.png"
          className="ring_diamond_overlay lazyload"
          style={{ width: "auto", transform: `scale(${diamondScale})` }}
        />
        <div
          className="hand_stone_overlay"
          style={{ backgroundSize: `${stoneSize}%` }}
        ></div>
      </div>
      <div className="handslider-cont">
        <div id="handslider" ref={handSliderRef}></div>
      </div>
      <div
        className="handcaratslider-cont"
        data-content={`Carat: ${caratValue}`}
        style={{ display: "none" }}
      >
        <div id="handcaratslider" ref={handCaratSliderRef}></div>
      </div>
      <div className="carat_plus_minus_slider">
        <div className="carat_label_container">
          <span className="carat_label">Carat: </span>
        </div>
        <div className="carat_plus_minus_slider_icon_container">
          <div className="carat_button_minus" onClick={decrementValue}>
            -
          </div>
          <div className="carat_min_max_value">{caratValue.toFixed(2)}</div>
          <div className="carat_button_plus" onClick={incrementValue}>
            +
          </div>
        </div>
        <input
          type="hidden"
          className="carat_scale_default"
          value={diamondScale}
        />
      </div>
    </div>
    </>
  );
};

export default HandSlider;
