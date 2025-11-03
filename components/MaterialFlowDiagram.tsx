// File: MaterialFlowDiagram.jsx
import React, {FC, ReactNode} from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  MarkerType,
  Handle,
  Position
} from "reactflow";
import "reactflow/dist/style.css";
import {
  LucideIcon,
  PencilRuler,
  Users,
  Truck,
  Droplets,
  Factory,
  PackageCheck,
  Trash2,
  Ship,
  Plane,
  Recycle,
  Database,
  Building2,
  Box,
} from "lucide-react";

interface Node {
    highlight: boolean
    label: string
    icon: ReactNode
    sub: string
}

interface NodeParams {
    data: Node
}

// ---- Custom node component with icon + label ----
const CustomNode = ({ data }: NodeParams) => (
  <div
    style={{
      background: data.highlight ? "#fdeaea" : "white",
      border: data.highlight ? "2px solid #e57373" : "1px solid #ccc",
      borderRadius: 12,
      padding: "10px 14px",
      minWidth: 130,
      textAlign: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    }}
  >
    <div style={{ display: "flex", justifyContent: "center" }}>{data.icon}</div>
    <div style={{ fontSize: 13, fontWeight: 600, marginTop: 6 }}>
      {data.label}
    </div>
    {data.sub && (
      <div style={{ fontSize: 12, color: "#6b21a8", marginTop: 2 }}>
        {data.sub}
      </div>
    )}
    <Handle type="source" position={Position.Right} />
    <Handle type="target" position={Position.Left} />
  </div>
);

const DesignNode = ({ data }: NodeParams) => (
  <div
    style={{
      background: data.highlight ? "#fdeaea" : "white",
      border: data.highlight ? "2px solid #e57373" : "1px solid #ccc",
      borderRadius: 12,
      padding: "10px 14px",
      minWidth: 130,
      textAlign: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    }}
  >
    <div style={{ display: "flex", justifyContent: "center" }}>{data.icon}</div>
    <div style={{ fontSize: 13, fontWeight: 600, marginTop: 6 }}>
      {data.label}
    </div>
    {data.sub && (
      <div style={{ fontSize: 12, color: "#6b21a8", marginTop: 2 }}>
        {data.sub}
      </div>
    )}
    <Handle type="source" position={Position.Right} />
  </div>
);

const TopRightNode = ({ data }: NodeParams) => (
  <div
    style={{
      background: data.highlight ? "#fdeaea" : "white",
      border: data.highlight ? "2px solid #e57373" : "1px solid #ccc",
      borderRadius: 12,
      padding: "10px 14px",
      minWidth: 130,
      textAlign: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    }}
  >
    <div style={{ display: "flex", justifyContent: "center" }}>{data.icon}</div>
    <div style={{ fontSize: 13, fontWeight: 600, marginTop: 6 }}>
      {data.label}
    </div>
    {data.sub && (
      <div style={{ fontSize: 12, color: "#6b21a8", marginTop: 2 }}>
        {data.sub}
      </div>
    )}
    <Handle type="source" position={Position.Bottom} />
    <Handle type="target" position={Position.Left} />
  </div>
);

const MidNode = ({ data }: NodeParams) => (
  <div
    style={{
      background: data.highlight ? "#fdeaea" : "white",
      border: data.highlight ? "2px solid #e57373" : "1px solid #ccc",
      borderRadius: 12,
      padding: "10px 14px",
      minWidth: 130,
      textAlign: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    }}
  >
    <div style={{ display: "flex", justifyContent: "center" }}>{data.icon}</div>
    <div style={{ fontSize: 13, fontWeight: 600, marginTop: 6 }}>
      {data.label}
    </div>
    {data.sub && (
      <div style={{ fontSize: 12, color: "#6b21a8", marginTop: 2 }}>
        {data.sub}
      </div>
    )}
    <Handle type="source" position={Position.Bottom} />
    <Handle type="target" position={Position.Top} />
  </div>
);

