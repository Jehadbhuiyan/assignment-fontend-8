"use client";

import { authClient } from "@/lib/auth-client";
import {
  ArrowLeft,
  Leaf,
  Loader2,
  TreePine,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DetailsEventButton = ({ singleData }) => {
  const router = useRouter();

  const [isloading, setIsloading] = useState(false);
  const [isJoined, setIsJoined] = useState(
    Boolean(singleData?.isJoined)
  );

  const [joinedTreesCount, setJoinedTreesCount] = useState(
    Number(singleData?.joinedTrees || 0)
  );

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const joineventhendler = async () => {
    // Check login
    if (!user) {
      toast.error("Please login to join this event");
      return;
    }

    // Check already joined
    if (isJoined) {
      toast.info("You have already joined this event");
      return;
    }

    // Check event full
    if (
      Number(singleData?.plantingLimit) > 0 &&
      joinedTreesCount >= Number(singleData.plantingLimit)
    ) {
      toast.error("Sorry! This event is already full.");
      return;
    }
     const { data, error } = await authClient.token();
    const token = data?.token;
    setIsloading(true);

    try {
      // Separate event ID
      const { _id, ...eventData } = singleData;

      // Create payload
      const payload = {
        _id,
        ...eventData,
        email: user.email,
        username: user.name,
        userurl: user.image,
        joineventperson: joinedTreesCount + 1,
      };

      console.log("Join Event Payload:", payload);

      // Send request
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/joinEvents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
              authorization: `bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      // Read response safely
      const responseText = await res.text();

      console.log("Backend Status:", res.status);
      console.log("Backend Response:", responseText);

      let response;

      try {
        response = JSON.parse(responseText);
      } catch {
        throw new Error(
          "Backend JSON response পাঠাচ্ছে না। Backend Terminal check করো।"
        );
      }

      if (!res.ok) {
        throw new Error(
          response.message || "Failed to join event"
        );
      }

      // Update UI
      setIsJoined(true);
      setJoinedTreesCount((prev) => prev + 1);

      toast.success("Successfully joined the event!");

      router.refresh();
    } catch (error) {
      console.error("Join Event Error:", error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="mt-5 rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-green-50 p-4 shadow-sm sm:p-5">

      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-100">
            <TreePine className="size-5 text-emerald-600" />
          </div>

          <h3 className="text-sm font-bold text-slate-800">
            Be Part of This Event
          </h3>
        </div>

        <p className="mt-2 text-xs leading-5 text-slate-500">
          Join hands with other volunteers and help make our
          community greener.
        </p>
      </div>

      {/* Join Button */}
      <Button
        onClick={joineventhendler}
        type="button"
        disabled={isloading || isJoined}
        className="group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 px-5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-emerald-700 hover:to-green-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isloading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Processing...
          </>
        ) : isJoined ? (
          <>
            <Leaf className="size-4" />
            Already Joined
          </>
        ) : (
          <>
            <Leaf className="size-4 transition-transform group-hover:rotate-12" />
            Join This Event
            <ArrowLeft className="size-4 rotate-180 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </Button>

      {/* Footer */}
      <p className="mt-3 text-center text-[10px] text-slate-400">
        Together, we can make a difference!
      </p>
    </div>
  );
};

export default DetailsEventButton;