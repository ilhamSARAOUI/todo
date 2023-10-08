"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineHome } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import { CiLogout, CiLogin } from "react-icons/ci";
import { useSession, signOut } from "next-auth/react";

const SideNavBar = () => {
  const router = useRouter();
  const session = useSession();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <nav className="sidebar">
        <ul>
          <p>todo.</p>
          <li className={router.pathname == "/tasks" ? "active" : " "}>
            <Link href="/tasks">
              <AiOutlineHome className="icon" /> Home
            </Link>
          </li>
          <li className={router.pathname == "/categories" ? "active" : " "}>
            <Link href="/categories">
              <MdOutlineCategory className="icon" /> Categories
            </Link>
          </li>
          <li className={router.pathname == "/profile" ? "active" : ""}>
            <Link href="/profile">
              <BsPerson className="icon" /> Profile
            </Link>
          </li>
          {session.data!=null ? (
            <li onClick={handleLogout}>
              <CiLogout className="icon" /> Logout
            </li>
          ) : (
            <li>
              <Link href="/login">
                <CiLogin className="icon" /> login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default SideNavBar;
