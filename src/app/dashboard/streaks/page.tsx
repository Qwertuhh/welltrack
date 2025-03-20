'use client';
import StreakCard from "@/components/streak/streak-card";
import Header from "@/components/header";

function StreaksPage() {
    return (
        <div>
            <Header message="To get Highlights" route="Streaks" />
            <StreakCard />
        </div>
    )
}

export default StreaksPage;