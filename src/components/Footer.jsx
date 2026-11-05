"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Sprout,
  TreePine,
} from "lucide-react";

import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "All Events", href: "/events" },
  { name: "Upcoming Events", href: "/upcoming-events" },
  { name: "Create Event", href: "/events/create" },
];

const communityLinks = [
  { name: "My Joined Events", href: "/my-joined-events" },
  { name: "My Created Events", href: "/manage-event" },
  { name: "My Profile", href: "/profile" },
  { name: "About GreenBond", href: "/about" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "#",
    icon: FaFacebookF,
  },
  {
    name: "Instagram",
    href: "#",
    icon: FaInstagram,
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: FaLinkedinIn,
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 sm:mt-20">
      <div className="relative overflow-hidden rounded-t-[32px] bg-[#071b15] sm:rounded-t-[48px]">
        {/* Background Decoration */}
        <div className="pointer-events-none absolute -left-32 top-20 size-80 rounded-full bg-emerald-500/10 blur-[100px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 size-96 rounded-full bg-green-400/10 blur-[110px]" />

        <div className="relative mx-auto max-w-7xl px-4 pb-7 pt-10 sm:px-6 sm:pb-9 sm:pt-14 lg:px-10">
          {/* CTA Section */}

          {/* Footer Main Content */}
          <div className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-12">
            {/* Brand Section */}
            <div className="col-span-2 lg:col-span-1">
              <Link href="/" className="inline-flex items-center gap-2.5">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500 shadow-lg shadow-emerald-500/20">
                  <TreePine className="size-6 text-white" />
                </div>

                <span className="text-xl font-extrabold tracking-tight text-white">
                  Green<span className="text-emerald-400">Bond</span>
                </span>
              </Link>

              <p className="mt-4 max-w-sm text-xs leading-6 text-slate-400 sm:text-sm">
                Connecting passionate people with meaningful environmental
                initiatives. Together, we can grow a greener and healthier
                community.
              </p>

              {/* Social Links */}
              <div className="mt-5 flex items-center gap-2.5">
                {socialLinks.map(({ name, href, icon: Icon }) => (
                  <Link
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-emerald-500/15 hover:text-emerald-400"
                  >
                    <Icon className="size-4" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Explore Links */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white sm:text-sm">
                Explore
              </h3>

              <ul className="mt-5 space-y-3.5">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-[11px] text-slate-400 transition hover:text-emerald-400 sm:text-sm"
                    >
                      {link.name}
                      <ArrowUpRight className="size-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community Links */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white sm:text-sm">
                Community
              </h3>

              <ul className="mt-5 space-y-3.5">
                {communityLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-[11px] text-slate-400 transition hover:text-emerald-400 sm:text-sm"
                    >
                      {link.name}
                      <ArrowUpRight className="size-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white sm:text-sm">
                Get in Touch
              </h3>

              <div className="mt-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                    <MapPin className="size-4 text-emerald-400" />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold text-slate-300 sm:text-xs">
                      Our Location
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                      Dhaka, Bangladesh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                    <Mail className="size-4 text-emerald-400" />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold text-slate-300 sm:text-xs">
                      Email Address
                    </p>
                    <a
                      href="mailto:hello@greenbond.com"
                      className="mt-1 block break-all text-[11px] text-slate-500 transition hover:text-emerald-400 sm:text-xs"
                    >
                      hello@greenbond.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                    <Phone className="size-4 text-emerald-400" />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold text-slate-300 sm:text-xs">
                      Phone Number
                    </p>
                    <a
                      href="tel:+8801234567890"
                      className="mt-1 block text-[11px] text-slate-500 transition hover:text-emerald-400 sm:text-xs"
                    >
                      +8801747252164n
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="mt-10 border-t border-white/10 pt-6 sm:mt-14 sm:pt-7">
            <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
              <p className="text-[10px] text-slate-500 sm:text-xs">
                © 2026 GreenBond. All rights reserved.
              </p>

              <div className="flex items-center gap-4 text-[10px] text-slate-500 sm:text-xs">
                <Link
                  href="/privacy"
                  className="transition hover:text-emerald-400"
                >
                  Privacy Policy
                </Link>

                <span className="size-1 rounded-full bg-slate-700" />

                <Link
                  href="/terms"
                  className="transition hover:text-emerald-400"
                >
                  Terms of Service
                </Link>
              </div>

              <p className="flex items-center gap-1.5 text-[10px] text-slate-500 sm:text-xs">
                Made with
                <Sprout className="size-3.5 text-emerald-400" />
                for a greener planet
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
