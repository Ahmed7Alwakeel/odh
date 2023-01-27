import React from "react";

export default function AudioComponent({
	audioIsPlaying,
	src,
	activeAudio,
	index,
}) {

	return (
		<>
			{audioIsPlaying && activeAudio == index && (
				<audio controls autoPlay>
					<source
						// src={src}
						src={
							!src?.match(/^http?:\/\//i) && !src?.match(/^https?:\/\//i)
								? "https://" + src
								: src
						}
						type="audio/mpeg"
					/>
				</audio>
			)}
		</>
	);
}
