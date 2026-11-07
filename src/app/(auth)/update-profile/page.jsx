"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  ImageIcon,
  Leaf,
  Loader2,
  Mail,
  Save,
  User,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

const inputClass =
  "h-12 rounded-xl border-slate-200 bg-white pl-11 text-sm shadow-sm transition-all placeholder:text-slate-400 focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/10";

function ProfileSkeleton() {
  return (
    <main className="min-h-screen bg-slate-50/60 px-3 pb-16 pt-28 sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-2xl">
        <div className="h-96 animate-pulse rounded-[28px] bg-slate-200" />
      </div>
    </main>
  );
}

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  if (isPending) return <ProfileSkeleton />;

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-50/60 px-3 pb-16 pt-28 sm:px-6 sm:pt-32">
        <div className="mx-auto max-w-2xl rounded-3xl border border-dashed border-emerald-200 bg-white px-5 py-16 text-center">
          <h2 className="text-xl font-bold text-slate-900">Please Login First</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
            You need to login before you can update your profile.
          </p>
          <Button
            asChild
            className="mt-6 rounded-full bg-emerald-700 px-6 hover:bg-emerald-800"
          >
            <Link href="/Login">Login</Link>
          </Button>
        </div>
      </main>
    );
  }

  // user এর মান আসার পর form এর value
  const nameValue = name ?? user.name ?? "";
  const imageValue = image ?? user.image ?? "";
  const initial = (nameValue || user.email || "U").charAt(0).toUpperCase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setMessage({ type: "", text: "" });

    const { error } = await authClient.updateUser({
      name: nameValue.trim(),
      image: imageValue.trim() || undefined,
    });

    setIsUpdating(false);

    if (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to update profile.",
      });
      return;
    }

    setMessage({ type: "success", text: "Profile updated successfully!" });
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-slate-50/60 px-3 pb-16 pt-28 sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-2xl">
        {/* Heading */}
        <div className="mb-7 sm:mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[10px] font-semibold text-emerald-700 sm:px-4 sm:py-1.5 sm:text-xs">
            <span className="size-1.5 rounded-full bg-emerald-500 sm:size-2" />
            MAKE OUR PLANET GREENER
          </span>

          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:mt-4 sm:text-4xl">
            Update <span className="text-emerald-600">Profile</span>
          </h1>

          <p className="mt-2 max-w-xl text-xs leading-relaxed text-slate-500 sm:text-base">
            Keep your information fresh so the community knows who is planting
            with them.
          </p>
        </div>

        {/* Card */}
        <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)]">
          {/* Banner */}
          <div className="relative h-28 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 sm:h-32">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-12 left-10 h-32 w-32 rounded-full bg-teal-300/20 blur-2xl" />
            <Leaf className="absolute right-6 top-6 size-10 text-white/20 sm:size-14" />
          </div>

          {/* Avatar */}
          <div className="-mt-12 flex flex-col items-center px-5 sm:-mt-14">
            <div className="relative">
              {imageValue ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageValue}
                  alt={nameValue || "Profile"}
                  className="size-24 rounded-full border-4 border-white bg-emerald-50 object-cover shadow-lg sm:size-28"
                />
              ) : (
                <div className="flex size-24 items-center justify-center rounded-full border-4 border-white bg-emerald-600 text-3xl font-extrabold text-white shadow-lg sm:size-28 sm:text-4xl">
                  {initial}
                </div>
              )}
              <span className="absolute bottom-1 right-1 flex size-7 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-white shadow-sm">
                <Leaf className="size-3.5" />
              </span>
            </div>

            <h2 className="mt-3 text-lg font-bold text-slate-900">
              {nameValue || "Your Name"}
            </h2>
            <p className="text-xs text-slate-500">{user.email}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 p-5 pt-7 sm:p-8">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold text-slate-700">
                Full Name
              </Label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3.5 top-4 z-10 size-4 text-emerald-600" />
                <Input
                  id="name"
                  value={nameValue}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Email (read only) */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-4 z-10 size-4 text-emerald-600" />
                <Input
                  id="email"
                  value={user.email}
                  readOnly
                  disabled
                  className={`${inputClass} cursor-not-allowed bg-slate-50 text-slate-500`}
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Email cannot be changed.
              </p>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="image" className="text-sm font-semibold text-slate-700">
                Profile Image URL
              </Label>
              <div className="relative">
                <ImageIcon className="pointer-events-none absolute left-3.5 top-4 z-10 size-4 text-emerald-600" />
                <Input
                  id="image"
                  type="url"
                  value={imageValue}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Message */}
            {message.text && (
              <div
                className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium ${
                  message.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-rose-200 bg-rose-50 text-rose-600"
                }`}
              >
                {message.type === "success" && (
                  <CheckCircle2 className="size-4 shrink-0" />
                )}
                {message.text}
              </div>
            )}

            {/* Footer */}
            <div className="flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Leaf className="size-4 text-emerald-600" />
                <span>Every tree makes a difference.</span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:flex">
                <Button
                  asChild
                  type="button"
                  variant="outline"
                  className="h-12 rounded-xl border-emerald-200 bg-white px-6 text-sm font-semibold text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  <Link href="/">
                    <ArrowLeft className="mr-2 size-4" />
                    Back
                  </Link>
                </Button>

                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="h-12 rounded-xl bg-emerald-700 px-6 font-bold text-white shadow-lg shadow-emerald-700/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-emerald-700/30 disabled:opacity-70 sm:px-7"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 size-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}