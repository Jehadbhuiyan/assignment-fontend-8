
import { Suspense } from "react";
import JoinEventCard from "@/components/JoinEventCard";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

import {
  ArrowRight,
  CalendarDays,
  Compass,
  Leaf,
  Plus,
  Sparkles,
} from "lucide-react";

import { headers } from "next/headers";
import Link from "next/link";

async function JoinEventContent() {
  const resolvedHeaders = await headers();

  const session = await auth.api.getSession({
    headers: resolvedHeaders,
  });

  const user = session?.user;

  if (!user?.email) {
    return (
      <main className="min-h-screen px-3 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold text-slate-900">
            Please login first
          </h1>
        </div>
      </main>
    );
  }

  const jwtToken = await auth.api.getToken({
    headers: resolvedHeaders,
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/joinEvent/${user?.email}`,
    {
      headers: {
        authorization: `bearer ${jwtToken?.token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch joined events");
  }

  const event = await res.json();

  return (
    <main className="min-h-screen px-3 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Page Heading */}
        <div className="mb-7 sm:mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[10px] font-semibold text-emerald-700 sm:px-4 sm:text-xs">
            <span className="size-1.5 rounded-full bg-emerald-500 sm:size-2" />
            MAKE OUR PLANET GREENER
          </span>

          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:mt-4 sm:text-4xl">
            My Joined <span className="text-emerald-600">Events</span>
          </h1>

          <p className="mt-1.5 max-w-2xl text-[11px] leading-relaxed text-slate-500 sm:mt-2 sm:text-base">
            Keep track of the events you've joined and be part of a greener,
            healthier future.
          </p>
        </div>

        {/* Events Grid */}
        {event.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-7">
            {event.map((item) => (
              <JoinEventCard key={item._id} event={item} />
            ))}
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-[28px] border border-emerald-100 bg-gradient-to-br from-white via-emerald-50/50 to-teal-50/70 px-5 py-16 text-center shadow-sm sm:py-20">

            {/* Background Decoration */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-100/50 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-teal-100/60 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-md">

              {/* Icon */}
              <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-[26px] border border-emerald-100 bg-white shadow-[0_8px_30px_rgba(16,185,129,0.10)]">
                <div className="absolute inset-2 rounded-[20px] bg-emerald-50" />

                <CalendarDays className="relative z-10 h-9 w-9 text-emerald-600" />

                <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-emerald-500 text-white shadow-sm">
                  <Plus className="h-4 w-4" />
                </span>
              </div>

              {/* Content */}
              <div className="mt-7">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700">
                  <Leaf className="h-3 w-3" />
                  Be Part of Something Green
                </span>

                <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  You Haven't Joined Any Events Yet!
                </h2>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-slate-500">
                  Discover exciting tree plantation events near you. Join a
                  community of nature lovers and take your first step toward a
                  greener and healthier planet.
                </p>
              </div>

              {/* Button */}
              <div className="mt-7 flex justify-center">
                <Button
                  asChild
                  className="group h-12 rounded-full bg-emerald-700 px-7 text-sm font-semibold text-white shadow-lg shadow-emerald-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-800"
                >
                  <Link href="/upcommingEvent">
                    <Compass className="mr-2 h-4 w-4" />
                    Explore Events
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>

              <p className="mt-5 text-xs font-medium text-emerald-700/60">
                <Sparkles className="mr-1 inline h-3.5 w-3.5" />
                Join an event. Plant a tree. Make a difference.
              </p>

            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function JoinEvent() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          <p className="animate-pulse text-sm font-medium text-emerald-600">
            Loading joined events...
          </p>
        </main>
      }
    >
      <JoinEventContent />
    </Suspense>
  );
}
