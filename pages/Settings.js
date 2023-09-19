import Layout from '@/Components/Layout'
import React from 'react'
import css from "../styles/Settings.module.css"
import { Tabs } from "antd";
import Profile from '@/Components/Settings/Profile';
import { useState } from "react";
import { getSession} from "next-auth/react"
import ReportFormate from '@/Components/Settings/ReportFormate';
import LatterPad from '@/Components/Settings/latterPad/LatterPad';
import MachineInfo from '@/Components/Settings/MachineInfo';
import { useRouter } from 'next/router';

const Settings = ({session}) => {
  const[activetab,setActivetab]=useState("User Profile")
   const router = useRouter();
   const { query } = router;
const [activetabkey, setActiveTabKey] = useState(
  query.pageId ? parseInt(query.pageId) : 1
);
   // Access the query parameters from the URL

   // Now you can access individual query parameters like query.paramName
   const paramName = query.pageId?query.pageId:1;
   console.log("paramName", paramName);
    const tabsItem = [
      {
        key: 1,
        label: "User Profile",
        children: <Profile />,
      },
      {
        key: 2,
        label: "Pmi Machine Info",
        children: <MachineInfo/>,
      },
      {
        key: 3,
        label: "Latter Pad",
        children: <LatterPad />,
      },
      {
        key: 4,
        label: "Report Formate",
        children: <ReportFormate />,
      },
      {
        key: 5,
        label: "Help",
        children: "Help",
      },
    ];
    const tabChangeHandler=(key)=>{
      setActivetab(tabsItem[key-1]['label'])
      setActiveTabKey(key)
       router.push(`/Settings?pageId=${key}`);
    }
   
    
  return (
    <>
      <Layout title="Settings">
        <div className={css.Settings_page}>
          <h3>{activetab}</h3>

          <div className={css.Settings_Tabs}>
            <Tabs
              tabPosition={"top"}
              activeKey={activetabkey}
              items={tabsItem}
              onChange={tabChangeHandler}
            />
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Settings


export async function getServerSideProps({ req }){
  const session = await getSession({ req })

  if(!session){
    return {
      redirect : {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}