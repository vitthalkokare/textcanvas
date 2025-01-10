import React, { ReactNode } from 'react';
import { FaBezierCurve, FaCodeBranch } from 'react-icons/fa';
import { FaCircle, FaCodeCommit, FaCodePullRequest, FaFireFlameCurved, FaO, FaRegSquareFull } from 'react-icons/fa6';

export interface ShapeType{

        shape:string,
        icon:ReactNode

    }
type SidePanelProps = {
  isPanelOpen: boolean;
  setIsPanelOpen: (open: boolean) => void;
  selectedShapeType: ShapeType | null;
  setSelectedShapeType: (type: ShapeType | null) => void;
};

const SidePanel: React.FC<SidePanelProps> = ({
  isPanelOpen,
  setIsPanelOpen,
  selectedShapeType,
  setSelectedShapeType,
}) => {
  const shapes: ShapeType[] = [
    { shape: "rectacngle", icon: <FaRegSquareFull /> },
    { shape: "circle", icon: <FaO /> },
    { shape: "curve", icon: <FaCodeBranch /> },
    { shape: "cubic-curve", icon: <FaCodePullRequest /> },
  ];

  return (
    <div
      className={`w-fit box-border flex flex-col justify-center z-30  items-center sticky top-0 left-0 bg-gray-900 p-3 ${
        isPanelOpen ? "" : "hidden"
      }`}
    >
      <h2 className="text-lg font-semibold mb-4">Shapes</h2>
      <button
        className={`w-fit p-2 mb-2 bg-white dark:bg-gray-700 rounded-md shadow-md ${
          selectedShapeType === null ? "border-2 border-blue-500" : ""
        }`}
        onClick={() => setSelectedShapeType(null)}
      >
        <FaCodeCommit />
      </button>
      {shapes.map((shape) => (
        <button
          key={shape}
          className={`w-fit flex flex-col p-2 mb-2 bg-white dark:bg-gray-700 rounded-md shadow-md ${
            selectedShapeType === shape ? "border-2 border-blue-500" : ""
          }`}
          onClick={() => setSelectedShapeType(shape)}
        >
          {shape.icon}
        </button>
      ))}
    </div>
  );
};

export default SidePanel;