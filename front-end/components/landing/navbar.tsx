"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Car, ChevronDown, Menu, Moon, Sun, User, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const languages = [
  { code: "pt-BR", name: "Português", flag: "🇧🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

export function Navbar({ hideNavItems = false }: { hideNavItems?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading: isLoadingUser, logout: authLogout } = useAuth();

  const currentLang =
    languages.find((l) => l.code === language) || languages[0];

  const isAuthPage = pathname === "/auth";
  const shouldHideNavItems = hideNavItems || isAuthPage;

  const handleLogout = () => {
    authLogout();
    router.push("/");
    setIsOpen(false);
  };

  const navItems = [
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.pricing"), href: "#pricing" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <div className="mr-4 md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-emerald-950 dark:text-emerald-50">
                  <Car className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  <span>Estacionamento</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 px-2 mt-6">
                {!shouldHideNavItems &&
                  !user &&
                  navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium transition-colors hover:text-emerald-600 text-emerald-950 dark:text-emerald-100 dark:hover:text-emerald-400"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                <div className="pt-4 border-t border-emerald-100 dark:border-emerald-800 mt-2 space-y-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Idioma
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code as any);
                            setIsOpen(false);
                          }}
                          className={`px-3 py-1.5 rounded-md text-sm border ${language === lang.code ? "bg-emerald-100 border-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:border-emerald-700 dark:text-emerald-100" : "bg-background border-border text-foreground"}`}
                        >
                          {lang.flag} {lang.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Tema
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTheme("light")}
                        className={
                          theme === "light"
                            ? "bg-emerald-100 border-emerald-200 dark:bg-emerald-800"
                            : ""
                        }
                      >
                        <Sun className="h-4 w-4 mr-2" /> Claro
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTheme("dark")}
                        className={
                          theme === "dark"
                            ? "bg-emerald-100 border-emerald-200 dark:bg-emerald-800"
                            : ""
                        }
                      >
                        <Moon className="h-4 w-4 mr-2" /> Escuro
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  {user ? (
                    <div className="space-y-2">
                      <div className="px-3 py-2 rounded-md bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800">
                        <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                          {user.username}
                        </p>
                        <p className="text-xs text-emerald-700 dark:text-emerald-300">
                          {user.email}
                        </p>
                      </div>
                      <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="w-full gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        {t("nav.user.logout")}
                      </Button>
                    </div>
                  ) : (
                    <Link href="/auth" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600">
                        {t("nav.login")}
                      </Button>
                    </Link>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden md:flex md:items-center md:gap-6 lg:gap-8">
          <Link
            href={user ? "/dashboard" : "/"}
            className="flex items-center gap-2 font-bold text-xl mr-4 text-emerald-950 dark:text-emerald-50"
          >
            <Car className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            <span>Estacionamento</span>
          </Link>
          {!shouldHideNavItems && !user && (
            <nav className="flex items-center gap-6 text-sm font-medium">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition-colors hover:text-emerald-600 text-emerald-900/70 hover:font-bold dark:text-emerald-100/70 dark:hover:text-emerald-400"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}
        </div>
        <div className="flex-1 md:hidden flex justify-center">
          <Link
            href={user ? "/dashboard" : "/"}
            className="flex items-center gap-2 font-bold text-lg text-emerald-950 dark:text-emerald-50"
          >
            <Car className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <span>Estacionamento</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex text-emerald-900 dark:text-emerald-100"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Claro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Escuro
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="hidden md:flex">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-emerald-900 hover:text-emerald-700 hover:bg-emerald-50 dark:text-emerald-100 dark:hover:text-emerald-300 dark:hover:bg-emerald-900/50"
              >
                <span className="text-lg leading-none">{currentLang.flag}</span>
                <span className="hidden lg:inline">{currentLang.name}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as any)}
                  className="cursor-pointer gap-2"
                >
                  <span className="text-lg leading-none">{lang.flag}</span>
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="hidden md:flex">
            {isLoadingUser ? (
              <div className="h-9 w-20 animate-pulse rounded-md bg-emerald-100 dark:bg-emerald-900" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="gap-2 text-emerald-900 hover:text-emerald-700 hover:bg-emerald-50 dark:text-emerald-100 dark:hover:text-emerald-300 dark:hover:bg-emerald-900/50"
                  >
                    <User className="h-4 w-4" />
                    <span>{user.username.split(" ")[0]}</span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm">
                    <p className="font-medium">{user.username}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      {t("nav.user.dashboard")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600 dark:text-red-400"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {t("nav.user.logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-sm hover:shadow-md dark:bg-emerald-500 dark:hover:bg-emerald-600">
                  {t("nav.login")}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
