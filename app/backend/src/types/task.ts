interface Task {
  created_at: string;
  id: string;
  status: TaskStatus;
  task_title: string;
}
type TaskStatus = "COMPLETED" | "INPROG" | "TODO";

export type { Task, TaskStatus };
