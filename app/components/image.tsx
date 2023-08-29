/* eslint-disable react/jsx-props-no-spreading */

"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

interface NextImageParams extends Omit<ImageProps, "src" | "width" | "height"> {
	src?: string | string[] | null;
	// alt: string;
	size?: number | "full";
}

export /**
 * Component will render an image
 *
 * @param {NextImageParams} { src, alt, width, height, ...imageParams }
 * @return {*}
 */
const NextImage = ({
	src,
	alt,
	size,
	className,
	...imageParams
}: NextImageParams) => {
	// set initial image state
	const [imageSrc, setImageSrc] = useState<string | string[]>(
		`https://api.dicebear.com/6.x/initials/svg?seed=${alt}&backgroundColor=00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,00897b&backgroundType=gradientLinear`
	);

	// check if image is a url
	useEffect(() => {
		if (src) {
			setImageSrc(src);
		} else {
			setImageSrc(
				`https://api.dicebear.com/7.x/initials/svg?seed=${alt.at(0)}`
			);
		}
	}, [alt, src]);

	if (typeof imageSrc === "string") {
		return (
			<Image
				loader={
					imageSrc?.startsWith("https")
						? ({ src: imageLoaderSrc }) => imageLoaderSrc
						: undefined
				}
				src={imageSrc}
				className={className || "flex-none rounded-lg bg-gray-50"}
				alt={alt || ""}
				width={size === "full" ? undefined : size || 15}
				height={size === "full" ? undefined : size || 15}
				fill={size === "full"}
				{...imageParams}
			/>
		);
	}

	return (
		<div
			className={`w-${size} h-${size} flex-none place-items-center justify-center self-center rounded-lg bg-gray-50 align-middle`.concat(
				className || ""
			)}
		>
			{imageSrc?.map((image) => (
				<Image
					key={image}
					loader={
						image?.startsWith("https")
							? ({ src: imageLoaderSrc }) => imageLoaderSrc
							: undefined
					}
					src={image}
					className={className || "flex-none rounded-lg bg-gray-50"}
					alt={alt || "Image not loaded..."}
					width={size === "full" ? undefined : size || 15}
					height={size === "full" ? undefined : size || 15}
					fill={size === "full"}
					{...imageParams}
				/>
			))}
		</div>
	);
};
