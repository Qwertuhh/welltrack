import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
function AssistantPage() {
  return (
    <div className="flex flex-row gap-8 w-full items-center">
      <div className="fixed bottom-2 right-1 w-[75vw] mx-auto flex items-center flex-col">
        <div className="flex flex-row gap-2 w-full">
          <Input type="text" placeholder="Ask me anything" className="flex-1" />
          <Button type="submit" className="flex-none w-[10%]">
            Chat
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Final decision is in our hand only. This is just to counsel you.
        </p>
      </div>

    </div>
  );
}

export default AssistantPage;
