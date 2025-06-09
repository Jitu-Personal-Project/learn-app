import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./ImageGallery.css";

// /Users/jitendrajahagirdar/Desktop/DSA-APP/dsa-react19/src/UI/ImageGallery/ImageGallery.tsx

interface Image {
  id: number;
  url: string;
}

interface ImageGalleryProps {
  images: Image[];
  defaultSelected?: number;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  defaultSelected = 0,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(defaultSelected);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="image-gallery">
      <div className="selected-image">
        <img
          src={images[selectedImageIndex].url}
          alt={`Selected ${selectedImageIndex}`}
        />
        <button className="overlay-button prev" onClick={handlePrev}>
          <KeyboardArrowLeftIcon />
        </button>
        <button className="overlay-button next" onClick={handleNext}>
          <ChevronRightIcon />
        </button>
      </div>
      <div className="thumbnail-container">
        {images.map((image, index) => (
          <img
            key={image.id}
            src={image.url}
            alt={`Thumbnail ${index}`}
            className={`thumbnail ${
              index === selectedImageIndex ? "selected" : ""
            }`}
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>
      {/* <div className="controls">
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div> */}
    </div>
  );
};

export default ImageGallery;
