import React from "react";
import { useSelector } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";
import { CreditCard, Check, Loader2, Clock, ArrowUpRight } from "lucide-react";
import { getPlans } from "../../../services/plans";
import { getSubscription } from "../../../services/subscription";
import { getTransactions } from "../../../services/transactions";
import { createCheckout } from "../../../services/payment";
import { toast } from "sonner";

function formatPrice(price) {
  return price.toFixed(2);
}

const features = [
  {
    label: "Resume uploads",
    key: "maxResumeUploads",
    suffix: "",
    type: "count",
  },
  {
    label: "Applications per month",
    key: "maxApplicationsPerMonth",
    suffix: "",
    type: "count",
  },
  {
    label: "Activity history",
    key: "maxActivityDays",
    suffix: " days",
    type: "count",
  },
  { label: "Storage", key: "maxStorageMb", suffix: " MB", type: "count" },
  {
    label: "Job image uploads",
    key: "allowJobImageUploads",
    type: "boolean",
    yesText: "Yes",
    noText: "Text only",
  },
  {
    label: "Export formats",
    key: "allowAdvancedExports",
    type: "boolean",
    yesText: "PDF + more",
    noText: "PDF only",
  },
];

const planUIConfig = {
  free: {
    featured: false,
    description: "Perfect for trying out",
  },
  monthly_pro: {
    featured: true,
    description: "Best for job seekers",
  },
  monthly_premium: {
    featured: false,
    description: "For power users",
  },
};

