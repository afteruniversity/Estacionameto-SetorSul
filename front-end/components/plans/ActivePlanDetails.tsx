"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  CreditCard,
  Save,
} from "lucide-react";
import { useState, useEffect } from "react";

interface ActivePlanDetailsProps {
  days: string[];
  weeklyValue: number;
  nextRenewal: string;
  onCancel: () => void;
  onUpdateDays?: (newDays: string[], newWeeklyValue: number) => void;
}

const INTERNAL_DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex"];
const PRICE_PER_DAY = 5; // Ajuste conforme sua regra de negócio

export function ActivePlanDetails({
  days,
  weeklyValue,
  nextRenewal,
  onCancel,
  onUpdateDays,
}: ActivePlanDetailsProps) {
  const { t } = useLanguage();
  const shortDays = t("common.days.short") as string[];

  const [selectedDays, setSelectedDays] = useState<string[]>(days);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Sincroniza com as props quando mudam externamente
  useEffect(() => {
    setSelectedDays(days);
    setHasChanges(false);
  }, [days]);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) => {
      const newDays = prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day];

      // Verifica se houve mudança em relação ao original
      const changed =
        JSON.stringify(newDays.sort()) !== JSON.stringify(days.sort());
      setHasChanges(changed);

      return newDays;
    });
  };

  const handleSaveChanges = async () => {
    if (!onUpdateDays || selectedDays.length === 0) return;

    setIsSaving(true);
    try {
      // Calcula o novo valor baseado nos dias selecionados
      const newWeeklyValue = selectedDays.length * PRICE_PER_DAY;

      await onUpdateDays(selectedDays, newWeeklyValue);
      setHasChanges(false);
    } catch (error) {
      console.error("Erro ao atualizar dias:", error);
      // Reverte para os dias originais em caso de erro
      setSelectedDays(days);
      setHasChanges(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelChanges = () => {
    setSelectedDays(days);
    setHasChanges(false);
  };

  // Calcula o valor em tempo real baseado na seleção atual
  const currentWeeklyValue = selectedDays.length * PRICE_PER_DAY;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Status Banner */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/50 rounded-2xl p-4 sm:p-5 shadow-sm dark:from-emerald-950/20 dark:to-teal-950/20 dark:border-emerald-800/30">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg shrink-0 dark:bg-emerald-900/50">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1 flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-emerald-900 dark:text-emerald-100">
              {t("plans.active.statusTitle")}
            </h3>
            <p className="text-sm text-emerald-700/80 dark:text-emerald-300/70">
              {t("plans.active.statusDesc")}
            </p>
          </div>
        </div>
      </div>

      {/* Plan Details Card */}
      <Card className="shadow-lg border-border/50">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-2xl">
            {t("plans.active.cardTitle")}
          </CardTitle>
          <CardDescription>{t("plans.active.cardDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Days Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{t("plans.daysLabel")}</span>
              </div>
              {hasChanges && (
                <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                  {t("plans.active.unsavedChanges") || "Alterações não salvas"}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {INTERNAL_DAYS.map((day, index) => {
                const isSelected = selectedDays.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    disabled={isSaving}
                    className={[
                      "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
                      "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      isSelected
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                        : "bg-muted/50 text-muted-foreground border border-border/50 hover:border-primary/60 hover:bg-muted",
                    ].join(" ")}
                  >
                    {shortDays[index]}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("plans.active.clickToToggle") ||
                "Clique nos dias para adicionar ou remover da sua assinatura"}
            </p>
          </div>

          {/* Save/Cancel Buttons - Only show when there are changes */}
          {hasChanges && onUpdateDays && (
            <div className="flex gap-2">
              <Button
                onClick={handleSaveChanges}
                disabled={isSaving || selectedDays.length === 0}
                className="flex-1"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving
                  ? t("plans.active.saving") || "Salvando..."
                  : t("plans.active.saveChanges") || "Salvar Alterações"}
              </Button>
              <Button
                onClick={handleCancelChanges}
                disabled={isSaving}
                variant="outline"
              >
                {t("common.cancel") || "Cancelar"}
              </Button>
            </div>
          )}

          {selectedDays.length === 0 && (
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 dark:bg-amber-950/20 dark:border-amber-800/30">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                {t("plans.active.selectAtLeastOne") ||
                  "Selecione pelo menos um dia para continuar com sua assinatura"}
              </p>
            </div>
          )}

          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Pricing Info */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2 p-4 rounded-xl bg-muted/30 border border-border/40">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                <span>{t("plans.active.weeklyValue")}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <p
                  className={[
                    "text-3xl font-bold transition-colors",
                    hasChanges
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-foreground",
                  ].join(" ")}
                >
                  R$ {currentWeeklyValue.toFixed(2)}
                </p>
                {hasChanges && (
                  <span className="text-sm text-muted-foreground line-through">
                    R$ {weeklyValue.toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {t("plans.active.perWeek")}
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-muted/30 border border-border/40">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{t("plans.active.nextRenewal")}</span>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {nextRenewal}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("plans.active.autoRenewal")}
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Cancel Button */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 bg-transparent"
                disabled={isSaving}
              >
                {t("plans.active.cancelButton")}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-destructive/10 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                  </div>
                  <AlertDialogTitle>
                    {t("plans.active.cancelAlert.title")}
                  </AlertDialogTitle>
                </div>
                <AlertDialogDescription className="text-base">
                  {t("plans.active.cancelAlert.description")}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {t("plans.active.cancelAlert.back")}
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={onCancel}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {t("plans.active.cancelAlert.confirm")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
