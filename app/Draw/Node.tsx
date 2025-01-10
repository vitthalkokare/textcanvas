import React, { useState } from 'react';
import { Node as NodeType } from './types';

type NodeProps = {
  node: NodeType;
  setNodes: (nodes: NodeType[]) => void;
  onConnect: (id: number) => void;
  onRemove: (id: number) => void;
  isSelected: boolean;
};

const Node: React.FC<NodeProps> = ({ node, setNodes, onConnect, onRemove, isSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: node.x, y: node.y });
  const [isLink,setIsLink]= useState<boolean>(false)



  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    setStartPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newX = node.x + (e.clientX - startPosition.x);
      const newY = node.y + (e.clientY - startPosition.y);
      setNodes((prevNodes) =>
        prevNodes.map((n) =>
          n.id === node.id ? { ...n, x: newX, y: newY } : n
        )
      );
      setStartPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={` z-50 flex items-center justify-center rounded-lg shadow-md p-2 cursor-pointer scr`}
      style={{
        position: "absolute",
        left: node.x,
        top: node.y,
        padding: "10px",
        backgroundColor: "white",
        border: `2px solid ${isSelected ? "blue" : "black"}`,
        borderRadius: "5px",
        cursor: "pointer",
        color: "black",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <span
        onMouseEnter={() => {
          setIsLink(true);
        }}
        onMouseLeave={() => {
          setIsLink(false);
        }}
        className={`text-gray-800 box-border p-3  font-semibold z-50`}
      >
        {node.text}

        {isLink ? (
          <>
            <button
              className=" px-1 z-50 bg-gray-200 dark:bg-gray-700 rounded-md  absolute left-0 -top-1 text-[13px]"
              onClick={(e) => onConnect(node.id)}
            >
              +
            </button>

            <button
              className="box-border absolute right-0 bottom-0 px-1 text-[12px] z-50 bg-red-500 dark:bg-red-800 rounded-md text-white"
              onClick={() => onRemove(node.id)}
            >
              X
            </button>
          </>
        ) : (
          <></>
        )}
      </span>

      
    </div>
  );
};

export default Node;