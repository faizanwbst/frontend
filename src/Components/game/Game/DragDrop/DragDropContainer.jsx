import React, { useState } from "react";
import "./DragDropContainer.css";

const DragDropContainer = () => {
  const [images, setImages] = useState([]);
  //   const computedStyle = window?.getComputedStyle(element);
  // Select the child element
  const childElement = document.querySelector(".drop-zone");
  const imageSize = 90; // Size of each image (width and height)
  const imageWidth = 80;
  //   const containerWidth = childElement?.parentElement?.clientWidth;
  // Width of the container
  const containerWidth = 900;

  const containerHeight = window.innerHeight - 330; // Height of the container

  const isPositionOccupied = (top, left) => {
    return images.some((image) => {
      const isOverlapping =
        left < image.left + imageSize &&
        left + imageSize > image.left &&
        top < image.top + imageSize &&
        top + imageSize > image.top;
      return isOverlapping;
    });
  };

  const adjustPosition = (top, left) => {
    if (left <= 0) left = 90; // Prevent overflow on the left
    if (top < 0) top = 0; // Prevent overflow on the top
    if (left + imageSize > containerWidth) {
      left = containerWidth - imageSize; // Adjust to fit within the container
    }
    if (top + imageSize > containerHeight) {
      top = containerHeight; // Adjust to fit within the container
    }
    return { top, left };
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const src = e.dataTransfer.getData("text/plain"); // Get the image source from drag data

    if (src) {
      let finalTop = (containerHeight - imageSize) / 2; // Center vertically
      let finalLeft;
      let rotation;
      if (images.length === 0) {
        finalLeft = 0; // Position the first image at the left side
        rotation = 90;
      } else {
        // Position subsequent images next to the last one
        const lastImage = images[images.length - 1];
        console.log(lastImage.left);
        if (lastImage.left + imageSize < containerWidth && images.length < 9) {
          rotation = 90;
          const gapFromTop = rotation === 0 ? 50 : 90;

          finalLeft = lastImage.left + gapFromTop; // Stack next to the last one with some spacing
          rotation = 90;
          console.log("first", finalLeft);
        } else {
          // Position below the last image
          rotation = 0;
          const gapFromTop = rotation === 90 ? 50 : 90;
          finalLeft = lastImage.left;
          finalTop = lastImage.top + gapFromTop; // Move down below the last image
          console.log("s", finalTop, rotation);
        }
      }

      console.log({ finalTop, imageSize, finalLeft });
      // Check for position availability
      const { top, left } = adjustPosition(finalTop, finalLeft);
      console.log(top, left);
      setImages((prevImages) => [
        ...prevImages,
        { src, top, left, rotation: rotation },
      ]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="drop-zone"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        position: "relative",
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
      }}
    >
      {images.map((image, index) => {
        return (
          <img
            key={index}
            src={image.src}
            alt={`Dropped Image ${index + 1}`}
            style={{
              position: "absolute",
              top: image.top,
              left: image.left,
              cursor: "move",
              // width: `${40}px`,
              // height: `${80}px`,
              width: `${image.rotation % 90 === 0 ? 50 : 90}px`,
              height: `${image.rotation % 90 === 0 ? 90 : 50}px`,
              transform: `rotate(${image.rotation}deg)`,
              transformOrigin: "top left",
            }}
            draggable={false}
          />
        );
      })}
    </div>
  );
};

export default DragDropContainer;
