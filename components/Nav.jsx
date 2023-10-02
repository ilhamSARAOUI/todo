import React from 'react'
import Link from 'next/link'
const Nav = () => {
  return (
    <div className="navbar">
      <nav>
        <ul>
          <li>
            {" "}
            <strong>todo.</strong>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/signup">Sign Up</Link>
          </li>
          <li>
            <Link href="/about">About Us</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li></li> <li></li>{" "}
        </ul>
      </nav>
    </div>
  )
}

export default Nav