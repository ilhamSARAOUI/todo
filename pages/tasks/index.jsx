import { useState, useEffect } from "react";
import TaskCard from "../../components/taskCard";
import { MdTaskAlt } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import TaskDialog from "../../components/taskDialog";
import SideNavBar from "@/components/sideNavBar";
import { useCategories } from "@/components/categoriesProvider";
import { useSession } from "next-auth/react";
import moment from "moment";
import Link from "next/link";
import { FETCH } from "@/utils/fetch";

const states = ["to-do", "Pending", "Cancelled", "Done"];

const tabs = ["all", "today", "this week", "this month"];

function Tasks() {
  const session = useSession();
  const { categories } = useCategories();
  const [tasks, setTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  let user_id = session.data?.token.sub ?? -1;
  const isUserLoggedIn = user_id != -1;

  const togglepopup = () => {
    setIsOpen(!isOpen);
  };

  async function fetchTasks() {
    try {
      const response = await FETCH("",null,`${process.env.NEXT_PUBLIC_BASE_URL}/api/task/getall/${user_id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const nameMatches = task.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const categoryMatches =
      selectedCategory === "" ||
      parseInt(task.category_id) === parseInt(selectedCategory);
    const stateMatches = selectedState === "" || task.state === selectedState;

    if (!nameMatches) return false;
    if (!categoryMatches) return false;
    if (!stateMatches) return false;

    if (activeTab === "today") return moment().isSame(task.dueDate, "day");
    if (activeTab === "this month")
      return moment().isSame(task.dueDate, "month");
    if (activeTab === "this week") return moment().isSame(task.dueDate, "week");
   
    return true;
  });

  if (!isUserLoggedIn) {
    return (
      <div className="App">
        <SideNavBar />
        <div className="content">
          <div>
            <br />
            <br />
            <br /> <br /> <br /> <br />
            <br />
            <center>
              Please <Link href="/login">Login</Link> to access your tasks.
            </center>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="App">
      <SideNavBar />
      <div className="content">
      <div className="header" >
          <h1>
            {" "}
            <MdTaskAlt className="icon" />{" "}
          </h1>
          <div>
            <h1> My Tasks</h1>
            <p>View and edit tasks</p>
          </div>
          <div></div>
          {isUserLoggedIn ? (
            <img src="../../assets/images/pic.jpg" alt="" />
          ) : (
            <div></div>
          )}
        </div>
        <div className="filter">
          <div className="searchContainer">
            <input
              type="text"
              placeholder="Search tasks"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <BiSearchAlt className="searchIcon" />
          </div>
          <div>
            <select
              id="category"
              name="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              id="state"
              name="state"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              required
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              className={
                activeTab === tab ? "active tabButton" : "tabButton"
              }
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {}
            </button>
          ))}
        </div>

        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <center>
              <p>No tasks </p>
            </center>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} setTasks={setTasks} />
            ))
          )}
        </div>
        <button className="fixedButton" onClick={togglepopup}>
          +
        </button>

        {isOpen && (
          <TaskDialog
            task={null}
            togglepopup={togglepopup}
            setTasks={setTasks}
          />
        )}
      </div>
    </div>
  );
}
 

export default Tasks;