"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/LanguageContext"
import { Calendar, CheckCircle2, CreditCard, Sparkles } from "lucide-react"
import { useState } from "react"

interface PlanOfferProps {
    onSubscribe: (days: string[], cost: number, startDate: string, endDate: string) => void
}

const INTERNAL_DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"] as const;

const COST_PER_DAY = 30

export function PlanOffer({ onSubscribe }: PlanOfferProps) {
    const { t } = useLanguage()
    const [selectedDays, setSelectedDays] = useState<string[]>([])
    const [startDate, setStartDate] = useState<string>("")
    const [endDate, setEndDate] = useState<string>("") 

    const shortDays = t('common.days.short') as string[];
    const fullDays = t('common.days.full') as string[];

    const toggleDay = (day: string) => {
        setSelectedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
    }

    const totalCost = selectedDays.length * COST_PER_DAY
    const canSubscribe = selectedDays.length > 0 && startDate !== "" && endDate !== ""

    const handleSubscribe = () => {
        if (canSubscribe) {
            onSubscribe(selectedDays, totalCost, startDate, endDate)
        }
    }

    return (
        <Card className="w-full max-w-3xl shadow-xl border-border/50">
            <CardHeader className="space-y-3 pb-6">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-2xl sm:text-3xl">{t('plans.offer.title')}</CardTitle>
                </div>
                <CardDescription className="text-base">
                    {t('plans.offer.description')}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Day Selection */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{t('plans.daysLabel')}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {INTERNAL_DAYS.map((dayKey, index) => {
                            const isSelected = selectedDays.includes(dayKey)
                            return (
                                <button
                                    key={dayKey}
                                    onClick={() => toggleDay(dayKey)}
                                    className={`
                                        relative p-4 rounded-xl border-2 transition-all duration-200
                                        ${isSelected
                                            ? "border-primary bg-primary/5 shadow-sm"
                                            : "border-border hover:border-primary/40 hover:bg-muted/50"
                                        }
                                    `}
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <span className={`text-lg font-bold ${isSelected ? "text-primary" : "text-foreground"}`}>
                                            {shortDays[index]}
                                        </span>
                                        <span className="text-xs text-muted-foreground">{fullDays[index]}</span>
                                    </div>
                                    {isSelected && (
                                        <div className="absolute -top-2 -right-2 p-1 bg-primary rounded-full shadow-md">
                                            <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                                        </div>
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                {/* Vigency Period */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Período de Vigência do Contrato</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Data de Início</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Data de Término</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                    </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                {/* Pricing Summary */}
                <div className="space-y-4 p-5 rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <CreditCard className="h-4 w-4" />
                        <span>{t('plans.summary.title')}</span>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">{t('plans.summary.selectedDays')}</span>
                            <Badge variant="secondary" className="text-base font-semibold px-3 py-1">
                                {selectedDays.length}
                            </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">{t('plans.summary.costPerDay')}</span>
                            <span className="font-medium">R$ {COST_PER_DAY.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="h-px bg-border/50" />

                    <div className="flex justify-between items-center pt-1">
                        <span className="text-lg font-semibold text-foreground">{t('plans.summary.weeklyTotal')}</span>
                        <span className="text-3xl font-bold text-primary">R$ {totalCost.toFixed(2)}</span>
                    </div>
                </div>

                {/* Subscribe Button */}
                <Button
                    onClick={handleSubscribe}
                    disabled={!canSubscribe}
                    size="lg"
                    className="w-full text-base font-semibold shadow-md"
                >
                    {canSubscribe ? t('plans.button.subscribe') : t('plans.button.selectDays')}
                </Button>

                {(selectedDays.length === 0 || startDate === "" || endDate === "") && (
                    <p className="text-sm text-center text-muted-foreground">
                        {selectedDays.length === 0 
                            ? t('plans.prompt.selectDays') 
                            : startDate === "" || endDate === "" 
                            ? "Por favor, preencha o período de vigência"
                            : ""}
                    </p>
                )}
            </CardContent>
        </Card>
    )
}
