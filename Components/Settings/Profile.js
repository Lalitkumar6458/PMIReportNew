import React, { useEffect, useState } from 'react'
import css from "../../styles/Settings.module.css"
import { IoLogOutOutline,IoClose } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
import { HiCheck } from "react-icons/hi2";
import {  Modal } from "antd";
import { getSession, useSession, signOut } from "next-auth/react"
import axios from 'axios';
import { ApiEndPoint } from '@/public/ApiEndPoint';
import UserForm from './UserForm';
const Profile = () => {
    const[userData,setUserData]=useState({})
const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: session } = useSession()
      let UserId = "";
      let token;
      if (typeof localStorage != undefined) {
        UserId = localStorage.getItem("UserId");
        token = localStorage.getItem("token");
      }

    const getUserData = async () => {
      //  messageAlert("loading", "Geting Client Data...");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const data_obj = {
        userId: UserId,
      };
      await axios
        .get(`${ApiEndPoint}users/`, { params: data_obj })
        .then((response) => {
          console.log("response 7h", response);
          if (response.status == 200) {
            setUserData(response.data.data);

            //    messageAlert("success", "Succesfully Get all client data");
          } else if (response.status == 201) {
            alert("User Not Found");
          }
        })
        .catch((error) => {
          alert("error " + error);
          console.log(error, "error");
        });
    };
    useEffect(() => {
      getUserData();
    }, []);


    const[EditData,setEditData]=useState([
        {
            id:1,
            name:"name",
            value:userData.name,
            inputStatus:true

        },
        {
            id:2,
            name:"email",
            value:userData.email,
            inputStatus:true
        },
        {
            id:3,
            name:"password",
            value:userData.password,
            inputStatus:true
        },
        {
            id:4,
            name:"phone",
            value:userData.phoneNo,
            inputStatus:true
            

        },
        {
            id:5,
            name:"company",
            value:userData.companyName,
            inputStatus:true
        }
    ])

const showModal = () => {
  setIsModalOpen(true);
};

     const getFirstLetters = (name) => {
       const words = name?.split(" ")||[]; // Split the input string into words
       let result = "";

       for (const word of words) {
         if (word.length > 0) {
           result += word.charAt(0).toUpperCase();
         }
       }

       return result || "N/A"; // Return 'N/A' if no first letters are available
     };
     console.log(userData, "userData");
  return (
    <>
      <div className={css.ProfileCon}>
        <div className={css.profileCamera}>
          <div className={css.imageUplode}>
            <div
              className={css.avtarBox}
              style={{ textTransform: "uppercase" }}
            >
              {getFirstLetters(userData.name)}
            </div>

            <div className={css.emailName}>
              <h4 style={{ textTransform: "capitalize" }}>{userData.name}</h4>
              <p>{userData.email}</p>
            </div>
          </div>

          <div className={css.logout}>
            <button>
              Logout <IoLogOutOutline />
            </button>
          </div>
        </div>

        <div className={css.Editsection}>
          <div className={`${css.EditHeading}`}>
            <div className="flex items-center justify-between">
              <div className="">
                <h2>Profile Details</h2>
                <div className={css.lineheading}></div>
              </div>
              <BiEdit className={css.Editicon} onClick={showModal} />
            </div>
            <div className={css.logout}>
              <button>
                Logout <IoLogOutOutline />
              </button>
            </div>
            <div className={css.EditBox}>
              <div className={css.EditRow}>
                <div
                  className={`${css.inputlabel} flex items-center gap-4 w-full `}
                >
                  <label className="w-[30%]">Name</label>
                  <span className="text-[1.6rem] font-medium w-[70%]">
                    {userData.name}
                  </span>
                </div>
              </div>
              <div className={css.EditRow}>
                <div
                  className={`${css.inputlabel} flex items-center gap-4 w-full`}
                >
                  <label className="w-[30%]">Email</label>
                  <span className="text-[1.6rem] font-medium w-[70%]">
                    {userData.email}
                  </span>
                </div>
              </div>
              <div className={css.EditRow}>
                <div
                  className={`${css.inputlabel} flex items-center gap-4 w-full`}
                >
                  <label className="w-[30%]">Phone No</label>
                  <span className="text-[1.6rem] font-medium w-[70%]">
                    {userData.phoneNo}
                  </span>
                </div>
              </div>
              <div className={css.EditRow}>
                <div
                  className={`${css.inputlabel} flex items-center gap-7 w-full`}
                >
                  <label className="w-[30%]">Company</label>
                  <span className="text-[1.6rem] font-medium w-[70%]">
                    {userData.companyName}
                  </span>
                </div>
              </div>
              <div className={css.EditRow}>
                <div
                  className={`${css.inputlabel} flex items-center gap-7 w-full`}
                >
                  <label className="w-[30%]">Passowrd</label>
                  <span className="text-[1.6rem] font-medium w-[70%]">
                    {/* {userData.name} */}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title={null}
        open={isModalOpen}
        onOk={null}
        // onCancel={handleCancel}
      >
        <div className="px-4 py-5">
          <UserForm
            getUserData={getUserData}
            setIsModalOpen={setIsModalOpen}
            userData={userData}
          />
        </div>
      </Modal>
    </>
  );
}

export default Profile