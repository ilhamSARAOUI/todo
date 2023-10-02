"use client";

import { BsPerson } from "react-icons/bs";

import { useState, useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import SideNavBar from "@/components/sideNavBar";
import { useSession } from "next-auth/react";
import Link from "next/link";

function Profile() {
  const session = useSession();
  console.log("profile", session);
  var user_id = -1;
  const isUserLoggedIn = session.data != null;
  if (session.data != null) {
    user_id = session.data?.token.sub ?? -1;
  }
  const [editable, setEditable] = useState(false);
  const [user, setUser] = useState(null);

  const [editedUser, setEditedUser] = useState(user);

  const toggleEditing = () => {
    setEditable(!editable);
  };

  const saveChanges = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:3000/api/user/update/${user.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUser),
      }
    );
    setEditable(false);
    setUser(editedUser);
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/get/${user_id}`
        );
        // const response = await fetch(`http://localhost:3000/api/user/get/60`);
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        // console.log(data);
        setUser(data);
        setEditedUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    fetchUser();
  }, []);
  const handleFieldChange = (e, fieldName) => {
    const updatedUser = { ...editedUser };
    updatedUser[fieldName] = e.target.value;
    setEditedUser(updatedUser);
  };

  return (
    <div className="App">
      <SideNavBar />
      <div className="profilContent">
        <div className="header">
          <h1>
            <BsPerson className="icon" /> My Profile
          </h1>
        </div>
       { isUserLoggedIn? ( <>
        <div className="userInformation">
          <img src="../../assets/images/pic.jpg" alt="" />

          <div>
            {editable ? (
              <>
                {" "}
                <p className="inputName">first Name</p>
                <input
                  type="text"
                  value={editedUser.firstName}
                  onChange={(e) => handleFieldChange(e, "firstName")}
                />
              </>
            ) : (
              <h2>{user?.firstName} </h2>
            )}
            {editable ? (
              <>
                <button className="closeButton" onClick={toggleEditing}>
                  x
                </button>{" "}
                <p className="inputName">Last Name</p>
                <input
                  type="text"
                  value={editedUser.lastName}
                  onChange={(e) => handleFieldChange(e, "lastName")}
                />
              </>
            ) : (
              <h4>{user?.lastName}</h4>
            )}

            <p className="inputName">Phone number</p>
            <input
              type="text"
              value={editable ? editedUser.phoneNumber : user?.phoneNumber}
              onChange={(e) => handleFieldChange(e, "phoneNumber")}
              disabled={!editable}
            />
            <p className="inputName">Email</p>
            <input
              type="text"
              value={editable ? editedUser.email : user?.email}
              onChange={(e) => handleFieldChange(e, "email")}
              disabled={!editable}
            />
          </div>
        </div>
        {editable ? (
          <button className="fixedButton" onClick={saveChanges}>
            <BiEditAlt className="editButton" />
          </button>
        ) : (
          <button className="fixedButton" onClick={toggleEditing}>
            <BiEditAlt className="editButton" />
          </button>
        )} </>)
        : (
          <div>
            <br /><br /><br/> <br /> <br /> <br /><br /><br /> <br /><br />
                <center>Please    <Link href="/login">Login</Link> to access your profile.</center>
          </div>
       
        )}
      </div>
     
    </div>
  );
}

export default Profile;
