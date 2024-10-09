import { useEffect, useState } from "react";

export const deviceTypes = {
    desktop: "desktop",
    tablet: "tablet",
    mobile: "mobile",
}

const useDeviceHelper = (device) => {

    const [width, setWidth] = useState(1024);
    const [deviceType, setDeviceType] = useState(device || deviceTypes.desktop);

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        // Default is desktop
        let dv = deviceTypes.desktop;

        const m = width < 768;
        const t = width >= 768 && width <= 1024;
        let d = width > 1024;

        if (m) {
            dv = deviceTypes.mobile;
        } else if (t) {
            dv = deviceTypes.tablet;
        } else {
            d = true; // Default is desktop
        }

        setDeviceType(dv);
    }, [width]);

    useEffect(() => {
        handleWindowSizeChange();
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);


    return { deviceType };
}

export default useDeviceHelper;
