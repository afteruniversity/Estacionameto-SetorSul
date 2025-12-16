"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function HeroSection() {
    const { t } = useLanguage();
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[linear-gradient(to_right,#adeada,#bdeadb,#cdeadc,#ddeadd,#edeade)] dark:bg-[linear-gradient(to_right,#022c22,#064e3b,#065f46,#115e59)]">
            <div className="container mx-auto flex flex-col items-center justify-center space-y-4 px-4 md:px-6 text-center">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-emerald-950 dark:text-emerald-50">
                        {t("hero.title")}
                    </h1>
                    <p className="mx-auto max-w-[700px] text-emerald-800 md:text-xl dark:text-emerald-200">
                        {t("hero.subtitle")}
                    </p>
                </div>
            </div>
        </section>
    );
}

export function AboutSection() {
    const { t } = useLanguage();
    return (
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                    <div className="space-y-4">
                        <div className="inline-block rounded-lg bg-emerald-100 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100 px-3 py-1 text-sm">{t("about.badge")}</div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
                            {t("about.title")}
                        </h2>
                        <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            {t("about.description")}
                        </p>
                        <ul className="grid gap-4 mt-6">
                            <li className="flex items-center gap-2">
                                <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                <span className="text-foreground">{t("about.feature1")}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                <span className="text-foreground">{t("about.feature2")}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                <span className="text-foreground">{t("about.feature3")}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="relative w-full aspect-video overflow-hidden rounded-xl border bg-muted shadow-sm flex items-center justify-center">
                            <span className="text-muted-foreground">{t("about.imageAlt")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function PricingSection() {
    const { t, language } = useLanguage();
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    // Helper to get translated day labels
    // Helper to get translated day labels
    const getWeekDays = () => {
        const days = t("common.days.short") as string[];
        // Array order: 0=Seg, 1=Ter, 2=Qua, 3=Qui, 4=Sex, 5=Sab, 6=Dom
        return [
            { key: 'Dom', label: days[6] },
            { key: 'Seg', label: days[0] },
            { key: 'Ter', label: days[1] },
            { key: 'Qua', label: days[2] },
            { key: 'Qui', label: days[3] },
            { key: 'Sex', label: days[4] },
            { key: 'Sab', label: days[5] },
        ];
    };

    const weekDays = getWeekDays();

    const toggleDay = (day: string) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter((d) => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    const PRICE_PER_DAY = 30;
    const DISCOUNT_PERCENTAGE = 0.20;
    const daysCount = selectedDays.length;
    const dailyCost = daysCount * PRICE_PER_DAY;
    const baseMonthlyCost = dailyCost * 4;
    const discountedMonthlyCost = baseMonthlyCost * (1 - DISCOUNT_PERCENTAGE);

    return (
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-[linear-gradient(to_right,#adeada,#bdeadb,#cdeadc,#ddeadd,#edeade)] dark:bg-[linear-gradient(to_right,#022c22,#064e3b,#065f46,#115e59)]">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-background/50 border px-3 py-1 text-sm backdrop-blur-sm text-foreground">{t("pricing.simulation")}</div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-emerald-950 dark:text-emerald-50">{t("pricing.title")}</h2>
                        <p className="max-w-[900px] text-emerald-800 dark:text-emerald-200 md:text-xl/relaxed">
                            {t("pricing.subtitle")}
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 mt-6 bg-white/40 dark:bg-black/20 p-4 rounded-xl border border-emerald-200/50 dark:border-emerald-800/50 backdrop-blur-sm shadow-sm">
                        {weekDays.map((day) => {
                            const isSelected = selectedDays.includes(day.key);
                            return (
                                <button
                                    key={day.key}
                                    onClick={() => toggleDay(day.key)}
                                    className={`
                                        w-10 h-10 rounded-full font-bold text-sm transition-all duration-200 border
                                        ${isSelected
                                            ? 'bg-emerald-600 text-white border-emerald-600 scale-110 shadow-md dark:bg-emerald-500'
                                            : 'bg-white text-gray-500 border-gray-200 hover:border-emerald-400 hover:text-emerald-600 dark:bg-transparent dark:text-emerald-100 dark:border-emerald-800 dark:hover:border-emerald-500'
                                        }
                                    `}
                                >
                                    {day.label}
                                </button>
                            );
                        })}
                    </div>

                    {daysCount > 0 ? (
                        <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100 animate-in fade-in">
                            {t("pricing.daysSelectedLabel")}: {daysCount}
                        </p>
                    ) : (
                        <p className="text-sm font-medium text-emerald-900/50 dark:text-emerald-100/50 animate-in fade-in">
                            {t("pricing.selectPrompt")}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
                    <Card className="flex flex-col bg-white/80 dark:bg-black/40 border-emerald-100 dark:border-emerald-900 shadow-lg">
                        <CardHeader>
                            <CardTitle>{t("pricing.pricePerDay")}</CardTitle>
                            <CardDescription className="dark:text-emerald-200/60">{t("pricing.noLongTerm")}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="flex flex-col">
                                <div className="text-4xl font-bold dark:text-emerald-50">
                                    R$ {dailyCost}
                                    <span className="text-xl font-normal text-muted-foreground dark:text-emerald-200/60">
                                        /{t("pricing.pricePerDaySub")}
                                    </span>
                                </div>
                                <span className="text-xs text-muted-foreground mt-2 dark:text-emerald-200/60">
                                    {daysCount} x R$ {PRICE_PER_DAY},00
                                </span>
                            </div>
                            <ul className="mt-6 space-y-2 text-sm text-gray-500 dark:text-emerald-200/80">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> {t("pricing.features.0")}</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> {t("pricing.features.1")}</li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-600" variant="outline" disabled={daysCount === 0}>
                                {t("pricing.reserveWeek")}
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card className="flex flex-col relative border-emerald-500 shadow-xl bg-white dark:bg-emerald-950/30 scale-105 z-10 dark:border-emerald-600">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase whitespace-nowrap shadow-md">
                            {t("pricing.discountBadge")}
                        </div>
                        <CardHeader>
                            <CardTitle className="dark:text-emerald-50">{t("pricing.monthlyPlan")}</CardTitle>
                            <CardDescription className="dark:text-emerald-200/60">{t("pricing.monthlyPlanDesc")}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="flex flex-col">
                                {daysCount > 0 && (
                                    <span className="text-sm text-muted-foreground line-through decoration-red-400">
                                        {t("pricing.fromPrice")} {baseMonthlyCost},00
                                    </span>
                                )}
                                <div className="text-4xl font-bold text-emerald-950 dark:text-white">
                                    R$ {discountedMonthlyCost.toFixed(0)}
                                    <span className="text-xl font-normal text-muted-foreground dark:text-emerald-200/60">
                                        /mês
                                    </span>
                                </div>

                                <span className="text-xs text-emerald-600 font-medium mt-2 block dark:text-emerald-400">
                                    {t("pricing.savings").replace("{amount}", (baseMonthlyCost - discountedMonthlyCost).toFixed(0))}
                                </span>
                            </div>

                            <ul className="mt-6 space-y-2 text-sm text-gray-500 dark:text-emerald-200/80">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> {t("pricing.features.2")}</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> {t("pricing.features.3")}</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> {t("pricing.features.4")}</li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Link href="/auth" className="w-full">
                                <Button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-emerald-600 dark:hover:bg-emerald-500" disabled={daysCount === 0}>
                                    {t("pricing.subscribeDiscount")}
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </section>
    );
}

export function DevelopersSection() {
    return null;
}