import React from "react";
import { useState, useEffect } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const PinDetail = ({ userData }) => {
  const [pins, setpins] = useState(null);
  const [pinDetail, setpinDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  //ID....
  const { pinId } = useParams();

  useEffect(() => {
    fetchPinData();
  }, [pinId]);

  let currUser = localStorage.getItem("token");

  const fetchPinData = async () => {
    //get a specific pin detail and set into setpinDetail
    console.log(pinId);
    let response = await fetch(`http://localhost:8080/api/pin/getpinid/${pinId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": currUser,
      },
    });
    // console.log(response);
    let contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not in JSON format");
    }
    let json = await response.json();
    console.log(json);
    await setpinDetail(json);

    //get the pins with the same category and set into setPins
    response = await fetch(
      `http://localhost:8080/api/pin/getpin/${json?.category}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "token": currUser,
        },
      }
    );
    // console.log(response);
    contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not in JSON format");
    }
    json = await response.json();
    setpins(json);
    // console.log(json);
  };

  const addComment = async () => {
    // console.log(pinDetail.id);
    console.log(pinDetail.id+" "+comment);
    const response = await fetch(`http://localhost:8080/api/pin/addcomment/${pinDetail.id}/${comment}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": currUser,
      },
    });
    // console.log(await response.json());
    // const contentType = response.headers.get("content-type");
    // if (!contentType || !contentType.includes("application/json")) {
    //   throw new Error("Response is not in JSON format");
    // }
    // const json = await response.json();
    // console.log(json);
    setComment("");
    setAddingComment(false);
    window.location.reload();
  };

  if (!pinDetail) return <Spinner message="Loading Pin" />;
  return (
    <>
      <div
        className="flex xl-flex-row flex-col m-auto bg-white"
        style={{ maxWidth: "1500px", borderRadius: "32px" }}
      >
        <div className="flex justify-center items-center md:items-start flex-initial">
          <img
            src={pinDetail?.image}
            alt="pinImage"
            className="rounded-t-3xl rounded-b-lg"
          />
        </div>
        <div className="w-full p-5 flex-1 xl:min-w-620">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <a
                href={`${pinDetail?.image?.asset?.url}?dl=`}
                download
                onClick={(e) => e.stopPropagation()}
                className="bd-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-x1 opacity-75 hover:opacity-100 hover:shadow-md outline-none"
              >
                <MdDownloadForOffline />
              </a>
            </div>
            <a href={pinDetail?.destination} target="_blank" rel="noreferrer">
              {pinDetail?.destination}
            </a>
          </div>
          <div>
            <h1 className="text-4xl font-bold break-words mt-3">
              {pinDetail.name}
            </h1>
            <p className="mt-3">{pinDetail.about}</p>
          </div>
          <Link
            to={`user-profile/${pinDetail.postedby}`}
            className="flex gap-2 mt-5 items-center bg-white rounded-lg"
          >
            <p className="font-semibold capitalize">{pinDetail?.postedby}</p>
          </Link>
          <h2 className="mt-5 text-2xl">Comments</h2>
          <div className="max-h-370 overflow-y-auto">
            {pinDetail?.comments?.map((comment, i) => (
              <div
                className="flex gap-2 mt-5 items-center bg-white rounded-lg"
                key={i}
              >
                <div className="flex flex-col">
                  <p className="font-bold">{comment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap mt-6 gap-3">
            <Link to={`user-profile/${pinDetail.postedby}`}>
              <img
                src={userData.image}
                alt="user-profile"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </Link>
            <input
              className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button
              type="button"
              onClick={addComment}
              className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
            >
              {addingComment ? "Posting the comment..." : "Post"}
            </button>
          </div>
        </div>
      </div>
      {(pins!=null && pins.length > 0 ) ? (
        <>
          <h2 className="text-center font-bold text-2x mt-8 mb-4">
            More like this
          </h2>
          <MasonryLayout pins={pins} userData={userData} />
        </>
      ) : (
        <Spinner message="Loading more pins..." />
      )}
    </>
  );
};

export default PinDetail;
