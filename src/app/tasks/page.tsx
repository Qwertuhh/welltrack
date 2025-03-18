import Header from "@/components/header";
import TaskTracker from "@/components/task/task-marker";

function TaskPage() {
  return (
    <>
      <Header message="To get tasks" route="Tasks" />
      <TaskTracker />
    </>
  );
}

export default TaskPage;
