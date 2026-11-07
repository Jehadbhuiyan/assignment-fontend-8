
"use client";

import { useState } from "react";
import {
  CalendarDays,
  ImageIcon,
  Leaf,
  Loader2,
  MapPin,
  Sprout,
  ChevronDown,
  Pencil,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

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
      <Label
        htmlFor={htmlFor}
        className="text-sm font-semibold text-slate-700"
      >
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
          <span className="text-xs font-bold text-emerald-600">
            0{number}
          </span>

          <h2 className="text-base font-bold text-slate-900">
            {title}
          </h2>
        </div>

        <p className="mt-1 text-xs text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function EditButton({ event }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsUpdating(true);

    try {
      const formData = new FormData(e.currentTarget);

      const updatedEvent = {
        name: formData.get("name"),
        location: formData.get("location"),
        plantCategory: formData.get("plantCategory"),
        eventDate: formData.get("eventDate"),
        plantingLimit: Number(formData.get("plantingLimit")),
        image: formData.get("image"),
        description: formData.get("description"),
      };

      const { data, error } = await authClient.token();
    const token = data?.token;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/update/${event._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
             authorization: `Bearer ${token}`
          },
          body: JSON.stringify(updatedEvent),
        }
      );

      if (!res.ok) {
        throw new Error("Event update failed");
      }

      const results = await res.json();

      if (results.modifiedCount > 0) {
        toast.success("Event Updated Successfully!");

        // Close AlertDialog
        setOpen(false);

        // Refresh updated data
        router.refresh();
      } else if (results.matchedCount > 0) {
        toast.info("No changes were made.");

        setOpen(false);
        router.refresh();
      } else {
        toast.error("Event not found!");
      }
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
  <AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogTrigger asChild>
    <Button
      type="button"
      variant="outline"
      className="h-9 w-full min-w-0 gap-1.5 rounded-xl border-emerald-200 bg-emerald-50 px-2 text-[10px] font-semibold text-emerald-700 shadow-sm transition-all duration-200 hover:border-emerald-400 hover:bg-emerald-100 hover:text-emerald-800 active:scale-95 sm:h-10 sm:text-xs"
    >
      <Pencil className="size-3.5 shrink-0 sm:size-4" />
      Edit
    </Button>
  </AlertDialogTrigger>

<AlertDialogContent className="!flex !flex-col !gap-0 !top-[calc(5rem+1.5rem)] !translate-y-0 max-h-[calc(100dvh-5rem-3rem)] w-[calc(100%-2rem)] !max-w-[calc(100%-2rem)] overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-0 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] sm:w-[calc(100%-4rem)] sm:!max-w-3xl lg:!max-w-5xl">
    <AlertDialogHeader className="shrink-0 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-teal-50 px-5 py-4 text-left sm:px-8 sm:py-5">
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 sm:size-11">
          <Pencil className="size-4 sm:size-5" />
        </div>

        <div className="min-w-0 text-left">
          <AlertDialogTitle className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
            Update <span className="text-emerald-600">Event</span>
          </AlertDialogTitle>

          <AlertDialogDescription className="mt-0.5 text-[11px] leading-snug text-slate-500 sm:text-xs">
            Update your event details and make a greener impact.
          </AlertDialogDescription>
        </div>
      </div>
    </AlertDialogHeader>

    {/* Scrollable form (Create page-er moto) */}
    <div className="min-h-0 flex-1 overflow-y-auto">
      <form onSubmit={handleSubmit} className="p-5 sm:p-8">
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
                defaultValue={event?.name || ""}
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
                  defaultValue={event?.location || ""}
                  required
                  className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-11 pr-11 text-sm text-slate-700 shadow-sm outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                >
                  <option value="" disabled>
                    Select your location
                  </option>

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
                  defaultValue={event?.plantCategory || ""}
                  required
                  className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-11 pr-11 text-sm text-slate-700 shadow-sm outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                >
                  <option value="" disabled>
                    Select plant category
                  </option>

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
            <Field label="Event Date" htmlFor="eventDate" icon={CalendarDays}>
              <Input
                id="eventDate"
                name="eventDate"
                type="date"
                defaultValue={event?.eventDate || ""}
                required
                className={inputClass}
              />
            </Field>

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
                defaultValue={event?.plantingLimit || ""}
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
            <Field
              label="Event Cover Image URL"
              htmlFor="image"
              icon={ImageIcon}
            >
              <Input
                id="image"
                name="image"
                type="url"
                defaultValue={event?.image || ""}
                placeholder="https://example.com/tree-planting.jpg"
                className={inputClass}
              />
            </Field>

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
                defaultValue={event?.description || ""}
                placeholder="Write a short story about this tree planting event..."
                className="min-h-36 resize-none rounded-xl border-slate-200 bg-white p-4 text-sm leading-6 shadow-sm transition-all placeholder:text-slate-400 focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/10"
              />
            </div>
          </div>
        </section>

        {/* Buttons */}
        <div className="mt-10 flex flex-col gap-4 border-t border-slate-100 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Leaf className="size-4 text-emerald-600" />
            <span>Every tree makes a difference.</span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center">
            <AlertDialogCancel
              disabled={isUpdating}
              className="mt-0 h-12 w-full rounded-xl border-slate-200 bg-white px-6 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 sm:w-auto sm:px-7"
            >
              Cancel
            </AlertDialogCancel>

            <Button
              type="submit"
              disabled={isUpdating}
              className="h-12 w-full rounded-xl bg-emerald-700 px-5 font-bold text-white shadow-lg shadow-emerald-700/20 transition-all hover:bg-emerald-800 hover:shadow-emerald-700/30 disabled:opacity-70 sm:w-auto sm:px-7"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Pencil className="mr-2 size-4" />
                  Update jehad
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  </AlertDialogContent>
</AlertDialog>
  );
}
