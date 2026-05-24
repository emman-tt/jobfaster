import { useSelector } from "react-redux";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDown, Plus, Filter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header({ isFetching }) {
  const { appearance } = useSelector((state) => state.preferences);

  return (
    <div
      className={`w-full border-b px-4 sm:px-8 pt-5 sm:pt-8 pb-5 relative transition-all duration-200 ${
        appearance.theme === "dark"
          ? "bg-[#1e1e1e] border-zinc-800"
          : "bg-white border-gray-300"
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
        <div>
          <h1
            className={`text-xl sm:text-2xl font-bold leading-tight ${
              appearance.theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Jobs
          </h1>
          <p
            className={`text-sm mt-0.5 ${
              appearance.theme === "dark" ? "text-zinc-500" : "text-gray-400"
            }`}
          >
            Keep track of your applied jobs all in one place
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Add Job Button */}
          <Link
            to={"/dashboard/job"}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all cursor-pointer ${
              appearance.theme === "dark"
                ? "bg-orange-600 hover:bg-orange-500"
                : "bg-[#0f172a] hover:bg-[#1e293b]"
            }`}
          >
            <Plus className="w-4 h-4" />
            Add Job
          </Link>
        </div>
      </div>

      {isFetching && (
        <div className="custom-loader absolute bottom-0 left-0 right-0 w-full"></div>
      )}
    </div>
  );
}
