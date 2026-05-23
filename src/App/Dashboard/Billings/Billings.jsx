import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { CreditCard, Check, Zap, Crown, Sparkles, Loader2 } from "lucide-react";
import { getPlans } from "../../../services/plans";

const features = [
  { label: "Resume uploads", key: "maxResumeUploads", suffix: "" },
  {
    label: "Applications per month",
    key: "maxApplicationsPerMonth",
    suffix: "",
  },
  { label: "Activity history", key: "maxActivityDays", suffix: " days" },
  { label: "Storage", key: "maxStorageMb", suffix: " MB" },
];

const planUIConfig = {
  free: {
    icon: Sparkles,
    featured: false,
    description: "Perfect for trying out",
  },
  monthly_pro: {
    icon: Zap,
    featured: true,
    description: "Best for job seekers",
  },
  monthly_premium: {
    icon: Crown,
    featured: false,
    description: "For power users",
  },
};

export default function Billings() {
  const { appearance } = useSelector((state) => state.preferences);
  const [isYearly, setIsYearly] = useState(false);
  const currentPlanVariantId = "free";

  const { data: plans, isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
    staleTime: 5 * 60 * 1000,
  });

  function formatLimit(value) {
    if (value >= 1000) return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}K`;
    return String(value);
  }

  function getPrice(plan) {
    return isYearly ? plan.priceYearly : plan.priceMonthly;
  }

  function getPlanUI(variantId) {
    return (
      planUIConfig[variantId] || {
        icon: Sparkles,
        featured: false,
        description: "",
      }
    );
  }

  if (isLoading) {
    return (
      <section
        className={`w-full h-screen overflow-y-auto [scrollbar-width:none] p-4 sm:p-6 lg:p-12 flex items-center justify-center ${
          appearance.theme === "dark" ? "bg-[#151515]" : "bg-white"
        }`}
      >
        <Loader2
          size={32}
          className="animate-spin text-[#f17e27]"
        />
      </section>
    );
  }

  const sortedPlans = (plans || []).sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section
      className={`w-full h-screen overflow-y-auto [scrollbar-width:none] p-4 sm:p-6 lg:p-12 ${
        appearance.theme === "dark" ? "bg-[#151515]" : "bg-white"
      }`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="space-y-1 mb-8">
            <h1
              className={`text-xl sm:text-2xl font-bold font-satoshi ${
                appearance.theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              Billing & Plans
            </h1>
            <p
              className={`text-sm ${
                appearance.theme === "dark" ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Manage your subscription and choose the plan that works best for you.
            </p>
          </div>

          <div
            className={`p-4 sm:p-6 rounded-2xl border mb-8 ${
              appearance.theme === "dark"
                ? "bg-[#202020] border-0"
                : "bg-white border-slate-200 shadow-sm"
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    appearance.theme === "dark" ? "bg-[#2A2A2A]" : "bg-orange-50"
                  }`}
                >
                  <CreditCard
                    size={24}
                    className={appearance.theme === "dark" ? "text-orange-400" : "text-[#f17e27]"}
                  />
                </div>
                <div>
                  <h3
                    className={`font-semibold ${
                      appearance.theme === "dark" ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Current Plan
                  </h3>
                  <p
                    className={`text-sm ${
                      appearance.theme === "dark" ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    You are currently on the <span className="font-medium text-[#f17e27]">Free plan</span>
                  </p>
                </div>
              </div>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  appearance.theme === "dark"
                    ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Manage Subscription
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center mb-8">
            <div
              className={`flex items-center gap-3 p-1 rounded-xl ${
                appearance.theme === "dark" ? "bg-[#202020]" : "bg-slate-100"
              }`}
            >
              <button
                onClick={() => setIsYearly(false)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  !isYearly
                    ? "bg-[#f17e27] text-white shadow-sm"
                    : appearance.theme === "dark"
                      ? "text-slate-400 hover:text-white"
                      : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  isYearly
                    ? "bg-[#f17e27] text-white shadow-sm"
                    : appearance.theme === "dark"
                      ? "text-slate-400 hover:text-white"
                      : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Yearly
                <span
                  className={`ml-1.5 text-xs px-1.5 py-0.5 rounded ${
                    isYearly
                      ? "bg-white/20"
                      : appearance.theme === "dark"
                        ? "bg-slate-800 text-green-400"
                        : "bg-green-100 text-green-700"
                  }`}
                >
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {sortedPlans.map((plan) => {
              const ui = getPlanUI(plan.variantId);
              const Icon = ui.icon;
              const price = getPrice(plan);
              const isCurrentPlan = currentPlanVariantId === plan.variantId;
              const isFree = plan.variantId === "free";

              return (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl border p-6 transition-all ${
                    ui.featured
                      ? appearance.theme === "dark"
                        ? "bg-[#1A1A1A] border-orange-500/50 shadow-lg shadow-orange-500/10"
                        : "bg-white border-[#f17e27] shadow-lg shadow-orange-200/50"
                      : appearance.theme === "dark"
                        ? "bg-[#202020] border-0"
                        : "bg-white border-slate-200"
                  }`}
                >
                  {ui.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-[#f17e27] text-white text-xs font-medium px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {isCurrentPlan && (
                    <div className="absolute top-4 right-4">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          appearance.theme === "dark"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        Current
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          ui.featured
                            ? "bg-[#f17e27]/10"
                            : appearance.theme === "dark"
                              ? "bg-[#2A2A2A]"
                              : "bg-slate-50"
                        }`}
                      >
                        <Icon
                          size={20}
                          className={ui.featured ? "text-[#f17e27]" : "text-slate-500"}
                        />
                      </div>
                      <div>
                        <h3
                          className={`font-semibold ${
                            appearance.theme === "dark" ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {plan.displayName}
                        </h3>
                        <p
                          className={`text-xs ${
                            appearance.theme === "dark" ? "text-slate-500" : "text-slate-400"
                          }`}
                        >
                          {ui.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-baseline gap-1">
                      {price === 0 ? (
                        <span
                          className={`text-4xl font-bold ${
                            appearance.theme === "dark" ? "text-white" : "text-slate-900"
                          }`}
                        >
                          Free
                        </span>
                      ) : (
                        <>
                          <span
                            className={`text-sm ${
                              appearance.theme === "dark" ? "text-slate-400" : "text-slate-500"
                            }`}
                          >
                            $
                          </span>
                          <span
                            className={`text-4xl font-bold ${
                              appearance.theme === "dark" ? "text-white" : "text-slate-900"
                            }`}
                          >
                            {price}
                          </span>
                          <span
                            className={`text-sm ${
                              appearance.theme === "dark" ? "text-slate-400" : "text-slate-500"
                            }`}
                          >
                            /{isYearly ? "year" : "month"}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {features.map((feature) => (
                      <div key={feature.key} className="flex items-center gap-2">
                        <Check
                          size={16}
                          className={
                            appearance.theme === "dark" ? "text-green-400" : "text-green-500"
                          }
                        />
                        <span
                          className={`text-sm ${
                            appearance.theme === "dark" ? "text-slate-300" : "text-slate-600"
                          }`}
                        >
                          <span className="font-medium">
                            {formatLimit(plan[feature.key])}
                            {feature.suffix}
                          </span>{" "}
                          {feature.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    disabled={isFree || isCurrentPlan}
                    className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isCurrentPlan
                        ? appearance.theme === "dark"
                          ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                          : "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : isFree
                          ? appearance.theme === "dark"
                            ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                            : "bg-slate-100 text-slate-400 cursor-not-allowed"
                          : ui.featured
                            ? "bg-[#f17e27] text-white hover:bg-[#e16d16] shadow-sm"
                            : appearance.theme === "dark"
                              ? "bg-slate-800 text-slate-200 hover:bg-slate-700"
                              : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    {isCurrentPlan
                      ? "Current Plan"
                      : isFree
                        ? "Your Current Plan"
                        : "Upgrade"}
                  </button>
                </div>
              );
            })}
          </div>

          <div
            className={`mt-8 p-4 sm:p-6 rounded-2xl border ${
              appearance.theme === "dark"
                ? "bg-[#202020] border-0"
                : "bg-white border-slate-200 shadow-sm"
            }`}
          >
            <h3
              className={`font-semibold mb-3 ${
                appearance.theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              Payment History
            </h3>
            <div
              className={`text-center py-8 ${
                appearance.theme === "dark" ? "text-slate-500" : "text-slate-400"
              }`}
            >
              <CreditCard size={40} className="mx-auto mb-3 opacity-50" />
              <p className="text-sm">No payment history yet</p>
              <p className="text-xs mt-1">Upgrade to a paid plan to see your transactions here</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
