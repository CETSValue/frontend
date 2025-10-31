import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";
import { Button } from "@/components/ui/button";

export default function SustainabilityWidget() {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Circular Economy");

  useEffect(() => {
    // Fetch sustainability data from local JSON
    fetch("/data/sustainability.json")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  const categories = ["Circular Economy", "Sustainability", "Water", "Energy"];

  const filteredData = data.find((item) => { if (item && item['category'] === selectedCategory) { return item['metrics'] } return [] })

  return (
    <Card className="w-full max-w-4xl mx-auto p-6 shadow-lg bg-white dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center mb-4">
          Circular Economy & Sustainability Score Dashboard
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex justify-center space-x-4 mb-6">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        {filteredData && filteredData['length'] > 0 ? (
          <motion.div
            className="w-full h-96"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <ResponsiveContainer>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={filteredData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Score"
                  dataKey="value"
                  stroke="#4F46E5"
                  fill="#6366F1"
                  fillOpacity={0.6}
                  animationDuration={1200}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.7)",
                    border: "none",
                    borderRadius: "0.5rem",
                    color: "#fff",
                  }}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            Loading or no data available for {selectedCategory}.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
