"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2 } from "lucide-react";
import { useState } from "react";

function ImageGallery({ images, colorName, onReorder, onDelete }) {
  const [items, setItems] = useState(
    [...images].sort((a, b) => (a.sort_order ?? 9999) - (b.sort_order ?? 9999))
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);

    const newItems = arrayMove(items, oldIndex, newIndex);
    setItems(newItems);

    await onReorder(newItems);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-[#444]">
        Images for <span className="text-[#e89ac7]">{colorName}</span>
      </p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid grid-cols-6 gap-3">
            {items.map((image) => (
              <SortableThumb key={image.id} image={image} onDelete={onDelete} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function SortableThumb({ image, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative rounded-xl overflow-hidden bg-[#fff8fc] border border-[#f7dce9] shadow-sm"
    >
      <img src={image.image_url} className="h-32 w-full object-cover" />

      <button
        {...attributes}
        {...listeners}
        className="absolute left-1 top-1 bg-white/80 text-[10px] px-2 py-1 rounded-full border border-[#f7dce9] shadow-sm"
      >
        drag
      </button>

      <button
        onClick={() => onDelete(image.id)}
        className="absolute right-1 top-1 bg-white/90 p-1 rounded-full text-red-500 shadow-sm"
      >
        <Trash2 className="h-3 w-3" />
      </button>
    </div>
  );
}

export default ImageGallery;
