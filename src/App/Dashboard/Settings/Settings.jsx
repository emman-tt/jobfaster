import React, { useState } from "react";
import { User, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import Notifications from "./Notifications";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  updateProfile as saveProfile,
  updateNotification as saveNotification,
} from "../../../services/settings";
import { fetchSettingsData } from "../../../services/user";
import { toast } from "sonner";

const SectionHeader = ({ title, description, children }) => {
  const { appearance } = useSelector((state) => state.preferences);
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-4 sm:py-6">
      <div className="space-y-1">
        <h1
          className={`text-xl sm:text-2xl font-bold font-satoshi ${
            appearance.theme === "dark" ? "text-white" : "text-slate-900"
          }`}
        >
          {title}
        </h1>
        <p
          className={`text-sm ${
            appearance.theme === "dark" ? "text-slate-400" : "text-slate-500"
          }`}
        >
          {description}
        </p>
      </div>
      {children}
    </div>
  );
};

const TabButton = ({ id, activeTab, setActiveTab, label, icon: Icon }) => {
  const { appearance } = useSelector((state) => state.preferences);
  return (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center justify-center gap-2 px-3 sm:px-5 py-2.5 rounded-lg text-sm font-medium transition-all flex-1 sm:flex-none ${
        activeTab === id
          ? "bg-[#f17e27] text-white shadow-sm"
          : appearance.theme === "dark"
            ? "text-slate-400 hover:text-white"
            : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );
};

export default function Settings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const queryClient = useQueryClient();
  const { appearance } = useSelector((state) => state.preferences);
  const [file, setFile] = useState(null);
  const { data } = useQuery({
    queryKey: ["settings"],
    queryFn: () => fetchSettingsData(),
  });

  const profileData = {
    userName: data?.user?.name || "",
    email: data?.user?.email || "",
    image: data?.user?.image || null,
  };

  const notificationData = {
    aiOptimizationComplete: !!data?.aiTailoringComplete,
    emailSentFailed: !!data?.jobEmailSendAlert,
    newJobs: !!data?.newJobsAlert,
  };

  const apiFieldMap = {
    aiOptimizationComplete: "aiTailoringComplete",
    emailSentFailed: "jobEmailSendAlert",
    newJobs: "newJobsAlert",
  };

  function updateProfile(username, email) {
    queryClient.setQueryData(["settings"], (old) => {
      if (!old) return old;
      return { ...old, user: { ...old.user, name: username, email } };
    });
  }

  function updatePhoto(dataUrl) {
    queryClient.setQueryData(["settings"], (old) => {
      if (!old) return old;
      return { ...old, user: { ...old.user, image: dataUrl } };
    });
  }

  function updatePhotoRemove() {
    queryClient.setQueryData(["settings"], (old) => {
      if (!old) return old;
      const user = { ...old.user };
      delete user.image;
      return { ...old, user };
    });
  }

  function updateNotification(key) {
    const apiField = apiFieldMap[key];
    queryClient.setQueryData(["settings"], (old) => {
      if (!old) return old;
      return { ...old, [apiField]: !old[apiField] };
    });
  }

  async function handleSaveChanges() {
    const current = queryClient.getQueryData(["settings"]);
    if (!current) return;

    try {
      if (activeTab == "profile") {
        const formdata = new FormData();
        formdata.append("name", current.user?.name);
        formdata.append("email", current.user?.email);
        formdata.append("file", file);
        await saveProfile(formdata);
      } else {
        await saveNotification({
          aiTailoringComplete: current.aiTailoringComplete,
          jobEmailSendAlert: current.jobEmailSendAlert,
          newJobsAlert: current.newJobsAlert,
        });
      }

      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success("Settings saved successfully");
    } catch (err) {
      console.error("Failed to save settings:", err);
      toast.error("Failed to save settings");
    }
  }

  function handleCancel() {
    queryClient.invalidateQueries({ queryKey: ["settings"] });
    navigate("/dashboard");
  }

  return (
    <section
      className={`w-full h-screen overflow-y-auto [scrollbar-width:none] p-4 sm:p-6 lg:p-12 ${
        appearance.theme === "dark" ? "bg-[#151515]" : "bg-white"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          title="Settings"
          description="Manage your account and preferences."
        >
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleSaveChanges}
              className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-lg transition-colors bg-[#f17e27] text-white shadow-sm ${
                appearance.theme === "dark"
                  ? "text-slate-300 "
                  : "text-slate-600 "
              }`}
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                appearance.theme === "dark"
                  ? "text-slate-300 hover:bg-slate-800"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Cancel
            </button>
          </div>
        </SectionHeader>

        <div
          className={`flex gap-1 p-1 rounded-xl w-full sm:w-fit mb-8 ${
            appearance.theme === "dark"
              ? "bg-[#202020]"
              : "bg-slate-100/80 border border-slate-200"
          }`}
        >
          <TabButton
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            id="profile"
            label="Profile"
            icon={User}
          />
          <TabButton
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            id="notifications"
            label="Notifications"
            icon={Bell}
          />
        </div>

        {activeTab === "profile" && (
          <Profile
            profile={profileData}
            onUpdateProfile={updateProfile}
            onPhotoUpload={updatePhoto}
            setFile={setFile}
            onRemovePhoto={updatePhotoRemove}
          />
        )}
        {activeTab === "notifications" && (
          <Notifications
            data={notificationData}
            toggleNotification={updateNotification}
          />
        )}
      </div>
    </section>
  );
}
