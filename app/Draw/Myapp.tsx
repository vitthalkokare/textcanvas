'use client'
import React, { useState, useRef, useEffect } from'react';

const Myapp = () => {
  const [nodes, setNodes] = useState<{ id: number; text: string; x: number; y: number; parentId?: number; children?: number[] }[]>([]);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [inputPosition, setInputPosition] = useState<{ x: number; y: number } | null>(null);
  const [newText, setNewText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [drawingLine, setDrawingLine] = useState<{ startX: number; startY: number; endX: number; endY: number } | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectingNodeId, setConnectingNodeId] = useState<number | null>(null);
  const [isLink,setIsLink]= useState<boolean>(false)



const cnode = useRef<HTMLSpanElement>(null)

  const addNode = (x: number, y: number) => {
    if (!newText) return; // Prevent adding empty nodes
    const newNode = { id: nodes.length + 1, text: newText, x, y, children: [] };
    setNodes([...nodes, newNode]);
    setNewText('');
    setIsInputVisible(false); // Hide input after adding node
  };

  const removeNode = (id: number) => {
    setNodes(nodes.filter(node => node.id!== id));
    setNodes(prevNodes => prevNodes.map(node => ({...node, children: node.children?.filter(childId => childId!== id) })));
  };

  const connectNodes = (parentId: number, childId: number) => {
    setNodes(prevNodes => {
      const parentNode = prevNodes.find(node => node.id === parentId);
      if (parentNode) {
        parentNode.children = [...(parentNode.children || []), childId];
      }
      return [...prevNodes];
    });
    setIsConnecting(false);
    setConnectingNodeId(null);
    setDrawingLine(null); // Reset drawing line
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setInputPosition({ x, y });
    setIsInputVisible(true); // Show input
  };

  const handleAddNode = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputPosition) {
        addNode(inputPosition.x, inputPosition.y);
      }
    }
  };

  const handleNodeClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // Prevent triggering canvas click
  };

  const handleConnectClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // Prevent triggering node click
    if (!isConnecting) {
      setIsConnecting(true);
      setConnectingNodeId(id);
      const node = nodes.find(n => n.id === id);
      if (node) {
        setDrawingLine({ startX: node.x + 25, startY: node.y + 25, endX: node.x + 25, endY: node.y + 25 });
      }
    } else {
      const parentId = connectingNodeId;
      const childId = id;
      connectNodes(parentId, childId);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isConnecting) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const node = nodes.find(n => n.id === connectingNodeId);
      if (node) {
        setDrawingLine({ startX: node.x + 25, startY: node.y + 25, endX: x, endY: y });
      }
    }
  };

  const handleNodeMouseDown = (e: React.MouseEvent, id: number) => {
    const node = nodes.find(n => n.id === id);
    if (!node ||!containerRef.current) return;

    const startX = e.clientX - node.x;
    const startY = e.clientY - node.y;

    const onMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - startX;
      const newY = e.clientY - startY;
      setNodes(prevNodes =>
        prevNodes.map(n => (n.id === id? {...n, x: newX, y: newY } : n))
      );
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };



  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div
      ref={containerRef}
      className={`min-w-[1000px] min-h-[1000px] ${isDarkMode ? 'bg-gray-100' : 'bg-gray-900'}  flex items-center justify-center relative overflow-y-scroll  scr`}
      onDoubleClick={handleCanvasClick}
      onMouseMove={handleCanvasMouseMove}
    >
      <button
        className=" fixed top-4 z-50 right-10 box-border p-2 bg-white dark:bg-gray-800 rounded-full shadow-md"
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        {isDarkMode? '🌙' : '☀️'}
      </button>

      {nodes.map((node) => (
        <div
          key={node.id}
          className="absolute z-50 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 cursor-pointer scr"
          style={{ left: node.x, top: node.y }}
          onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
          onClick={(e) => handleNodeClick(e, node.id)}
        >
          <span onMouseEnter={()=>{setIsLink(true)}} onMouseLeave={()=>{setIsLink(false)}}  className="text-gray-800 box-border p-3 dark:text-white font-semibold z-50">{node.text}

          {isLink  ? <>
            <button
            className=" px-1 z-50 bg-gray-200 dark:bg-gray-700 rounded-md  absolute left-0 -top-1 text-[13px]"
            onClick={(e) => handleConnectClick(e, node.id)}
          >
            +
          </button>

          <button
            className="box-border absolute right-0 bottom-0 px-1 text-[12px] z-50 bg-red-500 dark:bg-red-800 rounded-md text-white"
            onClick={() => removeNode(node.id)}
          >
            X
          </button>
          </>
           : <></> }
          
          </span>
         
          
        </div>
      ))}

      {isInputVisible && inputPosition && (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={handleAddNode}
          className="absolute z-50 box-border p-2 rounded-md focus:outline-teal-600 text-black outline-none"
          style={{ left: inputPosition.x, top: inputPosition.y }}
          autoFocus
        />
      )}

      {/* Draw lines between connected nodes */}
      {nodes.map((node) => (
        node.children?.map((childId) => (
          <svg key={`line-${node.id}-${childId}`} className="absolute w-full h-full  scr" style={{ left: 0, top: 0 }}>
            <path
              d={`M${node.x + 25},${node.y + 25} L${nodes.find(n => n.id === childId)?.x + 25},${nodes.find(n => n.id === childId)?.y + 25}`}
              stroke="gray"
              strokeWidth="2"
              fill="transparent"
              markerEnd="url(#arrowhead)"
            />
          </svg>
        ))
      ))}

      {/* Draw temporary line while connecting */}
      {drawingLine && (
        <svg className="absolute" style={{ left: 0, top: 0 }}>
          <path
            d={`M${drawingLine.startX},${drawingLine.startY} L${drawingLine.endX},${drawingLine.endY}`}
            stroke="gray"
            strokeWidth="2"
            fill="transparent"
            markerEnd="url(#arrowhead)"
          />
        </svg>
      )}

      <svg className="hidden">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="10"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="gray" />
          </marker>
        </defs>
      </svg>
    </div>
  );
};

export default Myapp;