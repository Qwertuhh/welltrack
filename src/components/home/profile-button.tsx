'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserPen } from "lucide-react";

function ProfileButton() {
  return (
    <Button asChild>
      <Link href="/profile" className="flex items-center gap-2">
        <UserPen className="h-4 w-4" />
        <span>Open Profile</span>
      </Link>
    </Button>
  );
}

export default ProfileButton;
