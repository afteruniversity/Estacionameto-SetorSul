"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useLanguage } from "@/contexts/LanguageContext";
import { Car, LogOut, User, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/request";

interface Plano {
  id: number;
  nome: string;
  tipo: string;
  preco: number;
  quantidadeDiasSemana?: number;
}

interface UserData {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  plano?: Plano | null;
}

export default function DashboardPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/auth");
          return;
        }

        // Fetch user data from API
        const userData = await api.get<UserData>("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        // If token is invalid, redirect to login
        localStorage.removeItem("token");
        router.push("/auth");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t("dashboard.greeting.morning");
    if (hour < 18) return t("dashboard.greeting.afternoon");
    return t("dashboard.greeting.evening");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-muted-foreground">{t("dashboard.loading")}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            {getGreeting()}, {user.username.split(" ")[0]}! 👋
          </h1>
          <p className="mt-2 text-muted-foreground">{t("dashboard.welcome")}</p>
        </div>

        {/* No Plan Alert */}
        {!user.plano && (
          <Alert className="mb-6 border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/50">
            <AlertCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <AlertTitle className="text-emerald-900 dark:text-emerald-100">
              {t("dashboard.noPlan.title")}
            </AlertTitle>
            <AlertDescription className="mt-2 text-emerald-800 dark:text-emerald-200">
              {t("dashboard.noPlan.description")}
            </AlertDescription>
            <Link href="/dashboard/plans" className="mt-4 inline-block">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600">
                {t("dashboard.noPlan.button")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </Alert>
        )}

        {/* Active Plan Card */}
        {user.plano && (
          <Card className="mb-6 border-emerald-200 dark:border-emerald-800">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{t("dashboard.activePlan.title")}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {user.plano.tipo}
                </span>
              </CardTitle>
              <CardDescription>
                {t("dashboard.activePlan.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {user.plano.nome}
                  </p>
                  {user.plano.quantidadeDiasSemana && (
                    <p className="text-sm text-muted-foreground">
                      {user.plano.quantidadeDiasSemana}{" "}
                      {t("dashboard.activePlan.daysPerWeek")}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">
                    R$ {user.plano.preco.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("dashboard.activePlan.perWeek")}
                  </p>
                </div>
              </div>
              <Link href="/dashboard/plans" className="mt-4 inline-block">
                <Button variant="outline" size="sm">
                  {t("dashboard.activePlan.managePlan")}
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Dashboard Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.cards.activeRentals.title")}</CardTitle>
              <CardDescription>
                {t("dashboard.cards.activeRentals.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("dashboard.cards.activeRentals.noActive")}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {t("dashboard.cards.upcomingBookings.title")}
              </CardTitle>
              <CardDescription>
                {t("dashboard.cards.upcomingBookings.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("dashboard.cards.upcomingBookings.noUpcoming")}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.cards.totalTrips.title")}</CardTitle>
              <CardDescription>
                {t("dashboard.cards.totalTrips.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("dashboard.cards.totalTrips.startFirst")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        {/* <div className="mt-8">
          <h2 className="mb-4 text-2xl font-semibold">
            {t("dashboard.quickActions.title")}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="cursor-pointer transition-colors hover:bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg">
                  {t("dashboard.quickActions.browseCars.title")}
                </CardTitle>
                <CardDescription>
                  {t("dashboard.quickActions.browseCars.description")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer transition-colors hover:bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg">
                  {t("dashboard.quickActions.viewHistory.title")}
                </CardTitle>
                <CardDescription>
                  {t("dashboard.quickActions.viewHistory.description")}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div> */}
      </main>
    </div>
  );
}
