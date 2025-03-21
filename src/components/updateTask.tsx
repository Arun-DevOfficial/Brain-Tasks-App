import React, { useEffect, useState } from "react";
import { statusTypes } from "../types/taskTypes";
import useTasks from "../hook/useTasks";
import { useNavigate, useParams } from "react-router";

export default function UpdateTask() {
  const [tasks, setTasks] = useState({
    title: "",
    description: "",
    completed: "",
  });
  const navigate = useNavigate();
  const { updateTask, getTaskById } = useTasks(); // custom hook for api
  const { id } = useParams();

  // Get Tasks API
  useEffect(() => {
    const fetchTask = async () => {
      const task = await getTaskById(Number(id));
      setTasks(task);
    };
    fetchTask();
  }, [id]);

  const handleOnChangeEvent = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setTasks((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const newTask = {
      title: tasks.title,
      description: tasks.description,
      completed: tasks?.completed as statusTypes,
      createdAt: new Date().toISOString(),
    };

    await updateTask(id, newTask);
    navigate("/");
    // Reset form and close modal
    setTasks({
      title: "",
      description: "",
      completed: "",
    });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm bg-opacity-50 flex justify-center items-center p-4 z-50">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-extrabold text-emerald-500">
              Update Task
            </h2>
            <button
              onClick={() => navigate(-1)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-600">
            Fill in the details to create a new task
          </p>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-6 rounded-md shadow-sm">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Task Title
                </label>
                <div className="mt-1">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={tasks.title}
                    onChange={handleOnChangeEvent}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter task title"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={tasks.description}
                    onChange={handleOnChangeEvent}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Describe the task..."
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <div className="relative">
                <select
                  name="completed"
                  className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 shadow-sm"
                  onChange={handleOnChangeEvent}
                >
                  <option value="" disabled>
                    Select task status
                  </option>
                  <option value="Completed">Completed</option>
                  <option value="Priority">Priority</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-sm">
                  <span className="text-gray-500">
                    Task will be created with current date
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
