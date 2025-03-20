"use client";
import ProfileButton from "@/components/home/profile-button";
import DashboardButton from "../components/home/dashboard-button";
import Spline from "@splinetool/react-spline";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

function Page() {
  return (
    <>
      <div className="flex flex-col items-left absolute top-10 left-10 justify-between h-[90%]">
        <div className=" p-2 rounded-lg gap-1">
          <h2 className=" text-stroke text-[6rem] font-bold text-blue-50 font-mono text-stroke ">
            WeelTrack
          </h2>
          <p className="text-foreground font-light w-2xs text-sm">
            WellTrack helps users record daily entries, track habits, and
            monitor their mood in a seamless and efficient way. AI Integration
            plays a central role in enhancing the user experience and optimizing
            task management within the app.
          </p>
          <p className="text-foreground font-light w-2xs text-sm border my-2 rounded p-1">
            Its a Project developed for a hackathon pitch.{" "}
          </p>
          <Button
            variant="outline"
            className="my-2"
            onClick={() => {
              window.open("https://github.com/qwertuhh/WellTrack", "_blank");
            }}
          >
            <Github className="inline" />
            Code
          </Button>
        </div>

        <div className="flex flex-row gap-1 items-left">
          <DashboardButton />
          <ProfileButton />
        </div>
      </div>
      <main className="w-screen h-screen">
        <Spline
          scene="https://prod.spline.design/FTquJmB8QDKYN0G2/scene.splinecode"
          onLoad={(spline) => {
            const scene = spline;
            scene.setZoom(0.8);
          }}
        />
      </main>
    </>
  );
}

export default Page;
