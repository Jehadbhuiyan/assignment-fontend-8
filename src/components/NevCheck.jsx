
"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Plus,
  LayoutDashboard,
  Users,
  LogOut,
  Settings,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


export default function ProfileDropdown({ mobile = false }) {
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push('/')
    setOpen(false);
    toast.success('Logout Successfull')
  };

  if (isPending) {
    return <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200" />;
  }

  if (!user) return null;

  const menu = (
    <>
      <Link href="/createEvent" onClick={() => setOpen(false)}
        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700">
        <Plus size={18} /> Create Event
      </Link>

      <Link href="/manageEvent" onClick={() => setOpen(false)}
        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700">
        <LayoutDashboard size={18} /> Manage Events
      </Link>

      <Link href="/JoinEvent/" onClick={() => setOpen(false)}
        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700">
        <Users size={18} /> Joined Events
      </Link>

      <Link href="/update-profile" onClick={() => setOpen(false)}
        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700">
        <Settings size={18} /> Update Profile
      </Link>

      <button onClick={handleSignOut}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-600 hover:bg-red-50">
        <LogOut size={18} /> Sign Out
      </button>
    </>
  );

  // Mobile: dropdown না, সরাসরি menu দেখাবে
  if (mobile) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white p-3">
        <div className="mb-3 flex items-center gap-3 border-b border-slate-100 pb-3">
          {user.image ? (
            <img src={user.image} alt="Profile"
              className="h-11 w-11 rounded-full object-cover" />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate font-bold text-slate-800">{user.name}</p>
            <p className="truncate text-xs text-slate-500">{user.email}</p>
          </div>
        </div>
        <div className="space-y-1">{menu}</div>
      </div>
    );
  }

  // Desktop: আগের dropdown
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 pr-3 hover:bg-slate-50">
        {user.image ? (
          <img src={user.image} alt="Profile"
            className="h-9 w-9 rounded-full object-cover" />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
            {user.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
        )}
        <span className="max-w-24 truncate text-sm font-semibold">{user.name}</span>
        <ChevronDown size={16} className={`transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <button onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100]" aria-label="Close dropdown" />

          <div className="absolute right-0 top-full z-[110] mt-3 w-72 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl">
            <div className="border-b border-slate-100 bg-emerald-50/70 p-4">
              <p className="font-bold text-slate-800">{user.name}</p>
              <p className="truncate text-xs text-slate-500">{user.email}</p>
            </div>
            <div className="space-y-1 p-2">{menu}</div>
          </div>
        </>
      )}
    </div>
  );
}
