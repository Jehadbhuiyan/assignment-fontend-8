
"use client";

import {
  CalendarDays,
  ChevronRight,
  Leaf,
  Loader2,
  MapPin,
  Sprout,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ShowDataCard({ event }) {
  console.log(event)

  const router = useRouter()
const [isloading, setIsloading] = useState(false);
  const [isJoined, setIsJoined] = useState(Boolean(event?.isJoined));
  const [joinedTreesCount, setJoinedTreesCount] = useState(
    Number(event?.joinedTrees || 0)
  );

  const { data: session } = authClient.useSession();
  const user = session?.user;

  


  const joineventhendler = async () => {
    if (!user) {
      toast.error("Please login to join this event");
      return;
    }

    setIsloading(true);
    const { data, error } = await authClient.token();
    const token = data?.token;
    try {
      if (!isJoined) {
        // --- JOIN EVENT (POST) ---
        const { _id, ...eventData } = event;
        const payload = {
          _id: _id,
          email: user?.email,
          username: user?.name,
          userurl: user?.image,
          ...eventData,
          joineventperson: joinedTreesCount + 1,
        };

       
           

        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/joinEvents`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
            
          },
          body: JSON.stringify(payload),
        });

        const response = await res.json();

        if (!res.ok) {
          throw new Error(response.message || "Failed to join event");
        }

        setIsJoined(true);
        setJoinedTreesCount((prev) => prev + 1);
        
        toast.success("Successfully joined the event!");
        router.refresh()
      }
    }
    
    catch (error) {
      toast.error(error.message);
    }
      setIsloading(false);
    
  };

  const progress =
    event.plantingLimit > 0
      ? Math.min(
          Math.round((joinedTreesCount / event.plantingLimit) * 100),
          100
        )
      : 0;
  return (
    <article className="group w-full overflow-hidden rounded-[24px] border border-emerald-100 bg-white shadow-[0_8px_30px_rgba(16,185,129,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(16,185,129,0.14)]">

      {/* Event Image */}
      <div className="relative h-36 overflow-hidden sm:h-48">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

        <div className="absolute left-2 top-2 sm:left-3 sm:top-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-bold text-emerald-700 shadow-sm sm:px-3 sm:text-[11px]">
            <Sprout className="size-3" />
           {event.plantCategory}
          </span>
        </div>

        <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3">
          <span className="rounded-full bg-emerald-600 px-2.5 py-1 text-[10px] font-bold text-white shadow-lg sm:px-3 sm:text-xs">
            {progress}% joined
          </span>
        </div>
      </div>

      {/* Event Content */}
      <div className="p-3.5 sm:p-5">

        {/* Organizer Information */}
        <div className="mb-3 flex min-w-0 items-center gap-2 border-b border-slate-100 pb-3 sm:gap-2.5">
          <Avatar className="size-9 shrink-0 border-2 border-emerald-100 sm:size-10">
            <AvatarImage src={event.userurl} alt={event.userurl} />

            <AvatarFallback className="bg-emerald-100 text-xs font-bold text-emerald-700">
              {event.username?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="text-[9px] font-medium tracking-wide text-slate-400 sm:text-[10px]">
              POSTED BY
            </p>

            <p className="truncate text-xs font-bold text-slate-800 sm:text-sm">
              {event.username}
            </p>

            <p className="truncate text-[9px] text-slate-500 sm:text-[11px]">
              {event.email}
            </p>
          </div>

          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-50">
            <Leaf className="size-3.5 text-emerald-600" />
          </div>
        
        </div>

        {/* Event Title */}
        <h3 className="line-clamp-2 min-h-9 text-sm font-bold leading-snug text-slate-900 sm:min-h-12 sm:text-lg">
          {event.name}
        </h3>

        {/* Location */}
        <div className="mt-2 flex items-center gap-1.5 text-[10px] text-slate-500 sm:text-sm">
          <MapPin className="size-3.5 shrink-0 text-emerald-600 sm:size-4" />
          <span className="truncate">{event.location}</span>
        </div>

        {/* Date */}
        <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-slate-500 sm:text-sm">
          <CalendarDays className="size-3.5 shrink-0 text-emerald-600 sm:size-4" />
          <span className="truncate">{event.eventDate}</span>
        </div>

        {/* Tree Progress */}
        <div className="mt-3 rounded-2xl bg-emerald-50/80 p-2.5 sm:mt-4 sm:p-3.5">
          <div className="mb-2 flex items-center justify-between gap-1">
            <div className="flex items-center gap-1">
              <Leaf className="size-3.5 text-emerald-600 sm:size-4" />
              <span className="text-[10px] font-semibold text-slate-700 sm:text-xs">
                Tree Progress
              </span>
            </div>

            <span className="text-[10px] font-bold text-emerald-700 sm:text-xs">
              {event.joinedTrees}/{event.plantingLimit}
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-emerald-100 sm:h-2">
            <div
              className="h-full rounded-full bg-emerald-600 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-2 flex items-center justify-between gap-1 text-[9px] sm:text-[11px]">
            <span className="text-slate-500">
              {event.joinedTrees} joined
            </span>

            <span className="font-semibold text-emerald-700">
              {event.plantingLimit - event.joinedTrees} spots left
            </span>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-2.5 grid grid-cols-2 gap-2 sm:mt-3">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 px-2.5 py-2 sm:px-3 sm:py-2.5">
            <div className="flex items-center gap-1">
              <Users className="size-3.5 text-emerald-600 sm:size-4" />
              <span className="text-[9px] text-slate-500 sm:text-[11px]">
                Joined
              </span>
            </div>

            <p className="mt-0.5 text-sm font-bold text-slate-800 sm:text-base">
              {event.joinedTrees}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 px-2.5 py-2 sm:px-3 sm:py-2.5">
            <div className="flex items-center gap-1">
              <Sprout className="size-3.5 text-emerald-600 sm:size-4" />
              <span className="text-[9px] text-slate-500 sm:text-[11px]">
                Target
              </span>
            </div>

            <p className="mt-0.5 text-sm font-bold text-slate-800 sm:text-base">
              {event.plantingLimit}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:gap-2.5">
          <Button
         onClick={joineventhendler}
            type="button"
              disabled={isloading}
            className="h-9 rounded-full bg-emerald-600 px-2 text-[10px] font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow-md sm:h-10 sm:text-sm"
          >
            {isloading ? (
              <>
                <Loader2 className="mr-1 size-3.5 animate-spin sm:size-4" />
                Processing...
              </>
            ) : isJoined ? (
              <>
                <Leaf className="mr-1 size-3.5 sm:size-4" />
                Cancel Join
              </>
            ) : (
              <>
                <Leaf className="mr-1 size-3.5 sm:size-4" />
                Join Event
              </>
            )}
         
            
          </Button>

         <Link href={`/detailspage/${event._id}`}>
          <Button
            type="button"
            variant="outline"
            className="h-9 rounded-full border-emerald-200 bg-white px-2 text-[10px] font-semibold text-emerald-700 transition-all hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 sm:h-10 sm:text-sm"
          >
            View Event
            <ChevronRight className="ml-0.5 size-3.5 sm:size-4" />
          </Button>
         </Link>
        </div>

      </div>
    </article>
  );
}
