"use client";

import React, { useState, useEffect } from "react";
import { useCategories } from "./categoriesProvider";
import { useSession } from "next-auth/react";

export default function TaskDialog({ task, togglepopup, setTasks }) {
  const session = useSession();
  console.log("session dialog",session);
  const user_id = session.data.token.sub ?? -1 ;
  const { categories } = useCategories();
  const [formData, setFormData] = useState({
    id: task ? task.id : 0,
    name: task ? task.name : "",
    dueDate: task ? task.dueDate : "",
    time: task ? task.time : "",
    category_id: task ? task.category_id : categories[0]?.id || 1,
    state: task ? task.state : "to-do",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        id: task.id,
        name: task.name,
        dueDate: task.dueDate,
        time: task.time,
        category_id: task.category_id,
        state: task.state,
      });
    }
  }, [task]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const category_id = e.target.value;
    setFormData({ ...formData, category_id });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const taskData = {
      name: formData.name,
      user_id: user_id, // Change this to the appropriate user ID.
      dueDate: formData.dueDate,
      time: formData.time,
      category_id: formData.category_id,
      state: "to-do",
    };

    const response = await fetch("http://localhost:3000/api/task/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (response.ok) {
      const tasksResponse = await fetch(`http://localhost:3000/api/task/getall/${user_id}`);
      const data = await tasksResponse.json();
      setTasks(data);
      console.log("Task added successfully", formData);
      togglepopup();
    } else {
      console.error("Failed to add task");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = {
      name: formData.name,
      user_id: user_id, 
      dueDate: formData.dueDate,
      time: formData.time,
      category_id: formData.category_id,
      state: "to-do",
    };

    const response = await fetch(`http://localhost:3000/api/task/update/${formData.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (response.ok) {
      const tasksResponse = await fetch(`http://localhost:3000/api/task/getall/${user_id}`);
      const data = await tasksResponse.json();
      setTasks(data);
      console.log("Task updated successfully", formData);
      togglepopup();
    } else {
      console.error("Failed to update task");
    }
  };

  return (
    <div className="task-form">
      <div>
        <h2>{task ? "Edit Task" : "Add Task"}</h2>
        <button className="closeButton" onClick={togglepopup}>
          x
        </button>
        <br />
        <form>
          <div className="form-group">
           
            <input
            placeholder="Name"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category_id"
              value={formData.category_id}
              onChange={handleCategoryChange}
              required
            >
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button
            className="primary-button"
            type="submit"
            onClick={task ? handleSubmit : handleAddSubmit}
          >
            {"Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
