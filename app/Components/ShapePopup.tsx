import React, { useState } from 'react';
import { Shape as ShapeInterface } from '../Draw/types';

type ShapePopupProps = {
  shape: ShapeInterface;
  setShape: (shape: ShapeInterface) => void;
};

const ShapePopup: React.FC<ShapePopupProps> = ({ shape, setShape }) => {
  const [size, setSize] = useState({ width: shape.width, height: shape.height });
  const [color, setColor] = useState(shape.color);

  const handleSave = () => {
    setShape({ ...shape, width: size.width, height: size.height, color });
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg text-black z-50">
      <h2 className="text-lg font-semibold mb-4">Edit Shape</h2>
      <div className="mb-4">
        <label className="block mb-2">Width</label>
        <input
          type="number"
          value={size.width}
          onChange={(e) => setSize({ ...size, width: parseInt(e.target.value) })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Height</label>
        <input
          type="number"
          value={size.height}
          onChange={(e) => setSize({ ...size, height: parseInt(e.target.value) })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button onClick={handleSave} className="w-full p-2 bg-blue-500 text-white rounded">
        Save
      </button>
    </div>
  );
};

export default ShapePopup;