
"use client";

import Link from "next/link";
import {
  Leaf,
  ArrowUpRight,
  CalendarDays,
  LogIn,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import ProfileDropdown from "./NevCheck";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-emerald-100/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-3 px-3 sm:h-20 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-2 sm:gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 transition-transform duration-300 group-hover:rotate-[-8deg] sm:h-11 sm:w-11 sm:rounded-2xl">
            <Leaf className="h-5 w-5 sm:h-6 sm:w-6" />
          </span>

          <span className="flex flex-col leading-tight">
            <span className="text-base font-extrabold tracking-tight text-slate-900 sm:text-xl">
              Green<span className="text-emerald-600">Bond</span>
            </span>

            <span className="mt-1 hidden text-[10px] font-medium tracking-wide text-slate-500 min-[380px]:block">
              সবুজে বাঁধি মেলবন্ধন
            </span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex shrink-0 items-center">
          <Link
            href="/upcommingEvent"
            className="group relative flex items-center gap-1.5 text-xs font-semibold text-slate-600 transition-colors hover:text-emerald-700 sm:gap-2 sm:text-sm"
          >
            <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5" />

            <span>Upcoming Events</span>

            <span className="absolute -bottom-2 left-0 h-0.5 w-0 rounded-full bg-emerald-600 transition-all duration-300 group-hover:w-full" />
          </Link>
        </nav>

        {/* Authentication */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-5">
          {isPending ? (
            <div className="h-9 w-16 animate-pulse rounded-full bg-emerald-50 sm:h-10 sm:w-28" />
          ) : user ? (
            <ProfileDropdown />
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-1 text-xs font-semibold text-slate-700 transition-colors hover:text-emerald-700 sm:gap-2 sm:text-sm"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>

              <Link
                href="/signup"
                className="group inline-flex h-9 items-center justify-center gap-1 rounded-full bg-emerald-600 px-3 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:bg-emerald-700 sm:h-11 sm:gap-2 sm:px-7 sm:text-sm"
              >
                Sign Up
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
