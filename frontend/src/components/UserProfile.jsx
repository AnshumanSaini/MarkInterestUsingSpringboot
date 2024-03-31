import React from "react";
import { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const randomImage = "https://source.unsplash.com/random";

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

const UserProfile = ({ userData }) => {
  const [user, setuser] = useState(null)
  const [pins, setpins] = useState(null);
  const [text, settext] = useState("created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();
  
  useEffect(() => {
    console.log("created");
    let currUser = localStorage.getItem("token");
    if(text === 'Created')
    {
      //API to fetch the pins created by user
      const createdPins = async () => {
        const response = await fetch(`http://localhost:8080/api/pin/getcreatedpins/${userId}`, {
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
        // console.log(json);
        setpins(json);
      };
      createdPins();
    }
    else
    {
      //API to fetch the pins saved by user
      const savedPins = async () => {
        const response = await fetch(`http://localhost:8080/api/pin/getsavedpins/${userId}`, {
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
        // console.log(json);
        setpins(json);
      };
      savedPins();
    }

  }, [text, userId])
  

  const logout = () => {
    googleLogout();
    localStorage.clear();
    navigate("/login");
  };
  if (!userData) return <Spinner message="Loading profile..."></Spinner>;
  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src={randomImage}
              alt="randomImage"
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
            />
            <img
              src={userData.image}
              alt="userImage"
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              {userData.name};
            </h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              {userId === userData.email && (
                <button
                  type="button"
                  className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                  onClick={logout}
                >
                  <AiOutlineLogout color="red" fontSize={21} />
                </button>
              )}
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                settext(e.target.textContent);
                setActiveBtn("created");
              }}
              className={`${
                activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                settext(e.target.textContent);
                setActiveBtn("saved");
              }}
              className={`${
                activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Saved
            </button>
          </div>
          <div className="px-2">
            <MasonryLayout pins={pins} userData={userData}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
