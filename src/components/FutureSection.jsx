
import {
  CalendarPlus,
  Users,
  Sprout,
  MapPin,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: CalendarPlus,
    title: "Create Events",
    description:
      "Create your own tree planting event and bring your local community together for a greener future.",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    border: "border-emerald-100",
  },
  {
    icon: Users,
    title: "Join Events",
    description:
      "Discover upcoming events and join other volunteers to make a meaningful impact together.",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    border: "border-blue-100",
  },
  {
    icon: Sprout,
    title: "Track Progress",
    description:
      "Track joined trees, planting targets, and community progress across every event.",
    iconBg: "bg-lime-50",
    iconColor: "text-lime-600",
    border: "border-lime-100",
  },
  {
    icon: MapPin,
    title: "Discover Nearby",
    description:
      "Find tree planting activities around your area and become part of your local green community.",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    border: "border-orange-100",
  },
];

export default function FeaturesSection() {
  return (
    <section className=" px-3 py-14 sm:px-6 sm:py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700 sm:px-4 sm:text-xs">
            GreenBond Features
          </span>

          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:mt-4 sm:text-4xl">
            Grow Together.{" "}
            <span className="text-emerald-600">Go Greener.</span>
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-[11px] leading-relaxed text-slate-500 sm:mt-4 sm:text-sm">
            Everything you need to create, join, and manage meaningful
            tree-planting activities with your community.
          </p>

          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-emerald-500 sm:mt-5 sm:w-14" />
        </div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {features.map(
            ({
              icon: Icon,
              title,
              description,
              iconBg,
              iconColor,
              border,
            }) => (
              <Card
                key={title}
                className={`
                  group relative overflow-hidden
                  rounded-[28px]
                  border ${border}
                  bg-white
                  shadow-[0_8px_30px_rgba(15,23,42,0.05)]
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_15px_40px_rgba(15,23,42,0.09)]
                `}
              >
                {/* Decorative Shape */}
                <div
                  className={`absolute -right-8 -top-8 size-24 rounded-full ${iconBg} opacity-60 transition-transform duration-500 group-hover:scale-125`}
                />

                <CardContent className="relative p-4 sm:p-6">

                  {/* Icon */}
                  <div
                    className={`
                      flex size-10 items-center justify-center
                      rounded-2xl
                      ${iconBg}
                      sm:size-12
                    `}
                  >
                    <Icon
                      className={`size-[18px] ${iconColor} transition-transform duration-300 group-hover:scale-110 sm:size-5`}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 text-[12px] font-bold leading-snug text-slate-900 sm:mt-5 sm:text-base">
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-[10px] leading-relaxed text-slate-500 sm:text-xs sm:leading-5">
                    {description}
                  </p>

                  {/* Bottom Shape */}
                  <div
                    className={`mt-4 h-1 w-8 rounded-full ${iconBg.replace(
                      "bg-",
                      "bg-"
                    )} sm:mt-5`}
                  />
                </CardContent>
              </Card>
            )
          )}
        </div>
      </div>
    </section>
  );
}
