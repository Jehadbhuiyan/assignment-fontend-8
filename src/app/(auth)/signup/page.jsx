"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Outfit } from "next/font/google";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CircleHelp,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Image as ImageIcon,
  Leaf,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const outfit = Outfit({ subsets: ["latin"] });

const SEGMENT_COLORS = [
  "bg-emerald-300",
  "bg-emerald-400",
  "bg-emerald-500",
  "bg-emerald-600",
];

const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"];

const circleBtn =
  "flex size-10 shrink-0 items-center justify-center rounded-full border border-emerald-100 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700";

const socialBtn =
  "h-12 min-w-0 flex-1 rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700";

function getStrength(password) {
  if (!password) return 0;

  let score = 0;

  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  return Math.max(score, 1);
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden>
      <path
        fill="#4285F4"
        d="M21.3 12.2c0-.6-.1-1.1-.2-1.6H12v3.9h5.5c-.2 1.2-1 2.3-2 3l3 2.3c1.8-1.7 2.8-4.1 2.8-6.6z"
      />
      <path
        fill="#34A853"
        d="M12 21.7c2.6 0 4.8-.9 6.4-2.4l-3-2.3c-.9.6-2 1-3.4 1a6 6 0 0 1-5.7-4.1L3 16.3a9.7 9.7 0 0 0 9 5.4z"
      />
      <path
        fill="#FBBC05"
        d="M6.2 14.2a5.9 5.9 0 0 1 0-4.4L3 7.4a9.7 9.7 0 0 0 0 9.2z"
      />
      <path
        fill="#EA4335"
        d="M12 6c1.9 0 3.1.8 3.8 1.5l2.6-2.5A9.6 9.6 0 0 0 12 2.3 9.7 9.7 0 0 0 3 7.4l3.2 2.4A6 6 0 0 1 12 6z"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5 shrink-0"
      aria-hidden
      fill="currentColor"
    >
      <path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.1v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z" />
    </svg>
  );
}

