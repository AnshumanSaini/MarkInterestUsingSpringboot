import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

const Pin = ({pin, userData }) => {
  // console.log(pin);
  const [PostHovered, setPostHovered] = useState(false);
  const navigate = useNavigate();
  let currUser = localStorage.getItem("token");
  // console.log(userData);

  let alreadySaved = !!pin?.save?.filter((item) => item === userData?.email)
    ?.length;
  // console.log({alreadySaved});

  //delte the pin by the author
  const deletePin = () => {
    const addUserToSave = async () => {
      console.log(userData?.email);
      const response = await fetch(`http://localhost:8080/api/pin/deletepin/${pin.id}`, {
        method: "DELETE",
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
      return json;
    };
    addUserToSave().then((data) => console.log(data));
    window.location.reload();
  };

  //Add the pin to saved list
  const savePin = () => {
    if (!alreadySaved) {
      const addUserToSave = async () => {
        console.log(userData?.email);
        const response = await fetch(`http://localhost:8080/api/pin/markpin/${userData?.email}/${pin.id}`, {
          method: "POST",
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
        return json;
      };
      addUserToSave().then((data) => console.log(data));
      window.location.reload();
    }
  };
  // console.log({ alreadySaved });
  // console.log("pin is running");
  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() =>{navigate(`/pin-detail/${pin.id}`)}}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img className="rounded-lg w-full" src={pin.image} alt="user-post" />
        {PostHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justfy-between">
              <div className="flex gap-2">
                <a
                  href={`${pin.image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bd-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-x1 opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              <div className="flex-grow"></div>
              {alreadySaved ? (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none"
                >
                  {pin?.save?.length} Saved
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin();
                  }}
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none"
                >
                  Save
                </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              {pin.destination && (
                <a
                  href={pin.destination}
                  target="blank"
                  rel="noreferrer"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                >
                  <BsFillArrowUpRightCircleFill />
                  {pin.destination.length > 20
                    ? pin.destination.slice(8, 20)
                    : pin.destination}
                </a>
              )}
              {pin.postedby === userData?.email && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin();
                  }}
                  className="bg-white p-2 opacity-70 hover:opacity-100 font-bold px-5 py-1 text-dark text-base rounded-3xl hover:shadow-md outlined-none"
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`user-profile/${pin.postedby}`}
        className="flex gap-2 mt-2 items-center"
      >
        <p className="font-semibold capitalize">{pin?.postedby}</p>
      </Link>
    </div>
  );
};

export default Pin;
