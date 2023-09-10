import styles from "@/styles/Home.module.css";
import Layout from "@/Components/Layout";
import { FileAddOutlined } from "@ant-design/icons";
import Router from "next/router";
import Link from "next/link";
import { getSession, useSession, signOut } from "next-auth/react";
import {WhatsappShareButton,WhatsappIcon} from 'next-share'
import axios from "axios";
import { ApiEndPoint } from "@/public/ApiEndPoint";
import { useEffect } from "react";
export default function Home({ dashBoardData }) {
        
  const { data: session, status } = useSession();
  function handleSignOut() {
    signOut();
  }

  return (
    <>{session ? User({ session, handleSignOut, dashBoardData }) : Guest()}</>
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


useEffect(()=>{
getUserLogin()
},[])
  return (
    <>
      <Layout title="Dashboard" paddingTop="60px">
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

          <div className={styles.reportButon}>
            <button
              className={styles.reportBtn}
              shape="round"
              onClick={() => Router.push("/Report")}
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
