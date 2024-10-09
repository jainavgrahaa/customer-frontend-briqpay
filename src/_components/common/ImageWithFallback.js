import React, { useEffect, useState } from "react";
import Image from "next/image";

const ImageWithFallback = ({ src, fallback, width, height, style, alt }) => {
    const [imgSrc, setImgSrc] = useState(src);

    useEffect(() => {
        const img = document.createElement('img');
        img.src = src;
        img.onload = () => setImgSrc(src);
        img.onerror = () => setImgSrc(fallback);
    }, [src, fallback]);

    return (
        <Image
            width={width}
            height={height}
            style={style}
            src={imgSrc}
            alt={alt}
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallback;
            }}
        />
    );
};

export default ImageWithFallback;
