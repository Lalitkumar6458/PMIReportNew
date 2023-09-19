import styles from "@/styles/Home.module.css";
import Layout from "@/Components/Layout";
import { FileAddOutlined } from "@ant-design/icons";
import Router from "next/router";
import Link from "next/link";
import { getSession, useSession, signOut } from "next-auth/react";
import {WhatsappShareButton,WhatsappIcon} from 'next-share'
import axios from "axios";
import { ApiEndPoint } from "@/public/ApiEndPoint";
import { useEffect, useState } from "react";
import {Popconfirm, Table, message} from "antd"
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
export default function Home({ dashBoardData }) {
        
  const { data: session, status } = useSession();
  function handleSignOut() {
    signOut();
  }

  return (
   <div>{session ? User({ session, handleSignOut, dashBoardData }) : Guest()}</div>
  );
}
// Guest
function Guest() {

Router.push("/login");

  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Guest Homepage</h3>

      <div className="flex justify-center">
        <Link href={"/login"}>
          
            Sign In
 
        </Link>
      </div>
    </main>
  );
}

function User({ session, handleSignOut,dashBoardData }) {
    const [messageApi, contextHolder] = message.useMessage();

   function messageAlert(type, content) {
     const key = "updatable";

     messageApi.open({
       key,
       type,
       content,
     });
   }
   let UserId = "";
   let token;
   if (typeof localStorage != undefined) {
     UserId = localStorage.getItem("UserId");
     token = localStorage.getItem("token");
   }
const redirectOnPage=(pagename)=>{
Router.push(pagename);
}

const getUserLogin=async()=>{
  // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  await axios
    .post(`${ApiEndPoint}googlelogin/`, { email: session.user.email })
    .then((response) => {
      console.log("response 7h", response);
      if (response.status == 200) {
        // setClientData(response.data.data);
        localStorage.setItem("UserId", response.data.data.id);
        localStorage.setItem('token', response.data.token)
        // messageAlert("success", "Succesfully Get all client data");
      } else if (response.status == 201) {
        // setClientData(response.data.data);
        // messageAlert("success", "Data Not Found");
      }
    })
    .catch((error) => {
      // dispatch({
      //   type: ERROR_FINDING_USER
      // })
      console.log(error, "error");
      // messageAlert("error", error.message);
    });
}
    const [reportData, setReportData] = useState([]);
const getReportCreatedData = async () => {
  messageAlert("loading", "Geting Client Data...");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const data_obj = {
    userId: UserId,
  };
  await axios
    .get(`${ApiEndPoint}report/`, { params: data_obj })
    .then((response) => {
      console.log("response 7h dashboard", response);
      if (response.status == 200) {
        setReportData(response.data.data);
        messageAlert("success", "Succesfully Get all client data");
      } else if (response.status == 201) {
        setReportData(response.data.data);
        messageAlert("success", "Data Not Found");
      }
    })
    .catch((error) => {
      // dispatch({
      //   type: ERROR_FINDING_USER
      // })
      console.log(error, "error");
      messageAlert("error", error.message);
    });
};
  const Deletegrade = async (id) => {
    messageAlert("loading", "Deleting Grade...");

    const response = await fetch(`${ApiEndPoint}report/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Connection: "Keep-Alive",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: id,
        userId: UserId,
      }),
    });
    const data = await response.json();
    console.log("data", data);
    if (response.ok) {
      console.log("Data saved to database");
      getReportCreatedData();
      messageAlert("success", "Succesfully Deleted report");
    } else {
      messageAlert("error", "Error deleting...");

      console.error("Error saving data to database");
    }
  };

useEffect(()=>{
getUserLogin()
getReportCreatedData()
},[])
const EditReport=(data)=>{
  console.log(data, "edit report");
  const url="/Report"
  localStorage.setItem("EditReportData", JSON.stringify(data));
  localStorage.setItem("reportAddedData", JSON.stringify(data.reportaddedData)); 
  Router.push(
    {
      pathname: url,
      query: { data: JSON.stringify(data) },
    },
    url
  );
}
const cancel = (e) => {
  console.log(e);
  // message.error("Click on No");
};


const columns = [
  {
    title: "Client Name",
    dataIndex: "clientName",
    key: "clientName",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Grade",
    dataIndex: "grade",
    key: "grade",
  },
  {
    title: "Action",
    dataIndex: "action",
   render:(_,record)=>{
return (
  <div className="flex items-center gap-4">
    <button
      onClick={() => EditReport(record)}
      className="w-[30px] h-[30px] rounded-full bg-mainDark text-white text-[1.7rem] flex items-center justify-center"
    >
      <FiEdit />
    </button>
    <Popconfirm
      title="Delete the report"
      description="Are you sure to delete this report?"
      onConfirm={() => Deletegrade(record._id)}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <button

        className="w-[30px] h-[30px] rounded-full bg-red-700 text-white text-[1.7rem] flex items-center justify-center"
      >
        <RiDeleteBinLine />
      </button>
    </Popconfirm>
  </div>
);
   }
  },
];


  return (
    <>
      <Layout title="Dashboard" paddingTop="60px">
        {contextHolder}
        <div className={styles.dashboard_con}>
          <div className={styles.DashBoxs}>
            <div className="row">
              <div
                className="col-lg-3 col-sm-6 col-6 d-flex cursor_poniter"
                onClick={() => redirectOnPage("/Category")}
              >
                <div className={`${styles.dash_count} ${styles.dash_count}`}>
                  <div className={styles.dash_counts}>
                    <h4>{dashBoardData.client_count}</h4>
                    <h5>Client</h5>
                  </div>
                  <div className={styles.dash_imgs}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-user"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-sm-6 col-6 d-flex cursor_poniter"
                onClick={() => redirectOnPage("/Chemical")}
              >
                <div className={`${styles.dash_count} ${styles.das1}`}>
                  <div className={styles.dash_counts}>
                    <h4>{dashBoardData.grade_count}</h4>
                    <h5>Grades</h5>
                  </div>
                  <div className={styles.dash_imgs}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-user-check"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="8.5" cy="7" r="4"></circle>
                      <polyline points="17 11 19 13 23 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-6 d-flex">
                <div className={`${styles.dash_count} ${styles.das2}`}>
                  <div className={styles.dash_counts}>
                    <h4>{dashBoardData.monthly_count}</h4>
                    <h5>Month Report </h5>
                  </div>
                  <div className={styles.dash_imgs}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-file-text"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-6 d-flex">
                <div className={`${styles.dash_count} ${styles.das3}`}>
                  <div className={styles.dash_counts}>
                    <h4>{dashBoardData.today_report_count}</h4>

                    <h5>Today Report</h5>
                  </div>
                  <div className={styles.dash_imgs}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-file"
                    >
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                      <polyline points="13 2 13 9 20 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Table dataSource={reportData} columns={columns} />;
          <div className={styles.reportButon}>
            <button
              className={styles.reportBtn}
              shape="round"
              onClick={() =>{
                localStorage.removeItem("reportAddedData");
                localStorage.removeItem("EditReportData");
                localStorage.removeItem("ReportCreatedData")

                Router.push("/Report")}}
            >
              <FileAddOutlined />{" "}
              <span className={styles.reportText}>Report</span>
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  try{
   const  resData = await axios.get(`${ApiEndPoint}dashboard_info/`, {
      params: { userEmail: session?.user?.email },
    });
    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  
    return {
      props: {
        session,
        dashBoardData: resData.data,
      },
    };

  }catch(e){
    console.log("Error"+e)
    return {
      props: {
        session,
        dashBoardData: {},
      },
    };
  }


}
