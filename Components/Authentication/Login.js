import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { getSession,signIn, useSession, signOut } from "next-auth/react"

import {
  InfoCircleOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import css from "../../styles/login.module.css"
import { Input, Tooltip, Button, notification, message } from "antd";
import Signup from "./Signup";

import imgG from "../../public/Images/google.svg"
import Image from "next/image";
import { useRouter } from 'next/router'
import { ApiEndPoint } from "@/public/ApiEndPoint";
// import { login_url } from "./Url";
const Login_com = () => {
  const [username, setUsername] = useState("");
  const [Loading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [usernameCheck, setUsernameCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);

  const [api, contextHolder] = notification.useNotification();
  const [messageApi, contexttHolder] = message.useMessage();
  const[loginSignup ,setLoginSignup]=useState(false)
  const info = () => {
    messageApi.info("Login Successfully...!");
  };
  const login_Status=useSession()
  const router = useRouter()
  const openNotification = (placement, title, text, type) => {
    api[type]({
      message: text,
      description: title,
      placement,
    });
  };
  const loginStatus=async (data)=>{
    const status =  await signIn('credentials', {
      redirect: false,
      name:data.name,
      email:data.email,
      id:data.id,
      password: data.password,
      callbackUrl: "/"
  })
  console.log(status, "status");
localStorage.setItem("statusData", JSON.stringify(status));  
  if(status.ok) router.replace(status.url)
  }
  const Loginhandler = async() => {
  // // if(status.ok) router.push(status.url)
    const options = {
      method: "POST",
      url: "",
      params: {
        username: username,
        password: password,
      },
      headers: {
        "content-type": "application/json",
      },
      data: [
        {
          username: username,
          password: password,
        },
      ],
    };

    if (username != "" && password != "") {
    setIsLoading(true);

      const data = {
        email: username,
        password: password,
      };
      axios.post(`${ApiEndPoint}login/`, data)
        .then(function (response) {
          console.log("response login", response);
          setIsLoading(false);
          if (response.status==201) {
            openNotification(
              "bottomRight",
              "Invalid credentials !",
              response.data.message,
              "error"
            );
            setUsernameCheck(false);
            setPasswordCheck(false);
          } else if ((response.status = 200)) {
           
            const data = {
              name: response.data.data.username,
              email: response.data.data.email,
              password: password,
              id: response.data.data.id,
            };
            loginStatus(data);
localStorage.setItem("UserId", response.data.data.id);
localStorage.setItem("token", response.data.token);

            // info();
            // Router.push("/");

            // setLoginSignup(!loginSignup);

            // navigate("/Search_fragrance");
            // window.location.reload(false);
          } else {
          }
        })
        .catch(function (error) {
          setIsLoading(false);
          console.error(error);
          openNotification("bottomRight", error.message, "Error", "error");
        });
    } else {
      if (username == "") {
        setUsernameCheck(true);
        setPasswordCheck(false);
      } else if (password == "") {
        setPasswordCheck(true);
        setUsernameCheck(false);
      } else {
        setUsernameCheck(false);
        setPasswordCheck(false);
      }
    }
  };
  const signupLogin =()=>{
setLoginSignup(!loginSignup);
  }

   // Google Handler function
const handleGoogleLogin = async () => {
const userId = await signIn("google", { callbackUrl: "/" });
if (userId) {
  // User ID is available
  console.log("User ID from login:", userId);
  // Do something with the user ID
} else {
  // Handle the case where sign-in was unsuccessful
  console.error("Google sign-in failed");
}
   

};

  return (
    <>
      {loginSignup ? (
        <Signup eventlick={signupLogin} />
      ) : (
        <div className={css.login_page}>
          {contextHolder}
          {contexttHolder}
          <div className={css.login_con}>
            <h1>Login</h1>
            <div className={css.Input_field_signup}>
              <label>User Email</label>
              <Input
                placeholder="Enter your Email"
                size="large"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
                status={usernameCheck ? "error" : ""}
                prefix={<UserOutlined className="site-form-item-icon" />}
                suffix={
                  <Tooltip title="Type your Username">
                    <InfoCircleOutlined
                      style={{
                        color: "rgba(0,0,0,.45)",
                      }}
                    />
                  </Tooltip>
                }
              />
            </div>
            <div className={css.Input_field_signup}>
              <label>Password</label>

              <Input.Password
                size="large"
                placeholder="Enter password"
                status={passwordCheck ? "error" : null}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </div>
            <Button
              size="large"
              type="primary"
              onClick={Loginhandler}
              loading={Loading}
            >
              Login
            </Button>
            <div className={css.LoginGoogle}>
              <button
                type="button"
                onClick={handleGoogleLogin}
                className={`hidden items-center gap-3 rounded-md bg-white px-5 h-[60px] border shadow-md text-[2.1rem] `}
              >
                <Image src={imgG} alt="google image" width="22" height={22} />
                Sign In with Google
              </button>
            </div>
            <div className={css.login_btn}>
              <span>
                Don't have an account?{" "}
                <Link
                  href="/Singup"
                  style={{
                    cursor: "pointer",
                    display: "inline-block",
                    color: "blue",
                  }}
                >
                  Signup Here
                </Link>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login_com;
