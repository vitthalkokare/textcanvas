'use client';
import React, { useState, useRef } from 'react';
import SidePanel from '../Components/SidePanel';
import Canvas from '../Components/Canvas';
import { Node, Shape } from './types';

const Draw = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedShapeType, setSelectedShapeType] = useState();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <SidePanel
        isPanelOpen={isPanelOpen}
        setIsPanelOpen={setIsPanelOpen}
        selectedShapeType={selectedShapeType}
        setSelectedShapeType={setSelectedShapeType}
      />
      <Canvas
        nodes={nodes}
        setNodes={setNodes}
        shapes={shapes}
        setShapes={setShapes}
        selectedShapeType={selectedShapeType}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
    </div>
  );
};

export default Draw;