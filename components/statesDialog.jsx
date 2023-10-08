import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { FETCH } from "@/utils/fetch";

const states = ["to-do", "Pending", "Cancelled", "Done"];

function StatesDialog({ task, togglepopup ,setTasks}) {
  const session = useSession();
  const user_id = session.data.token.sub ?? -1 ;
  const [selectedState, setSelectedState] = useState(""); 

  const handleSubmit = async () => {
    const taskk = {
      name: task.name,
      user_id: task.user_id,
      dueDate: task.dueDate,
      time: task.time,
      category_id: task.category_id,
      state: selectedState,
    };

    const response = await FETCH("POST",taskk,`${process.env.NEXT_PUBLIC_BASE_URL}/api/task/update/${task.id}` );
    const tasks = await FETCH("", null,`${process.env.NEXT_PUBLIC_BASE_URL}/api/task/getall/${user_id}`);
    const data = await tasks.json();
    setTasks(data);
    console.log("Task updated successfully");
    togglepopup();
  };

  return (
    <div className="task-form">
      <div className="deleteForm">
        <h2>{"Edit Task state"}</h2>
        {states.map((state) => (
          <span
            key={state}
            className={selectedState === state ? `tag ${state.toLowerCase() }` : "tag"}
            onClick={() => setSelectedState(state)}
          >
            {state}
          </span>
        ))}
        <button className="closeButton" onClick={togglepopup}>
          x
        </button>
        <br />
        <button className="primary-button" onClick={handleSubmit}>
          Update
        </button>
      </div>
    </div>
  );
}

export default StatesDialog;
