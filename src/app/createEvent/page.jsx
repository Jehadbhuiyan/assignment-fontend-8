"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  ImageIcon,
  Leaf,
  Loader2,
  MapPin,
  Sprout,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const locations = [
  "Dhaka",
  "Chattogram",
  "Khulna",
  "Rajshahi",
  "Sylhet",
  "Barishal",
  "Rangpur",
  "Mymensingh",
];

const plantCategories = [
  "Flower",
  "Fruit",
  "Medicinal",
  "Timber",
  "Shade",
  "Ornamental",
  "Bamboo",
];

const inputClass =
  "h-12 rounded-xl border-slate-200 bg-white pl-11 text-sm shadow-sm transition-all placeholder:text-slate-400 focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/10";

function Field({ label, htmlFor, icon: Icon, children }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor} className="text-sm font-semibold text-slate-700">
        {label}
      </Label>

      <div className="relative">
        <Icon className="pointer-events-none absolute left-3.5 top-3.5 z-10 size-4 text-emerald-600" />
        {children}
      </div>
    </div>
  );
}

function SectionHeading({ number, icon: Icon, title, description }) {
  return (
    <div className="mb-6 flex items-start gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
        <Icon className="size-4" />
      </div>

      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-600">0{number}</span>

          <h2 className="text-base font-bold text-slate-900">{title}</h2>
        </div>

        <p className="mt-1 text-xs text-slate-400">{description}</p>
      </div>
    </div>
  );
}

