/* eslint-disable react/jsx-props-no-spreading */

"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

interface NextImageParams extends Omit<ImageProps, "src" | "alt"> {
    src?: string | null;
    alt?: string | null;
}

export const NextImage = ({ src, alt, width, height, ...imageParams }: NextImageParams) => {
	// set initial image state
	const [imageSrc, setImageSrc] = useState(`https://ui-avatars.com/api/?background=random&name=${alt || "Person"}`);
    
	// check if image is a url
	useEffect(() => {
		if (src) {
			if (src.startsWith("https") && !src.startsWith("https://lh3.googleusercontent.com")) throw Error(`Image src is not a verified domain: ${src}`);
			setImageSrc(src);
		}
	}, [src]);

	return (
		<Image
			loader={src?.startsWith("https") ? ({ src: imageLoaderSrc }) => imageLoaderSrc : undefined}
			src={imageSrc}
			alt={alt || ""}
			width={width || 15}
			height={height || 15}
			{...imageParams}
		/>
	);
};