const BottomRightNode = ({ data }: NodeParams) => (
  <div
    style={{
      background: data.highlight ? "#fdeaea" : "white",
      border: data.highlight ? "2px solid #e57373" : "1px solid #ccc",
      borderRadius: 12,
      padding: "10px 14px",
      minWidth: 130,
      textAlign: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    }}
  >
    <div style={{ display: "flex", justifyContent: "center" }}>{data.icon}</div>
    <div style={{ fontSize: 13, fontWeight: 600, marginTop: 6 }}>
      {data.label}
    </div>
    {data.sub && (
      <div style={{ fontSize: 12, color: "#6b21a8", marginTop: 2 }}>
        {data.sub}
      </div>
    )}
    <Handle type="source" position={Position.Left} />
    <Handle type="target" position={Position.Top} />
  </div>
);

const BottomNode = ({ data }:NodeParams) => (
  <div
    style={{
      background: data.highlight ? "#fdeaea" : "white",
      border: data.highlight ? "2px solid #e57373" : "1px solid #ccc",
      borderRadius: 12,
      padding: "10px 14px",
      minWidth: 130,
      textAlign: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    }}
  >
    <div style={{ display: "flex", justifyContent: "center" }}>{data.icon}</div>
    <div style={{ fontSize: 13, fontWeight: 600, marginTop: 6 }}>
      {data.label}
    </div>
    {data.sub && (
      <div style={{ fontSize: 12, color: "#6b21a8", marginTop: 2 }}>
        {data.sub}
      </div>
    )}
    <Handle type="target" position={Position.Right} />
    <Handle type="source" position={Position.Left} />
  </div>
);

const BottomLeftNode = ({ data }:NodeParams) => (
  <div
    style={{
      background: data.highlight ? "#fdeaea" : "white",
      border: data.highlight ? "2px solid #e57373" : "1px solid #ccc",
      borderRadius: 12,
      padding: "10px 14px",
      minWidth: 130,
      textAlign: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    }}
  >
    <div style={{ display: "flex", justifyContent: "center" }}>{data.icon}</div>
    <div style={{ fontSize: 13, fontWeight: 600, marginTop: 6 }}>
      {data.label}
    </div>
    {data.sub && (
      <div style={{ fontSize: 12, color: "#6b21a8", marginTop: 2 }}>
        {data.sub}
      </div>
    )}
    <Handle type="source" position={Position.Top} />
    <Handle type="target" position={Position.Right} />
  </div>
);

const LeftNode = ({ data }:NodeParams) => (
  <div
    style={{
      background: data.highlight ? "#fdeaea" : "white",
      border: data.highlight ? "2px solid #e57373" : "1px solid #ccc",
      borderRadius: 12,
      padding: "10px 14px",
      minWidth: 130,
      textAlign: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    }}
  >
    <div style={{ display: "flex", justifyContent: "center" }}>{data.icon}</div>
    <div style={{ fontSize: 13, fontWeight: 600, marginTop: 6 }}>
      {data.label}
    </div>
    {data.sub && (
      <div style={{ fontSize: 12, color: "#6b21a8", marginTop: 2 }}>
        {data.sub}
      </div>
    )}
    <Handle type="source" position={Position.Top} />
    <Handle type="target" position={Position.Bottom} />
  </div>
);

const LeftWasteNode = ({ data }:NodeParams) => (
  <div
    style={{
      background: data.highlight ? "#fdeaea" : "white",
      border: data.highlight ? "2px solid #e57373" : "1px solid #ccc",
      borderRadius: 12,
      padding: "10px 14px",
      minWidth: 130,
      textAlign: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    }}
  >
    <div style={{ display: "flex", justifyContent: "center" }}>{data.icon}</div>
    <div style={{ fontSize: 13, fontWeight: 600, marginTop: 6 }}>
      {data.label}
    </div>
    {data.sub && (
      <div style={{ fontSize: 12, color: "#6b21a8", marginTop: 2 }}>
        {data.sub}
      </div>
    )}
    <Handle type="target" position={Position.Right}/>
  </div>
);