export default function CreateEventPage() {
  const [isCreating, setIsCreating] = useState(false);
 const [minDate, setMinDate] = useState("");

useEffect(() => {
  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);

  const formattedDate = [
    tomorrow.getFullYear(),
    String(tomorrow.getMonth() + 1).padStart(2, "0"),
    String(tomorrow.getDate()).padStart(2, "0"),
  ].join("-");

  setMinDate(formattedDate);
}, []);
  const { data: session, isPending } = authClient.useSession();

  const users = session?.user;

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Session:", session);
    console.log("Users:", users);

    if (!users) {
      console.log("User not logged in or session loading");
      toast.error("Please login first!");
      return;
    }

    const addData = new FormData(e.currentTarget);
    const formUser = Object.fromEntries(addData.entries());

    const addusers = {
      username: users.name,
      email: users.email,
      userurl: users.image,
      ...formUser,
      joinedTrees: 0,
    };

    console.log("Final Data:", addusers);
    const { data, error } = await authClient.token();
    const token = data?.token;

    try {
      setIsCreating(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/createEvent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addusers),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create event");
      }

      console.log("Event created successfully:", data);

      if (data.acknowledged > 0) {
        toast.success("Event created successfully!");
        router.push("upcommingEvent");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create event!");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7faf8] px-4 pb-16 pt-28 sm:px-6 lg:px-10">
      {/* Background Decorations */}
      <div className="pointer-events-none fixed left-0 top-24 -z-0 size-72 rounded-full bg-emerald-200/20 blur-3xl" />

      <div className="pointer-events-none fixed bottom-0 right-0 -z-0 size-80 rounded-full bg-green-200/20 blur-3xl" />

      {/* Same Width Container */}
      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 shadow-sm">
            <Sprout className="size-4 text-emerald-600" />

            <span className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
              Community Impact
            </span>
          </div>

          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <h1 className="max-w-2xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                Create a <span className="text-emerald-700">Tree Planting</span>{" "}
                Event
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                Bring people together, plant trees, and create a greener future
                for your community.
              </p>
            </div>

            <div className="hidden items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-5 py-3 shadow-sm sm:flex">
              <div className="flex size-10 items-center justify-center rounded-full bg-emerald-50">
                <Leaf className="size-5 text-emerald-700" />
              </div>

              <div>
                <p className="text-xs text-slate-400">Make an impact</p>

                <p className="text-sm font-bold text-slate-800">
                  One tree at a time
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-[28px] border border-slate-200/80 bg-white p-5 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)] sm:p-8"
        >
          {/* Event Information */}
          <section>
            <SectionHeading
              number="1"
              icon={Leaf}
              title="Event Information"
              description="Tell people what your event is about."
            />

            <div className="space-y-5">
              {/* Event Title */}
              <Field label="Event Title" htmlFor="name" icon={Leaf}>
                <Input
                  id="name"
                  name="name"
                  placeholder="Dhanmondi Lake-e Foloj Gach Ropon"
                  required
                  className={inputClass}
                />
              </Field>

              {/* Location Dropdown */}
              <div className="space-y-2">
                <Label
                  htmlFor="location"
                  className="text-sm font-semibold text-slate-700"
                >
                  Location / Division
                </Label>

                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3.5 top-3.5 z-10 size-4 text-emerald-600" />

                  <select
                    id="location"
                    name="location"
                    required
                    className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-11 pr-11 text-sm text-slate-700 shadow-sm outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  >
                    <option value="">Select your location</option>

                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-4 top-3.5 size-4 text-slate-400" />
                </div>
              </div>

              {/* Plant Category Dropdown */}
              <div className="space-y-2">
                <Label
                  htmlFor="plantCategory"
                  className="text-sm font-semibold text-slate-700"
                >
                  Plant Category
                </Label>

                <div className="relative">
                  <Sprout className="pointer-events-none absolute left-3.5 top-3.5 z-10 size-4 text-emerald-600" />

                  <select
                    id="plantCategory"
                    name="plantCategory"
                    required
                    className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-11 pr-11 text-sm text-slate-700 shadow-sm outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  >
                    <option value="">Select plant category</option>

                    {plantCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-4 top-3.5 size-4 text-slate-400" />
                </div>
              </div>
            </div>
          </section>

          {/* Date & Tree Limit */}
          <section className="mt-10 border-t border-slate-100 pt-8">
            <SectionHeading
              number="2"
              icon={CalendarDays}
              title="Event Schedule"
              description="Choose the event date and tree planting goal."
            />

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Date */}
              <Field label="Event Date" htmlFor="eventDate" icon={CalendarDays}>
                <Input
                  id="eventDate"
                  name="eventDate"
                  type="date"
                  min={minDate}
                  disabled={!minDate}
                  required
                  className={inputClass}
                />
              </Field>

              {/* Tree Limit */}
              <Field
                label="Tree Planting Limit"
                htmlFor="plantingLimit"
                icon={Sprout}
              >
                <Input
                  id="plantingLimit"
                  name="plantingLimit"
                  type="number"
                  min="1"
                  placeholder="100"
                  required
                  className={inputClass}
                />
              </Field>
            </div>
          </section>

          {/* Media */}
          <section className="mt-10 border-t border-slate-100 pt-8">
            <SectionHeading
              number="3"
              icon={ImageIcon}
              title="Event Story"
              description="Add a visual and tell people why they should join."
            />

            <div className="space-y-5">
              {/* Image URL */}
              <Field
                label="Event Cover Image URL"
                htmlFor="image"
                icon={ImageIcon}
              >
                <Input
                  id="image"
                  name="image"
                  type="url"
                  placeholder="https://example.com/tree-planting.jpg"
                  className={inputClass}
                />
              </Field>

              {/* Description */}
              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-sm font-semibold text-slate-700"
                >
                  Event Description
                </Label>

                <Textarea
                  id="description"
                  name="description"
                  placeholder="Write a short story about this tree planting event..."
                  className="min-h-36 resize-none rounded-xl border-slate-200 bg-white p-4 text-sm leading-6 shadow-sm transition-all placeholder:text-slate-400 focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/10"
                />
              </div>
            </div>
          </section>

          {/* Button */}
          <div className="mt-10 flex flex-col gap-3 border-t border-slate-100 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Leaf className="size-4 text-emerald-600" />

              <span>Every tree makes a difference.</span>
            </div>

            <Button
              type="submit"
              disabled={isCreating || isPending}
              className="h-12 rounded-xl bg-emerald-700 px-7 font-bold text-white shadow-lg shadow-emerald-700/20 transition-all hover:bg-emerald-800 hover:shadow-emerald-700/30 disabled:opacity-70"
            >
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Creating Event...
                </>
              ) : (
                <>
                  <Sprout className="mr-2 size-4" />
                  Create Event
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
