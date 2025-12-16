"use client"

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
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/LanguageContext"
import { AlertCircle, Calendar, CheckCircle2, CreditCard } from "lucide-react"

interface ActivePlanDetailsProps {
    days: string[]
    weeklyValue: number
    nextRenewal: string
    onCancel: () => void
}

const INTERNAL_DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

export function ActivePlanDetails({ days, weeklyValue, nextRenewal, onCancel }: ActivePlanDetailsProps) {
    const { t } = useLanguage()
    const shortDays = t('common.days.short') as string[];

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Status Banner */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/50 rounded-2xl p-4 sm:p-5 shadow-sm">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-emerald-900">{t('plans.active.statusTitle')}</h3>
                        <p className="text-sm text-emerald-700/80">
                            {t('plans.active.statusDesc')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Plan Details Card */}
            <Card className="shadow-lg border-border/50">
                <CardHeader className="space-y-1 pb-6">
                    <CardTitle className="text-2xl">{t('plans.active.cardTitle')}</CardTitle>
                    <CardDescription>{t('plans.active.cardDesc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Days Selection */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{t('plans.daysLabel')}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {INTERNAL_DAYS.map((day, index) => (
                                <Badge
                                    key={day}
                                    variant={days.includes(day) ? "default" : "outline"}
                                    className={
                                        days.includes(day)
                                            ? "px-4 py-2 text-sm font-medium bg-primary hover:bg-primary"
                                            : "px-4 py-2 text-sm font-medium bg-muted/50 text-muted-foreground border-border/50"
                                    }
                                >
                                    {shortDays[index]}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                    {/* Pricing Info */}
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2 p-4 rounded-xl bg-muted/30 border border-border/40">
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <CreditCard className="h-4 w-4" />
                                <span>{t('plans.active.weeklyValue')}</span>
                            </div>
                            <p className="text-3xl font-bold text-foreground">R$ {weeklyValue.toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground">{t('plans.active.perWeek')}</p>
                        </div>

                        <div className="space-y-2 p-4 rounded-xl bg-muted/30 border border-border/40">
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>{t('plans.active.nextRenewal')}</span>
                            </div>
                            <p className="text-3xl font-bold text-foreground">{nextRenewal}</p>
                            <p className="text-xs text-muted-foreground">{t('plans.active.autoRenewal')}</p>
                        </div>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                    {/* Cancel Button */}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 bg-transparent"
                            >
                                {t('plans.active.cancelButton')}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-destructive/10 rounded-lg">
                                        <AlertCircle className="h-5 w-5 text-destructive" />
                                    </div>
                                    <AlertDialogTitle>{t('plans.active.cancelAlert.title')}</AlertDialogTitle>
                                </div>
                                <AlertDialogDescription className="text-base">
                                    {t('plans.active.cancelAlert.description')}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>{t('plans.active.cancelAlert.back')}</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={onCancel}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                    {t('plans.active.cancelAlert.confirm')}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardContent>
            </Card>
        </div>
    )
}
