import React, { useState } from 'react';

const ImageCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg',
    'https://i.ytimg.com/vi/ocBDgfR9FzQ/maxresdefault.jpg',
    'https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg',
    'https://images.pexels.com/photos/2174656/pexels-photo-2174656.jpeg'
  ];

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel-container" onMouseOver={goToNextImage}>
      <img src={images[currentImageIndex]} alt="Travel destination" />
    </div>
  );
};

export default ImageCarousel;
