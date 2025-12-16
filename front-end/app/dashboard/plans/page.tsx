"use client"

import { ActivePlanDetails } from "@/components/plans/ActivePlanDetails"
import { PlanOffer } from "@/components/plans/PlanOffer"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useLanguage } from "@/contexts/LanguageContext"
import { CalendarDays } from "lucide-react"
import { useState } from "react"

export default function PlansManagementPage() {
    const { t } = useLanguage()
    // Mock state for simulation
    const [hasPlan, setHasPlan] = useState(false)

    // Mock data for active plan
    const [planData, setPlanData] = useState({
        days: ["Seg", "Qua", "Sex"],
        weeklyValue: 90,
        nextRenewal: "23/12/2025",
    })

    const handleSubscribe = (days: string[], cost: number) => {
        setPlanData({
            days,
            weeklyValue: cost,
            nextRenewal: "23/12/2025", // Mock date
        })
        setHasPlan(true)
    }

    const handleCancel = () => {
        setHasPlan(false)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50/80 to-gray-100/50 dark:from-background dark:via-background/80 dark:to-muted/20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Header Section */}
                <div className="mb-10">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-primary/10 rounded-xl">
                                    <CalendarDays className="h-6 w-6 text-primary" />
                                </div>
                                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">{t('plans.active.pageTitle')}</h1>
                            </div>
                            <p className="text-base text-muted-foreground max-w-2xl pl-[52px]">
                                {t('plans.active.pageDesc')}
                            </p>
                        </div>

                        {/* DEV: Simulation Toggle */}
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
                                {t('plans.active.simulateLabel')}: <span className="font-semibold">{hasPlan ? t('plans.active.simulateWith') : t('plans.active.simulateWithout')}</span>
                            </Label>
                        </div>
                    </div>

                    {/* Divider with fade effect */}
                    <div className="mt-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                </div>

                {/* Main Content Area */}
                <div className="pb-8">
                    {hasPlan ? (
                        <ActivePlanDetails
                            days={planData.days}
                            weeklyValue={planData.weeklyValue}
                            nextRenewal={planData.nextRenewal}
                            onCancel={handleCancel}
                        />
                    ) : (
                        <div className="flex justify-center">
                            <PlanOffer onSubscribe={handleSubscribe} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
