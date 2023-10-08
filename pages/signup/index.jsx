import React, { useState } from "react";
import Link from "next/link";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { MdOutlineVisibility } from "react-icons/md";
import CryptoJS from "crypto-js";
import { FETCH } from "@/utils/fetch";

function SignUp() {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (e) => {
    setEmailError(false);
    e.preventDefault();
    const hashedPassword = CryptoJS.SHA256(formData.password).toString();
    const user = {
      id: 0,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: hashedPassword,
    };
    try {
      const response = await FETCH("POST",user,`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/signup/`);
      console.log("status",response.status);
     
      const data = await response.json();
      if(response.status != 409){
        setSignedUp(true);
        retur
      }
      if (response.status === 409) {
        console.error("Registration failed:", data.error);
        setEmailError(true);
        return;
      }
       
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  

  return (
    <div className="login-form">
      <div>
        <center> <h1>SignUp</h1></center> 
        <br />
        <form onSubmit={handleSubmit}>
          <div className="input">
            <input
              type="text"
              name="firstName"
              placeholder="first Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input">
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          {emailError && <div className="error-message">Email already used</div>}
          </div>
          <div className="input">
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="password-toggle" onClick={togglePasswordVisibility}>
              {isPasswordVisible ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
            </span>
          </div>
          <br />
          <div className="input">
            <button type="submit">SignUp</button>
          </div>
          <br />
          {
          signedUp && !emailError && (
            <center> <div className="no-account">
                Account created.{" "} 
                <Link href={"/login"}>Login</Link>
              </div></center> 
          )
          }
        </form>
      </div>
    </div>
  );
}

export default SignUp;
