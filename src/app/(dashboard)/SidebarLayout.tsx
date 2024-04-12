"use client";
import {
  History,
  Home,
  Menu,
  Package,
  Package2,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { createAndRedirectToInterview } from "@/utils/interview";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

type navbarLink = {
  name: string;
  href: string;
  icon: React.ReactNode;
  handler?: () => void;
};

export function SidebarLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const navbarLinks: navbarLink[] = [
    {
      name: "Start new Interview",
      icon: <Home className="h-6 w-6" />,
      handler: createAndRedirectToInterview,
      href: "/interview",
    },
    {
      name: "Interviews history",
      href: "/history",
      icon: <History className="h-6 w-6" />,
    },
  ];
  const isCurrentRoute = (link: string) => {
    const isActive =
      pathname === link || (pathname?.startsWith(link));
    return isActive;
  };

  const handleLink = (link: navbarLink) => {
    if (link.handler) {
      return link.handler();
    }
    router.push(link.href);
  };

  return (
    <div
      className={twMerge(
        "grid overflow-hidden h-[100vh] w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] bg-[#15191D]",
        className
      )}
    >
      <div className="hidden bgd-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-14">
          <div className="flex h-14 items-center pt-6  px-4 lg:h-[60px] lg:px-6 text-2xl">
            <Link
              href="/"
              className="flex items-center gap-4 font-semibold text-white"
            >
              <Package2 className="h-8 w-8" />
              <span className="">BehaveWise</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 font-medium lg:px-4 gap-y-2">
              {navbarLinks.map((link) => {
                const { name, href, icon } = link;
                return (
                  <button
                    key={name}
                    className={twMerge([
                      "flex items-center gap-4 rounded-md px-3 py-2  text-[#AFB1B3] text-lg",
                      isCurrentRoute(href)
                        ? "bg-white text-[#15191D]"
                        : "hover:text-white",
                    ])}
                    onClick={() => handleLink(link)}
                  >
                    {icon}
                    {name}
                  </button>
                );
              })}
            </nav>
          </div>
          <div className="mt-auto p-4"></div>
        </div>
      </div>
      <div className="flex flex-col  border-black rounded-[4rem] p-5 pl-0">
        <header className="flex h-20 items-center gap-4 pt-7 bg-[#ECEFF3] px-10 lg:h-[60px] lg:px-8 rounded-t-xl ">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Interviews
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
              </nav>
              <div className="mt-auto"></div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {/* <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form> */}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full relative"
              >
                <Avatar className="w-14 h-14">
                  <AvatarImage
                    alt="@shadcn"
                    src="/avatar.png"
                    width={60}
                    height={60}
                  />
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:p-6 lg:pt-10 bg-[#ECEFF3]">
          <div className="mt-[-4.5rem]">{children}</div>
        </main>
      </div>
    </div>
  );
}
