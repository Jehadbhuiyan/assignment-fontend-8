
import { TreePine, Trees, CalendarDays, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import SubscribeCard from "./SubtitleCard";
import FeaturesSection from "./FutureSection";
import { HeroButton } from "./Button";
import ShowDataCard from "./homePageData/ShowDataCard";
import { Suspense } from "react";
import EventCard from "./Card";
import LocalEventsPage from "./PastDetailsPage";

const stats = [
  {
    value: "১২,৫০০+",
    label: "রোপণকৃত বৃক্ষ",
    icon: Trees,
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    iconBg: "bg-emerald-100",
  },
  {
    value: "৪৫০+",
    label: "সক্রিয় ইভেন্ট",
    icon: CalendarDays,
    color: "bg-blue-50 text-blue-700 border-blue-200",
    iconBg: "bg-blue-100",
  },
  {
    value: "৮,২০০+",
    label: "স্বেচ্ছাসেবক",
    icon: Users,
    color: "bg-orange-50 text-orange-700 border-orange-200",
    iconBg: "bg-orange-100",
  },
];

// Fetch Events
async function EventList() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/getData-6`);

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  const events = await res.json();

  return (
    <div className="mx-auto w-full max-w-[1240px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-7">
        {events.map((event) => (
          <ShowDataCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}

// Main Hero Component
export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-white">

      {/* Background Effects */}
      <div className="pointer-events-none absolute -right-32 -top-20 -z-10 h-[350px] w-[350px] rounded-full bg-emerald-200/40 blur-[100px] sm:h-[500px] sm:w-[500px]" />

      <div className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-[300px] w-[300px] rounded-full bg-green-100/60 blur-[100px]" />

      {/* Main Container */}
      <div className="mx-auto w-full max-w-[1240px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

        {/* CENTER HERO CONTENT */}
        <div className="mx-auto flex w-full max-w-[900px] flex-col items-center justify-center text-center">

          {/* Badge */}
          <Badge
            variant="outline"
            className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border-emerald-200 bg-white/80 px-3 py-2 text-[10px] font-bold text-emerald-800 shadow-sm backdrop-blur-sm sm:mb-7 sm:px-4 sm:text-xs"
          >
            <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald-500" />

            <TreePine className="h-4 w-4 shrink-0 text-emerald-600" />

            <span>নতুন বৃক্ষরোপণ ইভেন্ট যুক্ত হচ্ছে প্রতিদিনই</span>
          </Badge>

          {/* Unique Hero Heading */}
          <h1 className="max-w-[900px] text-[30px] font-extrabold leading-[1.4] tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.25] lg:text-[64px]">

            <span className="block">
              সবুজের সাথে{" "}
              <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 bg-clip-text text-transparent">
                বদলে দিন
              </span>{" "}
              পৃথিবী,
            </span>

            <span className="relative mt-2 inline-block pb-3">
              <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 bg-clip-text text-transparent">
                একত্র হন নতুন ইভেন্টে!
              </span>

              {/* Decorative Underline */}
              <span className="absolute bottom-0 left-1/2 h-1 w-2/3 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-300 via-emerald-600 to-teal-300 sm:h-1.5" />
            </span>

          </h1>

          {/* Description */}
          <p className="mt-5 max-w-[650px] text-xs leading-7 text-slate-600 sm:mt-7 sm:text-base sm:leading-8 lg:text-lg">
            আপনি কি নিজের এলাকায় গাছ রোপণ করতে চান? ইভেন্ট তৈরি করুন এবং
            আশেপাশের অন্যান্য পরিবেশপ্রেমীদের সাথে যুক্ত হয়ে একসাথে রোপণ করুন
            আগামী প্রজন্মের জন্য সবুজ ছায়া।
          </p>

          {/* Hero Button */}
          <div className="mt-6 flex w-full justify-center sm:mt-8">
            <HeroButton />
          </div>

        </div>

        {/* STATS CARDS */}
        <div className="mt-12 grid w-full grid-cols-3 items-stretch gap-2 sm:mt-16 sm:gap-5">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className={`flex min-h-[110px] min-w-0 flex-col items-center justify-center rounded-[18px] border p-2 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:min-h-[150px] sm:rounded-[30px] sm:p-5 ${stat.color}`}
              >
                <div
                  className={`mb-2 flex h-8 w-8 items-center justify-center rounded-full sm:mb-3 sm:h-12 sm:w-12 ${stat.iconBg}`}
                >
                  <Icon className="h-4 w-4 sm:h-6 sm:w-6" />
                </div>

                <h3 className="text-[11px] font-extrabold min-[380px]:text-xs sm:text-2xl">
                  {stat.value}
                </h3>

                <p className="mt-1 text-[8px] font-semibold min-[380px]:text-[9px] sm:text-sm">
                  {stat.label}
                </p>
              </div>
            );
          })}

        </div>

      </div>

      {/* Features Section */}
      <FeaturesSection />

      {/* Events Section */}
      <Suspense
        fallback={
          <div className="mx-auto flex min-h-[200px] w-full max-w-[1240px] items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
            <p className="animate-pulse text-sm font-medium text-emerald-600">
              Loading events...
            </p>
          </div>
        }
      >
        <EventList />
      </Suspense>

      {/* Subscribe Section */}
      <LocalEventsPage/>
      <SubscribeCard />

    </section>
  );
}
