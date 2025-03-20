"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image as ImageIcon, Mail, TypeOutline, UserPen } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import DashboardButton from "@/components/home/dashboard-button";
import { setToLocalStorage } from "@/lib/store";

// Properly define component props
interface ProfilePageProps {
  className?: string;
  // Add any other props your component needs
}

export default function ProfilePage({ className }: ProfilePageProps) {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = document.getElementById("email") as HTMLInputElement;
    const name = document.getElementById("name") as HTMLInputElement;
    const avatar = document.getElementById("avatar") as HTMLInputElement;

    setToLocalStorage("user", {
      email: email.value,
      name: name.value,
      avatar: avatar.value || "https://github.com/shadcn.png",
    });

    toast.success("Profile updated successfully!", {
      icon: "🎉",
      style: {
        borderRadius: "4px",
        background: "#333",
        color: "#fff",
      },
    });

    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <>
      <Toaster />
      <div
        className={cn(
          "flex flex-col gap-6 sm:w-1/2 w-[80%] max-w-[90%] min-w-1/2 h-min absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          className
        )}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              <UserPen className="inline-block mr-2" />
              Profile
            </CardTitle>
            <CardDescription>Enter your profile details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">
                    <Mail className="inline-block mr-2 w-4 h-4 rotate-12" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter Your Email"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="name">
                      <TypeOutline className="inline-block mr-2 w-4 h-4 rotate-12" />
                      Name
                    </Label>
                  </div>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter Your Name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="avatar">
                      <ImageIcon className="inline-block mr-2 w-4 h-4 rotate-12" />
                      Image
                    </Label>
                  </div>
                  <Input
                    id="avatar"
                    type="text"
                    placeholder="Enter Your Avatar URL"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter your avatar URL
                  </p>
                </div>
                <Button type="submit" className="w-full cursor-pointer">
                  Submit
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                It will update your profile details
              </div>
            </form>
          </CardContent>
        </Card>
        <DashboardButton />
      </div>
    </>
  );
}
