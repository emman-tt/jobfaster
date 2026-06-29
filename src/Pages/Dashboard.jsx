import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import Sidebar from "../App/Dashboard/Sidebar";
import { useSelector } from "react-redux";
import Overlay from "../components/Overlay";
import Resume from "../App/Dashboard/Overview/Modals/Resume";
import { toggleRightbar } from "../store/dashboardSlice";
import UploadFile from "../App/Dashboard/Overview/Modals/UploadFile";
import Folder from "../App/Dashboard/Overview/Modals/Folder";
import Rightbar from "../App/Dashboard/Rightbar/Rightbar";
import { Menu, X, PanelLeftOpenIcon, PanelRightOpenIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import SelectResume from "../App/Dashboard/Job/Modals/SelectResume";
import { onJobApply, onSendJobMail } from "../services/useSocket";

import { dumpEmailDetails } from "../store/emailSlice";
import { saveTailoredResume } from "../store/aiSlice";
import { toast } from "sonner";
import { toastPresets } from "../components/toasters";
import FileDetails from "../App/Dashboard/Overview/Modals/FileDetails";
import ErrorBoundary from "../components/ErrorBoundary";

import { useQuery } from "@tanstack/react-query";
import { getActivity } from "../services/activity";

export default function Dashboard() {
  const { modals } = useSelector((state) => state.modal);
  const { showRightbar } = useSelector((state) => state.dashboard);
  const { appearance } = useSelector((state) => state.preferences);
  const { tailoredResume } = useSelector((state) => state.ai);
  const location = useLocation();
  const actualPath = location.pathname.split("/").at(-1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [pendingApplication, setPendingApplication] =
    useState(!!tailoredResume);

  function openRightbar() {
    dispatch(toggleRightbar(true));
  }
  function closeRightbar() {
    dispatch(toggleRightbar(false));
  }

  useEffect(() => {
    onJobApply((data) => {
      toast.dismiss("ai-processing");
      const status = data?.status;
      const response = data?.response;
      const message = data?.message;

      if (message == "APPLICATION_LIMIT_EXCEEDED") {
        toast.error("Weekly Application Limit Reached", {
          id: "ai-limit",
          ...toastPresets.generalError(
            "You've hit your weekly job application limit. Upgrade to increase your limit.",
          ),
        });
        return;
      }

      if (status == "success") {
        toast.success("Ready!", {
          ...toastPresets.aiSuccess(
            "Resume processed successfully! Redirecting you to your tailored resume...",
          ),
          id: "ai-success",
          position: "top-right",
        });
        dispatch(dumpEmailDetails(response.email));
        dispatch(saveTailoredResume(response));
        setPendingApplication(true);
        navigate("finalize");
        return;
      }

      toastPresets.aiError();
    });
  }, [dispatch, navigate]);

  useEffect(() => {
    onSendJobMail((data) => {
      if (data) {
        const status = data?.status;

        if (!status) {
          return;
        }

        console.log(data, status);

        if (status == "success") {
          setPendingApplication(false);
          toast.dismiss("job-mail");
          navigate("/dashboard/board", { state: { emailSent: true } });
          return;
        }

        if (status == "failed") {
          toast.dismiss("job-mail");
          toast.error("Unable to send mail!", {
            ...toastPresets.generalError(
              "Failed to process and send email. Please try again.",
            ),
            id: "job-mail",
            position: "top-right",
          });
          return;
        }
      }
    });
  }, [navigate]);

  const [activityPage, setActivityPage] = useState(1);
  const [allActivities, setAllActivities] = useState([]);
  const [activityMeta, setActivityMeta] = useState({
    total: 0,
    hasMore: false,
  });

  const { data, isFetched } = useQuery({
    queryKey: ["activity", 1],
    queryFn: () => getActivity(1, 20),
    staleTime: 3 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (isFetched && data?.data) {
      const pageData = data.data;
      setAllActivities(pageData.data || []);
      setActivityMeta({ total: pageData.total, hasMore: pageData.hasMore });
      setActivityPage(1);
    }
  }, [isFetched, data]);

  const loadMoreActivity = useCallback(async () => {
    const nextPage = activityPage + 1;
    const res = await getActivity(nextPage, 20);
    const pageData = res.data;
    setAllActivities((prev) => [...prev, ...(pageData.data || [])]);
    setActivityMeta({ total: pageData.total, hasMore: pageData.hasMore });
    setActivityPage(nextPage);
  }, [activityPage]);

  const activityItems = allActivities;
  const activityTotal = activityMeta.total;
  const hasMoreActivity = activityMeta.hasMore;

  return (
    <ErrorBoundary>
      <section
        className={`flex relative ${
          appearance.theme == "dark" ? "bg-[#202020]" : "bg-white"
        }  overflow-hidden   w-full h-screen `}
      >
        {/* Desktop sidebar */}
        <Sidebar
          className={`hidden xl:flex w-70 ${
            appearance.theme == "dark" ? "bg-[#2a2a2a]" : "bg-[#f8f8f8]"
          } p-5`}
        />

        <section
          className="  w-full  relative     
        sm:h-full sm:border-0 max-sm:border-b max-sm:py-4 border-white min-w-0"
        >
          {/* Mobile hamburger */}
          <button
            onClick={() => setShowMobileSidebar(true)}
            className={`xl:hidden absolute bottom-10 
              right-5 md:right-10 md:bottom-30 md:p-6 p-4  border-black/30 border  rounded-full shadow-md  z-20 cursor-pointer ${
                appearance.theme == "dark"
                  ? "text-white  bg-black"
                  : "text-black bg-white"
              }`}
          >
            <Menu className={`sm:w-6 sm:h-6 md:h-10 md:w-10 w-8 h-8`} />
          </button>

          {actualPath == "overview" && (
            <button
              onClick={() => {
                showRightbar ? closeRightbar() : openRightbar();
              }}
              className={`absolute right-3 max-sm:p-0  max-sm:rounded-full  md:right-10 top-5 z-20 cursor-pointer ${
                appearance.theme == "dark" ? "text-white" : "text-black"
              }`}
            >
              {showRightbar ? (
                <PanelLeftOpenIcon className="sm:w-6 sm:h-6" />
              ) : (
                <PanelRightOpenIcon className="sm:w-6 sm:h-6  w-7 h-7" />
              )}
            </button>
          )}
          {pendingApplication && actualPath !== "finalize" && (
            <div
              className={`flex items-center justify-between px-4 sm:px-6 py-3 ${appearance.theme == "dark" ? "bg-orange-600/20 text-orange-300" : "bg-orange-50 text-orange-700"} border-b ${appearance.theme == "dark" ? "border-orange-700/30" : "border-orange-200"}`}
            >
              <p className="text-sm font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                You have an application to complete
              </p>
              <div className="flex items-center gap-3">
                <Link
                  to="finalize"
                  className="text-xs font-bold px-3 py-1.5 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors"
                >
                  Complete Now
                </Link>
                <button
                  onClick={() => setPendingApplication(false)}
                  className={`p-1 rounded-full transition-colors ${appearance.theme == "dark" ? "hover:bg-orange-700/30" : "hover:bg-orange-100"}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
          <Outlet />
        </section>

        {/* Mobile sidebar overlay */}
        {showMobileSidebar && (
          <div className="fixed inset-0 z-50 xl:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowMobileSidebar(false)}
            />
            <aside
              className={`absolute left-0 top-0 bottom-0 w-70 p-5 overflow-y-auto ${
                appearance.theme == "dark" ? "bg-[#2a2a2a]" : "bg-[#f8f8f8]"
              }`}
            >
              <Sidebar className="" />
            </aside>
          </div>
        )}

        {showRightbar &&
          (actualPath == "resumes" || actualPath == "overview") && (
            <>
              {/* Mobile overlay */}
              <div className="fixed inset-0 z-50 " onClick={closeRightbar}>
                <div className="absolute inset-0 bg-black/50" />
                <aside
                  className={`absolute right-0 top-0 bottom-0 w-80 md:w-100 h-screen xl:w-120 transition-all duration-200 rounded-xl shadow-[#23232389] shadow-sm ${
                    appearance.theme == "dark" ? "bg-[#2a2a2a]" : "bg-white"
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Rightbar
                    data={activityItems}
                    total={activityTotal}
                    hasMore={hasMoreActivity}
                    onLoadMore={loadMoreActivity}
                    className="h-full pb-50"
                  />
                </aside>
              </div>
            </>
          )}

        {modals.selectResume && (
          <>
            <Overlay
              className={` ${
                appearance.theme == "dark" ? "bg-[#00000000]" : "bg-[#e0e4e582]"
              } backdrop-blur-sm`}
            />
            <SelectResume />
          </>
        )}
        {modals.resume && (
          <>
            <Overlay
              className={` ${
                appearance.theme == "dark" ? "bg-[#00000000]" : "bg-[#e0e4e582]"
              } backdrop-blur-sm`}
            />
            <Resume />
          </>
        )}
        {modals.uploadFile && (
          <>
            <Overlay
              className={` ${
                appearance.theme == "dark" ? "bg-[#00000000]" : "bg-[#e0e4e582]"
              } backdrop-blur-sm`}
            />
            <UploadFile />
          </>
        )}
        {modals.folder && (
          <>
            <Overlay
              className={` ${
                appearance.theme == "dark" ? "bg-[#00000000]" : "bg-[#e0e4e582]"
              } backdrop-blur-sm`}
            />
            <Folder />
          </>
        )}
        {modals.fileDetails && (
          <>
            <Overlay
              className={` ${
                appearance.theme == "dark" ? "bg-[#00000000]" : "bg-[#e0e4e582]"
              } backdrop-blur-sm`}
            />
            <FileDetails />
          </>
        )}
      </section>
    </ErrorBoundary>
  );
}
