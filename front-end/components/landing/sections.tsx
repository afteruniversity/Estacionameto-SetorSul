
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Check, Code2 } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto flex flex-col items-center justify-center space-y-4 px-4 md:px-6 text-center">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                        Gerenciamento Inteligente de Estacionamento
                    </h1>
                    <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                        Segurança, praticidade e controle total para sua vaga. Mensalistas e rotativos com a melhor experiência.
                    </p>
                </div>
                <div className="space-x-4 pt-4">
                    <Link href="/auth">
                        <Button size="lg" className="h-11 px-8 gap-2">
                            Começar Agora <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="#pricing">
                        <Button variant="outline" size="lg" className="h-11 px-8">
                            Ver Planos
                        </Button>
                    </Link>
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
                            {/* Placeholder Image */}
                            <span className="text-muted-foreground">Imagem do Estacionamento</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function PricingSection() {
    return (
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-background border px-3 py-1 text-sm">Mensalidades</div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Planos Flexíveis</h2>
                        <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            Escolha o plano ideal para sua necessidade. Vagas limitadas.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    {/* Card 1: Avulso */}
                    <Card className="flex flex-col">
                        <CardHeader>
                            <CardTitle>Rotativo</CardTitle>
                            <CardDescription>Para quem precisa estacionar esporadicamente.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="text-4xl font-bold">R$ 15<span className="text-xl font-normal text-muted-foreground">/hora</span></div>
                            <ul className="mt-4 space-y-2 text-sm text-gray-500">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Pagamento na saída</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Sujeito a lotação</li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" variant="outline">Verificar Disponibilidade</Button>
                        </CardFooter>
                    </Card>

                    {/* Card 2: Mensal Diurno */}
                    <Card className="flex flex-col relative border-primary shadow-lg scale-105 z-10">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                            Mais Popular
                        </div>
                        <CardHeader>
                            <CardTitle>Mensal Diurno</CardTitle>
                            <CardDescription>Acesso garantido durante o horário comercial.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="text-4xl font-bold">R$ 250<span className="text-xl font-normal text-muted-foreground">/mês</span></div>
                            <ul className="mt-4 space-y-2 text-sm text-gray-500">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Seg a Sex, 08h às 18h</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Vaga fixa garantida</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Controle via App</li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Link href="/auth" className="w-full">
                                <Button className="w-full">Assinar Agora</Button>
                            </Link>
                        </CardFooter>
                    </Card>

                    {/* Card 3: Integral */}
                    <Card className="flex flex-col">
                        <CardHeader>
                            <CardTitle>Mensal Integral</CardTitle>
                            <CardDescription>Acesso livre 24 horas por dia.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="text-4xl font-bold">R$ 350<span className="text-xl font-normal text-muted-foreground">/mês</span></div>
                            <ul className="mt-4 space-y-2 text-sm text-gray-500">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Acesso 24/7</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Vaga VIP coberta</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Suporte prioritário</li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Link href="/auth" className="w-full">
                                <Button className="w-full" variant="outline">Assinar Agora</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </section>
    );
}

export function DevelopersSection() {
    return (
        <section id="developers" className="w-full py-12 md:py-24 lg:py-32 bg-background border-t">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Time</div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Desenvolvedores</h2>
                    <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                        Conheça a equipe por trás deste projeto.
                    </p>
                </div>
                <div className="flex justify-center mt-10">
                    {/* Simply a placeholder for dev cards or avatars */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                            <Code2 className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h3 className="font-semibold">Hackathon Team</h3>
                        <p className="text-sm text-muted-foreground">Full Stack Engineers</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
