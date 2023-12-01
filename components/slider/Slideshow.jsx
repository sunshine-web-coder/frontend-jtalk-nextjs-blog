import React, { useState } from 'react';

const slides = [
  'Slide 1',
  'Slide 2',
  'Slide 3',
  'Slide 4',
  'Slide 5',
  'Slide 6',
  // Add more slides as needed
];

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesToShow = 3; // Customize the number of slides to show at a time

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="flex justify-center items-center h-80">
      <div className="w-full max-w-screen-lg flex space-x-2 relative">
        <div
          className="w-full overflow-hidden flex transition-transform transform"
          style={{
            transform: `translateX(-${(currentSlide * (100 / slidesToShow))}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full border p-4">
              <div className="">
                <h2>{slide}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-l"
        onClick={prevSlide}
      >
        Previous
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-r"
        onClick={nextSlide}
      >
        Next
      </button>
    </div>
  );
};

export default Slideshow;
