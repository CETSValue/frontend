import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";
import Data from "../public/data/sustainability.json"; // adjust path as needed
//import Data from "../public/data/resilience.json"; // adjust path as needed

// Recursive node component
const TreeNode = ({ label, value, childrenNodes }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = childrenNodes && childrenNodes.length > 0;

  return (
    <div className="ml-4 border-l border-gray-200 pl-3 my-1">
      <div
        className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
        onClick={() => hasChildren && setOpen(!open)}
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
        <span className="font-medium">{label.replace(/&amp;/g, "&")}</span>
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
            {childrenNodes.map((child, index) => (
              <TreeNode
                key={index}
                label={child.label}
                value={child.value}
                childrenNodes={child.children}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SustainabilityTreeExplorer = () => {
  const [tree, setTree] = useState(null);

  useEffect(() => {
    const parseNode = (node) => {
      if (!node.children) return [];

      return node.children.map((category) => {
        const [label, arr] = Object.entries(category)[0];
        const item = arr[0];
        return {
          label,
          value: item.value,
          children: item.children
            ? parseNode(item)
            : [],
        };
      });
    };

    const section = "Circularity and Sustainability Score";
    //const section = "Resilience Score";
    const root = Data[section]?.[0];
    console.log("root")
    console.log(root);

    const treeStructure = {
      label: section,
      value: root.value,
      children: parseNode(root),
    };
    setTree(treeStructure);
  }, []);

  if (!tree) return <div>Loading tree...</div>;

  return (
    <div className="p-6 w-full max-w-3xl mx-auto bg-white shadow-md rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        🌿 Circularity and Sustainability Tree Explorer
      </h2>
      <TreeNode
        label={tree.label}
        value={tree.value}
        childrenNodes={tree.children}
      />
    </div>
  );
};

export default SustainabilityTreeExplorer;
