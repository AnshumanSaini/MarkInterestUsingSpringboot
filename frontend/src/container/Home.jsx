import React, { useState, useEffect, useRef } from "react";
import SideBar from "../components/SideBar";
import UserProfile from "../components/UserProfile";
import logo from "../assets/logo.png";
import Pins from "./Pins";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Route, Routes } from "react-router-dom";

const Home = () => {
  const [userData, setuserData] = useState({});
  const [ToggleSidebar, setToggleSidebar] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let currUser = localStorage.getItem("token");
    // console.log(currUser);

    //Making API request to fetch user using token
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/api/auth/getuser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "token": currUser,
        },
      });
      // console.log(response);
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not in JSON format");
      }
      const json = await response.json();
      console.log(json);
      setuserData(json);
    };
    fetchData();
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial ">
        <SideBar
          userData={userData && userData}
        ></SideBar>
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          ></HiMenu>
          <a href="/">
            <img src={logo} alt="logo" className="w-28" />
          </a>
          <a href="/">
            <img src={userData.image} alt="logo" className="w-28" />
          </a>
        </div>
        {ToggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in animate-slide-out">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <SideBar
              userData={userData && userData}
              closeToggle={setToggleSidebar}
            ></SideBar>
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scrol" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile userData={userData} />} />
          <Route path="/*" element={<Pins userData={userData} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