function Field({ icon: Icon, right, ...props }) {
  return (
    <div className="rounded-full bg-slate-200 p-[1.5px] shadow-sm transition-all duration-300 focus-within:bg-emerald-500 focus-within:shadow-[0_5px_20px_rgba(16,185,129,0.15)]">
      <div className="flex h-12 items-center gap-3 rounded-full bg-white px-4 sm:h-[54px]">
        <Icon className="size-[18px] shrink-0 text-slate-400 transition-colors duration-300 peer-focus:text-emerald-600" />

        <Input
          className="h-full min-w-0 flex-1 border-0 bg-transparent p-0 text-sm font-medium text-slate-800 shadow-none placeholder:font-normal placeholder:text-slate-400 focus-visible:ring-0"
          {...props}
        />

        {right}
      </div>
    </div>
  );
}

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [image, setImage] = useState("");

  const strength = useMemo(() => getStrength(password), [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const users = new FormData(e.currentTarget);
    const data = Object.fromEntries(users.entries());
    console.log(data);

    if (!agreed) return;

    try {
      const { data: resdata, error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        image: image.trim() || undefined,
      });

      console.log("Signup Data:", resdata);
      console.log("Signup Error:", error);

      if (error) {
        toast.error(error);
        return;
      }
      if (resdata) {
        toast.success("Welcome Ower Website");
        router.push("/");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const googleClickHendle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
    router("/");
    router.refresh();
  };
  const githubClickHendle = async () => {
    await authClient.signIn.social({
      provider: "github",
    });
    router("/");
    router.refresh();
  };

  return (
    <main
      className={cn(
        outfit.className,
        "relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#f4faf6] px-3 py-6 sm:px-6 sm:py-10 lg:px-8",
      )}
    >
      {/* Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-32 -top-32 size-[420px] rounded-full bg-emerald-200/30 blur-[100px]" />
        <div className="absolute -right-32 top-1/4 size-[420px] rounded-full bg-green-100/70 blur-[110px]" />
        <div className="absolute -bottom-40 left-1/3 size-[450px] rounded-full bg-teal-100/60 blur-[110px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(#047857 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Main Card */}
      <div className="relative grid w-full max-w-[1050px] overflow-hidden rounded-[28px] border border-white bg-white shadow-[0_25px_90px_rgba(15,90,55,0.12)] sm:rounded-[36px] lg:min-h-[700px] lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left Side */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-[#075c40] p-10 text-white lg:flex xl:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(110,231,183,0.24),transparent_35%),radial-gradient(circle_at_90%_90%,rgba(52,211,153,0.18),transparent_35%)]" />

          <div className="absolute -right-24 top-32 size-80 rounded-full border border-white/10" />
          <div className="absolute -right-12 top-44 size-56 rounded-full border border-white/10" />
          <div className="absolute -bottom-24 -left-24 size-72 rounded-full border border-white/10" />

          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-lg">
                <Leaf className="size-6" />
              </span>

              <span className="text-2xl font-bold tracking-tight">
                Green<span className="text-emerald-300">Bond</span>
              </span>
            </Link>

            <div className="mt-24 max-w-sm">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-emerald-100 backdrop-blur">
                <Sparkles className="size-3.5" />
                GROW WITH US
              </span>

              <h2 className="mt-7 text-4xl font-semibold leading-[1.2] tracking-tight xl:text-5xl">
                Together, we can make our planet{" "}
                <span className="text-emerald-300">greener.</span>
              </h2>

              <p className="mt-6 text-sm leading-7 text-emerald-100/80">
                Join a community of passionate people. Plant trees, discover
                events and make a positive difference for our environment.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-16 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-300/20 text-emerald-200">
                <ShieldCheck className="size-6" />
              </div>

              <div>
                <p className="text-sm font-semibold">Your account is secure</p>
                <p className="mt-1 text-xs text-emerald-100/70">
                  Your information stays protected.
                </p>
              </div>
            </div>
          </div>

          <p className="relative z-10 mt-8 text-xs text-emerald-100/60">
            © 2026 GreenBond. Growing a better tomorrow.
          </p>
        </section>

        {/* Right Side */}
        <section className="flex min-w-0 flex-col px-5 py-5 sm:px-10 sm:py-8 lg:px-12 lg:py-10 xl:px-16">
          {/* Header */}
          <header className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back"
              className={circleBtn}
            >
              <ArrowLeft className="size-4" />
            </button>

            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-bold text-emerald-700 lg:hidden"
            >
              <Leaf className="size-5" />
              GreenBond
            </Link>

            <button type="button" aria-label="Help" className={circleBtn}>
              <CircleHelp className="size-4" />
            </button>
          </header>

          {/* Title */}
          <div className="mb-7 mt-8 text-center sm:mb-8 sm:mt-10 lg:mt-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-[11px] font-bold tracking-[0.15em] text-emerald-700">
              <Leaf className="size-3.5" />
              GET STARTED
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Create your account
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Join our community and grow something meaningful.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-1 flex-col gap-3.5"
          >
            {/* Full Name */}
            <div className="space-y-2">
              <Label className="ml-1 text-xs font-semibold text-slate-700">
                Full name
              </Label>

              <Field
                icon={User}
                type="text"
                placeholder="Enter your full name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label className="ml-1 text-xs font-semibold text-slate-700">
                Email address
              </Label>

              <Field
                icon={Mail}
                type="email"
                placeholder="Enter your email address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            {/* Profile Image */}
            <div className="space-y-2">
              <Label className="ml-1 text-xs font-semibold text-slate-700">
                Profile image URL
                <span className="ml-1 font-normal text-slate-400">
                  (Optional)
                </span>
              </Label>

              <Field
                icon={ImageIcon}
                type="url"
                placeholder="https://example.com/image.jpg"
                name="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label className="ml-1 text-xs font-semibold text-slate-700">
                Password
              </Label>

              <Field
                icon={Lock}
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                name="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                right={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="shrink-0 text-slate-400 transition hover:text-emerald-700"
                  >
                    {showPassword ? (
                      <Eye className="size-[18px]" />
                    ) : (
                      <EyeOff className="size-[18px]" />
                    )}
                  </button>
                }
              />

              {/* Password Strength */}
              <div className="flex items-center gap-3 px-1 pt-1">
                <div className="flex flex-1 gap-1.5">
                  {SEGMENT_COLORS.map((color, i) => (
                    <span
                      key={i}
                      className={cn(
                        "h-1.5 flex-1 rounded-full transition-colors duration-300",
                        i < strength ? color : "bg-slate-200",
                      )}
                    />
                  ))}
                </div>

                <span className="w-12 text-right text-[11px] font-semibold text-emerald-700">
                  {STRENGTH_LABELS[strength]}
                </span>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2.5 px-1 pt-1">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(v) => setAgreed(v === true)}
                className="mt-0.5 size-4 shrink-0 rounded border-slate-300 data-[state=checked]:border-emerald-600 data-[state=checked]:bg-emerald-600"
              />

              <Label
                htmlFor="terms"
                className="cursor-pointer text-xs font-normal leading-relaxed text-slate-500"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
                >
                  Terms
                </Link>
                {" & "}
                <Link
                  href="/privacy"
                  className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
                >
                  Privacy Policy
                </Link>
              </Label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={!agreed}
              className="group mt-2 h-12 w-full rounded-full bg-emerald-700 text-sm font-bold text-white shadow-lg shadow-emerald-700/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-emerald-700/30 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Create account
              <ArrowRight className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>

            {/* Divider */}
            <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
              <span className="h-px flex-1 bg-slate-200" />
              or continue with
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Social Login */}
            <div className="mt-1 flex gap-3">
              <Button
                onClick={googleClickHendle}
                type="button"
                variant="outline"
                className={socialBtn}
              >
                <GoogleIcon />
                Google
              </Button>

              <Button
                onClick={githubClickHendle}
                type="button"
                variant="outline"
                className={socialBtn}
              >
                <GithubIcon />
                GitHub
              </Button>
            </div>

            {/* Login Link */}
            <div className="mt-auto pt-7 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-emerald-700 underline underline-offset-4 transition hover:text-emerald-900"
              >
                Log in
              </Link>
            </div>
          </form>

          {/* Footer */}
          <footer className="mt-6 border-t border-slate-100 pt-4 text-center text-[11px] text-slate-400">
            <span className="inline-flex items-center justify-center gap-1.5">
              <ShieldCheck className="size-3.5 text-emerald-600" />
              Secure signup · Your information is protected
            </span>
          </footer>
        </section>
      </div>
    </main>
  );
}
