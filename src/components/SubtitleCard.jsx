
"use client";

import { Send, Mail, Leaf, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SubscribeCard() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-emerald-50/60 to-white" />

      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-emerald-200/30 blur-[100px]" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-teal-200/30 blur-[100px]" />

      {/* Main Container */}
      <div className="relative mx-auto max-w-[1100px]">

        <div className="relative overflow-hidden rounded-[28px] border border-emerald-100 bg-white shadow-[0_20px_70px_-25px_rgba(16,185,129,0.18)] sm:rounded-[36px]">

          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/70" />

          {/* Decorative Circles */}
          <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full border-[35px] border-emerald-100/50 sm:h-96 sm:w-96" />

          <div className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full border-[30px] border-teal-100/40" />

          {/* Content */}
          <div className="relative z-10 mx-auto flex max-w-[750px] flex-col items-center px-5 py-12 text-center sm:px-10 sm:py-16 lg:px-16 lg:py-20">

            {/* Icon */}
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-200 bg-white text-emerald-600 shadow-lg shadow-emerald-100 sm:h-16 sm:w-16">
              <Leaf className="h-7 w-7 sm:h-8 sm:w-8" />
            </div>

            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700 sm:text-xs">
                Stay Connected With Nature
              </span>
            </div>

            {/* Heading */}
            <h2 className="max-w-[650px] text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">

              Be Part of a{" "}

              <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 bg-clip-text text-transparent">
                Greener Future
              </span>

            </h2>

            {/* Description */}
            <p className="mt-5 max-w-[530px] text-xs leading-7 text-slate-600 sm:text-sm sm:leading-8 lg:text-base">
              Get the latest updates about tree plantation campaigns,
              environmental events, and community activities happening
              around your neighborhood.
            </p>

            {/* Subscribe Form */}
            <form className="mt-8 flex w-full max-w-[550px] flex-col gap-3 rounded-2xl border border-emerald-100 bg-white p-2 shadow-lg shadow-emerald-900/5 sm:flex-row sm:rounded-full sm:p-2">

              {/* Email Input */}
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-500" />

                <Input
                  type="email"
                  placeholder="Enter your email address"
                  aria-label="Email address"
                  className="h-12 rounded-xl border-0 bg-transparent pl-11 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:rounded-full"
                />
              </div>

              {/* Button */}
              <Button
                type="button"
                className="h-12 gap-2 rounded-xl bg-emerald-600 px-7 text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg sm:rounded-full"
              >
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </Button>

            </form>

            {/* Bottom Text */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[10px] font-medium text-slate-400 sm:text-xs">
              <Send className="h-3.5 w-3.5 text-emerald-500" />
              No spam, just green inspiration. Unsubscribe anytime.
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
