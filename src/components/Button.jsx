import { Button } from "@/components/ui/button";
import { Leaf, Plus } from "lucide-react";
import Link from "next/link";

const ButtonCard = () => {
  return (
    <div className="mt-3 sm:mt-4">
      <Button
        type="button"
        className="h-9 w-full rounded-full bg-emerald-600 px-3 text-[10px] font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow-md sm:h-10 sm:text-sm"
      >
        <Leaf className="mr-1.5 size-3.5 sm:size-4" />
        View Event
      </Button>
    </div>
  );
};

export const HeroButton = () => {
  return (
    <div>
      <Button
        asChild
        className="h-8 min-w-0 flex-1 rounded-full bg-emerald-700 px-2 text-[9px] font-bold text-white shadow-md hover:bg-emerald-800 sm:h-11 sm:flex-none sm:px-5 sm:text-sm"
      >
        <Link
          href="/createEvent"
          className="flex items-center justify-center gap-1 whitespace-nowrap sm:gap-1.5"
        >
          <Plus className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />

          <span className="sm:hidden">ইভেন্ট তৈরি</span>
          <span className="hidden sm:inline">ইভেন্ট তৈরি করুন</span>
        </Link>
      </Button>
    </div>
  );
};

export default ButtonCard;
