import { useState } from "react";
import { ChevronDown, Plus, GripVertical, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSkill,
  removeSkill,
  updateSkill,
  reArrange,
} from "../../../store/credentialsSlice";
import { DragDropProvider } from "@dnd-kit/react";
import { Sortable } from "../../../components/dragger";

export default function Skills() {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.credentials.skills);
  const { appearance } = useSelector((state) => state.preferences);

  const handleDeleteSkill = (id) => {
    dispatch(removeSkill(id));
  };

  const handleAddField = () => {
    dispatch(addSkill());
  };

  const handleNameChange = (id, value) => {
    dispatch(updateSkill({ id, data: { name: value } }));
  };

  const handleDragEnd = (event) => {
    const { source } = event.operation;
    const { initialIndex, index } = source;
    if (initialIndex !== index) {
      const newItems = [...skills];
      const [removed] = newItems.splice(initialIndex, 1);
      newItems.splice(index, 0, removed);
      dispatch(reArrange({ category: "skills", value: newItems }));
    }
  };

  return (
    <section className="w-full">
      <DragDropProvider onDragEnd={handleDragEnd}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 py-4 cursor-pointer border-b transition-colors ${
            appearance.theme == "dark" ? "border-white/50" : "border-gray-200"
          }`}
        >
          <h2
            className={`text-lg font-bold flex items-center ${
              appearance.theme == "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            <span className="inline-block w-1 h-6 bg-[#f56010] mr-3"></span>
            Skills
          </h2>
          <button
            className={`p-1 rounded-lg transition-colors ${
              appearance.theme == "dark"
                ? "hover:bg-slate-700"
                : "hover:bg-gray-200"
            }`}
          >
            <ChevronDown
              size={20}
              className={`transition-transform duration-200 ${
                isOpen ? "rotate-0" : "-rotate-180"
              } ${appearance.theme == "dark" ? "text-white" : ""}`}
            />
          </button>
        </div>

        {isOpen && (
          <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-4 space-y-3">
            {skills.map((skill, index) => (
              <Sortable
                index={index}
                id={skill.id}
                key={skill.id}
                className={`rounded-xl overflow-hidden hover:shadow-sm transition-shadow ${
                  appearance.theme == "dark"
                    ? "border-0 bg-[#2a2a2a]"
                    : "border border-gray-200 bg-white"
                }`}
              >
                <div className="w-full flex items-center justify-between p-4 transition-colors gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <GripVertical
                      size={16}
                      className={`shrink-0 ${
                        appearance.theme == "dark"
                          ? "text-slate-400"
                          : "text-black"
                      }`}
                    />
                    <input
                      type="text"
                      value={skill.name || ""}
                      onChange={(e) =>
                        handleNameChange(skill.id, e.target.value)
                      }
                      placeholder="e.g. JavaScript, Project Management, Python..."
                      className={`w-full rounded-xl py-2 text-sm font-IBM border px-4 outline-none transition-all ${
                        appearance.theme == "dark"
                          ? "border-0 bg-[#202020] text-white placeholder:text-slate-500"
                          : "border-gray-200 bg-transparent text-gray-900 placeholder:text-gray-400"
                      }`}
                    />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSkill(skill.id);
                    }}
                    className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                      appearance.theme == "dark"
                        ? "text-slate-400 hover:bg-red-900/30"
                        : "text-red-500 hover:bg-red-50"
                    }`}
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </Sortable>
            ))}

            <button
              onClick={() => handleAddField()}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 border border-dashed rounded-xl cursor-pointer transition-colors text-sm ${
                appearance.theme == "dark"
                  ? "border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600"
                  : "border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
              }`}
            >
              <Plus size={18} />
              Add skill
            </button>
          </div>
        )}
      </DragDropProvider>
    </section>
  );
}
