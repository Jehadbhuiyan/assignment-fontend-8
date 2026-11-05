
import {
  CalendarDays,
  MapPin,
  Trees,
  Users,
  Leaf,
  CheckCircle2,
  Sprout,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

// Local Event Data
const localEvents = [
  {
    _id: "local-001",
    name: "Rangpur Forest Restoration",
    username: "Green Bangladesh",
    userurl: "https://i.pravatar.cc/100?img=12",
    location: "Rangpur",
    plantCategory: "Forest Tree",
    eventDate: "2026-10-10",
    plantingLimit: 250,
    joinedTrees: 177,
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    description:
      "Restore natural forests by planting trees and protecting local biodiversity.",
  },
  {
    _id: "local-002",
    name: "Dhaka Green City Initiative",
    username: "Nature Lovers",
    userurl: "https://i.pravatar.cc/100?img=32",
    location: "Dhaka",
    plantCategory: "Shade Tree",
    eventDate: "2026-10-15",
    plantingLimit: 300,
    joinedTrees: 215,
    image:
      "https://images.unsplash.com/photo-1511497584788-876760111969",
    description:
      "Make Dhaka greener by planting shade trees in roadsides and public spaces.",
  },
  {
    _id: "local-003",
    name: "Sylhet Fruit Tree Plantation",
    username: "Eco Volunteers",
    userurl: "https://i.pravatar.cc/100?img=45",
    location: "Sylhet",
    plantCategory: "Fruit Tree",
    eventDate: "2026-10-18",
    plantingLimit: 200,
    joinedTrees: 125,
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    description:
      "Plant fruit trees to support local communities and improve the environment.",
  },
  {
    _id: "local-004",
    name: "Chattogram Coastal Green Project",
    username: "Coastal Guardians",
    userurl: "https://i.pravatar.cc/100?img=15",
    location: "Chattogram",
    plantCategory: "Coastal Tree",
    eventDate: "2026-10-20",
    plantingLimit: 400,
    joinedTrees: 320,
    image:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8",
    description:
      "Protect coastal areas by planting trees and restoring natural green spaces.",
  },
  {
    _id: "local-005",
    name: "Rajshahi Medicinal Garden",
    username: "Green Future",
    userurl: "https://i.pravatar.cc/100?img=25",
    location: "Rajshahi",
    plantCategory: "Medicinal Tree",
    eventDate: "2026-10-25",
    plantingLimit: 150,
    joinedTrees: 95,
    image:
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735",
    description:
      "Create a greener community through medicinal plant cultivation and awareness.",
  },
  {
    _id: "local-006",
    name: "Khulna Mangrove Restoration",
    username: "Forest Protectors",
    userurl: "https://i.pravatar.cc/100?img=48",
    location: "Khulna",
    plantCategory: "Mangrove Tree",
    eventDate: "2026-10-30",
    plantingLimit: 500,
    joinedTrees: 350,
    image:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc",
    description:
      "Restore mangrove ecosystems to protect biodiversity and coastal communities.",
  },
];

// Statistics Data
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

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function LocalEventsPage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-12 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:px-4 sm:py-2 sm:text-sm">
            <Leaf size={15} />
            Our Completed Events
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Together We Made
            <span className="block text-emerald-600">
              Our Planet Greener
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-xs leading-6 text-gray-500 sm:mt-5 sm:text-base sm:leading-7">
            Explore our past plantation events and celebrate the positive
            impact created by our amazing volunteers and communities.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="mt-8 grid grid-cols-3 gap-2 sm:mt-10 sm:gap-4">
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

        {/* Events Heading */}
        <div className="mb-5 mt-10 flex flex-col gap-2 sm:mb-7 sm:mt-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 sm:text-sm">
              <Sprout size={17} />
              Our Memories
            </div>

            <h2 className="mt-2 text-xl font-bold text-gray-900 sm:text-3xl">
              Past Plantation Events
            </h2>

            <p className="mt-1 text-xs text-gray-500 sm:mt-2 sm:text-sm">
              Celebrating every tree and every volunteer contribution.
            </p>
          </div>

          <span className="w-fit rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:px-4 sm:py-2 sm:text-sm">
            {localEvents.length} Events
          </span>
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {localEvents.map((event) => {
            const progress = Math.min(
              (event.joinedTrees / event.plantingLimit) * 100,
              100
            );

            return (
              <div
                key={event._id}
                className="group min-w-0 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-32 overflow-hidden sm:h-48 lg:h-56">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  <span className="absolute left-2 top-2 max-w-[75%] truncate rounded-full bg-white/95 px-2 py-1 text-[9px] font-semibold text-emerald-700 shadow sm:left-4 sm:top-4 sm:px-4 sm:py-1.5 sm:text-xs">
                    {event.plantCategory}
                  </span>

                  <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-gray-900/80 px-2 py-1 text-[9px] font-semibold text-white sm:right-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-xs">
                    <CheckCircle2 size={11} />
                    Completed
                  </span>

                  <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] font-medium text-white sm:bottom-4 sm:left-4 sm:gap-2 sm:text-sm">
                    <MapPin size={13} />
                    {event.location}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-3 sm:p-5">

                  {/* Organizer */}
                  <div className="mb-2 flex min-w-0 items-center gap-1.5 sm:mb-3 sm:gap-2">
                    <Avatar className="h-6 w-6 border sm:h-9 sm:w-9">
                      <AvatarImage
                        src={event.userurl}
                        alt={event.username}
                      />
                      <AvatarFallback>
                        {event.username.slice(0, 1)}
                      </AvatarFallback>
                    </Avatar>

                    <span className="truncate text-[10px] font-medium text-gray-600 sm:text-sm">
                      {event.username}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="line-clamp-2 min-h-10 text-sm font-bold leading-5 text-gray-900 transition-colors group-hover:text-emerald-700 sm:text-lg sm:leading-6 lg:text-xl">
                    {event.name}
                  </h3>

                  {/* Description */}
                  <p className="mt-1 line-clamp-2 min-h-10 text-[10px] leading-4 text-gray-500 sm:mt-2 sm:text-sm sm:leading-6">
                    {event.description}
                  </p>

                  {/* Date */}
                  <div className="mt-3 flex items-center gap-1.5 text-[10px] text-gray-600 sm:mt-4 sm:gap-2 sm:text-sm">
                    <CalendarDays
                      size={14}
                      className="shrink-0 text-emerald-600 sm:h-[17px] sm:w-[17px]"
                    />
                    <span>{formatDate(event.eventDate)}</span>
                  </div>

                  {/* Progress */}
                  <div className="mt-4 sm:mt-5">
                    <div className="mb-2 flex items-center justify-between gap-1 text-[10px] sm:text-sm">
                      <span className="font-semibold text-gray-700">
                        Progress
                      </span>

                      <span className="font-bold text-emerald-700">
                        {Math.round(progress)}%
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-gray-100 sm:h-2.5">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="mt-4 grid grid-cols-2 gap-1.5 sm:mt-5 sm:gap-3">
                    <div className="min-w-0 rounded-xl bg-emerald-50 p-2 sm:rounded-2xl sm:p-3">
                      <div className="flex items-center gap-1 text-emerald-700">
                        <Trees size={14} />
                        <span className="truncate text-[9px] font-medium sm:text-xs">
                          Planted
                        </span>
                      </div>

                      <p className="mt-1 text-base font-bold text-gray-900 sm:text-lg">
                        {event.joinedTrees}
                      </p>
                    </div>

                    <div className="min-w-0 rounded-xl bg-gray-50 p-2 sm:rounded-2xl sm:p-3">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users size={14} />
                        <span className="truncate text-[9px] font-medium sm:text-xs">
                          Target
                        </span>
                      </div>

                      <p className="mt-1 text-base font-bold text-gray-900 sm:text-lg">
                        {event.plantingLimit}
                      </p>
                    </div>
                  </div>

                  {/* Completed Status */}
                  <div className="mt-3 flex items-center justify-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 py-2 text-[10px] font-semibold text-emerald-700 sm:mt-5 sm:gap-2 sm:py-3 sm:text-sm">
                    <CheckCircle2 size={14} />
                    Event Completed
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
