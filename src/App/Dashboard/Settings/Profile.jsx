import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Github, Linkedin, Mail, Upload, Trash2 } from "lucide-react";
import SettingRow from "./components/SettingRow";

export default function Profile({
  profile,
  onUpdateProfile,
  onPhotoUpload,
  onRemovePhoto,
  setFile,
}) {
  const { appearance } = useSelector((state) => state.preferences);
  const fileInputRef = useRef(null);
  const [userName, setUserName] = useState(profile.userName);
  const [email, setEmail] = useState(profile.email);
  const [photo, setPhoto] = useState(profile.image);

  function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      // console.log('photoUrl', dataUrl)
      setPhoto(dataUrl);
      onPhotoUpload(file);
    };

    reader.readAsDataURL(file);
    setFile(file);
  }

  function handleRemovePhoto() {
    setPhoto(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onRemovePhoto();
  }

  function handleUserNameChange(e) {
    const val = e.target.value;
    setUserName(val);
    onUpdateProfile(val, email);
  }

  function handleEmailChange(e) {
    const val = e.target.value;
    setEmail(val);
    onUpdateProfile(userName, val);
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        className="hidden"
      />

      <SettingRow
        label="Profile Photo"
        description="This image will be displayed on your public profile and resumes."
        border={false}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="w-20 h-20 bg-[#fff7ed] rounded-2xl flex items-center justify-center border-2 border-dashed border-[#f17e27]/30 overflow-hidden shrink-0">
            {profile?.image && (
              <img
                src={profile?.image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                  appearance.theme === "dark"
                    ? "bg-[#2A2A2A] border-0 text-white hover:bg-slate-800"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Upload size={16} />
                Upload Photo
              </button>
              <button
                type="button"
                onClick={handleRemovePhoto}
                className={`p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border ${
                  appearance.theme === "dark"
                    ? "border-transparent hover:bg-red-500/10"
                    : "border-transparent hover:border-red-100"
                }`}
              >
                <Trash2 size={18} />
              </button>
            </div>
            <p
              className={`text-xs ${
                appearance.theme === "dark"
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        </div>
      </SettingRow>

      <SettingRow
        label="Personal Information"
        description="Update your basic profile information such as your name and email."
      >
        <div className="space-y-4 max-w-xl">
          <div className="space-y-1.5">
            <label
              className={`text-sm font-medium ${
                appearance.theme === "dark"
                  ? "text-slate-300"
                  : "text-slate-700"
              }`}
            >
              Username
            </label>
            <input
              type="text"
              value={userName}
              onChange={handleUserNameChange}
              placeholder="emmanuel_acquah"
              className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all text-sm ${
                appearance.theme === "dark"
                  ? "bg-[#2A2A2A] border-0 text-white placeholder:text-slate-500"
                  : "bg-white border-slate-200 text-slate-900"
              }`}
            />
          </div>

   
        </div>
      </SettingRow>

      <SettingRow
        label="Connected Accounts"
        description="Manage your connected social accounts and sign-in methods."
      >
        <div className="space-y-3 max-w-xl">
          {[
            {
              id: "google",
              name: "Google",
              email: "emmanuelacquah.dev@gmail.com",
              connected: true,
              icon: <span className="text-red-500 text-sm font-bold">G</span>,
              bgColor: "bg-red-50",
            },
            {
              id: "github",
              name: "GitHub",
              email: "Not connected",
              connected: false,
              icon: <Github size={16} className="text-slate-700" />,
              bgColor: "bg-slate-100",
            },
            {
              id: "linkedin",
              name: "LinkedIn",
              email: "emmanuelacquah",
              connected: true,
              icon: <Linkedin size={16} className="text-blue-600" />,
              bgColor: "bg-blue-50",
            },
          ].map((account) => (
            <div
              key={account.id}
              className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl border ${
                appearance.theme === "dark"
                  ? "bg-[#2A2A2A] border-0"
                  : "bg-white border-slate-100 shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${account.bgColor}`}
                >
                  {account.icon}
                </div>
                <div>
                  <p
                    className={`text-sm font-medium ${
                      appearance.theme === "dark"
                        ? "text-white"
                        : "text-slate-800"
                    }`}
                  >
                    {account.name}
                  </p>
                  <p
                    className={`text-xs ${
                      appearance.theme === "dark"
                        ? "text-slate-400"
                        : "text-slate-500"
                    }`}
                  >
                    {account.email}
                  </p>
                </div>
              </div>
              <button
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  account.connected
                    ? appearance.theme === "dark"
                      ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    : "bg-[#f17e27] text-white hover:bg-[#e16d16]"
                }`}
              >
                {account.connected ? "Disconnect" : "Connect"}
              </button>
            </div>
          ))}
        </div>
      </SettingRow>
    </div>
  );
}
