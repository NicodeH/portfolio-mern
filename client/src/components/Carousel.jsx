// Import left and right arrow icons from lucide-react
import { ChevronLeft, ChevronRight } from "lucide-react";
// Import the useState hook from React to manage component state
import { useState } from "react";

// This is the Carousel component
// It receives its child elements (images) as a prop and displays them one at a time with navigation controls
export default function Carousel({ children: images }) {
	// currentIndex keeps track of which image is currently shown
	const [currentIndex, setCurrentIndex] = useState(0);

	// Move to the previous image
	// If we're at the first image, loop to the last one
	const prev = () =>
		setCurrentIndex((current) => (current === 0 ? images.length - 1 : current - 1));

	// Move to the next image
	// If we're at the last image, loop back to the first one
	const next = () =>
		setCurrentIndex((current) => (current === images.length - 1 ? 0 : current + 1));

	return (
		// Outer container for the carousel
		// 'relative' allows absolutely positioned children like arrows and dots
		<div className="relative w-full h-48 overflow-hidden rounded-t-xl">
			{/* Wrapper for all images */}
			{/* 'flex' puts images side by side in a row */}
			{/* 'transform: translateX(...)' shifts the visible image into view */}
			<div
				className="flex transition-transform ease-out duration-500 w-full h-full"
				style={{ transform: `translateX(-${currentIndex * 100}%)` }}
			>
				{/* Loop over all images and render them */}
				{images.map((img, i) => (
					// Each image takes full width of the carousel
					<div key={i} className="w-full flex-shrink-0 h-full">
						{img}
					</div>
				))}
			</div>

			{/* === Navigation Arrows === */}
			{/* These buttons sit on top of the carousel, one on the left and one on the right */}
			<div className="absolute inset-0 flex items-center justify-between p-4">
				{/* Previous button */}
				<button
					onClick={prev}
					className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white transition-colors duration-200 z-10"
				>
					<ChevronLeft size={40} />
				</button>

				{/* Next button */}
				<button
					onClick={next}
					className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white transition-colors duration-200 z-10"
				>
					<ChevronRight size={40} />
				</button>
			</div>

			{/* === Pagination Dots === */}
			{/* Small dots at the bottom to show current slide position */}
			<div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
				{images.map((_, i) => (
					<div
						key={i}
						className={`
							transition-all w-2 h-2 rounded-full 
							${currentIndex === i ? "bg-white scale-110" : "bg-white/50"}
						`}
					></div>
				))}
			</div>
		</div>
	);
}
