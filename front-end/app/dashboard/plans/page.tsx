"use client";

import { ActivePlanDetails } from "@/components/plans/ActivePlanDetails";
import { PlanOffer } from "@/components/plans/PlanOffer";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCheckout } from "@/hooks/useCheckout";
import { CalendarDays } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PlansManagementPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const { criarCheckout, isLoading, error } = useCheckout();
  const [hasPlan, setHasPlan] = useState(false);
  const [planData, setPlanData] = useState({
    days: ["Seg", "Qua", "Sex"],
    weeklyValue: 49,
    nextRenewal: "23/12/2025",
  });

  const handleSubscribe = async (
    days: string[],
    cost: number,
    startDate: string,
    endDate: string
  ) => {
    const encodedUserId = localStorage.getItem("userId");
    const userId = encodedUserId ? atob(encodedUserId) : null;

    const dadosAssinatura = {
      usuarioId: userId,
      dias: days,
      valorSemanal: cost,
      dataInicio: startDate,
      dataFim: endDate,
    };

    try {
      console.log("Dados da assinatura (Simulação): ", dadosAssinatura);
      await new Promise(resolve => setTimeout(resolve, 800));
      router.push("/dashboard/paymentSuccess");
    } catch (err) {
      console.error("Erro ao processar assinatura:", err);
    }
  };

  const handleUpdateDays = async (
    newDays: string[],
    newWeeklyValue: number
  ) => {
    try {
      const encodedUserId = localStorage.getItem("userId");
      const userId = encodedUserId ? atob(encodedUserId) : null;

      if (!userId) return;

      const response = await fetch(`/api/assinaturas/${userId}/dias`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dias: newDays,
          valorSemanal: newWeeklyValue,
        }),
      });

      if (!response.ok) {
        throw new Error("Falha ao atualizar dias");
      }

      const data = await response.json();
      setPlanData({
        days: data.dias ?? newDays,
        weeklyValue: data.valorSemanal ?? newWeeklyValue,
        nextRenewal: data.proximaRenovacao ?? planData?.nextRenewal ?? "",
      });
    } catch (err) {
      console.error("Erro ao atualizar dias:", err);
      throw err;
    }
  };

  const handleCancel = () => {
    setHasPlan(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50/80 to-gray-100/50 dark:from-background dark:via-background/80 dark:to-muted/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-primary/10 rounded-xl">
                  <CalendarDays className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                  {t("plans.active.pageTitle")}
                </h1>
              </div>
              <p className="text-base text-muted-foreground max-w-2xl pl-[52px]">
                {t("plans.active.pageDesc")}
              </p>
            </div>
            <div className="flex items-center gap-3 bg-amber-50/80 backdrop-blur-sm px-5 py-3 rounded-xl border border-amber-200/50 shadow-sm lg:self-start dark:bg-amber-900/20 dark:border-amber-800/50">
              <Switch
                id="simulation-mode"
                checked={hasPlan}
                onCheckedChange={setHasPlan}
                className="data-[state=checked]:bg-amber-600"
              />
              <Label
                htmlFor="simulation-mode"
                className="text-sm font-medium text-amber-900 cursor-pointer whitespace-nowrap dark:text-amber-100"
              >
                {t("plans.active.simulateLabel")}:{" "}
                <span className="font-semibold">
                  {hasPlan
                    ? t("plans.active.simulateWith")
                    : t("plans.active.simulateWithout")}
                </span>
              </Label>
            </div>
          </div>
          <div className="mt-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
        <div className="pb-8">
          {hasPlan ? (
            <ActivePlanDetails
              days={planData.days}
              weeklyValue={planData.weeklyValue}
              nextRenewal={planData.nextRenewal}
              onCancel={handleCancel}
              onUpdateDays={handleUpdateDays}
            />
          ) : (
            <div className="flex justify-center">
              <PlanOffer onSubscribe={handleSubscribe} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}