export default function Billings() {
  const { appearance } = useSelector((state) => state.preferences);

  const { data: plans, isLoading: plansLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
    staleTime: 5 * 60 * 1000,
  });

  const { data: subscription, isLoading: subLoading } = useQuery({
    queryKey: ["subscription"],
    queryFn: getSubscription,
    staleTime: 30 * 1000,
  });

  const { data: transactions = [] } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
    staleTime: 30 * 1000,
  });

  const plan = subscription?.Plan;
  const currentPlanVariantId = plan?.variantId || "free";

  const trialEndsAt = subscription?.trialEndsAt
    ? new Date(subscription.trialEndsAt)
    : null;
  const isOnTrial = trialEndsAt && trialEndsAt > new Date();
  const trialDaysRemaining = isOnTrial
    ? Math.ceil((trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0;

  const mutation = useMutation({
    mutationFn: (variantKey) => createCheckout(variantKey),
    onSuccess: (data) => {
      if (data?.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    },
    onError: (error) => {
      console.error("Checkout error:", error);
      toast.error("Failed to create checkout. Please try again.");
    },
  });

  function formatLimit(value) {
    if (value >= 1000)
      return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}K`;
    return String(value);
  }

  function getPlanUI(variantId) {
    return (
      planUIConfig[variantId] || {
        featured: false,
        description: "",
      }
    );
  }

  function handleUpgrade(plan) {
    if (plan.variantId === "free") return;
    mutation.mutate(plan.variantId);
  }

  const isLoading = plansLoading || subLoading;

  if (isLoading) {
    return (
      <section
        className={`w-full h-screen overflow-y-auto [scrollbar-width:none] p-4 sm:p-6 lg:p-12 flex items-center justify-center ${
          appearance.theme === "dark" ? "bg-[#151515]" : "bg-white"
        }`}
      >
        <Loader2 size={24} className="animate-spin text-[#f17e27]" />
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
      <div className="max-w-4xl mx-auto">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="space-y-1 mb-6 sm:mb-8">
            <h1
              className={`text-xl sm:text-2xl font-bold font-satoshi ${
                appearance.theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              Billing & Plans
            </h1>
            <p
              className={`text-sm ${
                appearance.theme === "dark"
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >
              Manage your subscription and choose the plan that works best for
              you.
            </p>
          </div>

          <div
            className={`p-4 sm:p-6 rounded-xl border mb-6 sm:mb-8 ${
              appearance.theme === "dark"
                ? "bg-[#202020] border-0"
                : "bg-white border-slate-200 shadow-sm"
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    appearance.theme === "dark"
                      ? "bg-[#2A2A2A]"
                      : "bg-orange-50"
                  }`}
                >
                  <CreditCard
                    size={20}
                    className={
                      appearance.theme === "dark"
                        ? "text-orange-400"
                        : "text-[#f17e27]"
                    }
                  />
                </div>
                <div>
                  <h3
                    className={`text-sm font-semibold ${
                      appearance.theme === "dark"
                        ? "text-white"
                        : "text-slate-700"
                    }`}
                  >
                    Current Plan
                  </h3>
                  <p
                    className={`text-xs ${
                      appearance.theme === "dark"
                        ? "text-slate-400"
                        : "text-slate-500"
                    }`}
                  >
                    You are currently on the{" "}
                    <span className="font-medium text-[#f17e27]">
                      {plan?.displayName || "Free plan"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            {isOnTrial && (
              <div
                className={`mt-4 flex items-center gap-2 p-3 rounded-lg text-xs ${
                  appearance.theme === "dark"
                    ? "bg-orange-500/10 text-orange-300"
                    : "bg-orange-50 text-orange-700"
                }`}
              >
                <Clock size={14} />
                <span>
                  Trial ends in{" "}
                  <strong>
                    {trialDaysRemaining} day
                    {trialDaysRemaining !== 1 ? "s" : ""}
                  </strong>
                  {trialDaysRemaining <= 3 && (
                    <span className="ml-1 font-semibold">
                      — upgrade to keep your plan features
                    </span>
                  )}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {sortedPlans.map((plan) => {
              const ui = getPlanUI(plan.variantId);
              const price = plan.priceMonthly;
              const isCurrentPlan = currentPlanVariantId === plan.variantId;
              const isFree = plan.variantId === "free";
              const isLoadingThis =
                mutation.isPending && mutation.variables === plan.variantId;

              return (
                <div
                  key={plan.id}
                  className={`relative rounded-xl border p-4 sm:p-6 transition-all ${
                    appearance.theme === "dark"
                      ? "bg-[#202020] border-0"
                      : "bg-white border-slate-200"
                  } ${isCurrentPlan ? "ring-2 ring-[#f17e27]" : ""} ${ui.featured ? (appearance.theme === "dark" ? "border-orange-500/30" : "border-[#f17e27]") : ""}`}
                >
                  

                  {isCurrentPlan && (
                    <div className="absolute top-3 right-3">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          appearance.theme === "dark"
                            ? "bg-orange-500/20 text-orange-400"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        Current
                      </span>
                    </div>
                  )}

                  <div className="mb-4">
                    <div className="mb-3">
                      <h3
                        className={`text-sm font-semibold ${
                          appearance.theme === "dark"
                            ? "text-white"
                            : "text-slate-700"
                        }`}
                      >
                        {plan.displayName}
                      </h3>
                      <p
                        className={`text-xs ${
                          appearance.theme === "dark"
                            ? "text-slate-500"
                            : "text-slate-400"
                        }`}
                      >
                        {ui.description}
                      </p>
                    </div>

                    <div className="flex items-baseline gap-0.5">
                      {price === 0 ? (
                        <span
                          className={`text-2xl sm:text-3xl font-bold ${
                            appearance.theme === "dark"
                              ? "text-white"
                              : "text-slate-900"
                          }`}
                        >
                          Free
                        </span>
                      ) : (
                        <>
                          <span
                            className={`text-sm ${
                              appearance.theme === "dark"
                                ? "text-slate-400"
                                : "text-slate-500"
                            }`}
                          >
                            $
                          </span>
                          <span
                            className={`text-2xl sm:text-3xl font-bold ${
                              appearance.theme === "dark"
                                ? "text-white"
                                : "text-slate-900"
                            }`}
                          >
                            {price}
                          </span>
                          <span
                            className={`text-xs ${
                              appearance.theme === "dark"
                                ? "text-slate-400"
                                : "text-slate-500"
                            }`}
                          >
                            /month
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {features.map((feature) => {
                      const isBoolean = feature.type === "boolean";
                      const value = plan[feature.key];
                      const displayValue = isBoolean
                        ? value
                          ? feature.yesText
                          : feature.noText
                        : `${formatLimit(value)}${feature.suffix}`;

                      return (
                        <div
                          key={feature.key}
                          className="flex items-center gap-2"
                        >
                          <Check
                            size={14}
                            className={
                              appearance.theme === "dark"
                                ? "text-green-400"
                                : "text-green-500"
                            }
                          />
                          <span
                            className={`text-xs ${
                              appearance.theme === "dark"
                                ? "text-slate-300"
                                : "text-slate-600"
                            }`}
                          >
                            {feature.label}:{" "}
                            <span className="font-medium">{displayValue}</span>
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => handleUpgrade(plan)}
                    disabled={isCurrentPlan || isLoadingThis}
                    className={`w-full py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-2 ${
                      isCurrentPlan
                        ? "bg-[#f17e27] text-white shadow-sm cursor-default"
                        
                          : ui.featured
                            ? "bg-[#f17e27] text-white hover:bg-[#e16d16] shadow-sm"
                            : appearance.theme === "dark"
                              ? "bg-slate-800 text-slate-200 hover:bg-slate-700"
                              : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    {isLoadingThis && (
                      <Loader2 size={14} className="animate-spin" />
                    )}
                    {isCurrentPlan
                      ? "Current Plan"
                      : isLoadingThis
                        ? "Redirecting..."
                        : isFree
                          ? "Downgrade to free"
                          : "Select plan"}
                  </button>
                </div>
              );
            })}
          </div>

          <div
            className={`mt-6 sm:mt-8 p-4 sm:p-6 rounded-xl border ${
              appearance.theme === "dark"
                ? "bg-[#202020] border-0"
                : "bg-white border-slate-200 shadow-sm"
            }`}
          >
            <h3
              className={`text-sm font-semibold mb-3 ${
                appearance.theme === "dark" ? "text-white" : "text-slate-700"
              }`}
            >
              Payment History
            </h3>
            {transactions.length === 0 ? (
              <div
                className={`text-center py-6 ${
                  appearance.theme === "dark"
                    ? "text-slate-500"
                    : "text-slate-400"
                }`}
              >
                <CreditCard size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-xs">No payment history yet</p>
                <p className="text-xs mt-1 opacity-75">
                  Upgrade to a paid plan to see your transactions here
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {transactions.map((txn) => (
                  <div
                    key={txn.id}
                    className={`flex items-center justify-between p-3 rounded-lg text-xs ${
                      appearance.theme === "dark"
                        ? "bg-[#2A2A2A]"
                        : "bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <ArrowUpRight size={14} className="text-green-500" />
                      <div>
                        <p
                          className={`font-medium ${
                            appearance.theme === "dark"
                              ? "text-white"
                              : "text-slate-700"
                          }`}
                        >
                          {(txn.amount / 100).toFixed(2)}
                        </p>
                        <p
                          className={
                            appearance.theme === "dark"
                              ? "text-slate-500"
                              : "text-slate-400"
                          }
                        >
                          {txn.description || txn.status}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`${
                        appearance.theme === "dark"
                          ? "text-slate-500"
                          : "text-slate-400"
                      }`}
                    >
                      {new Date(txn.paidAt || txn.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
