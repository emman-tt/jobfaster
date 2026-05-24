import {
  ArrowUpDown,
  BadgePlus,
  Blocks,
  CircleEllipsis,
  CreditCard,
  IceCream2Icon,
  Layers,
  Mail,
  Newspaper,
  PanelLeftClose,
  PlusCircle,
  Settings,
  User2,
  ListCollapse,
  SquarePen,
  ScanEye,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/user";
import UserMenu from "./UserMenu";
import JobFasterLogo from "../../assets/branding";

export default function Sidebar({ className }) {
  const pathname = useLocation().pathname;
  const { appearance } = useSelector((state) => state.preferences);
  const actualPath = pathname.split("/").at(-1);
  const isActive =
    processes.find((item) => item.href.includes(actualPath))?.id ||
    tools.find((item) => item.href.includes(actualPath))?.id;

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <section className={`flex flex-col h-full ${className}`}>
      <div className="flex-1">
        <section
          className={`w-full flex justify-between items-center rounded-xl text-xs p-2 `}
        >
          <div className="flex items-center gap-2">
             <JobFasterLogo variant={appearance?.theme === "dark" ? "dark" : "light"} size={40} />
             <p className={`text-lg ${appearance.theme == 'dark' ? 'text-white' : 'text-black'} font-semibold font-IBM`}>Jobfaster</p>
          </div>
        </section>

        <section className="flex flex-col w-full p-2 mt-5 gap-2">
          {processes.map((item) => (
            <NavLink
              to={item.href}
              key={item.id}
              style={{
                backgroundColor:
                  item.id === isActive
                    ? appearance.theme == "dark"
                      ? "rgba(255, 255, 255, 0.08)"
                      : "#e6e8ec"
                    : appearance.theme == "dark"
                      ? "transparent"
                      : "inherit",
              }}
              className={`flex gap-3 rounded-xl p-2 items-center transition-all ${
                item.id === isActive
                  ? appearance.theme == "dark"
                    ? "border-l-[3px] border-orange-500 pl-1.5 font-medium text-orange-400 bg-white/5"
                    : "border-l-[3px] border-orange-500 pl-1.5 font-medium text-orange-600 bg-black/5"
                  : appearance.theme == "dark"
                    ? "text-white hover:bg-white/5"
                    : "text-black hover:bg-black/5"
              }`}
            >
              <span>{item.icon}</span>
              <p className="text-sm font-IBM text-[12px]">{item.name}</p>
            </NavLink>
          ))}
        </section>
        <section
          className={`flex flex-col w-full border-t pt-7 p-2 mt-5 gap-2 ${
            appearance.theme == "dark" ? "border-zinc-800" : "border-gray-700"
          }`}
        >
          {tools.map((item) => (
            <NavLink
              style={{
                backgroundColor:
                  item.id === isActive
                    ? appearance.theme == "dark"
                      ? "rgba(255, 255, 255, 0.08)"
                      : "#e6e8ec"
                    : appearance.theme == "dark"
                      ? "transparent"
                      : "inherit",
              }}
              to={item.href}
              key={item.id}
              className={`flex gap-3 rounded-xl p-2 items-center transition-all ${
                item.id === isActive
                  ? appearance.theme == "dark"
                    ? "border-l-[3px] border-orange-500 pl-1.5 font-medium text-orange-400 bg-white/5"
                    : "border-l-[3px] border-orange-500 pl-1.5 font-medium text-orange-600 bg-black/5"
                  : appearance.theme == "dark"
                    ? "text-white hover:bg-white/5"
                    : "text-black hover:bg-black/5"
              }`}
            >
              <span>{item.icon}</span>
              <p className="text-sm font-IBM text-[12px]">{item.name}</p>
            </NavLink>
          ))}
        </section>
      </div>

      <div className="flex flex-col gap-4">
        <div className="px-2  flex flex-col gap-3">
          {bottom.map((item) => {
            const isBottomActive = item.href && pathname.includes(item.href);
            return (
              <NavLink
                to={item.href || "#"}
                key={item.id}
                style={{
                  backgroundColor:
                    isBottomActive
                      ? appearance.theme == "dark"
                        ? "rgba(255, 255, 255, 0.08)"
                        : "#e6e8ec"
                      : appearance.theme == "dark"
                        ? "transparent"
                        : "inherit",
                }}
                className={`flex gap-3 rounded-xl p-2 items-center transition-all ${
                  isBottomActive
                    ? appearance.theme == "dark"
                      ? "border-l-[3px] border-orange-500 pl-1.5 font-medium text-orange-400 bg-white/5"
                      : "border-l-[3px] border-orange-500 pl-1.5 font-medium text-orange-600 bg-black/5"
                    : appearance.theme == "dark"
                      ? "text-white hover:bg-white/5"
                      : "text-black hover:bg-black/5"
                }`}
              >
                <span>{item.icon}</span>
                <p className="text-sm font-IBM text-[12px]">{item.name}</p>
              </NavLink>
            );
          })}
        </div>
        <UserMenu data={data} appearance={appearance} />
      </div>
    </section>
  );
}

const processes = [
  {
    id: 1,
    name: "Overview",
    icon: <Blocks className="w-4 h-4" />,
    href: "overview",
  },
  {
    id: 2,
    name: "My Resumes",
    icon: <Newspaper className="w-4 h-4" />,
    href: "resumes",
  },
  {
    id: 3,
    name: "Daily jobs",
    icon: <Layers className="w-4 h-4" />,
    href: "listing",
  },
  {
    id: 4,
    name: "Apply for  job",
    icon: <BadgePlus className="w-4 h-4" />,
    href: "job",
  },
  {
    id: 5,
    name: "Job Board",
    icon: <ListCollapse className="w-4 h-4" />,
    href: "board",
  },
  {
    id: 6,
    name: "Create Resume",
    icon: <SquarePen className="w-4 h-4" />,
    href: "templates",
  },
];

const tools = [
  {
    id: 7,
    name: "Preferences",
    icon: <ScanEye className="w-4 h-4" />,
    href: "preference",
  },
  {
    id: 8,
    name: "Settings",
    icon: <Settings className="w-4 h-4" />,
    href: "settings",
  },
  // {
  //   id: 9,
  //   name: 'Billings',
  //   icon: <CreditCard className='w-4 h-4' />,
  //   href: 'billings'
  // },
  {
    id: 10,
    name: "FAQ",
    icon: <CircleEllipsis className="w-4 h-4" />,
    href: "faq",
  },
];

const bottom = [];
