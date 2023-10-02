import { useState, useEffect } from "react";
import TaskCard from "../../components/taskCard";
import { MdTaskAlt } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import TaskDialog from "../../components/taskDialog";
import SideNavBar from "@/components/sideNavBar";
import { useCategories } from "@/components/categoriesProvider";
import { useSession } from "next-auth/react";
import Link from 'next/link'
const states = ["to-do", "Pending", "Cancelled", "Done"];

function Tasks() {
  const session = useSession();
  const { categories } = useCategories();
  const [tasks, setTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  var user_id = -1;
  const isUserLoggedIn = session.data != null;
  if (session.data != null) {
    user_id = session.data?.token.sub ?? -1;
  }

  const togglepopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/task/getall/${user_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const nameMatches = task.name
      .toLowerCase()
      .startsWith(searchQuery.toLowerCase());

    const categoryMatches =
      selectedCategory === "" ||
      task.category_id === parseInt(selectedCategory);

    const stateMatches = selectedState === "" || task.state === selectedState;

    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split("T")[0];
    if (activeTab === "today") {
      const isToday = task.dueDate === formattedCurrentDate;
      return isToday && nameMatches && categoryMatches && stateMatches;
    }
    if (activeTab === "this-week") {
      const firstDayOfWeek = new Date(currentDate);
      firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const lastDayOfWeek = new Date(currentDate);
      lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

      const isWithinThisWeek =
        task.dueDate >= firstDayOfWeek.toISOString().split("T")[0] &&
        task.dueDate <= lastDayOfWeek.toISOString().split("T")[0];

      return isWithinThisWeek && nameMatches && categoryMatches && stateMatches;
    }
    if (activeTab === "this-month") {
      const isWithinThisMonth =
        parseInt(task.dueDate.split("-")[1]) ===
        parseInt(currentDate.getMonth()) + 1;
      return (
        isWithinThisMonth && nameMatches && categoryMatches && stateMatches
      );
    }
    return nameMatches && categoryMatches && stateMatches;
  });

  return (
    <div>
      {
        <div className="App">
          <SideNavBar />
          <div className="content">
            <div className="header">
              <h1>
                {" "}
                <MdTaskAlt className="icon" />{" "}
              </h1>
              <div>
                <h1> My Tasks</h1>
                <p>View and edit your tasks</p>
              </div>
              <div></div>
              {isUserLoggedIn ? (
                <img src="../../assets/images/pic.jpg" alt="" />
              ) : (
                <div></div>
              )}
            </div>

            {isUserLoggedIn ? (
              <>
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

                {/* Tabs */}
                <div className="tabs">
                  <button
                    className={
                      activeTab === "all"
                        ? "activeTabButton tabButtons"
                        : "tabButtons"
                    }
                    onClick={() => setActiveTab("all")}
                  >
                    All
                    {activeTab === "all" ? <div></div> : ""}
                  </button>

                  <button
                    className={
                      activeTab === "today"
                        ? "activeTabButton tabButtons"
                        : "tabButtons"
                    }
                    onClick={() => setActiveTab("today")}
                  >
                    Today
                    {activeTab === "today" ? <div></div> : ""}
                  </button>
                  <button
                    className={
                      activeTab === "this-week"
                        ? "activeTabButton tabButtons"
                        : "tabButtons"
                    }
                    onClick={() => setActiveTab("this-week")}
                  >
                    This Week
                    {activeTab === "this-week" ? <div></div> : ""}
                  </button>
                  <button
                    className={
                      activeTab === "this-month"
                        ? "activeTabButton tabButtons"
                        : "tabButtons"
                    }
                    onClick={() => setActiveTab("this-month")}
                  >
                    This Month
                    {activeTab === "this-month" ? <div></div> : ""}
                  </button>
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
              </>
            ) : (
              <div> 
                <br /><br /><br/> <br /> <br /> <br /><br />
                <center>Please    <Link href="/login">Login</Link> to access your tasks.</center>
              </div>
            )}
          </div>
        </div>
      }
    </div>
  );
}

export default Tasks;
