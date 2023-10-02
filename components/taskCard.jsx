"use client";

import { BiEditAlt } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useState } from "react";
import TaskDialog from "./TaskDialog";
import DeletetaskDialog from "./DeletetaskDialog";
import { useCategories } from "./categoriesProvider";
import StatesDialog from "./statesDialog";

function TaskCard({ task ,setTasks }) {
  const { categories } = useCategories();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteFromOpen, setisDeleteFromOpen] = useState(false);
  const [isStatesDialogOpen, setisStatesDialogOpen] = useState(false);
  const togglepopup = () => {
    setIsOpen(!isOpen);
  };
  const toggleStatespopup = () => {
    setisStatesDialogOpen(!isStatesDialogOpen);
  };
  const toggleDeletePopUp = () => {
    setisDeleteFromOpen(!isDeleteFromOpen);
  };
  const category = categories.find(
    (category) => category.id === task.category_id
  );
  return (
    <div className="task-card">
      <div>
        <h3 className={` ${task.state.toLowerCase()}`}>{task.name}</h3>
        <span
          className={`tag ${task.state.toLowerCase()}`}
          onClick={toggleStatespopup}
        >
          {task.state}
        </span>
      </div>
      <p>Due Date: {task.dueDate}</p>
      <p>Time: {task.time}</p>
      <div>
        <p>Category: {category?.name}</p>

        <BiEditAlt className="icon" onClick={togglepopup} />

        <MdOutlineDeleteOutline className="icon" onClick={toggleDeletePopUp} />
      </div>{" "}
      {isOpen && <TaskDialog task={task} togglepopup={togglepopup} setTasks={setTasks}/>}
      {isDeleteFromOpen && (
        <DeletetaskDialog task={task} togglepopup={toggleDeletePopUp} setTasks={setTasks} />
      )}
      {isStatesDialogOpen && (
        <StatesDialog task={task} togglepopup={toggleStatespopup} setTasks={setTasks} />
      )}
    </div>
  );
}

export default TaskCard;
