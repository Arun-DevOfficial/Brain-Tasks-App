import { Outlet, useNavigate } from "react-router";
import { taskTypes } from "../types/taskTypes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../store/slices/toggle";
import { RootState } from "../store/store";
import useTasks from "../hook/useTasks";

// Define filter types for better type safety
type FilterType = "All" | "Pending" | "Completed" | "Priority";

export default function TaskList() {
  const { getTasks, deleteTask } = useTasks();
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTaskMenu, setActiveTaskMenu] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getTasks().then((data) => dispatch(setTasks(data)));
  }, []);

  // Handle filter change
  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  // Function to toggle menu for a specific task
  const toggleTaskMenu = (taskId: string) => {
    if (activeTaskMenu === taskId) {
      // If this task's menu is already open, close it
      setActiveTaskMenu(null);
    } else {
      // Otherwise, open this task's menu and close others
      setActiveTaskMenu(taskId);
    }
  };

  // Filter tasks based on search term and active filter
  const filteredTasks = tasks.filter((task: taskTypes) => {
    // First apply search filter
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Then apply category filter
    if (!matchesSearch) return false;

    switch (activeFilter) {
      case "Pending":
        return task.completed === "Pending";
      case "Completed":
        return task.completed === "Completed";
      case "Priority":
        return task.completed === "Priority";
      case "All":
      default:
        return true;
    }
  });

  return (
    <>
      <Outlet />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <header className="mb-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent">
                  Brain Tasks
                </h1>
                <p className="text-gray-600 mt-2 text-lg">
                  Organize your thoughts, simplify your life
                </p>
              </div>

              {/* Fixed Desktop Add Task Button */}
              <button
                type="button"
                onClick={() => navigate("/createTask")}
                className="bg-emerald-500 hover:bg-emerald-600 transition-colors text-white px-6 py-3 rounded-lg shadow-md shadow-emerald-500/20 items-center gap-2 hidden md:flex"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                Create Task
              </button>
            </div>

            {/* Search Bar */}
            <div className="mt-8 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full lg:max-w-xl bg-white border-0 pl-12 pr-4 py-4 rounded-xl shadow-md focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </header>

          {/* Task Categories */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => handleFilterChange("All")}
              className={`${
                activeFilter === "All"
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              } px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors`}
            >
              All Tasks
            </button>
            <button
              onClick={() => handleFilterChange("Pending")}
              className={`${
                activeFilter === "Pending"
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              } px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors`}
            >
              Pending
            </button>
            <button
              onClick={() => handleFilterChange("Completed")}
              className={`${
                activeFilter === "Completed"
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              } px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors`}
            >
              Completed
            </button>
            <button
              onClick={() => handleFilterChange("Priority")}
              className={`${
                activeFilter === "Priority"
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              } px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors`}
            >
              Priority
            </button>
          </div>

          {/* Task Grid Section - Now using filtered tasks */}
          <section className="mb-20">
            {filteredTasks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTasks.map((task: taskTypes, index) => (
                  <div
                    key={task.id || index}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h2 className="text-xl font-semibold capitalize text-gray-800">
                        {task.title}
                      </h2>
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTaskMenu(task.id);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-ellipsis-vertical text-gray-400 hover:text-gray-600"
                          >
                            <circle cx={12} cy={12} r={1} />
                            <circle cx={12} cy={5} r={1} />
                            <circle cx={12} cy={19} r={1} />
                          </svg>
                        </button>
                        {activeTaskMenu === task.id && (
                          <div className="absolute right-5 top-5 bg-white border border-gray-300 rounded-lg shadow-md z-10">
                            <div className="py-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/updateTask/${task.id}`);
                                }}
                                className="inline-flex gap-2.5 border-b border-gray-200 items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={24}
                                  height={24}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-pencil size-4"
                                >
                                  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                                  <path d="m15 5 4 4" />
                                </svg>
                                Edit
                              </button>
                              <button
                                name="DeletButton"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteTask(task.id);
                                }}
                                className="inline-flex gap-2.5 items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={24}
                                  height={24}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-trash-2 size-4"
                                >
                                  <path d="M3 6h18" />
                                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                  <line x1={10} x2={10} y1={11} y2={17} />
                                  <line x1={14} x2={14} y1={11} y2={17} />
                                </svg>
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 capitalize mb-4 line-clamp-3">
                      {task.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          task.completed === "Completed"
                            ? "bg-green-50 text-green-700"
                            : task.completed === "Pending"
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-red-400 text-white"
                        }`}
                      >
                        {task.completed}
                      </span>
                      <span className="text-gray-500 text-sm flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 9v7.5"
                          />
                        </svg>
                        {task.createdAt
                          ? new Date(task.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )
                          : "No date"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-16 h-16 text-gray-300 mb-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                  />
                </svg>
                <p className="text-gray-500 text-xl font-medium">
                  {searchTerm
                    ? "No matching tasks found"
                    : activeFilter !== "All"
                    ? `No ${activeFilter} tasks found`
                    : "No tasks found!"}
                </p>
                <p className="text-gray-400 mt-1">
                  {searchTerm
                    ? "Try a different search term"
                    : activeFilter !== "All"
                    ? `Try a different filter or create a ${activeFilter.toLowerCase()} task`
                    : "Create your first task to get started"}
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Mobile Add Task Button (Fixed at Bottom) */}
        <div className="md:hidden fixed bottom-6 right-6">
          <button
            type="button"
            onClick={() => navigate("/createTask")}
            className="bg-emerald-500 hover:bg-emerald-600 transition-colors text-white p-4 rounded-full shadow-lg shadow-emerald-500/30"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </main>
    </>
  );
}
