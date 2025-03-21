'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NotebookPen } from "lucide-react";

function DashboardButton() {
  return (
    <Button asChild>
      <Link href="/dashboard/diary" className="flex items-center gap-2">
        <NotebookPen className="h-4 w-4" />
        <span>Open Diary</span>
      </Link>
    </Button>
  );
}

export default DashboardButton;