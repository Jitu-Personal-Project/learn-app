import React, { useState, useRef, useEffect } from "react";
import "./DraggableEle.css";

interface Position {
  x: number;
  y: number;
}

interface DraggableEleProps {
  showElement: boolean;
  initialPosition?: Position;
  children: React.ReactNode;
  howToDrag?: "horizontal" | "vertical" | "all"; // New optional prop
  returnOriginal?: boolean; // New optional prop
}

const DraggableEle: React.FC<DraggableEleProps> = ({
  showElement,
  initialPosition,
  children,
  howToDrag = "all", // Default to "all" if not provided
  returnOriginal = false, // Default to false if not provided
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });
  const draggableRef = useRef<HTMLDivElement>(null);
  const getCenterPosition = (): Position => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const elementWidth = 200; // Adjust based on your element size
    const elementHeight = 200; // Adjust based on your element size

    return {
      x: (windowWidth - elementWidth) / 2,
      y: (windowHeight - elementHeight) / 4,
    };
  };
  const [position, setPosition] = useState<Position>(
    initialPosition || getCenterPosition()
  );
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (draggableRef.current) {
      const rect = draggableRef.current.getBoundingClientRect();
      setOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      setPosition((prevPosition) => {
        const newPosition = { ...prevPosition };

        if (howToDrag === "horizontal" || howToDrag === "all") {
          newPosition.x = e.clientX - offset.x;
        }
        if (howToDrag === "vertical" || howToDrag === "all") {
          newPosition.y = e.clientY - offset.y;
        }

        return newPosition;
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (returnOriginal) {
      setPosition(initialPosition || getCenterPosition()); // Reset to initial or default position
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, offset]);

  return (
    <>
      {showElement ? (
        <div
          ref={draggableRef}
          className={`draggable-ele ${
            isDragging ? "dragging-start" : "dragging-end"
          }`}
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
          onMouseDown={handleMouseDown}
        >
          {children}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default DraggableEle;
