import React, { Fragment, useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import environment from '@/_utils/environment';

const TrustPilotBox = ({
    businessUnitId,
    templateId,
    width = "100%",
    height = "50px",
    className = "",
    url = environment.trustpilot.url,
    theme="light"
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if(!isLoaded) {
            return;
        }

        if (window.Trustpilot && ref.current) {
            window.Trustpilot.loadFromElement(ref.current, true);
        } else {
            console.error("> Trustpilot not bind");
        }
    }, [isLoaded]);


    if ((!businessUnitId && !templateId) || !isLoaded) {
        return <Fragment />;
    }

    // Render after load at client side to prevent hydration error due to trustpilot
    return (
        <div
            ref={ref}
            className={`trustpilot-widget ${className}`}
            data-locale="en-GB"
            data-template-id={templateId}
            data-businessunit-id={businessUnitId}
            data-style-height={height} data-style-width={width}
            data-theme={theme}
            data-stars="4,5"
        >
            <div href={url} target="_blank" rel="noopener">
                <FormattedMessage id="common.trustpilot" />
            </div>
        </div>
    );
};

export default TrustPilotBox;
