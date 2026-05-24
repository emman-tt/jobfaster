import { useState } from "react";
import { ArrowUpDown, User2, Settings, Zap, LogOut } from "lucide-react";
import useClickOutside from "../../hooks/useClick";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

export default function UserMenu({ data, appearance }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useClickOutside(() => setIsOpen(false));
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div ref={menuRef} className="relative w-full">
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-full bg-white border border-gray-200 rounded-2xl shadow-lg p-2 z-50 flex flex-col gap-1">
          <button
            onClick={() => {
              setIsOpen(false);
              navigate("settings");
            }}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition-colors text-black text-sm font-medium w-full text-left"
          >
            <User2 className="w-4 h-4" />
            <span>View profile</span>
          </button>

          <button
            onClick={() => {
              setIsOpen(false);
              navigate("settings");
            }}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition-colors text-black text-sm font-medium w-full text-left"
          >
            <Settings className="w-4 h-4" />
            <span>Account settings</span>
          </button>

          <button
            onClick={() => {
              setIsOpen(false);
              navigate('billings')
            }}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition-colors text-black text-sm font-medium w-full text-left"
          >
            <Zap className="w-4 h-4" />
            <span>Billing and Payment</span>
          </button>

          <div className="h-px bg-gray-200 my-1 mx-2" />

          <button
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition-colors text-black text-sm font-medium w-full text-left justify-between"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-4 h-4" />
              <span>Log out</span>
            </div>
            <span className="text-gray-400 text-xs">v4.2</span>
          </button>
        </div>
      )}

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex gap-3 px-2 rounded-xl py-3 items-center cursor-pointer transition-all border ${
          appearance.theme == "dark"
            ? "bg-[#1e1e1e] hover:bg-[#282828] border-zinc-800"
            : "bg-[#e8e7ea] hover:bg-[#dcdce0] border-transparent"
        }`}
      >
        <div
          className={`w-[30%] p-1 rounded-xl flex justify-center items-center ${
            appearance.theme == "dark" ? "bg-[#202020]" : "bg-white"
          }`}
        >
          {data?.image ? (
            <div className="w-full h-full">
              <img
                src={data?.image}
                className="w-full h-full object-cover rounded-md"
                alt="User"
              />
            </div>
          ) : (
            <User2
              className={`w-6 h-6 ${
                appearance.theme == "dark" ? "text-white" : "text-black"
              }`}
            />
          )}
        </div>
        <div
          className={`flex w-[60%] flex-col text-xs ${
            appearance.theme == "dark" ? "text-white" : "text-black"
          }`}
        >
          <p className="font-satoshi font-semibold">{data?.name || "User"}</p>
          <p className="truncate">{data?.email || "user@example.com"}</p>
        </div>
        <div className="w-[20%] flex justify-end pr-1">
          <ArrowUpDown
            className={`h-4 w-4 ${
              appearance.theme == "dark" ? "text-white" : "text-black"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
