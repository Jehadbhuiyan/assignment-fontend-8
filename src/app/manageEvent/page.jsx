import { ArrowRight, CalendarDays, Leaf, Plus, Sparkles } from "lucide-react";
import { Suspense } from "react";
import ManageEventCard from "@/components/ManageEventCard";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import DelelteButton from "@/components/manageEventButton/DeleteButton";
import ViewButton from "@/components/manageEventButton/ViewButton";
import EditButton from "@/components/manageEventButton/EditButton";

function ManageEventLoading() {
  return (
    <main className="min-h-screen bg-slate-50/60 px-3 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Heading Skeleton */}
        <div className="mb-7 sm:mb-10">
          <div className="h-6 w-40 animate-pulse rounded-full bg-emerald-100 sm:h-8 sm:w-56" />

          <div className="mt-4 h-7 w-64 animate-pulse rounded-lg bg-slate-200 sm:h-10 sm:w-96" />

          <div className="mt-3 h-4 w-full max-w-xl animate-pulse rounded bg-slate-200" />
        </div>

        {/* Count Skeleton */}
        <div className="mb-5 flex items-center gap-2">
          <div className="h-4 w-4 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
          <div className="h-5 w-8 animate-pulse rounded-full bg-emerald-100" />
        </div>

        {/* Cards Skeleton */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-7">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm sm:rounded-3xl sm:p-3"
            >
              {/* Image */}
              <div className="aspect-[16/10] w-full animate-pulse rounded-xl bg-slate-200 sm:rounded-2xl" />

              {/* Content */}
              <div className="space-y-2 p-2 sm:p-3">
                <div className="h-4 w-4/5 animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-3/5 animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-2/5 animate-pulse rounded bg-slate-200" />
              </div>

              {/* Buttons */}
              <div className="mt-3 grid grid-cols-3 gap-1.5 border-t border-slate-100 pt-3 sm:gap-2">
                <div className="h-9 animate-pulse rounded-lg bg-slate-100" />
                <div className="h-9 animate-pulse rounded-lg bg-slate-100" />
                <div className="h-9 animate-pulse rounded-lg bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

async function ManageEventContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user?.email) {
    return (
      <main className="min-h-screen bg-slate-50/60 px-3 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-dashed border-emerald-200 bg-white px-5 py-16 text-center">
            <h2 className="text-xl font-bold text-slate-900">
              Please Login First
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
              You need to login before you can manage your events.
            </p>

            <Button
              asChild
              className="mt-6 rounded-full bg-emerald-700 px-6 hover:bg-emerald-800"
            >
              <Link href="/Login">Login</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }
const resolvedHeaders = await headers();
  const jwtToken = await auth.api.getToken({
    headers: resolvedHeaders
  })

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/myCreateEvent/${user.email}`, {
    cache: "no-store",
    headers:{
      authorization: `Bearer ${jwtToken?.token}`
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch created events");
  }

  const event = await res.json();

  return (
    <main className="min-h-screen bg-slate-50/60 px-3 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-7 sm:mb-10">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[9px] font-semibold text-emerald-700 sm:gap-2 sm:px-4 sm:py-1.5 sm:text-xs">
                <span className="size-1.5 rounded-full bg-emerald-500 sm:size-2" />
                MAKE OUR PLANET GREENER
              </span>

              <h1 className="mt-3 text-xl font-extrabold tracking-tight text-slate-900 sm:mt-4 sm:text-4xl">
                My Created <span className="text-emerald-600">Events</span>
              </h1>

              <p className="mt-1.5 max-w-xl text-[10px] leading-relaxed text-slate-500 sm:mt-2 sm:text-base">
                Manage the events you created and help make our planet greener.
              </p>
            </div>
          </div>
        </div>

        {/* Event Count */}
        <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-600">
          <CalendarDays className="h-4 w-4 text-emerald-600" />
          My Events
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
            {event.length}
          </span>
        </div>

        {/* Events Grid */}
        {event.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-7">
            {event.map((event) => (
              <div
                key={event._id}
                className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:rounded-3xl sm:p-3"
              >
                <ManageEventCard event={event} />

                <div className="mt-3 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 sm:gap-3">
                  <ViewButton event={event} />
                  <EditButton event={event} />
                  <DelelteButton event={event} />
                </div>
              </div>
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
        Your Journey Starts Here
      </span>

      <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        No Events Created Yet!
      </h2>

      <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-slate-500">
        Every great change starts with a small step. Create your first event
        and bring your community together to make the planet greener.
      </p>
    </div>

    {/* Button */}
    <div className="mt-7 flex justify-center">
      <Button
        asChild
        className="group h-12 rounded-full bg-emerald-700 px-7 text-sm font-semibold text-white shadow-lg shadow-emerald-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-800 hover:shadow-emerald-700/30"
      >
        <Link href="/createEvent">
          <Plus className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
          Create Your First Event
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Button>
    </div>

    <p className="mt-5 text-xs font-medium text-emerald-700/60">
      <Sparkles className="mr-1 inline h-3.5 w-3.5" />
      Plant an idea. Grow a greener future.
    </p>
  </div>
</div>
        )}
      </div>
    </main>
  );
}

export default function ManageEvent() {
  return (
    <Suspense fallback={<ManageEventLoading />}>
      <ManageEventContent />
    </Suspense>
  );
}
