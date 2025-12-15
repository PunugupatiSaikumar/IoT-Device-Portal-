"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Zap } from "lucide-react";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 shadow-lg border-b-primary/10">
      {/* Header background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="container flex h-16 items-center justify-between relative z-10">
        <Link href="/devices" className="flex items-center gap-2 group">
          <div className="relative">
            <LayoutDashboard className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
            <Zap className="h-3 w-3 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent group-hover:from-primary/80 group-hover:to-primary/40 transition-all duration-300">
            IoT Device Portal
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/devices">
            <Button
              variant={pathname === "/devices" ? "default" : "ghost"}
              size="sm"
              className="relative overflow-hidden group"
            >
              <span className="relative z-10">Devices</span>
              {pathname === "/devices" && (
                <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent animate-shimmer"></span>
              )}
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}

