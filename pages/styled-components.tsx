/* implement styled components on the orig to-do list with shenanigans
   stretch goal: pull up mui and cross-reference with this, see how it
   looks under the hood (look at source files, etc.), specifically for the 
   theme provider */

/*  For Keller:
    OK, I concede that styled-components can be less gross than other options
    but still maintain that all css is gross.

    Well, at least I learned a bit about themes and theme providers today,
    which is more than I could have said yesterday. :-) Apparently, wrapping
    the code in a theme allows components to use those themes, regardless of
    how deeply nested they are. It appears to be a similar process in both styled-
    components and mui.
*/

import type { NextPage } from 'next';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

interface Task {
  id: string;
  desc: string;
  isDone: boolean;
}

const PageTitle = styled.h1`
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.25rem;
`;
const UserControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;

  input {
    border-width: 0;
    box-shadow: 10px 5px 5px slategray;
    padding: 0.25rem;
  }

  button {
    border-width: 2px;
    border-radius: 0.5rem;
    padding: 0.25rem;
    background-color: rgb(214, 211, 209);
  }
`;
const TaskItem = styled.li<{ isFinished: boolean }>`
  margin: 5px;
  padding: 2px;
  text-align: center;
  background: ${(prop) => (prop.isFinished ? '#ffcccb' : '#90ee90')};
`;

const Card = styled.div`
  padding: 1.5rem;
  color: inherit;
  text-decoration: none;
  border: 2px solid black;
  border-radius: 5px;
  width: 100%;
  max-width: 600px;
  margin: auto;
`;

const Home: NextPage = () => {
  const [task, setTask] = useState<Task>({
    id: '',
    desc: '',
    isDone: false,
  });

  const [taskList, setTaskList] = useState<Task[]>([]);

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    e.currentTarget.value &&
      setTask({
        id: '',
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
      id: '',
      desc: '',
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
    return (
      <TaskItem isFinished={isDone} onClick={() => handleToggle(id)} key={id}>
        {desc}
      </TaskItem>
    );
  });

  return (
    <Card>
      <PageTitle>To Do List App</PageTitle>
      <UserControls>
        <input
          type='text'
          className='task-input'
          placeholder='Enter task'
          onChange={handleChange}
          value={task.desc}
        />
        <button onClick={handleAdd}>Add New Task</button>
        <button onClick={handleDelete}>Delete Completed</button>
      </UserControls>
      <ul>{tasks}</ul>
    </Card>
  );
};

export default Home;
