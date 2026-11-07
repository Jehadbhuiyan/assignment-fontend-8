"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
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

const DelelteButtonJoinEvent = ({ event }) => {
 const [loading, setLoading] = useState(false);
const router = useRouter();

const handleDelete = async () => {
  const {data, error} = await authClient.token()
              const token = data?.token
  try {
    setLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/joineventDelete/${event._id}`,
      {
        method: "DELETE",
        headers:{
          authorization: `Bearer ${token}`
        }
      }
    );

    const response = await res.json();

    if (!res.ok) {
      throw new Error(response.message || "Failed to delete event");
    }

    
  
    toast.success('Detete Successfull')
    router.refresh();

  } catch (error) {
    console.error("Delete failed:", error);
    
    toast.error(error)
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

      <AlertDialogContent className="max-w-[calc(100%-2rem)] rounded-2xl sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Trash2 className="size-5 text-rose-600" />
            Delete Event?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete this event?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={loading}
            className="rounded-xl"
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="rounded-xl bg-rose-600 text-white hover:bg-rose-700"
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DelelteButtonJoinEvent;