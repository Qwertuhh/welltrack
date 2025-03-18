import { DashboardButton } from "../components/dashboard-button";
import Header from "@/components/header";
function Page() {
  return (
    <>
    <Header />

    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-8 text-3xl font-bold">Welcome to the Application</h1>
      <p className="mb-8 text-center text-muted-foreground">
        Click the button below to navigate to the dashboard with sidebar
      </p>

      {/* This button will navigate to the diary page */}
      <DashboardButton />
    </div>
    </>
  );
}

export default Page;