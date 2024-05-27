import React, { useState, useEffect } from "react";
import Image from "next/image";

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to handle previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Auto-rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change the interval time as needed (5000 milliseconds = 5 seconds)
    return () => clearInterval(interval);
  }, [currentIndex, nextSlide]); // Restart the interval whenever currentIndex changes

  return (
    <div
      className="carousel"
      style={{
        display: "flex", // Set display to flex
        overflow: "hidden", // Hide overflow to prevent scrollbars
        position: "relative",
        width: "100vw", // Set full width
        height: "500px", // Set height
      }}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className={index === currentIndex ? "slide active" : "slide"}
          style={{
            flex: "0 0 auto", // Prevent images from shrinking
            width: "100vw", // Set full width for each image
            position: "relative",
            transition: "transform 0.5s ease", // Add transition effect
            transform: `translateX(-${currentIndex * 100}%)`, // Move slide by current index
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            layout="fill" // Fill the parent container
            objectFit="cover" // Maintain aspect ratio and cover whole area
          />
        </div>
      ))}
      <button
        className="prev"
        onClick={prevSlide}
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
        }}
      >
        &#10094;
      </button>
      <button
        className="next"
        onClick={nextSlide}
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
        }}
      >
        &#10095;
      </button>
    </div>
  );
};

export default Slider;
