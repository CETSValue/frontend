import React, { useState, useEffect } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Data from "../public/data/resilience.json"; // adjust path if needed

interface NodeItem {
  value: number;
  children?: Record<string, NodeItem[]>; // Each child category is keyed by a string (label)
}

interface ParsedNode {
  name: string;
  value: number;
  children?: ParsedNode[];
}

const ResilienceRadarExplorer = () => {
  const section = "Resilience Score";
  const [currentLevel, setCurrentLevel] = useState(section);
  const [path, setPath] = useState([]);

  // Parse recursive JSON structure into a simpler hierarchy
  const parseNode = (node: ParsedNode): ParsedNode[] => {
    if (!node.children) return [];
    
    return Object.entries(node.children).map(([i, data]) => {
      const item = data;
      return {
        name: item.name.replace(/&amp;/g, "&"),
        value: item.value,
        children: item.children ? parseNode(item) : [],
      };
    });
  };

  useEffect(() => {
    console.log(Data);
    const root = Data;
    if (!root) return;

    const parsed = {
      label: section,
      value: root.value,
      children: parseNode(root),
    };
    setCurrentLevel(parsed);
    setPath([parsed]);
  }, []);

  if (!currentLevel) return <div>Loading radar explorer...</div>;

  // Radar data for this level
  const chartData =
    currentLevel.children?.map((c:ParsedNode) => ({
      category: c.name,
      value: c.value,
    })) || [];

  const handleCategoryClick = (categoryLabel: string) => {
    const next = currentLevel.children.find((c:ParsedNode) => c.name === categoryLabel);
    if (next && next.children.length > 0) {
      setCurrentLevel(next);
      setPath((prev) => [...prev, next]);
    }
  };

  const handleBack = () => {
    if (path.length > 1) {
      const newPath = [...path];
      newPath.pop();
      setCurrentLevel(newPath[newPath.length - 1]);
      setPath(newPath);
    }
  };

  return (
    <div className="w-full h-[600px] flex flex-col items-center">
      <div className="flex items-center gap-3 mb-4">
        {path.length > 1 && (
          <button
            onClick={handleBack}
            className="flex items-center gap-1 px-3 py-1 border rounded-md hover:bg-gray-100"
          >
            <ArrowLeft size={16} /> Back
          </button>
        )}
        <h2 className="text-2xl font-semibold">
          {currentLevel.label}
        </h2>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentLevel.label}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              cx="50%"
              cy="50%"
              outerRadius="70%"
              data={chartData}
              onClick={(e) => {
                if (e && e.activeLabel) handleCategoryClick(e.activeLabel);
              }}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name={currentLevel.label}
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.5}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ResilienceRadarExplorer;
