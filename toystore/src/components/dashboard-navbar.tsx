"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut } from "@/contexts/auth";
import { Gamepad2, LayoutDashboard, LogOut, Users } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function DashboardNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 gradient-primary rounded-2xl flex items-center justify-center animate-float">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary">ToyStore</h1>
            <p className="text-xs text-muted-foreground">Gestão de Vendas</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          <Button
            variant={isActive("/dashboard") ? "default" : "ghost"}
            onClick={() => router.push("/dashboard")}
            className="gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Button>
          <Button
            variant={isActive("/dashboard/clients") ? "default" : "ghost"}
            onClick={() => router.push("/dashboard/clients")}
            className="gap-2"
          >
            <Users className="w-4 h-4" />
            Clientes
          </Button>
        </nav>

        {/* User Menu */}
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src="" alt="User" />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              AD
            </AvatarFallback>
          </Avatar>
          <Button
            variant="ghost"
            size="sm"
            onClick={signOut}
            className="gap-2 text-muted-foreground hover:text-destructive"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
}
