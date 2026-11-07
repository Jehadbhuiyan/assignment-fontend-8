"use client";

import { useState } from "react";
import { Leaf, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const DelelteButton = ({ event }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const { data, error } = await authClient.token();
    const token = data?.token;
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/deleteEvent/${event._id}`,
        {
          method: "DELETE",
          headers:{
             authorization: `Bearer ${token}`
          }
        },
      );

      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "Failed to delete event");
      }

      // toast.success("Event deleted successfully!");
      toast.success("Detete Successfull");
      router.refresh();
    } catch (error) {
      console.error("Delete failed:", error);
      // toast.error(error.message || "Delete failed!");
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
   <AlertDialog>
  <AlertDialogTrigger asChild>
    <Button
      type="button"
      variant="outline"
      className="h-9 w-full min-w-0 rounded-xl border-rose-200 bg-rose-50 px-2 text-[10px] font-semibold text-rose-600 shadow-sm transition-all duration-200 hover:border-rose-300 hover:bg-rose-100 hover:text-rose-700 active:scale-95 sm:h-10 sm:text-xs"
    >
      <Trash2 className="size-3.5 shrink-0 sm:size-4" />
      Delete
    </Button>
  </AlertDialogTrigger>

  <AlertDialogContent className="max-w-[calc(100%-2rem)] overflow-hidden rounded-3xl border border-emerald-100 bg-white p-0 shadow-2xl shadow-emerald-900/10 sm:max-w-md">
    {/* Top accent bar */}
    <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500" />

    <div className="relative px-5 pb-5 pt-6 sm:px-6">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-emerald-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-teal-100/60 blur-3xl" />

      <AlertDialogHeader className="relative z-10 items-center text-center sm:items-center sm:text-center">
        {/* Icon */}
        <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] border border-emerald-100 bg-emerald-50 shadow-[0_8px_30px_rgba(16,185,129,0.12)]">
          <Trash2 className="h-7 w-7 text-rose-500" />
          <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-white shadow-sm">
            <Leaf className="h-3 w-3" />
          </span>
        </div>

        <AlertDialogTitle className="mt-4 text-xl font-extrabold tracking-tight text-slate-900">
          Delete <span className="text-emerald-600">Event?</span>
        </AlertDialogTitle>

        <AlertDialogDescription className="mx-auto max-w-xs text-sm leading-relaxed text-slate-500">
          Are you sure you want to delete this event? This action cannot be
          undone and all joined participants will lose access.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter className="relative z-10 mt-6 grid grid-cols-2 gap-3 sm:flex-row">
        <AlertDialogCancel
          disabled={loading}
          className="mt-0 h-11 rounded-xl border-emerald-200 bg-white text-sm font-semibold text-emerald-700 transition-all duration-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 active:scale-95"
        >
          Cancel
        </AlertDialogCancel>

        <AlertDialogAction
          onClick={handleDelete}
          disabled={loading}
          className="h-11 rounded-xl bg-rose-600 text-sm font-semibold text-white shadow-lg shadow-rose-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-rose-700 hover:shadow-rose-600/30 active:scale-95"
        >
          {loading ? "Deleting..." : "Yes, Delete"}
        </AlertDialogAction>
      </AlertDialogFooter>
    </div>
  </AlertDialogContent>
</AlertDialog>
  );
};

export default DelelteButton;
