import React, { useState, useRef, useEffect } from "react";
import Node from "../Draw/Node";
import Shape from "../Draw/Shape";
import { Node as NodeType, Shape as ShapeInterface } from "../Draw/types";

type CanvasProps = {
  nodes: NodeType[];
  setNodes: (nodes: NodeType[]) => void;
  shapes: ShapeInterface[];
  setShapes: (shapes: ShapeInterface[]) => void;
  selectedShapeType: "rectangle" | "circle" | "curve" | "cubic-curve" | null;
  isDarkMode: boolean;
  setIsDarkMode: (darkMode: boolean) => void;
};

const Canvas: React.FC<CanvasProps> = ({
  nodes,
  setNodes,
  shapes,
  setShapes,
  selectedShapeType,
  isDarkMode,
  setIsDarkMode,
}) => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [inputPosition, setInputPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [newText, setNewText] = useState("");
  const [selectedNode, setSelectedNode] = useState<NodeType | null>(null);
  const [selectedShape, setSelectedShape] = useState<ShapeInterface | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Handle delete key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete") {
        if (selectedNode) {
          setNodes(nodes.filter((n) => n.id !== selectedNode.id));
          setSelectedNode(null);
        }
        if (selectedShape) {
          setShapes(shapes.filter((s) => s.id !== selectedShape.id));
          setSelectedShape(null);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedNode, selectedShape, nodes, shapes, setNodes, setShapes]);

  const handleCanvasClick = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectedShapeType) {
      const newShape = {
        id: shapes.length + 1,
        type: selectedShapeType,
        x,
        y,
        width: 100,
        height: 100,
        color: "transparent",
      };
      setShapes([...shapes, newShape]);
    } else {
      setInputPosition({ x, y });
      setIsInputVisible(true);
    }
  };

  const handleAddNode = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputPosition) {
      const newNode = {
        id: nodes.length + 1,
        text: newText,
        x: inputPosition.x,
        y: inputPosition.y,
        children: [],
      };
      setNodes([...nodes, newNode]);
      setNewText("");
      setIsInputVisible(false);
    }
  };

  const handleConnectNode = (id: number) => {
    if (selectedNode) {
      setNodes((prevNodes) =>
        prevNodes.map((n) =>
          n.id === selectedNode.id
            ? { ...n, children: [...(n.children || []), id] }
            : n
        )
      );
      setSelectedNode(null);
    } else {
      setSelectedNode(nodes.find((n) => n.id === id) || null);
    }
  };

  const handleRemoveNode = (id: number) => {
    setNodes(nodes.filter((n) => n.id !== id));
  };

  const handleConnectShape = (id: number) => {
    if (selectedNode) {
      setNodes((prevNodes) =>
        prevNodes.map((n) =>
          n.id === selectedNode.id
            ? { ...n, children: [...(n.children || []), id] }
            : n
        )
      );
      setSelectedNode(null);
    }
  };

  const handleRemoveShape = (id: number) => {
    setShapes(shapes.filter((s) => s.id !== id));

    
  };

    

  return (
    <div
      ref={containerRef}
      className={`flex-1  relative overflow-auto`}
      onDoubleClick={handleCanvasClick}
    >
      {nodes.map((node) => (
        <Node
          key={node.id}
          node={node}
          setNodes={setNodes}
          onConnect={handleConnectNode}
          onRemove={handleRemoveNode}
          isSelected={selectedNode?.id === node.id}
        />
      ))}
      {shapes.map((shape) => (
        <Shape
          key={shape.id}
          shape={shape}
          setShapes={setShapes}
          onConnect={handleConnectShape}
          onRemove={handleRemoveShape}
          isSelected={selectedShape?.id === shape.id}
        />
      ))}
      {isInputVisible && inputPosition && (
        <span
          style={{ left: inputPosition.x, top: inputPosition.y }}
          className="absolute flex bg-white text-black z-50 box-border dark:border-green-800 border-2 p-2 rounded-md"
        >
          <input
            className="  text-black outline-none"
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={handleAddNode}
            autoFocus
          />
          <button onClick={()=>setIsInputVisible(false)} className="font-bold">X</button>
        </span>
      )}
      {/* Render lines between connected nodes and shapes */}
      {nodes.map((node) =>
        node.children?.map((childId) => {
          const childNode = nodes.find((n) => n.id === childId);
          const childShape = shapes.find((s) => s.id === childId);
          if (!childNode && !childShape) return null;
          return (
            <svg
              key={`line-${node.id}-${childId}`}
              className="absolute w-full h-full"
              style={{ left: 0, top: 0 }}
            >
              <line
                x1={node.x + 25}
                y1={node.y + 25}
                x2={
                  childNode
                    ? childNode.x + 25
                    : childShape!.x + childShape!.width / 2
                }
                y2={
                  childNode
                    ? childNode.y + 25
                    : childShape!.y + childShape!.height / 2
                }
                stroke="gray"
                strokeWidth="2"
              />
            </svg>
          );
        })
      )}
    </div>
  );
};

export default Canvas;
