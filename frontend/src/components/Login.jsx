import React from "react";
import logo from "../assets/logo.png";
import video from "../assets/share.mp4";
import { useNavigate } from "react-router";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();
  const afterLogin = async (response) => { 
    
    // console.log(response);
    const decode = jwtDecode(response.credential);
    console.log(decode);
    
    //Making API request to make user........
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: decode.name,
        email: decode.email,
        image: decode.picture,
      }),
    });
    console.log(typeof await res.status);
    
    if (await res.status === 200) {
      //Save the auth-token and redirect.
      localStorage.clear();
      localStorage.setItem("token",await res.text());
      navigate("/");
      console.log("Logged in Successfully");
  }
  else{
    console.log("Invalid Credentials");
  }
}
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          controls={false}
          src={video}
          type="video/mp4"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} alt="This is the logo" width="130px" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              onSuccess={afterLogin}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            ;
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
