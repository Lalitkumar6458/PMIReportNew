import React ,{useState} from 'react'
import styles from "@/styles/Sidebar.module.css";
import { FaAngleLeft, FaAngleRight, FaRegComments} from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { RiFolderShield2Line } from "react-icons/ri";
  import {MdOutlineSpaceDashboard,
  MdOutlineAnalytics,
  MdOutlineIntegrationInstructions,
  MdOutlineMoreHoriz,
  MdOutlineSettings,
  MdOutlineLogout,
  MdOutlineCategory
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiMessageSquareDots } from "react-icons/bi";
import Image from 'next/image';
import logo from "../public/Images/pmilogo.png"
import Link from 'next/link';
import { useRouter } from "next/router";
import { HiUserGroup } from 'react-icons/hi2';
const SideBar = () => {
    const router = useRouter()
  
    const[sidebar,setSidebar]=useState(false)

    const menu = [
      {
        id: 1,
        name: "Dashboard",
        link: "/",
        icon: <MdOutlineSpaceDashboard className={styles.icon} />,
      },
      {
        id: 2,
        name: "Chemical",
        link: "/Chemical",
        icon: <CgProfile className={styles.icon} />,
      },
      {
        id: 3,
        name: "Client",
        link: "/Category",
        icon: <HiUserGroup className={styles.icon} />,
      },
      {
        id: 4,
        name: "History",
        link: "/History",
        icon: <MdOutlineAnalytics className={styles.icon} />,
      },

      {
        id: 5,
        name: "About",
        link: "/About",
        icon: <BiMessageSquareDots className={styles.icon} />,
      },
    ];

    function handler_side_bar(){
        if(sidebar==false){
            setSidebar(true)
           if($(window).width()<=920){
            $(".container_main").css("grid-template-columns","9% auto")

           }else{

             $(".container_main").css("grid-template-columns","5% auto")
           }
            $("#links_all ul").css("padding-left","5px")
            $("#links_all ul li").css("padding-left","15px")
            $("#links_all ul li a").css("gap","30px")
            $("#links_all label").css({
            "margin-left":"7px",
            "font-size":"10px"
            })
            $("#heading_img h2").hide()
            $("#heading_img img").css({
                "width":"66px",
    "height": "53px"
})
        }else{
            $("#links_all ul").css("padding-left","20px")
            $("#links_all ul li").css("padding-left","20px")
            $("#links_all ul li a").css("gap","10px")
            $("#links_all label").css({
            "margin-left":"30px",
            "font-size":"12px"
            })
$("#heading_img h2").show()
$("#heading_img img").css({
    "width":"80px",
"height": "60px"
})

            $(".container_main").css("grid-template-columns","17% auto")
            
            setSidebar(false)
        }
     
 
    }
  return (
    <div className={styles.side_bar_main}>
        
    <div className={styles.close_sidebar} onClick={()=>handler_side_bar()}>
      {sidebar? <FaAngleRight className={styles.icon_right}/>: <FaAngleLeft className={styles.icon_left}/>}
    </div>
    <div className={styles.logo_name} id="heading_img">
        <Image src={logo} alt="logo"/>
        <h2 id="heading">PMI Report</h2>
    </div>
    <div className={styles.side_all_links} id="links_all">
        <label>MAIN MENU</label>
<ul>
    {
         menu.map((item,index)=>{
            return(
<li className={router.asPath == item.link || router.asPath == '/Settings/Latterpad'?styles.active:""} key={item.id}><Link href={item.link}>{item.icon}{item.name}</Link></li>
            )


         }
         )
    }
   
</ul>
<label>General</label>
<ul>
    <li><Link href="/"><RiFolderShield2Line className={styles.icon} />File & Folders</Link></li>
    <li><Link href="/Settings"><MdOutlineSettings className={styles.icon} /> Settings</Link></li>
    </ul>
    </div>
    </div>
  )
}

export default SideBar