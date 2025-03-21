export type statusTypes = "Completed" | "Priority" | "Pending";

export type taskTypes = {
  id?: number;
  title: string;
  description: string;
  completed: statusTypes;
  createdAt: string;
};

export type AddTaskTypes = {
  isOpen: boolean ;
  onClose: () => void;
};
