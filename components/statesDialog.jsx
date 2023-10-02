import React, { useState } from "react";
import { useSession } from "next-auth/react";

const states = ["to-do", "Pending", "Cancelled", "Done"];

function StatesDialog({ task, togglepopup ,setTasks}) {
  const session = useSession();
  console.log("session dialog",session);
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

    const response = await fetch(
      `http://localhost:3000/api/task/update/${task.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskk),
      }
    );
    const tasks = await fetch(`http://localhost:3000/api/task/getall/${user_id}`);
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
