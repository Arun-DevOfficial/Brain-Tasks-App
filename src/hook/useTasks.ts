import { taskTypes } from "../types/taskTypes";
import axios from "axios";

export default function useTasks() {
  //Get ALl taks
  const getTasks = async (): Promise<taskTypes[]> => {
    const response = await axios.get<taskTypes[]>(
      "https://67da0a9e35c87309f52ac061.mockapi.io/api/v1/tasks"
    );
    return response.data; // ✅ Extracting `.data` properly
  };
  //Create a new task
  const createTask = async (task: taskTypes) => {
    const response = await axios.post<taskTypes>(
      "https://67da0a9e35c87309f52ac061.mockapi.io/api/v1/tasks",
      task
    );
    return response.data;
  };

  const getTaskById = async (id: number) => {
    const response = await axios.get<taskTypes>(
      `https://67da0a9e35c87309f52ac061.mockapi.io/api/v1/tasks/${id}`
    );
    return response.data;
  };
  const updateTask = async (id: string | undefined, task: taskTypes) => {
    const response = await axios.put<taskTypes>(
      `https://67da0a9e35c87309f52ac061.mockapi.io/api/v1/tasks/${id}`,
      task
    );
    return response.data;
  };

  const deleteTask = async (id: number | undefined) => {
    const response = await axios.delete<taskTypes>(
      `https://67da0a9e35c87309f52ac061.mockapi.io/api/v1/tasks/${id}`
    );
    return response.data;
  };

  return {
    getTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
  };
}
