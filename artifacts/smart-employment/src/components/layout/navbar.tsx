import { Link, useLocation } from "wouter";
import { useGetMe, useLogout } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User, Briefcase, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [location] = useLocation();
  const { data: user } = useGetMe({ query: { retry: false } });
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        window.location.href = "/";
      },
    });
  };

  const navLinks = [
    { href: "/jobs", label: "Jobs" },
    { href: "/internship", label: "Internships" },
    { href: "/shaqotag", label: "Shaqo-Tag" },
    { href: "/membership", label: "Membership" },
    { href: "/about", label: "About Us" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary-foreground tracking-tight">
              Smart<span className="text-secondary">Employment</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-secondary ${
                  location === link.href ? "text-secondary" : "text-primary-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                {user.role === "employer" && (
                  <Button asChild variant="secondary" size="sm">
                    <Link href="/post-job">Post a Job</Link>
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                      <User className="h-5 w-5 mr-2" />
                      {user.fullName}
                      <ChevronDown className="h-4 w-4 ml-1 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive cursor-pointer" onClick={handleLogout}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/create-account">Sign up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-primary-foreground">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 py-6">
                <Link href="/" className="flex items-center space-x-2 mb-4">
                  <span className="text-xl font-bold text-primary tracking-tight">
                    Smart<span className="text-secondary">Employment</span>
                  </span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-lg font-medium transition-colors hover:text-primary ${
                        location === link.href ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col gap-3 mt-4 border-t pt-6">
                  {user ? (
                    <>
                      <div className="font-medium px-2 py-1 text-sm text-muted-foreground">Signed in as {user.fullName}</div>
                      {user.role === "employer" && (
                        <Button asChild variant="secondary" className="w-full justify-start">
                          <Link href="/post-job">Post a Job</Link>
                        </Button>
                      )}
                      <Button variant="outline" className="w-full justify-start text-destructive" onClick={handleLogout}>
                        Log out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button asChild variant="outline" className="w-full justify-start">
                        <Link href="/login">Log in</Link>
                      </Button>
                      <Button asChild variant="secondary" className="w-full justify-start">
                        <Link href="/create-account">Sign up</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
