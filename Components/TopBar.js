import React,{useEffect,useState,useRef} from 'react'
import styles from "../styles/Topbar.module.css"
import { FiSearch,FiChevronDown } from "react-icons/fi";
import { FaUserCircle} from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { BiLogOut,BiHelpCircle } from "react-icons/bi";
import Image from 'next/image';
import Link from 'next/link';
import logo from "../public/Images/pmilogo.png"
// import { Logout_User } from '@/Api/Url';
import axios from 'axios';
import { Avatar, Space } from 'antd';
import { getSession, useSession, signOut } from "next-auth/react"
import Router from 'next/router';
import { UserOutlined,ArrowLeftOutlined } from '@ant-design/icons';
import UserAvatar from './SmallComponets/Avatar';
import { useRouter } from 'next/router';


const TopBar = () => {
  const router = useRouter();
  const { pathname } = router;
const[userdrop,setUserdrop]=useState(false)
const[headingName,setHeadingname]=useState("DashBoard")
const wrapperRef = useRef(null);
const ref_div = useRef(null);
const { data: session } = useSession()

useEffect(()=>{

  if(pathname=="/Report"){
    setHeadingname("Create Report")
  }else if(pathname=="/Chemical"){
    setHeadingname("Grade And Chemical compositions")
  
  }else if(pathname == '/Category'){
    setHeadingname("Client Info")
  }else if(pathname == '/Settings'){
    setHeadingname("Settings")

  }else if(pathname== "/ReportPdf"){
    setHeadingname('Report Pdf File')
  }else if(pathname == "/Settings/Latterpad"){
    setHeadingname("Create Latter Pad")
  }
},[])

const Logouthandler =async()=>{

router.push("/login")
    signOut()
}
const dropDown_show=()=>{
    setUserdrop(!userdrop); 
}

const goBack = () => {
  router.back();
};

  return (
    <>
      <div className={styles.top_bar_con}>

        <h2>

       { 
headingName!="DashBoard"?<ArrowLeftOutlined title='GoBack' onClick={goBack} className={styles.gobackbtn} />:null
       } 
         {headingName}
          
          </h2>
         
        <div className={styles.right_btn_con}>
          <span>
            <FiSearch className={styles.icon_t} />{" "}
          </span>
          <span>
            <IoNotificationsOutline className={styles.icon_t} />
          </span>
          <div className={styles.usen_info_con}>
            {

<UserAvatar name={session?.user.name} imageSrc={session?.user.image} size={20}/>
              // session?.user.image?<Avatar src={<img src={session?.user.image}  unoptimized={true} width={20} height={20} alt="avatar" />}  />: <Avatar icon={<UserOutlined />} />
            }
         
            <div
              className={styles.dopdown_user}
              id="drop_down_user"
              ref={ref_div}
              onClick={() => dropDown_show()}
            >
              <h5 style={{textTransform:"capitalize"}}>{session?.user.name}</h5>
              <FiChevronDown className={styles.icon_drop} />
              {userdrop ? (
                <div className={styles.drop_down} id="drop_down">
                  <ul>
                    <li>
                      <Link href="/UserProfile">
                        <FaUserCircle className={styles.icons_drop} />
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <BiHelpCircle className={styles.icons_drop} />
                        Help
                      </Link>
                    </li>
                    <li>
                      <Link href="#" onClick={() => Logouthandler()}>
                        <BiLogOut className={styles.icons_drop} />
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mobile_topbar}>
        <div className={styles.mobile_top_bar}>

       {
        headingName!="DashBoard"?<h2>

        <ArrowLeftOutlined style={{color:'#fff',fontSize:"3rem"}} title='GoBack' onClick={goBack} className={styles.gobackbtn} />
           
           </h2>:<>
           <Image src={logo} alt="logo" />
          <h3>Pmi Report</h3>
           </>
       } 
          
        </div>
        <div className={styles.right_btn_con}>
          <span>
            <FiSearch className={styles.icon_t} />{" "}
          </span>
          <div className={styles.usen_info_con}>
          <UserAvatar name={session?.user.name} imageSrc={session?.user.image} size={20}/>

         
            <div
              className={styles.dopdown_user}
              id="drop_down_user"
              ref={wrapperRef}
              onClick={() => dropDown_show()}
            >
              <h5 style={{textTransform:"capitalize"}}>{session?.user.name}</h5>  
              <FiChevronDown className={styles.icon_drop} />
              {userdrop ? (
                <div className={styles.drop_down} id="drop_down">
                  <ul>
                    <li>
                      <Link href="/UserProfile">
                        <FaUserCircle className={styles.icons_drop} />
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <BiHelpCircle className={styles.icons_drop} />
                        Help
                      </Link>
                    </li>
                    <li>
                      <Link href="#" onClick={() => Logouthandler()}>
                        <BiLogOut className={styles.icons_drop} />
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopBar