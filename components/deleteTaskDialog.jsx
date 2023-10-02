"use client";
import React from "react";
import { useSession } from "next-auth/react";

function DeletetaskDialog({ task, togglepopup, setTasks }) {
  const session = useSession();
  console.log("session dialog",session);
  const user_id = session.data.token.sub ?? -1 ;
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const response = await fetch(`http://localhost:3000/api/task/delete/${task.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    const tasks = await fetch(`http://localhost:3000/api/task/getall/${user_id}`);
    const data = await tasks.json();
    setTasks(data);
    togglepopup();

  };


  return (
    <div className="task-form">
      <div className="deleteForm">
        <h2>{"Delete Task"}</h2>
        <p> Do you really want to delete this task?</p>
        <button className="closeButton" onClick={togglepopup}>
          x
        </button>
        <form onSubmit={handleSubmit}>
          <button
            className="primary-button"
            type="submit"
            onClick={handleSubmit}
          >
            {"Delete"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DeletetaskDialog;
