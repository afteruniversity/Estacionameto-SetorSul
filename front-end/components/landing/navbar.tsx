"use client";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Car, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navItems = [
    { name: "Sobre o projeto", href: "#about" },
    { name: "Mensalidades", href: "#pricing" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
                {/* Mobile Menu */}
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
                                <SheetTitle className="flex items-center gap-2">
                                    <Car className="h-6 w-6" />
                                    <span>Estacionamento</span>
                                </SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-4 px-2 mt-6">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="text-lg font-medium transition-colors hover:text-primary"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <div className="pt-4">
                                    <Link href="/auth" onClick={() => setIsOpen(false)}>
                                        <Button className="w-full bg-[#007BFF]">Login / Cadastro</Button>
                                    </Link>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Desktop Left Navigation */}
                <div className="hidden md:flex md:items-center md:gap-6 lg:gap-8">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl mr-4">
                        <Car className="h-6 w-6" />
                        <span>Estacionamento</span>
                    </Link>
                    <nav className="flex items-center gap-6 text-sm font-medium">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="transition-colors hover:text-foreground/80 text-foreground/60"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Spacer */}
                <div className="flex-1 md:hidden flex justify-center">
                    <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                        <Car className="h-5 w-5" />
                        <span>Estacionamento</span>
                    </Link>
                </div>

                {/* Right Side (Login) */}
                <div className="flex flex-1 items-center justify-end space-x-2">
                    <div className="hidden md:flex">
                        <Link href="/auth">
                            <Button>Login / Cadastro</Button>
                        </Link>
                    </div>
                    {/* Placeholder for empty space on mobile right if needed to balance */}
                    <div className="w-9 md:hidden" />
                </div>
            </div>
        </header>
    );
}
