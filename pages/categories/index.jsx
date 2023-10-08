"use client";

import { useState } from "react";
import { MdOutlineCategory } from "react-icons/md";
import CategoryCard from "../../components/categoryCard";
import CategoryForm from "../../components/categoryDialog";
import SideNavBar from "@/components/sideNavBar";
import { useCategories } from "@/components/categoriesProvider";
import { useSession } from "next-auth/react";

function Categories() {
  const session = useSession();
  const isUserLoggedIn = session.data != null;
  const { categories, setCategories } = useCategories();
  const [isOpen, setIsOpen] = useState(false);
  const togglepopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="App">
      <SideNavBar />

      <div className="content">
        <div className="header" >
          <h1>
            {" "}
            <MdOutlineCategory className="icon" />{" "}
          </h1>
          <div>
            <h1> Categories</h1>
            <p>View and add the task's categories</p>
          </div>
          <div></div>
          {isUserLoggedIn ? (
            <img src="../../assets/images/pic.jpg" alt="" />
          ) : (
            <div></div>
          )}
        </div>

        <br />
        <br />

        {/* category List */}
        <div className="categories-list">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
        {isUserLoggedIn ? 
          <button className="fixedButton" onClick={togglepopup}>
            +
          </button>
         : 
          <div></div>
        }
        {isOpen && (
          <CategoryForm
            togglepopup={togglepopup}
            setCategories={setCategories}
          />
        )}
      </div>
    </div>
  );
}


export const ConditionalComponent = (condition, component1, component2) => {
  if(condition) return component1; 
  return component2;

}


export default Categories;
