import { useDispatch, useSelector } from "react-redux";
import {
  toggleModals,
  clearRenameTarget,
} from "../../../../store/modalSlice";
import { useState } from "react";
import { toast } from "sonner";
import { toastPresets } from "../../../../components/toasters";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { renameProgram } from "../../../../services/Program";

export default function Rename() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { appearance } = useSelector((state) => state.preferences);
  const { renameTarget } = useSelector((state) => state.modal);
  const [name, setName] = useState(renameTarget?.name || "");

  function closeModal() {
    dispatch(clearRenameTarget());
    dispatch(toggleModals("rename"));
  }

  const mutation = useMutation({
    mutationFn: renameProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["program"] });
      queryClient.invalidateQueries({ queryKey: ["activity"] });
      toast.success(`Renamed successfully to ${name}`, {
        ...toastPresets.generalSuccess(),
      });
      closeModal();
    },
    onError: () => {
      toast.error("Failed to rename", {
        ...toastPresets.generalError("Please try again"),
      });
    },
  });

  function handleSave() {
    if (!name.trim()) {
      return toast.error("Error saving name", {
        ...toastPresets.generalError("Name cannot be empty"),
        position: "top-center",
      });
    }
    mutation.mutate({
      id: renameTarget.id,
      name: name.trim(),
      type: renameTarget.type,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={closeModal} />
      <div
        className={`relative w-80 rounded-2xl shadow-xl p-6 ${
          appearance.theme == "dark" ? "bg-[#2a2a2a]" : "bg-white"
        }`}
      >
        <h3
          className={`text-lg font-semibold mb-4 font-IBM ${
            appearance.theme == "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Rename {renameTarget?.type}
        </h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New name"
          autoFocus
          className={`w-full px-4 py-3 rounded-xl border outline-none mb-4 focus:outline-none focus:ring-2 focus:ring-[#f17e27] focus:border-[#f17e27] ${
            appearance.theme == "dark"
              ? "bg-[#1a1a1a] border-slate-600 text-white placeholder:text-slate-500"
              : "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400"
          }`}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
        />
        <div className="flex gap-3">
          <button
            onClick={closeModal}
            className={`flex-1 px-4 py-2.5 rounded-xl font-medium transition-colors ${
              appearance.theme == "dark"
                ? "bg-slate-700 text-white hover:bg-slate-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim() || mutation.isPending}
            className="flex-1 px-4 py-2.5 rounded-xl font-medium bg-[#f17e27] text-white hover:bg-[#e16d16] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
