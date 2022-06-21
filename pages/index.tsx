import type { NextPage } from 'next';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Home: NextPage = () => {
  interface Task {
    id: string;
    desc: string;
    isDone: boolean;
  }

  const [task, setTask] = useState<Task>({
    id: uuidv4(),
    desc: '',
    isDone: false,
  });

  const [taskList, setTaskList] = useState([
    {
      id: '1',
      desc: 'Test Task 1',
      isDone: false,
    },
    {
      id: '2',
      desc: 'Test Task 2',
      isDone: true,
    },
    {
      id: '3',
      desc: 'Test Task 3',
      isDone: false,
    },
  ]);

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    e.currentTarget.value &&
      setTask({
        id: '001',
        desc: e.currentTarget.value,
        isDone: false,
      });
  }

  function handleAdd() {
    const newTask: Task = {
      id: task.id,
      desc: task.desc,
      isDone: task.isDone,
    };
  }

  const taskClick = (id: string) => {
    const newTasks = [...taskList];
    newTasks.map((task) => {
      if (task.id === id) {
        setTask({
          ...task,
          isDone: !task.isDone,
        });
      }
    });
  };

  const tasks = taskList.map(({ id, desc, isDone }) => {
    const itemClass = isDone
      ? 'bg-red-300 m-5 p-2 text-center'
      : 'bg-green-300 m-5 p-2 text-center';
    return (
      <li key={id} className={itemClass}>
        {desc}: {isDone.toString()}
      </li>
    );
  });

  return (
    <div className='Main max-w-md m-auto'>
      <h1 className='text-2xl text-center'>To Do List Application</h1>
      <input type='text' placeholder='Add a task' onChange={handleChange} />
      <button>Add</button>
      <ul>{tasks}</ul>
    </div>
  );
};
export default Home;
