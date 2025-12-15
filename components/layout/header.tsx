"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/devices" className="flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6" />
          <span className="text-xl font-bold">IoT Device Portal</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/devices">
            <Button
              variant={pathname === "/devices" ? "default" : "ghost"}
              size="sm"
            >
              Devices
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}

