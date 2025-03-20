import Header from "@/components/header";
import TaskTracker from "@/components/task/task-marker";

function TaskPage() {
  return (
    <>
      <Header message="To get tasks" route="Tasks" />
      <div className="h-screen">
        <TaskTracker />
      </div>
    </>
  );
}

export default TaskPage;
