import React, { useState } from "react";
import axios from "axios";
import {
  InfoCircleOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
} from "@ant-design/icons";
import { ApiEndPoint } from "@/public/ApiEndPoint";
import css from "../../styles/login.module.css"
import Link from "next/link";
// import { SignUp_User } from "@/Api/Url";

import { Input, Tooltip, Button, notification, message } from "antd";
import Router from "next/router";
// import { useNavigate, Link } from "react-router-dom";
// import { Signup_url } from "./Url";

const Signup = (props) => {
    var clickevent = props.eventlick;
  const [username, setUsername] = useState("");
  const [Loading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [confirmpassword, setConfirmPassword] = useState("");

  const [usernameCheck, setUsernameCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  
  const [confirmpasswordCheck, setConfirmPasswordCheck] = useState(false);

  //   const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [messageApi, contexttHolder] = message.useMessage();
  const info = () => {
    messageApi.info("Register Successfully...!");
  };
  const openNotification = (placement, title, text, type) => {
    api[type]({
      message: title,
      description: text,
      placement,
    });
  };
  const Loginhandler = () => {
    const options = {
      method: "POST",
      url: `${ApiEndPoint}users`,
      headers: {
        "content-type": "application/json",
      },
      data: {
        username: username,
        email: email,
        password: password,
        signupMethod: "manual",
      },
    };

    if (username != "" && password != "" && confirmpassword != "" && email != "") {
      if (password !== confirmpassword) {
        messageApi.error("Confirm Password Not match...!");
      } else {
        setIsLoading(true);
        axios
          .request(options)
          .then(function (response) {
            setIsLoading(false);
            if (response.status == 200) {
                info();
                localStorage.setItem("flag", true);
                Router.push("/login");
            } else if(response.status == 201){
    openNotification(
      "bottomRight",
      "User Registered",
      response.data.message,
      "error"
    );
            }
            else {
             openNotification(
               "bottomRight",
               "Invalid credentials !",
               "Username or password not valid",
               "error"
             );
             setUsernameCheck(false);
             setPasswordCheck(false);
            }
          })
          .catch(function (error) {
            setIsLoading(false);
            console.error(error);
            openNotification(
              "bottomRight",
              error.message,
              "Network Error",
              "error"
            );
          });
      }
    } else {
      if (username == "") {
        setUsernameCheck(true);
        setPasswordCheck(false);
        setConfirmPasswordCheck(false);
        setEmailCheck(false);

      }  else if (email == ""){
        setEmailCheck(true)
  setPasswordCheck(false);
  setUsernameCheck(false);
  setConfirmPasswordCheck(false);
      }
      
      else if (password == "") {
        setEmailCheck(false)
        setPasswordCheck(true);
        setUsernameCheck(false);
        setConfirmPasswordCheck(false);
      } else if (confirmpassword == "") {
        setEmailCheck(false);

        setPasswordCheck(false);
        setUsernameCheck(false);
        setConfirmPasswordCheck(true);
      } else {
        setEmailCheck(false);

        setUsernameCheck(false);
        setPasswordCheck(false);
        setConfirmPasswordCheck(false);
      }
    }
  };
//   async function onSubmit(values){
//     const options = {
//         method: "POST",
//         headers : { 'Content-Type': 'application/json'},
//         body: JSON.stringify(values)
//     }

//     await fetch('http://localhost:3000/api/auth/signup', options)
//         .then(res => res.json())
//         .then((data) => {
//             if(data) router.push('http://localhost:3000')
//         })
// }
  return (
    <div className={css.login_page}>
      {contextHolder}
      {contexttHolder}
      <div className={css.login_con}>
        <h1>SignUp</h1>
        <div className={css.Input_field_signup}>
          <label>Username</label>
          <Input
            placeholder="Enter your username"
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
          <label>Email</label>
          <Input
            placeholder="Enter your Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            status={emailCheck ? "error" : ""}
            prefix={<MailOutlined className="site-form-item-icon" />}
            suffix={
              <Tooltip title="Type your Email">
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
        <div className={css.Input_field_signup}>
          <label>Confirm Password</label>
          <Input.Password
            placeholder="Enter Confirm password"
            status={confirmpasswordCheck ? "error" : null}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            value={confirmpassword}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </div>
        <Button type="primary" onClick={Loginhandler} loading={Loading}>
          Submit
        </Button>

        <div className={css.login_btn}>
          <span>
            Already have an account?{" "}
            <Link href="/login"
              
              style={{ cursor: "pointer", display: "inline-block", color:"blue" }}
            >
              Login Here
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
