"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Menu } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { logout } from "@/service/logout";

const links = ["admin-dashboard", "login", "news", "Pricing"];

export type IUser = {
  id: string;
  name: string;
  email: string;
  activeStatus: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  profile: {
    id: string;
    profilePhoto: string | null;
    bio: string | null;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };
};

type NavbarProps = {
  user: IUser;
};

export default function Navbar({ user }: NavbarProps) {
  console.log(user);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logoutAction = async (action: string) => {
    if (action === "signOut") {
      await logout();
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 px-4 transition-all duration-300 sm:px-6",
        isScrolled ? "pt-3" : "pt-5",
      )}
    >
      <nav
        aria-label="Main navigation"
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-2xl border bg-background/90 px-4 shadow-sm backdrop-blur-md transition-all duration-300 sm:px-5",
          isScrolled ? "h-14 border-border/80" : "h-[4.5rem] border-border/60",
        )}
      >
        <a
          href=""
          className="flex items-center gap-2 font-semibold tracking-tight"
          aria-label="Luma home"
        >
          <span className="text-base sm:text-lg">Next.AI</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link}
              href={`${link.toLowerCase()}`}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Use asChild with a nested <a> tag */}


          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="gap-2 rounded-xl px-2.5"
                  aria-label="Open user menu"
                >
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <span className="hidden text-sm font-medium sm:inline">
                    {user?.name || "User"}
                  </span>

                  <ChevronDown aria-hidden="true" className="hidden sm:block" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => logoutAction("signOut")}
                    className="cursor-pointer text-destructive focus:text-destructive"
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="default">
              <Link href="/login">Login</Link>
            </Button>
          )}

          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Menu aria-hidden="true" />
          </Button>
        </div>
      </nav>
      {menuOpen && (
        <div className="mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-2xl border bg-background p-2 shadow-lg md:hidden">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
