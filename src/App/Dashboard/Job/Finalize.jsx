import { useState, useEffect, useCallback } from "react";
import {
  Mail,
  User,
  Send,
  Type,
  Edit3,
  Eye,
  FileText,
  RotateCcw,
  Loader2,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { saveEmailDetails } from "../../../store/emailSlice";
import { saveJobDetails, savePdfUrl } from "../../../store/aiSlice";
import { loadResumeData as loadPersonal } from "../../../store/personalSlice";
import { loadResumeData as loadWork } from "../../../store/workSlice";
import { loadResumeData as loadEducation } from "../../../store/educationSlice";
import { loadResumeData as loadCredentials } from "../../../store/credentialsSlice";
import { generateTailoredResumePDF } from "../../../utils/renderResume";
import { toast } from "sonner";
import SendMethodModal from "./Modals/SendMethod";
import { useQueryClient } from "@tanstack/react-query";
import { toastPresets } from "../../../components/toasters";
import { sendMessage } from "../../../services/useSocket";
import { connector } from "../../../services/useSocket";
import { useNavigate } from "react-router-dom";
function GetFileIcon() {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>
  );
}

function AttachedFiles({ file, onSelectFile, isGenerating, onEdit }) {
  const { appearance } = useSelector((state) => state.preferences);

  if (!file) {
    return (
      <div className="space-y-2 mt-4 pointer-events-auto">
        <h4
          className={`text-xs font-bold uppercase tracking-wider ${appearance.theme == "dark" ? "text-white/60" : "text-slate-500"}`}
        >
          Attached Files
        </h4>
        <p
          className={`text-xs ${appearance.theme == "dark" ? "text-white/40" : "text-gray-400"}`}
        >
          {isGenerating ? "Generating Resume..." : "No files attached"}
        </p>
      </div>
    );
  }

  const btnBase = `p-2 rounded-lg transition-colors ${
    appearance.theme == "dark"
      ? "hover:bg-[#252525] text-white/60 hover:text-white"
      : "hover:bg-gray-100 text-gray-400 hover:text-slate-700"
  }`;

  return (
    <div className="space-y-2 mt-4 pointer-events-auto">
      <h4
        className={`text-xs font-bold uppercase tracking-wider ${appearance.theme == "dark" ? "text-white/60" : "text-slate-500"}`}
      >
        {isGenerating ? "Generating Resume..." : "Attached Files"}
      </h4>
      <div className="space-y-1">
        <div
          onClick={() => onSelectFile(file)}
          className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all 
            ${
              appearance.theme == "dark"
                ? "bg-[#202020] hover:bg-[#252525]"
                : "bg-gray-50 hover:bg-gray-100"
            }
          `}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                appearance.theme == "dark" ? "bg-[#2a2a2a]" : "bg-gray-200"
              }`}
            >
              <GetFileIcon />
            </div>
            <div>
              <h3
                className={`text-sm font-medium truncate max-w-40 ${
                  appearance.theme == "dark" ? "text-white" : "text-slate-900"
                }`}
              >
                {file.metaData?.name}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(file);
              }}
              className={btnBase}
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Finalize() {
  const { emailDetails } = useSelector((state) => state.email);
  const { job, tailoredResume, pdfUrl } = useSelector((state) => state.ai);
  const { appearance } = useSelector((state) => state.preferences);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userEmail: "",
    userName: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showSendMethodModal, setShowSendMethodModal] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);

  const resumeData = tailoredResume?.resume;
  const templateName = tailoredResume?.template;
  const generatePDF = useCallback(async () => {
    if (resumeData && templateName && !pdfUrl) {
      setIsGeneratingPDF(true);
      try {
        const fullName =
          resumeData.personal?.contactDetails?.fullName || "Tailored Resume";
        const result = await generateTailoredResumePDF(
          resumeData,
          templateName,
          `${fullName}-Resume`,
        );

        if (result?.data?.url) {
          queryClient.invalidateQueries({ queryKey: ["program"] });
          dispatch(savePdfUrl(result.data.url));
        }
      } catch (error) {
        console.error("Failed to generate PDF:", error);
      } finally {
        setIsGeneratingPDF(false);
      }
    }
  }, [resumeData, templateName, queryClient, pdfUrl, dispatch]);
  useEffect(() => {
    generatePDF();
  }, [generatePDF]);

  const attachedFile = resumeData
    ? {
        id: "tailored-resume",
        metaData: {
          name: `${
            resumeData.personal?.contactDetails?.fullName || "Tailored Resume"
          }.pdf`,
          extension: "pdf",
          content: pdfUrl || tailoredResume,
          url: pdfUrl,
        },
      }
    : null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.userEmail.trim()) {
      toast.error("Email required", {
        ...toastPresets.generalError("Please provide your email address"),
      });
      return false;
    }
    if (!formData.userName.trim()) {
      toast.error("Name required", {
        ...toastPresets.generalError("Please provide your display name"),
      });
      return false;
    }
    return true;
  };

  const handleSendClick = () => {
    if (validateForm()) {
      setShowSendMethodModal(true);
    }
  };

  const handleSendServer = async () => {
    connector();
    await generatePDF();
    setShowSendMethodModal(false);
    const res = await sendMessage("JOB_MAIL", {
      to: job.email,
      userName: formData.userName,
      userEmail: formData.userEmail,
      subject: emailDetails.subjectLine,
      greeting: emailDetails.greeting,
      body: emailDetails.body,
      jobDescription: job.description,
      callToAction: emailDetails.callToAction,
      attachmentNote: emailDetails.attachmentNote,
      signOff: emailDetails.signOff,
      pdfUrl: pdfUrl,
      company: emailDetails.companyName || "Unknown",
      jobTitle: emailDetails.jobTitle,
    });

    if (!res?.status) {
      toast.dismiss("job-mail");
      return toast.error("Unable to send mail!", {
        ...toastPresets.generalError("Failed to process and send email"),
        id: "job-mail",
        position: "top-right",
      });
    }

    if (res?.status == "success") {
      toast.dismiss("job-mail");
      toast.success("Email sent!", {
        ...toastPresets.generalSuccess(
          "Email processed and sent successfully to the hiring address",
        ),
        id: "job-mail",
        position: "top-right",
      });
      return navigate("/dashboard/board");
    }

    if (res?.status == "failed") {
      toast.dismiss("job-mail");
      return toast.error("Unable to send mail!", {
        ...toastPresets.generalError("Failed to process and send email"),
        id: "job-mail",
        position: "top-right",
      });
    }
  };

  const handleEmailDetailsChange = (e) => {
    const { name, value } = e.target;
    dispatch(saveEmailDetails({ category: name, value: value }));
  };

  return (
    <section
      className={`w-full  h-screen max-sm:pb-20 overflow-y-scroll [scrollbar-width:none] flex justify-center px-4 py-4 sm:p-6 font-satoshi ${
        appearance.theme == "dark" ? "bg-[#202020]" : "bg-white"
      }`}
    >
      <div
        className={`w-full max-w-5xl h-max my-0 sm:my-10 p-4 sm:p-10 space-y-6 sm:space-y-8 rounded-3xl shadow-xs ${
          appearance.theme == "dark" ? "bg-[#2a2a2a]" : "bg-white"
        }`}
      >
        {/* Header */}
        <div className="space-y-2">
          <h1
            className={`text-2xl font-bold font-IBM flex items-center gap-3 ${
              appearance.theme == "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            Send Application
          </h1>
          <p
            className={`text-sm ml-1 ${
              appearance.theme == "dark" ? "text-white/60" : "text-slate-500"
            }`}
          >
            Review your application and send it directly to the recruiter.
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sender Email Section */}
            <div className="space-y-2">
              <label
                className={`block text-sm font-bold ml-1 ${appearance.theme == "dark" ? "text-white/80" : "text-slate-700"}`}
              >
                Your Email <span className="text-orange-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="userEmail"
                  required
                  value={formData.userEmail}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-3.5 border rounded-2xl outline-none transition-all text-sm font-medium ${appearance.theme == "dark" ? "bg-[#1a1a1a] text-white border-transparent focus:border-orange-400 focus:bg-[#1a1a1a]" : "bg-white text-slate-900 border-gray-200 focus:border-orange-400 focus:bg-white"}`}
                />
              </div>
            </div>

            {/* Username Section */}
            <div className="space-y-2">
              <label
                className={`block text-sm font-bold ml-1 ${appearance.theme == "dark" ? "text-white/80" : "text-slate-700"}`}
              >
                Display Name <span className="text-orange-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="userName"
                  required
                  value={formData.userName}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-3.5 border rounded-2xl outline-none transition-all text-sm font-medium ${appearance.theme == "dark" ? "bg-[#1a1a1a] text-white border-transparent focus:border-orange-400 focus:bg-[#1a1a1a]" : "bg-white text-slate-900 border-gray-200 focus:border-orange-400 focus:bg-white"}`}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recruiter Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className={`block text-sm font-bold ml-1 ${appearance.theme == "dark" ? "text-white/80" : "text-slate-700"}`}
              >
                To:
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="recruiter@company.com"
                  value={job?.email || ""}
                  onChange={(e) =>
                    dispatch(
                      saveJobDetails({
                        category: "email",
                        value: e.target.value,
                      }),
                    )
                  }
                  className={`w-full pl-11 pr-4 py-3.5 border rounded-2xl outline-none transition-all text-sm font-medium ${appearance.theme == "dark" ? "bg-[#1a1a1a] text-white border-transparent focus:border-orange-400 focus:bg-[#1a1a1a]" : "bg-white text-slate-900 border-gray-200 focus:border-orange-400 focus:bg-white"}`}
                />
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label
                htmlFor="subjectLine"
                className={`block text-sm font-bold ml-1 ${appearance.theme == "dark" ? "text-white/80" : "text-slate-700"}`}
              >
                Subject:
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="subjectLine"
                  name="subjectLine"
                  placeholder="Application for..."
                  value={emailDetails?.subjectLine || ""}
                  onChange={handleEmailDetailsChange}
                  className={`w-full pl-11 pr-4 py-3.5 border rounded-2xl outline-none transition-all text-sm font-medium ${appearance.theme == "dark" ? "bg-[#1a1a1a] text-white border-transparent focus:border-orange-400 focus:bg-[#1a1a1a]" : "bg-white text-slate-900 border-gray-200 focus:border-orange-400 focus:bg-white"}`}
                />
              </div>
            </div>
          </div>

          {/* Email Body & Preview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
            {/* Left Column: Edit Fields */}
            <div
              className={`space-y-4 p-6 rounded-3xl ${appearance.theme == "dark" ? "" : "border border-slate-100"}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3
                  className={`font-bold flex items-center gap-2 ${appearance.theme == "dark" ? "text-white" : "text-slate-800"}`}
                >
                  Edit Content
                </h3>
              </div>

              {/* Greeting */}
              <div className="space-y-2">
                <label
                  htmlFor="greeting"
                  className={`block text-xs font-bold ml-1 uppercase tracking-wider ${appearance.theme == "dark" ? "text-white/60" : "text-slate-500"}`}
                >
                  Greeting
                </label>
                <input
                  type="text"
                  id="greeting"
                  name="greeting"
                  value={emailDetails?.greeting || ""}
                  onChange={handleEmailDetailsChange}
                  className={`w-full px-4 py-3 border rounded-xl outline-none transition-all text-sm font-medium ${appearance.theme == "dark" ? "bg-[#1a1a1a] text-white border-transparent focus:border-orange-400 focus:bg-[#1a1a1a]" : "bg-white/60 text-slate-900 border-gray-200 focus:border-orange-400 focus:bg-white"}`}
                />
              </div>

              {/* Message Body Textarea */}
              <div className="space-y-2">
                <label
                  htmlFor="body"
                  className={`block text-xs font-bold ml-1 uppercase tracking-wider ${appearance.theme == "dark" ? "text-white/60" : "text-slate-500"}`}
                >
                  Core Message
                </label>
                <div className="relative">
                  <textarea
                    id="body"
                    name="body"
                    rows={6}
                    value={emailDetails?.body || ""}
                    onChange={handleEmailDetailsChange}
                    className={`w-full px-4 py-4 border rounded-2xl outline-none transition-all text-sm font-medium resize-none min-h-40 ${appearance.theme == "dark" ? "bg-[#1a1a1a] text-white border-transparent focus:border-orange-400 focus:bg-[#1a1a1a]" : "bg-white/60 text-slate-900 border-gray-200 focus:border-orange-400 focus:bg-white"}`}
                  />
                </div>
              </div>

              {/* Call To Action */}
              <div className="space-y-2">
                <label
                  htmlFor="callToAction"
                  className={`block text-xs font-bold ml-1 uppercase tracking-wider ${appearance.theme == "dark" ? "text-white/60" : "text-slate-500"}`}
                >
                  Call to Action
                </label>
                <textarea
                  id="callToAction"
                  name="callToAction"
                  rows={3}
                  value={emailDetails?.callToAction || ""}
                  onChange={handleEmailDetailsChange}
                  className={`w-full px-4 py-4 border rounded-2xl outline-none transition-all text-sm font-medium resize-none min-h-25 ${appearance.theme == "dark" ? "bg-[#1a1a1a] text-white border-transparent focus:border-orange-400 focus:bg-[#1a1a1a]" : "bg-white/60 text-slate-900 border-gray-200 focus:border-orange-400 focus:bg-white"}`}
                />
              </div>

              {/* Attachment Note */}
              <div className="space-y-2">
                <label
                  htmlFor="attachmentNote"
                  className={`block text-xs font-bold ml-1 uppercase tracking-wider ${appearance.theme == "dark" ? "text-white/60" : "text-slate-500"}`}
                >
                  Attachment Note
                </label>
                <input
                  type="text"
                  id="attachmentNote"
                  name="attachmentNote"
                  value={emailDetails?.attachmentNote || ""}
                  onChange={handleEmailDetailsChange}
                  className={`w-full px-4 py-3 border rounded-xl outline-none transition-all text-sm font-medium ${appearance.theme == "dark" ? "bg-[#1a1a1a] text-white border-transparent focus:border-orange-400 focus:bg-[#1a1a1a]" : "bg-white/60 text-slate-900 border-gray-200 focus:border-orange-400 focus:bg-white"}`}
                />
              </div>

              {/* Sign Off */}
              <div className="space-y-2">
                <label
                  htmlFor="signOff"
                  className={`block text-xs font-bold ml-1 uppercase tracking-wider ${appearance.theme == "dark" ? "text-white/60" : "text-slate-500"}`}
                >
                  Sign Off
                </label>
                <input
                  type="text"
                  id="signOff"
                  name="signOff"
                  value={emailDetails?.signOff || ""}
                  onChange={handleEmailDetailsChange}
                  className={`w-full px-4 py-3 border rounded-xl outline-none transition-all text-sm font-medium ${appearance.theme == "dark" ? "bg-[#1a1a1a] text-white border-transparent focus:border-orange-400 focus:bg-[#1a1a1a]" : "bg-white/60 text-slate-900 border-gray-200 focus:border-orange-400 focus:bg-white"}`}
                />
              </div>
            </div>

            {/* Right Column: Live Preview */}
            <div
              className={`p-8 shadow-md pointer-events-none rounded-3xl flex flex-col h-full ${appearance.theme == "dark" ? "bg-[#222]" : "bg-white"}`}
            >
              <div
                className={`flex justify-between items-center mb-4 pb-4 ${appearance.theme == "dark" ? "" : "border-b border-slate-200"}`}
              >
                <h3
                  className={`font-bold flex items-center gap-2 ${appearance.theme == "dark" ? "text-white" : "text-slate-800"}`}
                >
                  <Eye className="w-4 h-4 text-orange-500" />
                  Live Preview
                </h3>
                <span className="invisible md:visible text-[10px] text-white font-bold px-2 py-2 bg-orange-500 rounded-lg uppercase tracking-wider">
                  Final Application Mail
                </span>
              </div>

              <div
                className={`flex-1 space-y-4 font-medium leading-relaxed font-satoshi whitespace-pre-wrap text-[15px] ${appearance.theme == "dark" ? "text-white/80" : "text-slate-700"}`}
              >
                <p>{emailDetails?.greeting || "Dear [Name],"}</p>
                <p className="text-justify">
                  {emailDetails?.body ||
                    "I am applying for the [Role] position..."}
                </p>
                <p>
                  {emailDetails?.callToAction ||
                    "I look forward to discussing..."}
                </p>
                <p className=" text-sm ">
                  {emailDetails?.attachmentNote ||
                    "Please find my CV attached."}
                </p>
                <br />
                <p className="mb-0">
                  {emailDetails?.signOff || "Best regards,"}
                </p>
                <p
                  className={`mt-1 font-bold ${appearance.theme == "dark" ? "text-white" : "text-slate-900"}`}
                >
                  {formData.userName || "John Doe"}
                </p>
              </div>

              <AttachedFiles
                file={attachedFile}
                selectedFile={selectedFile}
                onSelectFile={setSelectedFile}
                isGenerating={isGeneratingPDF}
                onPreview={(file) => setPreviewFile(file)}
                onEdit={(file) => {
                  const resume = tailoredResume?.resume;
                  if (!resume) return;
                  dispatch(loadPersonal(resume.personal));
                  dispatch(loadWork(resume.work));
                  dispatch(loadEducation(resume.education));
                  dispatch(loadCredentials(resume.credentials));
                  navigate("/editor");
                }}
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div
            className={`flex items-center justify-end pt-6 mt-8 ${appearance.theme == "dark" ? "" : "border-slate-100"}`}
          >
            <button
              type="button"
              onClick={handleSendClick}
              disabled={isGeneratingPDF}
              className={`px-10 py-3.5 bg-[#f17e27] hover:bg-[#e16d16] text-white text-sm font-bold rounded-[1.25rem] transition-all flex items-center gap-2 group active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${appearance.theme == "dark" ? "" : "shadow-lg shadow-orange-100"}`}
            >
              <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              {isGeneratingPDF ? "Processing..." : "Send Application"}
            </button>
          </div>
        </div>

        <SendMethodModal
          isOpen={showSendMethodModal}
          onClose={() => setShowSendMethodModal(false)}
          onSendServer={handleSendServer}
          userEmail={formData.userEmail}
        />

        {previewFile && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setPreviewFile(null)}
          >
            <div
              className={`relative w-[90vw] h-[90vh] rounded-2xl overflow-hidden ${
                appearance.theme == "dark" ? "bg-[#1a1a1a]" : "bg-white"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4">
                <h3
                  className={`text-sm font-bold ${appearance.theme == "dark" ? "text-white" : "text-slate-900"}`}
                >
                  {previewFile.metaData?.name}
                </h3>
                <button
                  onClick={() => setPreviewFile(null)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    appearance.theme == "dark"
                      ? "hover:bg-[#252525]"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
              <iframe
                src={previewFile.metaData?.url}
                className="w-full h-[calc(90vh-64px)] border-0"
                title="File Preview"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
