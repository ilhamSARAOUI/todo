"use client";

import React from "react";
import Link from "next/link";
import Nav from "../components/Nav";


function Home() { 
  return (
    <div className="home-page">
      <div className="main">
      <Nav />
        <div className="left-section">
          <h1 className="title">Streamline Your Productivity with </h1>
          <h1 className="title-part2">todo. Task Manager</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
            debitis. Voluptatem, eos, dolorum ipsa facilis sed odio nemo
            doloremque cum con
          </p>
          <Link href="/login">
            <button className="get-started-button">Get Started</button>
          </Link>
        </div>
        <div className="image">
          <img src="/assets/images/illustration.jpg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Home;
