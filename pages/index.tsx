import type { NextPage } from "next";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
interface Task {
  id: string;
  desc: string;
  isDone: boolean;
}

const Home: NextPage = () => {
  const [task, setTask] = useState<Task>({
    id: "",
    desc: "",
    isDone: false,
  });

  const [taskList, setTaskList] = useState<Task[]>([]);

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    e.currentTarget.value &&
      setTask({
        id: "",
        desc: e.currentTarget.value,
        isDone: false,
      });
  }

  function handleAdd() {
    const newTask: Task = {
      id: uuidv4(),
      desc: task.desc,
      isDone: task.isDone,
    };
    setTaskList([newTask, ...taskList]);
    setTask({
      id: "",
      desc: "",
      isDone: false,
    });
  }

  function handleToggle(id: string) {
    const newTaskList = taskList.map((task) => {
      if (task.id === id) {
        const newTask = {
          ...task,
          isDone: !task.isDone,
        };
        return newTask;
      }
      return task;
    });
    setTaskList(newTaskList);
  }

  function handleDelete() {
    const newTaskList = taskList.filter((task) => !task.isDone);
    setTaskList(newTaskList);
  }

  const tasks = taskList.map(({ id, desc, isDone }) => {
    const itemClass = isDone
      ? "bg-red-300 rounded-lg m-5 p-2 text-center"
      : "bg-green-300 rounded-lg m-5 p-2 text-center";
    return (
      <li onClick={() => handleToggle(id)} key={id} className={itemClass}>
        {desc}: {isDone.toString()}
      </li>
    );
  });

  return (
    <div className="Main max-w-lg m-auto">
      <h1 className="text-2xl font-semibold text-center mb-5">
        To Do List App
      </h1>
      <div className="input-area flex items-center justify-between">
        <input
          type="text"
          className="border-0 rounded-lg border-black shadow-md p-1"
          placeholder="Enter task"
          onChange={handleChange}
          value={task.desc}
        />
        <button
          className="border-2 rounded-lg p-1 bg-stone-300"
          onClick={handleAdd}
        >
          Add new task
        </button>
        <button
          className="border-2 rounded-lg p-1 bg-stone-300"
          onClick={handleDelete}
        >
          Delete Completed
        </button>
      </div>
      <ul>{tasks}</ul>
    </div>
  );
};
export default Home;
