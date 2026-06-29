import paper from "../../../assets/img/paper.png";
import apply from "../../../assets/img/applied.png";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { gsap } from "../../../libs/gsap";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toggleHeader } from "../../../store/dashboardSlice";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../services/user";
export const Header = () => {
  const dispatch = useDispatch();
  const { showHeader, showRightbar } = useSelector((state) => state.dashboard);
  const { appearance } = useSelector((state) => state.preferences);
  const headerRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  }

  useEffect(() => {
    const path = location.pathname.split("/");
    const actualPath = path.at(-1);

    if (actualPath === "resumes") {
      dispatch(toggleHeader(false));
    }
    if (actualPath === "overview") {
      dispatch(toggleHeader(true));
    }
  }, [location, dispatch]);

  useEffect(() => {
    if (showHeader === false) {
      gsap.to(headerRef.current, {
        y: -250,
        display: "hidden",
        duration: 0.5,
        ease: "sine",
        opacity: 0,
        height: 0,
      });
    }

    if (showHeader === true) {
      gsap.to(headerRef.current, {
        y: 0,
        display: "flex",
        duration: 0.5,
        ease: "back.inOut",
        opacity: 1,
        height: "max-content",
      });
    }
  }, [showHeader]);

  return (
    <section
      ref={headerRef}
      className="flex flex-col pt-0  p-5 sm:p-10 sm:pr-0 sm:pt-5"
    >
      <h2
        className={`text-3xl font-garamond ${
          appearance.theme == "dark" ? "text-white" : "text-black"
        }`}
      >
        {getGreeting()}, {user?.name || "there"}
      </h2>
      <p
        className={`font-medium mt-1 text-xs font-satoshi ${
          appearance.theme == "dark" ? "text-zinc-500" : "text-black/40"
        }`}
      >
        A new day, a new opportunity! Let's create something new
      </p>

      <nav
        className={`flex flex-row  w-full h-37 mt-5 gap-5 overflow-x-auto pl-0  sm:px-0 ${
          !showRightbar && "sm:pr-20"
        }`}
      >
        <section
          onClick={() => navigate("/dashboard/templates")}
          className={`sm:w-full  min-w-70  border cursor-pointer transition-all duration-200 ${
            appearance.theme == "dark"
              ? "bg-[#1e1e1e] hover:bg-[#252525] border-zinc-800/60"
              : "bg-[#f8f8f8] hover:bg-gray-100 border-transparent"
          } overflow-hidden rounded-xl flex h-full p-2`}
        >
          <div
            className={`w-full ${
              appearance.theme == "dark" ? "text-white" : "text-black"
            } pl-5 py-2 font-semibold h-full flex flex-col justify-between rounded-l-[inherit]`}
          >
            <p>Help me build my resume</p>
            <p className={`text-xs text-gray-400`}>
              Start afresh or let Ai do the heavy lifting
            </p>
          </div>
          <div className="w-full px-5 relative rounded-r-[inherit]">
            <p className="absolute top-6 text-sm left-10 z-12 font-music font-light">
              Resume
            </p>
            <img
              src={paper}
              className="w-30 h-33 z-11 shadow-xl translate-y-6 absolute bottom-0"
              alt="paper"
            />

            <img
              src={paper}
              className="w-30 h-33 translate-x-5 shadow-xl translate-y-2 absolute bottom-0"
              alt="paper"
            />
          </div>
        </section>
        <section
          className={`sm:w-full min-w-70 sm:min-w-0 border cursor-pointer transition-all duration-200 overflow-hidden rounded-xl flex h-full p-2 ${
            appearance.theme == "dark"
              ? "bg-[#1e1e1e] hover:bg-[#252525] border-zinc-800/60"
              : "bg-[#f8f8f8] hover:bg-gray-100 border-transparent"
          }`}
        >
          <div
            className={`w-full pl-5 py-2 font-semibold h-full flex flex-col justify-between rounded-l-[inherit] ${
              appearance.theme == "dark" ? "text-white" : "text-black"
            }`}
          >
            <p>Help me craft a cover letter</p>
            <p
              className={`text-xs ${
                appearance.theme == "dark" ? "text-slate-400" : "text-gray-400"
              }`}
            >
              Generate a personalized cover letter based on the job.
            </p>
          </div>
          <div className="w-full px-5 relative rounded-r-[inherit]">
            <img
              src={paper}
              className="w-30 h-36 z-11 shadow-xl -rotate-35 translate-x-10 translate-y-6 absolute bottom-0"
              alt="paper"
            />

            <img
              src={paper}
              className="w-30 h-36 translate-x-15 shadow-xl translate-y-2 absolute bottom-0"
              alt="paper"
            />
          </div>
        </section>

        <section
          onClick={() => navigate("/dashboard/board")}
          className={`sm:w-full min-w-70 sm:min-w-0 border relative cursor-pointer transition-all duration-200 overflow-hidden rounded-xl flex h-full p-2 ${
            appearance.theme == "dark"
              ? "bg-[#1e1e1e] hover:bg-[#252525] border-zinc-800/60"
              : "bg-[#f8f8f8] hover:bg-gray-100 border-transparent"
          }`}
        >
          <div
            className={`w-full pl-5 py-2 font-semibold h-full flex flex-col justify-between rounded-l-[inherit] ${
              appearance.theme == "dark" ? "text-white" : "text-black"
            }`}
          >
            <p>View previous applications</p>
            <div className="bg-[#fcbe77] rounded-2xl flex justify-center items-center absolute top-15 right-10 text-white text-xs -rotate-12 p-2 z-5">
              Applied
            </div>
            <img
              src={apply}
              className=" h-auto shadow-xl translate-y-2 absolute bottom-0 w-50 flex items-center self-center object-cover"
              alt=""
            />
          </div>
        </section>
      </nav>
    </section>
  );
};
