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
import { useAuth } from "@/contexts/AuthContext";
import { Car } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { api } from "@/lib/request";
import { useRouter } from "next/navigation";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function AuthPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const { login: authLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState<RegisterData>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await api.post<{ token: string; user: any }>(
        "/auth/login",
        {
          email: loginData.email,
          password: loginData.password,
        },
      );

      await authLogin(response.token);

      window.scrollTo(0, 0);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post<{ token: string; user: any }>(
        "/auth/register",
        {
          username: registerData.username,
          email: registerData.email,
          password: registerData.password,
          firstName:
            registerData.username.split(" ")[0] || registerData.username,
          lastName: registerData.username.split(" ")[1] || "",
        },
      );

      await authLogin(response.token);

      window.scrollTo(0, 0);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to register");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-muted/40 p-4 pt-20 md:pt-24">
      <div className="flex w-full flex-col items-center gap-6">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
          <Car className="h-8 w-8" />
          <span>{t("auth.title")}</span>
        </Link>
        <Tabs defaultValue="login" className="w-full max-w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">{t("auth.tabs.login")}</TabsTrigger>
            <TabsTrigger value="register">
              {t("auth.tabs.register")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <form onSubmit={handleLogin}>
                <CardHeader>
                  <CardTitle>{t("auth.login.title")}</CardTitle>
                  <CardDescription>
                    {t("auth.login.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 mt-4">
                  {error && (
                    <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                      {error}
                    </div>
                  )}
                  <div className="space-y-1">
                    <Label htmlFor="email">{t("auth.login.emailLabel")}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">
                      {t("auth.login.passwordLabel")}
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      required
                      disabled={isLoading}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button
                    type="submit"
                    className="w-full mt-2"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : t("auth.login.submit")}
                  </Button>
                  <div className="text-center text-sm text-muted-foreground">
                    <a href="#" className="hover:underline">
                      {t("auth.login.forgotPassword")}
                    </a>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <form onSubmit={handleRegister}>
                <CardHeader>
                  <CardTitle>{t("auth.register.title")}</CardTitle>
                  <CardDescription>
                    {t("auth.register.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 mt-4">
                  {error && (
                    <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                      {error}
                    </div>
                  )}
                  <div className="space-y-1 mt-2">
                    <Label htmlFor="name">{t("auth.register.nameLabel")}</Label>
                    <Input
                      id="name"
                      placeholder="Nome Sobrenome"
                      value={registerData.username}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          username: e.target.value,
                        })
                      }
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="register-email">
                      {t("auth.register.emailLabel")}
                    </Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          email: e.target.value,
                        })
                      }
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="register-password">
                      {t("auth.register.passwordLabel")}
                    </Label>
                    <Input
                      id="register-password"
                      type="password"
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          password: e.target.value,
                        })
                      }
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="confirm-password">
                      {t("auth.register.confirmLabel")}
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={registerData.confirmPassword}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          confirmPassword: e.target.value,
                        })
                      }
                      required
                      disabled={isLoading}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full mt-2"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : t("auth.register.submit")}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
