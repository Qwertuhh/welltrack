import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NotebookPen } from "lucide-react";

export function DashboardButton() {
  return (
    <Button asChild>
      <Link href="/diary" className="flex items-center gap-2">
        <NotebookPen className="h-4 w-4" />
        <span>Open Diary</span>
      </Link>
    </Button>
  );
}
