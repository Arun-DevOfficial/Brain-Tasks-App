import { Route, Routes } from "react-router";

import TaskLIst from "./components/TaskList";
import UpdateTask from "./components/updateTask";
import AddTask from "./components/AddTask";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TaskLIst />}>
          <Route path="/createTask" element={<AddTask />} />
          <Route path="/updateTask/:id" element={<UpdateTask />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
