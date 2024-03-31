import React from 'react'
import { useState, useEffect } from 'react';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Search = ({searchTerm, setsearchTerm, userData}) => {
  const [pins, setpins] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let currUser = localStorage.getItem("token");
    if(searchTerm){
      setLoading(true);
      const getSpecificPin = async () => {
        const response = await fetch(`http://localhost:8080/api/pin/getpin/${searchTerm.toLowerCase()}`, {
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
        // const data = Object.values(json);
        return json;
      };
      getSpecificPin().then((data)=>{
        setpins(data);
        setLoading(false);
      })
      
    }else{
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
        // const data = Object.values(json);
        return json;
      };
      fetchData().then((data)=>{
        setpins(data);
        setLoading(false);
      })
    }
  }, [searchTerm])
  

  return (
    <div>
      {loading && (<Spinner message="Searching for pins..."/>)}
      {pins?.length !== 0 && (<MasonryLayout pins={pins} userData={userData}/>)}
      {pins?.length === 0 && searchTerm !== '' && !loading && (
        <div className='mt-10 text-center text-xl'>
          No pins found!
        </div>
      )}
    </div>
  )
}

export default Search