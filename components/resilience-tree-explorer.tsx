import React, { useState, useEffect, FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";
import Data from "../public/data/resilience.json"; // adjust path as needed

interface ParsedNode {
  name: string;
  value: number;
  children?: ParsedNode[];
}

interface TreeNodeProps extends ParsedNode {
  level?: number; // added to track depth
}

// Recursive node component
const TreeNode: FC<TreeNodeProps> = ({ name, value, children, level=0 }) => {
  const [open, setOpen] = useState(level === 0);
  const hasChildren = children && children.length > 0;

  useEffect(() => {
    if (level === 0) setOpen(true);
  }, [level]);

  const toggle = () => {
    if (hasChildren) setOpen((prev) => !prev);
  };

  return (
    <div className="ml-4 border-l border-gray-200 pl-3 my-1">
      <div
        className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
        onClick={toggle}
      >
        {hasChildren ? (
          open ? (
            <ChevronDown size={16} className="text-gray-500" />
          ) : (
            <ChevronRight size={16} className="text-gray-500" />
          )
        ) : (
          <div className="w-4" />
        )}
        <span className="font-medium">{name.replace(/&amp;/g, "&")}</span>
        {value !== undefined && (
          <span className="text-sm text-gray-500 ml-2">({value})</span>
        )}
      </div>

      <AnimatePresence>
        {open && hasChildren && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children.map((child: ParsedNode, index: number) => (
              <TreeNode
                key={index}
                name={child.name}
                value={child.value}
                children={child.children}
                level={level + 1}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};



const ResilienceTreeExplorer = () => {
  const [tree, setTree] = useState<ParsedNode>();

  useEffect(() => {
    const parseNode = (node: ParsedNode): ParsedNode[] => {
      if (!node.children) return [];

      return Object.entries(node.children).map(([i, data]) => {
        const item = data;
        return {
          name: item.name,
          value: item.value,
          children: item.children
            ? parseNode(item)
            : [],
        };
      });
    };

    const root = Data;
    const treeStructure = {
      name: root.name,
      value: root.value,
      children: parseNode(root),
    };
    setTree(treeStructure);
  }, []);

  if (!tree) return <div>Loading tree...</div>;

  return (
    <div className="p-6 w-full max-w-3xl mx-auto bg-white shadow-md rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        🌿 Resilience Tree Explorer
      </h2>
      <TreeNode
        name={tree.name}
        value={tree.value}
        children={tree.children}
      />
    </div>
  );
};

export default ResilienceTreeExplorer;
