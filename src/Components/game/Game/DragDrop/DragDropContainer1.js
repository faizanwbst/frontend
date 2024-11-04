// src/DragDropContainer.js
import React, { useState } from "react";
import "./DragDropContainer.css";

const DragDropContainer1 = () => {
  const [images, setImages] = useState([]);

  const imageSize = 100; // Size of each image (width and height)
  const containerWidth = 800; // Width of the container
  const containerHeight = 500; // Height of the container

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
    // Adjust position if it overflows the container
    if (left < 0) left = 0; // Prevent overflow on the left
    if (top < 0) top = 0; // Prevent overflow on the top
    if (left + imageSize > containerWidth) {
      left = containerWidth - imageSize; // Adjust to fit within the container
    }
    if (top + imageSize > containerHeight) {
      top = containerHeight - imageSize; // Adjust to fit within the container
    }
    return { top, left };
  };

  const findAvailablePosition = (initialTop, initialLeft) => {
    // Check initial position
    if (!isPositionOccupied(initialTop, initialLeft)) {
      return adjustPosition(initialTop, initialLeft);
    }

    // Define offsets for potential placements (in a systematic order)
    const offsets = [
      { top: 0, left: 0 }, // Original position
      { top: 0, left: -imageSize }, // Left
      { top: -imageSize, left: 0 }, // Top
      { top: imageSize, left: 0 }, // Bottom
      { top: 0, left: imageSize }, // Right
      { top: -imageSize, left: -imageSize }, // Top Left
      { top: -imageSize, left: imageSize }, // Top Right
      { top: imageSize, left: -imageSize }, // Bottom Left
      { top: imageSize, left: imageSize }, // Bottom Right
    ];

    // Check adjacent positions for availability
    for (const offset of offsets) {
      const newTop = initialTop + offset.top;
      const newLeft = initialLeft + offset.left;

      if (!isPositionOccupied(newTop, newLeft)) {
        return adjustPosition(newTop, newLeft);
      }
    }

    // If no positions available, return the last checked position
    return adjustPosition(initialTop, initialLeft);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const src = e.dataTransfer.getData("text/plain"); // Get the image source from drag data

    if (src) {
      const element = e.target;
      const { top, left } = element.getBoundingClientRect();
      console.log({ top, left });
      const dropY = e.clientY - top; // Y position relative to the drop zone
      const dropX = e.clientX - left; // X position relative to the drop zone

      const { top: finalTop, left: finalLeft } = findAvailablePosition(
        dropY,
        dropX
      );

      setImages((prevImages) => [
        ...prevImages,
        { src, top: finalTop, left: finalLeft },
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
      style={
        {
          // position: "relative",
          // width: `100%`,
          // height: "calc(100vh - 330px)",
        }
      } // Define the container size
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt={`Dropped Image ${index + 1}`}
          style={{
            position: "absolute",
            top: image.top,
            left: image.left,
            cursor: "move",
            width: `${40}px`,
            height: `${80}px`, // Keep consistent with imageSize
          }}
          draggable={false} // Disable dragging for images inside the container
        />
      ))}
    </div>
  );
};

export default DragDropContainer1;
