import { useState } from "react";
import { Sparkles, ChevronLeft, CheckCircle2 } from "lucide-react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { resetPassword } from "../services/auth";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Invalid or missing reset link");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, password);
      setDone(true);
    } catch (err) {
      const msg = err?.response?.data?.message;
      if (msg === "TOKEN_INVALID") {
        setError("Link expired or invalid. Please request a new reset link.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="w-screen h-screen flex items-center justify-center font-satoshi bg-white">
        <div className="text-center space-y-4 max-w-sm p-8">
          <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold font-IBM text-slate-900">Invalid link</h1>
          <p className="text-sm text-slate-500">
            This password reset link is invalid or missing. Please request a new one.
          </p>
          <Link
            to="/auth"
            className="inline-block px-6 py-3 bg-[#f17e27] text-white text-sm font-bold rounded-full"
          >
            Request new link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex relative font-satoshi bg-white">
      <div className="hidden lg:flex relative w-[30%] flex-col justify-between text-white overflow-hidden">
        <div className="absolute w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600"
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div className="relative z-10 flex p-5 items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#f17e27]" />
          <span className="font-IBM font-bold text-lg tracking-tight">Jobfaster</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-8">
          <button
            onClick={() => navigate("/auth")}
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to login
          </button>

          {done ? (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold font-IBM text-slate-900">Password reset</h1>
              <p className="text-sm text-slate-500">Your password has been updated successfully.</p>
              <Link
                to="/auth"
                className="inline-block px-8 py-3 bg-[#f17e27] text-white text-sm font-bold rounded-full shadow-lg shadow-orange-100 transition-all hover:bg-[#e16d16]"
              >
                Log in
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold font-IBM text-slate-900">Set new password</h1>
                <p className="text-sm text-slate-500 font-medium">
                  Must be at least 8 characters with uppercase, lowercase, number, and special
                  character.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="absolute -top-2.5 left-3 px-1.5 bg-white text-xs font-bold text-slate-500"
                  >
                    New Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="••••••••••"
                    className="w-full px-4 py-3 border-2 border-slate-200 focus:border-[#f17e27] rounded-xl outline-none transition-colors text-sm"
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="confirm"
                    className="absolute -top-2.5 left-3 px-1.5 bg-white text-xs font-bold text-slate-500"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirm"
                    type="password"
                    value={confirm}
                    onChange={(e) => {
                      setConfirm(e.target.value);
                      setError("");
                    }}
                    placeholder="••••••••••"
                    className="w-full px-4 py-3 border-2 border-slate-200 focus:border-[#f17e27] rounded-xl outline-none transition-colors text-sm"
                  />
                </div>

                {error && (
                  <p className="text-xs font-semibold text-red-500 text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading || !password || !confirm}
                  className="w-full py-3.5 bg-[#f17e27] hover:bg-[#e16d16] disabled:opacity-50 text-white text-sm font-bold rounded-full shadow-lg shadow-orange-100 transition-all active:scale-[0.98]"
                >
                  {loading ? "Resetting..." : "Reset password"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
