export type Node = {
    id: number;
    text: string;
    x: number;
    y: number;
    children?: number[];
  };
  
  export type Shape = {
    id: number;
    type: 'rectangle' | 'circle' | 'curve' | 'cubic-curve';
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
  };
  
  
 
