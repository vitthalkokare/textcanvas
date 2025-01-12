import React, { useState } from "react";
import { Shape as ShapeInterface } from "./types";

type ShapeProps = {
  shape: ShapeInterface;
  setShapes: (shapes: ShapeInterface[]) => void;
  onConnect: (id: number) => void;
  onRemove: (id: number) => void;
  isSelected: boolean;
};

const Shape: React.FC<ShapeProps> = ({
  shape,
  setShapes,
  onConnect,
  onRemove,
  isSelected,
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [startSize, setStartSize] = useState({
    width: shape.width,
    height: shape.height,
  });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setStartPosition({ x: e.clientX, y: e.clientY });
    setStartSize({ width: shape.width, height: shape.height });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isResizing) {
      const newWidth = startSize.width + (e.clientX - startPosition.x);
      const newHeight = startSize.height + (e.clientY - startPosition.y);
      setShapes((prevShapes) =>
        prevShapes.map((s) =>
          s.id === shape.id ? { ...s, width: newWidth, height: newHeight } : s
        )
      );
      setStartPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  const handleDoubleClick = () => {
    setIsResizing(true);
  };

  return (
    <div
      style={{
        color:"white",
        position: "absolute",
        left: shape.x,
        top: shape.y,
        width: shape.width,
        height: shape.height,
        backgroundColor: "transparent",
        cursor: "pointer",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDoubleClick={handleDoubleClick}
    >
      {shape.type === "rectangle" && (
        <div
          style={{ width: "100%", height: "100%", border: "2px solid black" }}
        />
      )}
      {shape.type === "circle" && (
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "2px solid black",
          }}
        />
      )}
      {shape.type === "curve" && (
        <svg style={{ width: "100%", height: "100%" }}>
          <path
            d={`M0,${shape.height} Q${shape.width / 2},0 ${shape.width},${
              shape.height
            }`}
            stroke="gray"
            strokeWidth="2"
            fill="transparent"
          />
        </svg>
      )}
      {shape.type === "cubic-curve" && (
        <svg style={{ width: "100%", height: "100%" }}>
          <path
            d={`M0,${shape.height} C${shape.width / 4},0 ${
              (3 * shape.width) / 4
            },0 ${shape.width},${shape.height}`}
            stroke="gray"
            strokeWidth="2"
            fill="transparent"
          />
        </svg>
      )}
      {isHovered && (
        <div
          style={{
            
            position: "absolute",
            top: -20,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "5px",
          }}
        >
          <button onClick={() => onConnect(shape.id)}>Connect</button>
          <button onClick={() => onRemove(shape.id)}>Remove</button>
        </div>
      )}
      {isResizing && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "10px",
            height: "10px",
            backgroundColor: "blue",
            cursor: "se-resize",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      )}
    </div>
  );
};

export default Shape;
