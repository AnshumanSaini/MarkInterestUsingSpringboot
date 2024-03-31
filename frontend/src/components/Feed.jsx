import React ,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
const Feed = ({ userData }) => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const {categoryId} = useParams();

  useEffect(() => {
    let currUser = localStorage.getItem("token");
    setLoading(true);
    // console.log({categoryId});
    if(categoryId !== undefined){
      //fetch specific category feeds
      // console.log("if is running");
      const fetchData = async () => {
        const response = await fetch(`http://localhost:8080/api/pin/getpin/${categoryId}`, {
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
        return json;
      };
      fetchData().then((data)=>{
        setPins(data);
        setLoading(false);
        // console.log({data: data});
      })
    }
    else{
      // console.log("else is running");
      //fetch general category feeds
      const fetchData = async () => {
        const response = await fetch('http://localhost:8080/api/pin/getallpin', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "token": currUser,
          },
        });
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not in JSON format");
        }
        const json = await response.json();
        console.log(json);
        // const data = Object.values(json);
        return json;
      };
      fetchData().then((data)=>{
        setPins(data);
        setLoading(false);
      })
    }
  }, [categoryId])
  
  if(loading) return <Spinner message="We are adding new ideas to your feed!"/>
  console.log(pins);
  if(pins===null) return <h2>No pins available</h2>
  return (
    <div>
      {pins && <MasonryLayout pins={pins} userData={userData} />}
    </div>
  )
}

export default Feed