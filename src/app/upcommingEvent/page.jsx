import { Suspense } from "react";
import { Leaf, LoaderCircle, SearchX } from "lucide-react";

import UpcommingHeader from "@/components/upcommingEvent/UpcommingHeader";
import UpcommingEvent from "@/components/upcommingEvent/UpcommintEvent";

// Upcoming Events Data
async function UpcomingEventsContent({ searchParams }) {
  const paramsObj = await searchParams;

  const search = paramsObj?.search || "";
  const category = paramsObj?.category || "All";

  const params = new URLSearchParams();

  if (search) {
    params.append("search", search);
  }

  if (category && category !== "All") {
    params.append("category", category);
  }

  const url = params.toString()
    ? `${process.env.NEXT_PUBLIC_URL}/event/search?${params.toString()}`
    : `${process.env.NEXT_PUBLIC_URL}/createEvent`;

  try {
    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch events");
    }

    const events = await res.json();

    return (
      <main className="min-h-screen bg-gradient-to-b from-emerald-50/60 via-white to-white px-3 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Page Header */}
          <UpcommingHeader />

          {/* Events */}
          {Array.isArray(events) && events.length > 0 ? (
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
              {events.map((event) => (
                <UpcommingEvent key={event._id} event={event} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[350px] flex-col items-center justify-center rounded-3xl border border-dashed border-emerald-200 bg-emerald-50/40 px-5 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
                <SearchX className="h-8 w-8 text-emerald-600" />
              </div>

              <h2 className="text-xl font-bold text-gray-800">
                No Events Found!
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                We couldn't find any events matching your search. Try another
                keyword or category.
              </p>
            </div>
          )}
        </div>
      </main>
    );
  } catch (error) {
    console.error("Upcoming events error:", error);

    return (
      <main className="min-h-screen bg-emerald-50/40 px-3 py-12 sm:px-6">
        <div className="mx-auto flex min-h-[350px] max-w-7xl flex-col items-center justify-center rounded-3xl border border-red-100 bg-white px-5 text-center shadow-sm">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
            <SearchX className="h-8 w-8 text-red-500" />
          </div>

          <h2 className="text-xl font-bold text-gray-800">
            Something Went Wrong!
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Unable to load events. Please try again later.
          </p>
        </div>
      </main>
    );
  }
}

// Loading Skeleton
function UpcomingLoading() {
  return (
    <main className="min-h-screen bg-emerald-50/40 px-3 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Loading Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 animate-pulse items-center justify-center rounded-2xl bg-emerald-100">
            <Leaf className="h-7 w-7 text-emerald-600" />
          </div>

          <div className="h-7 w-56 animate-pulse rounded-lg bg-emerald-100 sm:w-72" />

          <div className="mt-3 h-4 w-64 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Loading Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl border border-emerald-100 bg-white p-3 shadow-sm sm:p-4"
            >
              <div className="aspect-[4/3] animate-pulse rounded-2xl bg-emerald-100" />

              <div className="mt-4 space-y-3">
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />

                <div className="h-3 w-1/2 animate-pulse rounded bg-gray-100" />

                <div className="flex gap-2">
                  <div className="h-7 w-20 animate-pulse rounded-full bg-emerald-100" />

                  <div className="h-7 w-20 animate-pulse rounded-full bg-gray-100" />
                </div>

                <div className="h-10 w-full animate-pulse rounded-full bg-emerald-100" />
              </div>
            </div>
          ))}
        </div>

        {/* Loading Text */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-emerald-700">
          <LoaderCircle className="h-4 w-4 animate-spin" />
          Loading upcoming events...
        </div>
      </div>
    </main>
  );
}

// Main Page
export default function UpcomingEvents({ searchParams }) {
  return (
    <Suspense fallback={<UpcomingLoading />}>
      <UpcomingEventsContent searchParams={searchParams} />
    </Suspense>
  );
}