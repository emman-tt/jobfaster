import { X } from "lucide-react";
import { templates } from "../../libs/templatesData";

export default function TemplateSelector({
  isOpen,
  onClose,
  onSelect,
  selectedTemplate,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-[90vw] max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-semibold font-satoshi text-slate-800">
              Choose a Template
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Select a layout structure for your resume
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => {
                  onSelect(template.id);
                  onClose();
                }}
                className={`cursor-pointer ${
                  selectedTemplate === template.id
                    ? "ring-2 ring-orange-500 ring-offset-2 rounded-xl"
                    : ""
                }`}
              >
                <div className="relative rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                  <div className="h-60 sm:h-74 p-1">
                    <img
                      src={template.thumbnail}
                      alt={template.name}
                      className="w-full object-cover h-full"
                    />
                  </div>
                </div>
                <p
                  className={`text-sm font-satoshi font-medium text-center mt-2 ${
                    selectedTemplate === template.id
                      ? "text-orange-600"
                      : "text-slate-600"
                  }`}
                >
                  {template.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
