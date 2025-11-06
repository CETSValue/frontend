import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

/**
 * BusinessModelCanvas (React-DnD version)
 * Interactive drag-and-drop Business Model Canvas.
 * - Uses react-dnd instead of react-beautiful-dnd
 * - Tailwind CSS for styling
 * - LocalStorage autosave
 * - JSON import/export
 */

const DEFAULT_SECTIONS = [
  { id: "key-partners", title: "Key Partners" },
  { id: "key-activities", title: "Key Activities" },
  { id: "key-resources", title: "Key Resources" },
  { id: "value-propositions", title: "Value Propositions" },
  { id: "customer-relationships", title: "Customer Relationships" },
  { id: "channels", title: "Channels" },
  { id: "customer-segments", title: "Customer Segments" },
  { id: "cost-structure", title: "Cost Structure" },
  { id: "revenue-streams", title: "Revenue Streams" },
];

const STORAGE_KEY = "bmc_v2_rdn";

function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

export default function BusinessModelCanvas() {
  const [sections, setSections] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return DEFAULT_SECTIONS.map((s) => ({ ...s, items: [] }));
  });

  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sections));
    } catch {}
  }, [sections]);

  const addItem = (sectionId) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? { ...s, items: [...s.items, { id: uid("itm"), text: "New item" }] }
          : s
      )
    );
  };

  const updateItem = (sectionId, itemId, text) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? { ...s, items: s.items.map((it) => (it.id === itemId ? { ...it, text } : it)) }
          : s
      )
    );
  };

  const deleteItem = (sectionId, itemId) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId ? { ...s, items: s.items.filter((it) => it.id !== itemId) } : s
      )
    );
  };

  const moveItem = (item, fromId, toId) => {
    if (fromId === toId) return;
    setSections((prev) => {
      const src = prev.find((s) => s.id === fromId);
      const dst = prev.find((s) => s.id === toId);
      if (!src || !dst) return prev;
      const newSrcItems = src.items.filter((i) => i.id !== item.id);
      const newDstItems = [...dst.items, item];
      return prev.map((s) => {
        if (s.id === src.id) return { ...s, items: newSrcItems };
        if (s.id === dst.id) return { ...s, items: newDstItems };
        return s;
      });
    });
  };

  const clearCanvas = () => {
    if (!confirm("Clear all items?")) return;
    setSections(DEFAULT_SECTIONS.map((s) => ({ ...s, items: [] })));
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(sections, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "business-model-canvas.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (Array.isArray(parsed)) setSections(parsed);
      } catch {
        alert("Invalid JSON");
      }
    };
    reader.readAsText(file);
  };

  const filterItems = (items) => {
    if (!query.trim()) return items;
    return items.filter((it) => it.text.toLowerCase().includes(query.toLowerCase()));
  };

  const left = ["key-partners", "key-activities", "key-resources"];
  const right = ["customer-relationships", "channels", "customer-segments"];
  const bottom = ["cost-structure", "revenue-streams"];
  const center = ["value-propositions"];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4 max-w-[1400px] mx-auto">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Business Model Canvas</h1>
          <div className="flex gap-2">
            <input
              className="px-3 py-1 border rounded-md text-sm"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={exportJSON} className="px-3 py-1 border rounded-md text-sm">Export</button>
            <label className="px-3 py-1 border rounded-md text-sm cursor-pointer">
              Import
              <input
                type="file"
                accept="application/json"
                onChange={(e) => e.target.files && importJSON(e.target.files[0])}
                className="hidden"
              />
            </label>
            <button onClick={clearCanvas} className="px-3 py-1 border rounded-md text-sm">Clear</button>
          </div>
        </div>

        <div className="grid grid-cols-[220px_1fr_220px] gap-4">
          <div className="space-y-4">
            {sections.filter((s) => left.includes(s.id)).map((s) => (
              <CanvasColumn key={s.id} section={s} addItem={addItem} updateItem={updateItem} deleteItem={deleteItem} moveItem={moveItem} editing={editing} setEditing={setEditing} filterItems={filterItems} />
            ))}
          </div>

          <div className="space-y-4">
            {sections.filter((s) => center.includes(s.id)).map((s) => (
              <CanvasColumn key={s.id} section={s} addItem={addItem} updateItem={updateItem} deleteItem={deleteItem} moveItem={moveItem} editing={editing} setEditing={setEditing} filterItems={filterItems} large />
            ))}
          </div>

          <div className="space-y-4">
            {sections.filter((s) => right.includes(s.id)).map((s) => (
              <CanvasColumn key={s.id} section={s} addItem={addItem} updateItem={updateItem} deleteItem={deleteItem} moveItem={moveItem} editing={editing} setEditing={setEditing} filterItems={filterItems} />
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          {sections.filter((s) => bottom.includes(s.id)).map((s) => (
            <CanvasColumn key={s.id} section={s} addItem={addItem} updateItem={updateItem} deleteItem={deleteItem} moveItem={moveItem} editing={editing} setEditing={setEditing} filterItems={filterItems} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

function CanvasColumn({ section, addItem, updateItem, deleteItem, moveItem, editing, setEditing, filterItems, large }) {
  const [, drop] = useDrop({
    accept: "ITEM",
    drop: (dragged) => moveItem(dragged.item, dragged.fromId, section.id),
  });

  const filtered = filterItems(section.items || []);

  return (
    <div ref={drop} className={`bg-white rounded-2xl shadow p-3 ${large ? "min-h-[512px]" : "min-h-[160px]"}`}>
      <div className="flex justify-between mb-2">
        <h2 className="font-semibold">{section.title}</h2>
        <button onClick={() => addItem(section.id)} className="text-xs px-2 py-1 border rounded-md">+ Add</button>
      </div>

      <div className="space-y-2 min-h-[60px]">
        {filtered.length === 0 && <div className="text-xs text-gray-500">No items yet</div>}
        {filtered.map((item) => (
          <DraggableItem
            key={item.id}
            item={item}
            sectionId={section.id}
            updateItem={updateItem}
            deleteItem={deleteItem}
            editing={editing}
            setEditing={setEditing}
          />
        ))}
      </div>
    </div>
  );
}

function DraggableItem({ item, sectionId, updateItem, deleteItem, editing, setEditing }) {
  const [, drag] = useDrag({ type: "ITEM", item: { item, fromId: sectionId } });
  const [value, setValue] = useState(item.text);
  useEffect(() => setValue(item.text), [item.text]);

  const save = () => {
    updateItem(sectionId, item.id, value);
    setEditing(null);
  };

  return (
    <div ref={drag} className="p-2 border rounded-md bg-white">
      {editing && editing.sectionId === sectionId && editing.itemId === item.id ? (
        <div className="flex gap-2">
          <input
            className="flex-1 px-2 py-1 border rounded-md text-sm"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") save();
              if (e.key === "Escape") setEditing(null);
            }}
            autoFocus
          />
          <button onClick={save} className="px-2 py-1 border rounded-md text-sm">Save</button>
          <button onClick={() => setEditing(null)} className="px-2 py-1 border rounded-md text-sm">Cancel</button>
        </div>
      ) : (
        <div className="flex justify-between items-center gap-2">
          <div className="text-sm break-words">{item.text}</div>
          <div className="flex gap-2">
            <button onClick={() => setEditing({ sectionId, itemId: item.id })} className="px-2 py-1 text-xs border rounded-md">Edit</button>
            <button onClick={() => deleteItem(sectionId, item.id)} className="px-2 py-1 text-xs border rounded-md">Del</button>
          </div>
        </div>
      )}
    </div>
  );
}
