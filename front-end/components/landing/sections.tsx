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
import { useState } from "react";
import { Check } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[linear-gradient(to_right,#adeada,#bdeadb,#cdeadc,#ddeadd,#edeade)]">
            <div className="container mx-auto flex flex-col items-center justify-center space-y-4 px-4 md:px-6 text-center">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                        Gerenciamento Inteligente de Estacionamento
                    </h1>
                    <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                        Segurança, praticidade e controle total para sua vaga. Mensalistas e rotativos com a melhor experiência.
                    </p>
                </div>
            </div>
        </section>
    );
}

export function AboutSection() {
    return (
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                    <div className="space-y-4">
                        <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Sobre o Projeto</div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Modernizando o estacionamento do Setor Sul
                        </h2>
                        <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            Nosso sistema visa otimizar o uso das vagas limitadas, oferecendo uma gestão transparente e eficiente tanto para mensalistas quanto para usuários avulsos.
                        </p>
                        <ul className="grid gap-4 mt-6">
                            <li className="flex items-center gap-2">
                                <Check className="h-5 w-5 text-primary" />
                                <span>Controle de acesso seguro</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-5 w-5 text-primary" />
                                <span>Monitoramento de vagas em tempo real</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-5 w-5 text-primary" />
                                <span>Pagamentos automatizados</span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="relative w-full aspect-video overflow-hidden rounded-xl border bg-muted shadow-sm flex items-center justify-center">
                            <span className="text-muted-foreground">Imagem do Estacionamento</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function PricingSection() {
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    const weekDays = [
        { key: 'Dom', label: 'D' },
        { key: 'Seg', label: 'S' },
        { key: 'Ter', label: 'T' },
        { key: 'Qua', label: 'Q' },
        { key: 'Qui', label: 'Q' },
        { key: 'Sex', label: 'S' },
        { key: 'Sab', label: 'S' },
    ];

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
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-[linear-gradient(to_right,#adeada,#bdeadb,#cdeadc,#ddeadd,#edeade)]">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-background/50 border px-3 py-1 text-sm backdrop-blur-sm">Simulação Personalizada</div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-emerald-950">Monte sua escala</h2>
                        <p className="max-w-[900px] text-emerald-800 md:text-xl/relaxed">
                            Selecione os dias da semana que você utiliza e ganhe desconto no plano mensal.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 mt-6 bg-white/40 p-4 rounded-xl border border-emerald-200/50 backdrop-blur-sm shadow-sm">
                        {weekDays.map((day) => {
                            const isSelected = selectedDays.includes(day.key);
                            return (
                                <button
                                    key={day.key}
                                    onClick={() => toggleDay(day.key)}
                                    className={`
                                        w-10 h-10 rounded-full font-bold text-sm transition-all duration-200 border
                                        ${isSelected 
                                            ? 'bg-emerald-600 text-white border-emerald-600 scale-110 shadow-md' 
                                            : 'bg-white text-gray-500 border-gray-200 hover:border-emerald-400 hover:text-emerald-600'
                                        }
                                    `}
                                >
                                    {day.label}
                                </button>
                            );
                        })}
                    </div>
                    
                    {daysCount > 0 ? (
                        <p className="text-sm font-medium text-emerald-900 animate-in fade-in">
                            Você selecionou {daysCount} {daysCount === 1 ? 'dia' : 'dias'} por semana
                        </p>
                    ) : (
                        <p className="text-sm font-medium text-emerald-900/50 animate-in fade-in">
                            Selecione ao menos um dia acima
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
                    <Card className="flex flex-col bg-white/80 border-emerald-100 shadow-lg">
                        <CardHeader>
                            <CardTitle>Pagamento Diário</CardTitle>
                            <CardDescription>Sem compromisso de longo prazo.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="flex flex-col">
                                <div className="text-4xl font-bold">
                                    R$ {dailyCost}
                                    <span className="text-xl font-normal text-muted-foreground">
                                        /semana
                                    </span>
                                </div>
                                <span className="text-xs text-muted-foreground mt-2">
                                    {daysCount} dias x R$ {PRICE_PER_DAY},00
                                </span>
                            </div>
                            <ul className="mt-6 space-y-2 text-sm text-gray-500">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Flexibilidade total</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Vaga rotativa</li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" variant="outline" disabled={daysCount === 0}>
                                Reservar Semana
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card className="flex flex-col relative border-emerald-500 shadow-xl bg-white scale-105 z-10">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase whitespace-nowrap shadow-md">
                            20% de Desconto Aplicado
                        </div>
                        <CardHeader>
                            <CardTitle>Assinatura Mensal</CardTitle>
                            <CardDescription>Garante sua vaga + Desconto exclusivo.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="flex flex-col">
                                {daysCount > 0 && (
                                    <span className="text-sm text-muted-foreground line-through decoration-red-400">
                                        De R$ {baseMonthlyCost},00
                                    </span>
                                )}
                                <div className="text-4xl font-bold text-emerald-950">
                                    R$ {discountedMonthlyCost.toFixed(0)}
                                    <span className="text-xl font-normal text-muted-foreground">
                                        /mês
                                    </span>
                                </div>
                                
                                <span className="text-xs text-emerald-600 font-medium mt-2 block">
                                    Você economiza R$ {(baseMonthlyCost - discountedMonthlyCost).toFixed(0)} por mês
                                </span>
                            </div>

                            <ul className="mt-6 space-y-2 text-sm text-gray-500">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Vaga <b>Garantida</b></li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Acesso automático</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Pagamento único</li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Link href="/auth" className="w-full">
                                <Button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white" disabled={daysCount === 0}>
                                    Assinar com Desconto
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