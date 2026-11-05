
import { Suspense } from "react";
import {
  CalendarDays,
  Leaf,
  MapPin,
  Sprout,
  Users,
  Mail,
  TreePine,
} from "lucide-react";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import DetailsEventButton from "@/components/detailsPageButton/DetailsEventButton";

// =========================
// Details Content
// =========================

async function DetailsContent({ params }) {
  const { id } = await params;

  const resolvedHeaders = await headers();

  const jwtToken = await auth.api.getToken({
    headers: resolvedHeaders,
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/single-id/${id}`,
    {
      cache: "no-store",
      headers: {
        authorization: `bearer ${jwtToken?.token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch event");
  }

  const singleData = await res.json();

  const joinedTrees = Number(singleData.joinedTrees || 0);
  const plantingLimit = Number(singleData.plantingLimit || 0);

  const progress =
    plantingLimit > 0
      ? Math.min(
          Math.round((joinedTrees / plantingLimit) * 100),
          100
        )
      : 0;

  const remainingTrees = Math.max(
    plantingLimit - joinedTrees,
    0
  );

  return (
    <main className="min-h-screen bg-slate-50 px-3 pb-16 pt-24 sm:px-6 sm:pt-28 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Main Card */}
        <div className="overflow-hidden rounded-[28px] border border-emerald-100 bg-white shadow-[0_10px_40px_rgba(16,185,129,0.08)]">

          {/* Hero Image */}
          <div className="relative h-[230px] overflow-hidden sm:h-[360px] lg:h-[440px]">
            <img
              src={singleData.image}
              alt={singleData.name}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Category */}
            <div className="absolute left-4 top-4 sm:left-7 sm:top-7">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold text-emerald-700 shadow-lg sm:px-4 sm:py-2 sm:text-xs">
                <Sprout className="size-3.5 sm:size-4" />
                {singleData.plantCategory || "Plant Category"}
              </span>
            </div>

            {/* Progress */}
            <div className="absolute right-4 top-4 sm:right-7 sm:top-7">
              <span className="rounded-full bg-emerald-600 px-3 py-1.5 text-[10px] font-bold text-white shadow-lg sm:px-4 sm:py-2 sm:text-xs">
                {progress}% Joined
              </span>
            </div>

            {/* Hero Title */}
            <div className="absolute bottom-5 left-4 right-4 sm:bottom-8 sm:left-7 sm:right-7">
              <h1 className="max-w-4xl text-2xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                {singleData.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/90 sm:text-sm">
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4 text-emerald-300" />
                  {singleData.location}
                </span>

                <span className="hidden text-white/40 sm:block">
                  •
                </span>

                <span className="flex items-center gap-1.5">
                  <CalendarDays className="size-4 text-emerald-300" />
                  {singleData.eventDate}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="grid gap-6 p-4 sm:p-7 lg:grid-cols-[1fr_350px] lg:gap-8 lg:p-9">

            {/* Left Content */}
            <div>

              {/* About Event */}
              <section>
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-50">
                    <Leaf className="size-4 text-emerald-600" />
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                    About This Event
                  </h2>
                </div>

                <p className="text-sm leading-7 text-slate-600 sm:text-base">
                  {singleData.description}
                </p>
              </section>

              {/* Event Information */}
              <section className="mt-7">
                <h2 className="mb-4 text-lg font-bold text-slate-900 sm:text-xl">
                  Event Information
                </h2>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

                  {/* Location */}
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-50">
                      <MapPin className="size-4 text-emerald-600" />
                    </div>

                    <p className="mt-3 text-[10px] font-medium text-slate-400">
                      LOCATION
                    </p>

                    <p className="mt-1 text-xs font-bold text-slate-800 sm:text-sm">
                      {singleData.location}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-50">
                      <CalendarDays className="size-4 text-emerald-600" />
                    </div>

                    <p className="mt-3 text-[10px] font-medium text-slate-400">
                      EVENT DATE
                    </p>

                    <p className="mt-1 text-xs font-bold text-slate-800 sm:text-sm">
                      {singleData.eventDate}
                    </p>
                  </div>

                  {/* Category */}
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-50">
                      <Sprout className="size-4 text-emerald-600" />
                    </div>

                    <p className="mt-3 text-[10px] font-medium text-slate-400">
                      CATEGORY
                    </p>

                    <p className="mt-1 text-xs font-bold text-slate-800 sm:text-sm">
                      {singleData.plantCategory}
                    </p>
                  </div>

                </div>
              </section>

              {/* Tree Progress */}
              <section className="mt-7 rounded-3xl bg-emerald-50/80 p-4 sm:p-6">

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-white shadow-sm">
                      <TreePine className="size-5 text-emerald-600" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        Tree Planting Progress
                      </p>

                      <p className="text-[10px] text-slate-500 sm:text-xs">
                        Help us reach the planting goal
                      </p>
                    </div>
                  </div>

                  <span className="text-lg font-extrabold text-emerald-700">
                    {progress}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-5 h-3 overflow-hidden rounded-full bg-emerald-100">
                  <div
                    className="h-full rounded-full bg-emerald-600 transition-all duration-700"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-500">
                    {joinedTrees} trees joined
                  </span>

                  <span className="font-bold text-emerald-700">
                    {remainingTrees} spots left
                  </span>
                </div>
              </section>
            </div>

            {/* Right Sidebar */}
            <aside>

              {/* Organizer */}
              <div className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-[0_8px_30px_rgba(16,185,129,0.07)]">

                <p className="text-[10px] font-bold tracking-widest text-slate-400">
                  ORGANIZED BY
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <div className="size-12 overflow-hidden rounded-full border-2 border-emerald-100 bg-emerald-50">
                    {singleData.userurl ? (
                      <img
                        src={singleData.userurl}
                        alt={singleData.username}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm font-bold text-emerald-700">
                        {singleData.username
                          ?.slice(0, 2)
                          .toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-800">
                      {singleData.username}
                    </p>

                    <p className="flex items-center gap-1 truncate text-[10px] text-slate-500">
                      <Mail className="size-3" />
                      {singleData.email}
                    </p>
                  </div>
                </div>

                {/* Organizer Icon */}
                <div className="mt-5 flex items-center gap-2 rounded-2xl bg-emerald-50 p-3">
                  <Leaf className="size-4 text-emerald-600" />

                  <p className="text-xs font-medium text-slate-600">
                    Making the community greener, one tree at a time.
                  </p>
                </div>
              </div>

              {/* Statistics */}
              <div className="mt-4 grid grid-cols-2 gap-3">

                <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <Users className="size-4 text-emerald-600" />

                    <span className="text-[10px] text-slate-500">
                      Joined
                    </span>
                  </div>

                  <p className="mt-2 text-xl font-extrabold text-slate-800">
                    {joinedTrees}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <Sprout className="size-4 text-emerald-600" />

                    <span className="text-[10px] text-slate-500">
                      Target
                    </span>
                  </div>

                  <p className="mt-2 text-xl font-extrabold text-slate-800">
                    {plantingLimit}
                  </p>
                </div>

              </div>

              <DetailsEventButton singleData={singleData} />

            </aside>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="mt-6 rounded-3xl bg-emerald-600 p-6 text-center shadow-lg shadow-emerald-600/10 sm:p-8">
          <Leaf className="mx-auto size-7 text-emerald-100" />

          <h2 className="mt-3 text-xl font-extrabold text-white sm:text-2xl">
            Make a Greener Future Together
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-xs leading-6 text-emerald-50 sm:text-sm">
            Join this community event and help create a cleaner,
            greener and healthier environment for everyone.
          </p>
        </div>

      </div>
    </main>
  );
}

// =========================
// Main Page + Suspense
// =========================

export default function DetailsPage({ params }) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-50 px-3 pb-16 pt-24 sm:px-6 sm:pt-28 lg:px-10">
          <div className="mx-auto max-w-7xl">

            <div className="overflow-hidden rounded-[28px] border border-emerald-100 bg-white shadow-sm">

              {/* Hero Image Skeleton */}
              <div className="relative h-[230px] animate-pulse bg-gradient-to-r from-emerald-100 via-emerald-50 to-emerald-100 sm:h-[360px] lg:h-[440px]">

                <div className="absolute left-4 top-4 h-8 w-28 rounded-full bg-white/70 sm:left-7 sm:top-7" />

                <div className="absolute right-4 top-4 h-8 w-24 rounded-full bg-white/70 sm:right-7 sm:top-7" />

                <div className="absolute bottom-6 left-4 right-4 space-y-3 sm:bottom-8 sm:left-7">
                  <div className="h-8 w-3/4 rounded-lg bg-white/70 sm:h-12" />

                  <div className="flex gap-3">
                    <div className="h-4 w-28 rounded bg-white/60" />
                    <div className="h-4 w-28 rounded bg-white/60" />
                  </div>
                </div>
              </div>

              {/* Content Skeleton */}
              <div className="grid gap-6 p-4 sm:p-7 lg:grid-cols-[1fr_350px] lg:gap-8 lg:p-9">

                {/* Left Content */}
                <div className="space-y-7">

                  {/* About Event */}
                  <section>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="size-10 animate-pulse rounded-xl bg-emerald-100" />
                      <div className="h-6 w-40 animate-pulse rounded-lg bg-slate-200" />
                    </div>

                    <div className="space-y-2">
                      <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
                      <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
                      <div className="h-3 w-3/4 animate-pulse rounded bg-slate-100" />
                    </div>
                  </section>

                  {/* Event Information */}
                  <section>
                    <div className="mb-4 h-6 w-48 animate-pulse rounded-lg bg-slate-200" />

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <div
                          key={index}
                          className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                        >
                          <div className="size-9 animate-pulse rounded-xl bg-emerald-100" />
                          <div className="mt-4 h-3 w-16 animate-pulse rounded bg-slate-200" />
                          <div className="mt-2 h-4 w-24 animate-pulse rounded bg-slate-200" />
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Progress Skeleton */}
                  <section className="rounded-3xl bg-emerald-50/80 p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="size-10 animate-pulse rounded-xl bg-white" />

                        <div className="space-y-2">
                          <div className="h-4 w-36 animate-pulse rounded bg-emerald-100" />
                          <div className="h-3 w-28 animate-pulse rounded bg-emerald-100" />
                        </div>
                      </div>

                      <div className="h-6 w-12 animate-pulse rounded bg-emerald-100" />
                    </div>

                    <div className="mt-5 h-3 animate-pulse rounded-full bg-emerald-100" />

                    <div className="mt-3 flex justify-between">
                      <div className="h-3 w-24 animate-pulse rounded bg-emerald-100" />
                      <div className="h-3 w-20 animate-pulse rounded bg-emerald-100" />
                    </div>
                  </section>
                </div>

                {/* Right Sidebar */}
                <aside>

                  {/* Organizer Skeleton */}
                  <div className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm">
                    <div className="h-3 w-28 animate-pulse rounded bg-slate-200" />

                    <div className="mt-5 flex items-center gap-3">
                      <div className="size-12 animate-pulse rounded-full bg-emerald-100" />

                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
                        <div className="h-3 w-36 animate-pulse rounded bg-slate-100" />
                      </div>
                    </div>

                    <div className="mt-5 h-12 animate-pulse rounded-2xl bg-emerald-50" />
                  </div>

                  {/* Statistics Skeleton */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {Array.from({ length: 2 }).map((_, index) => (
                      <div
                        key={index}
                        className="rounded-2xl border border-slate-100 bg-white p-4"
                      >
                        <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
                        <div className="mt-3 h-7 w-12 animate-pulse rounded bg-emerald-100" />
                      </div>
                    ))}
                  </div>

                  {/* Join Button Skeleton */}
                  <div className="mt-5 rounded-3xl border border-emerald-100 bg-emerald-50/50 p-5">
                    <div className="h-4 w-36 animate-pulse rounded bg-emerald-100" />
                    <div className="mt-3 h-3 w-full animate-pulse rounded bg-slate-200" />
                    <div className="mt-2 h-3 w-3/4 animate-pulse rounded bg-slate-200" />
                    <div className="mt-5 h-12 animate-pulse rounded-full bg-emerald-200" />
                  </div>

                </aside>
              </div>
            </div>

            {/* Loading Indicator */}
            <div className="mt-7 flex items-center justify-center gap-3">
              <Leaf className="size-5 animate-pulse text-emerald-600" />

              <p className="text-sm font-semibold text-emerald-700">
                Preparing your event details...
              </p>

              <div className="flex gap-1">
                <span className="size-1.5 animate-bounce rounded-full bg-emerald-500" />
                <span className="size-1.5 animate-bounce rounded-full bg-emerald-500 [animation-delay:150ms]" />
                <span className="size-1.5 animate-bounce rounded-full bg-emerald-500 [animation-delay:300ms]" />
              </div>
            </div>

          </div>
        </main>
      }
    >
      <DetailsContent params={params} />
    </Suspense>
  );
}