const DownWasteNode = ({ data }:NodeParams) => (
  <div
    style={{
      background: data.highlight ? "#fdeaea" : "white",
      border: data.highlight ? "2px solid #e57373" : "1px solid #ccc",
      borderRadius: 12,
      padding: "10px 14px",
      minWidth: 130,
      textAlign: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    }}
  >
    <div style={{ display: "flex", justifyContent: "center" }}>{data.icon}</div>
    <div style={{ fontSize: 13, fontWeight: 600, marginTop: 6 }}>
      {data.label}
    </div>
    {data.sub && (
      <div style={{ fontSize: 12, color: "#6b21a8", marginTop: 2 }}>
        {data.sub}
      </div>
    )}
    <Handle type="target" position={Position.Top} />
  </div>
);

const RightWasteNode = ({ data }:NodeParams) => (
  <div
    style={{
      background: data.highlight ? "#fdeaea" : "white",
      border: data.highlight ? "2px solid #e57373" : "1px solid #ccc",
      borderRadius: 12,
      padding: "10px 14px",
      minWidth: 130,
      textAlign: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    }}
  >
    <div style={{ display: "flex", justifyContent: "center" }}>{data.icon}</div>
    <div style={{ fontSize: 13, fontWeight: 600, marginTop: 6 }}>
      {data.label}
    </div>
    {data.sub && (
      <div style={{ fontSize: 12, color: "#6b21a8", marginTop: 2 }}>
        {data.sub}
      </div>
    )}
    <Handle type="target" position={Position.Left} />
  </div>
);

const TwoTargetNode = ({ data }:NodeParams) => (
  <div
    style={{
      background: data.highlight ? "#fdeaea" : "white",
      border: data.highlight ? "2px solid #e57373" : "1px solid #ccc",
      borderRadius: 12,
      padding: "10px 14px",
      minWidth: 130,
      textAlign: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    }}
  >
    <div style={{ display: "flex", justifyContent: "center" }}>{data.icon}</div>
    <div style={{ fontSize: 13, fontWeight: 600, marginTop: 6 }}>
      {data.label}
    </div>
    {data.sub && (
      <div style={{ fontSize: 12, color: "#6b21a8", marginTop: 2 }}>
        {data.sub}
      </div>
    )}
    <Handle type="source" position={Position.Right} />
    <Handle type="target" position={Position.Left} id="tl" />
    <Handle type="target" position={Position.Bottom} id="tb" />
  </div>
);

