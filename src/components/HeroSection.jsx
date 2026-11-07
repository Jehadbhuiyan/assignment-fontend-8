
import {
  TreePine,
  Trees,
  CalendarDays,
  Users,
  Leaf,
  ArrowDown,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import SubscribeCard from "./SubtitleCard";
import FeaturesSection from "./FutureSection";
import { HeroButton } from "./Button";
import ShowDataCard from "./homePageData/ShowDataCard";
import { Suspense } from "react";
import LocalEventsPage from "./PastDetailsPage";

// Stats data
const stats = [
  {
    value: "১২,৫০০+",
    label: "রোপণকৃত বৃক্ষ",
    icon: Trees,
    color: "text-emerald-700 dark:text-emerald-400",
    iconBg: "bg-emerald-100 dark:bg-emerald-950",
  },
  {
    value: "৪৫০+",
    label: "সক্রিয় ইভেন্ট",
    icon: CalendarDays,
    color: "text-blue-700 dark:text-blue-400",
    iconBg: "bg-blue-100 dark:bg-blue-950",
  },
  {
    value: "৮,২০০+",
    label: "স্বেচ্ছাসেবক",
    icon: Users,
    color: "text-orange-700 dark:text-orange-400",
    iconBg: "bg-orange-100 dark:bg-orange-950",
  },
];

// Event list
const EventList = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/getData-6`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  const events = await res.json();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <ShowDataCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default function HeroSection() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-white dark:from-background dark:via-background dark:to-emerald-950/20">

        {/* Background Decoration */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/10" />

        <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-green-300/20 blur-3xl dark:bg-green-500/10" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">

          <div className="mx-auto max-w-4xl text-center">

            {/* Badge */}
            <Badge
              variant="outline"
              className="mb-6 rounded-full border-emerald-200 bg-white/80 px-4 py-2 text-sm font-medium text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
            >
              <Leaf className="mr-2 h-4 w-4" />
              একসাথে গড়ি সবুজ বাংলাদেশ
            </Badge>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              সবুজে বাঁধি
              <span className="block bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:via-green-400 dark:to-teal-400">
                মেলবন্ধন
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              প্রকৃতির ভারসাম্য রক্ষায় একসাথে এগিয়ে আসুন।
              নিজের এলাকায় বৃক্ষরোপণ ইভেন্ট তৈরি করুন,
              অন্যদের সাথে যুক্ত হোন এবং গড়ে তুলুন
              একটি সবুজ ও সুন্দর বাংলাদেশ।
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <HeroButton />
            </div>

            {/* Bottom Text */}
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <TreePine className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>আপনার ছোট উদ্যোগই পারে পৃথিবী বদলে দিতে</span>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">

            {stats.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.iconBg}`}
                    >
                      <Icon className={`h-6 w-6 ${item.color}`} />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {item.value}
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.label}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Upcoming Events */}
      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-10 text-center">
            <Badge className="mb-4 rounded-full bg-emerald-100 px-4 py-2 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 dark:hover:bg-emerald-950">
              <CalendarDays className="mr-2 h-4 w-4" />
              Upcoming Events
            </Badge>

            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              আসন্ন ইভেন্টসমূহ
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              আপনার এলাকার বৃক্ষরোপণ কার্যক্রমে অংশগ্রহণ করুন
              এবং পরিবেশ রক্ষায় ভূমিকা রাখুন।
            </p>
          </div>

          <Suspense
            fallback={
              <div className="py-16 text-center text-muted-foreground">
                ইভেন্ট লোড হচ্ছে...
              </div>
            }
          >
            <EventList />
          </Suspense>
        </div>
      </section>

      {/* Past Events */}
      <LocalEventsPage />

      {/* Subscribe Section */}
      <SubscribeCard />
    </>
  );
}
