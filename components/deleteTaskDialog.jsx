"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { FETCH } from "@/utils/fetch";

function DeletetaskDialog({ task, togglepopup, setTasks }) {
  const session = useSession();
  const user_id = session.data.token.sub ?? -1 ;
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const response = await FETCH("POST",null,`${process.env.NEXT_PUBLIC_BASE_URL}/api/task/delete/${task.id}`);
    const tasks = await FETCH("",null,`${process.env.NEXT_PUBLIC_BASE_URL}/api/task/getall/${user_id}`);
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