// ---- Main diagram component ----
export default function MaterialFlowDiagram() {
  const nodeTypes = { custom: CustomNode, 
    topright: TopRightNode, 
    midnode: MidNode, 
    bottomright: BottomRightNode, 
    bottom: BottomNode,
    bottomleft: BottomLeftNode, 
    left: LeftNode,
    wasteleft: LeftWasteNode,
    wastedown: DownWasteNode,
    wasteright: RightWasteNode,
    twotargets: TwoTargetNode,
    design: DesignNode
};

  const nodes = [
    // --- Top Row: Recycled materials flow ---
    {
      id: "design",
      position: { x: 0, y: 0 },
      type: "design",
      data: { label: "Product design", sub:" - ", icon: <PencilRuler size={28} /> },
    },
    {
      id: "suppliers",
      position: { x: 200, y: 0 },
      type: "twotargets",
      data: { label: "Suppliers", sub: "2.4t", icon: <Users size={28} /> },
    },
    {
      id: "supply",
      position: { x: 400, y: 0 },
      type: "custom",
      data: {
        label: "Supply",
        sub: "2.4t",
        icon: (
          <div style={{ display: "flex", gap: 4 }}>
            <Truck size={28} />
            <Ship size={28} />
            <Plane size={28} />
          </div>
        ),
        highlight: true,
      },
    },
    {
      id: "raw",
      position: { x: 600, y: 0 },
      type: "twotargets",
      data: { label: "Raw materials", sub: "2.4t", icon: <Droplets size={28} /> },
    },
    {
      id: "production",
      position: { x: 800, y: 0 },
      type: "topright",
      data: {
        label: "Production",
        sub: "5.7t",
        icon: <Factory size={28} />,
        highlight: true,
      },
    },
  

    // --- Middle Row: Main process ---
    {
      id: "finished",
      position: { x: 793, y: 200 },
      type: "midnode",
      data: { label: "Finished products", sub: "800 U", icon: <PackageCheck size={28} /> },
    },

    
    // bottom row
    {
      id: "distribution",
      position: { x: 800, y: 400 },
      type: "bottomright",
      data: {
        label: "Distribution",
        sub: "400 U",
        icon: (
          <div style={{ display: "flex", gap: 4 }}>
            <Truck size={28} />
            <Ship size={28} />
            <Plane size={28} />
          </div>
        ),
      },
    },
    {
      id: "use",
      position: { x: 600, y: 400 },
      type: "bottom",
      data: { label: "Use phase", sub: "300 U", icon: <Building2 size={28} /> },
    },
    {
      id: "collection",
      position: { x: 400, y: 400 },
      type: "bottom",
      data: { label: "Collection", sub: "800 U", icon: <Database size={28} /> },
    },
    {
      id: "recycling",
      position: { x: 200, y: 400 },
      type: "bottomleft",
      data: { label: "Recycling", sub: "1.6 KU", icon: <Recycle size={28} /> },
    },
    {
      id: "recycled",
      position: { x: 177, y: 200 },
      type: "left",
      data: { label: "Recycled raw materials", sub: "1 t", icon: <Box size={28} /> },
    },
    {
      id: "recycleWaste",
      position: { x: 20, y: 330 },
      type: "wasteleft",
      data: { label: "Recycling waste", icon: <Trash2 size={28} /> },
    },
    {
      id: "useWaste",
      position: { x: 500, y: 520 },
      type: "wastedown",
      data: { label: "Use phase waste", icon: <Trash2 size={28} /> },
    },
    {
      id: "productionWaste",
      position: { x: 950, y: 100 },
      type: "wasteright",
      data: { label: "Production waste", icon: <Trash2 size={28} /> },
    },
  ];

  const edges = [
    { id: "e1", source: "design", target: "suppliers", animated: true, markerEnd: { type: MarkerType.ArrowClosed }},
    { id: "e2", source: "suppliers", target: "supply", animated: true,   markerEnd: { type: MarkerType.ArrowClosed } },
    { id: "e3", source: "supply", target: "raw", animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: "e4", source: "raw", target: "production", animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: "e5", source: "production", target: "finished", animated: true, markerEnd: { type: MarkerType.ArrowClosed }},
    { id: "e6", source: "finished", target: "distribution", animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: "e7", source: "distribution", target: "use", animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: "e8", source: "use", target: "collection", animated: true , markerEnd: { type: MarkerType.ArrowClosed }},
    { id: "e9", source: "collection", target: "recycling", animated: true , markerEnd: { type: MarkerType.ArrowClosed }},
    { id: "e10", source: "recycling", target: "recycled", animated: true , markerEnd: { type: MarkerType.ArrowClosed }},
    { id: "e11", source: "recycled", target: "suppliers", animated: true, type: "step", targetHandle: 'tb', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: "e12", source: "recycled", target: "raw", animated: true, type: "step", targetHandle: 'tb', markerEnd: { type: MarkerType.ArrowClosed }  },
    
    { id: "e13", source: "recycling", target: "recycleWaste", animated: true , type: "smoothstep",  markerEnd: { type: MarkerType.ArrowClosed }},
    { id: "e14", source: "use", target: "useWaste", animated: true , type: "smoothstep",  markerEnd: { type: MarkerType.ArrowClosed }},
    { id: "e15", source: "production", target: "productionWaste", animated: true , type: "smoothstep",  markerEnd: { type: MarkerType.ArrowClosed }},
  ]

  return (
    <div style={{ width: "100%", height: "90vh" }}>
      <div style={{ marginBottom: 8 }}>
        <h4 style={{ fontSize: 14, fontWeight: 700, color: "#666" }}>Material Flow</h4>
        <h5 style={{ fontSize: 12, fontWeight: 700, color: "#2C9B48" }}>
          Last updated 03 Nov 2025 13:21
        </h5>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.1 }}
      >
        <Background color="#ddd" gap={2} />
      </ReactFlow>
    </div>
  );
}
