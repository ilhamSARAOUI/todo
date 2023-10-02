import React from "react";
import { useState } from "react";

function CategoryForm({ togglepopup, setCategories }) {
  const [formData, setFormData] = useState({
    name: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const category = {
      name: formData.name,
    };
    const response = await fetch(`http://localhost:3000/api/categories/add/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
    const data = await response.json();
    setCategories(data);
    console.log(data);
    togglepopup();
  };

  return (
    <div className="task-form">
      <br />
      <br />
      <br />
      <div >
        <h2>{"Add category"}</h2>
        <button className="closeButton" onClick={togglepopup}>
          x
        </button>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <br />
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleInputChange}
              required
            />
          </div>

          <button
            className="primary-button"
            type="submit"
            onClick={handleSubmit}
          >
            {"Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CategoryForm;
