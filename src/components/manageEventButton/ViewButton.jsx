import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";

const ViewButton = ({ event }) => {
  return (
    <Button
      asChild
      variant="outline"
       className="h-9 w-full min-w-0 rounded-xl border-blue-200 bg-blue-50 px-2 text-[10px] font-semibold text-blue-600 shadow-sm transition-all duration-200 hover:border-blue-300 hover:bg-blue-100 hover:text-blue-700 active:scale-95 sm:h-10 sm:text-xs"
    >
      <Link
        href={`/detailspage/${event._id}`}
        className="flex w-full items-center justify-center gap-1"
      >
        <Eye className="size-4 shrink-0" />
        <span>View</span>
      </Link>
    </Button>
  );
};

export default ViewButton;
