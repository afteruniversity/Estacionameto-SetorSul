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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, Car } from "lucide-react";
import Link from "next/link";

export default function AuthPage() {
    const { t } = useLanguage();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
            <Link
                href="/"
                className="absolute left-4 top-4 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary md:left-8 md:top-8"
            >
                <ArrowLeft className="h-4 w-4" />
                {t("auth.backToHome")}
            </Link>

            <div className="flex w-full flex-col items-center gap-6">
                <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
                    <Car className="h-8 w-8" />
                    <span>{t("auth.title")}</span>
                </Link>
                <Tabs defaultValue="login" className="w-full max-w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">{t("auth.tabs.login")}</TabsTrigger>
                        <TabsTrigger value="register">{t("auth.tabs.register")}</TabsTrigger>
                    </TabsList>

                    <TabsContent value="login">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t("auth.login.title")}</CardTitle>
                                <CardDescription>
                                    {t("auth.login.description")}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="email">{t("auth.login.emailLabel")}</Label>
                                    <Input id="email" type="email" placeholder="seu@email.com" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">{t("auth.login.passwordLabel")}</Label>
                                    <Input id="password" type="password" />
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col gap-4">
                                <Button className="w-full">{t("auth.login.submit")}</Button>
                                <div className="text-center text-sm text-muted-foreground">
                                    <a href="#" className="hover:underline">{t("auth.login.forgotPassword")}</a>
                                </div>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="register">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t("auth.register.title")}</CardTitle>
                                <CardDescription>
                                    {t("auth.register.description")}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="name">{t("auth.register.nameLabel")}</Label>
                                    <Input id="name" placeholder="Nome Sobrenome" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="register-email">{t("auth.register.emailLabel")}</Label>
                                    <Input id="register-email" type="email" placeholder="seu@email.com" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="register-password">{t("auth.register.passwordLabel")}</Label>
                                    <Input id="register-password" type="password" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="confirm-password">{t("auth.register.confirmLabel")}</Label>
                                    <Input id="confirm-password" type="password" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">{t("auth.register.submit")}</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
