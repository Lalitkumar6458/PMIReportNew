import Layout from "@/Components/Layout";
import React, { useState,useEffect } from "react";
import { Button, Modal, Input, message, Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import styles from "@/styles/Chemical.module.css";
import Router from "next/router";
import { ApiEndPoint } from "@/public/ApiEndPoint";
import {

  FaPlusCircle,
  FaEdit,
} from "react-icons/fa";
import {
  HiOutlineSaveAs,
  HiOutlineSearch,

} from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import Image from "next/image";
import add_gif from "../public/Images/add_gif.gif";

import axios from "axios";
import BorderBox from "@/Components/SmallComponets/BorderBox";
import { useSession,getSession} from "next-auth/react"
import MessageAlert from "@/Components/SmallComponets/MessageAlert";
import ChemicalAdd from "@/Components/FormCon/ChemicalAdd";
var arrlist = {};
var table_th = [];
var table_td = [];
// var modalData;

const Chemical = ({ session }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const {  status, data } = useSession();
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [chemicalInput, setChemicalInput] = useState({});
  const [gradeName, setGradeName] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const[isEditGrade,setIsEditGrade]=useState(false)
  const [EditGradeData, setEditGradeData] = useState(false);


  function messageAlert(type, content) {
    const key = "updatable";

    console.warn("session", userInfo);
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showAddModal = () => {
    setIsModalOpen(true);
    setIsEditGrade(false)
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const userInfo = data.user;
  const showModal = (data) => {
    setIsEditGrade(true)
    setEditGradeData(data)
    setIsModalOpen(true);
    // setModalData({ ...data });
    // setChemicalInput({ ...data.chemical_name });
    // setGradeName(data.Grade);
    // setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const Deletegrade = async (item) => {
    messageAlert("loading", "Deleting Grade...");
 

       const response = await fetch(`${ApiEndPoint}chemical/`, {
         method: "DELETE",
         headers: {
           "Content-Type": "application/json",
           Connection: "Keep-Alive",
           Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({
           id: item._id,
           userId: item.userId,
         }),
       });
       const data = await response.json();
       console.log("data", data);
       if (response.ok) {
         console.log("Data saved to database");
          getAllChemicalData();
        messageAlert("success", "Succesfully Deleted Grade");


       } else {
        messageAlert("error", "Error deleting...");

         console.error("Error saving data to database");
       }

  };

  const initialValues = {
    el_name: "",
    percent: "",
  };
  const [values, setValues] = useState(initialValues);
  const [grade, setGrade] = useState("");
  const [checkempty, setCheckempty] = useState(true);

  const [gradedata, setGradedata] = useState({});
  const [allGradeData, setAllGradeData] = useState([]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const Gradehandler = (e) => {
    const { value } = e.target;
    setGrade(value);
  };

  const sumbit_input = () => {
    if (values.el_name == "" || values.percent == "" || grade == "") {
      if (values.el_name == "" && values.percent == "" && grade == "") {
        setCheckempty(true);
        alert("all empt");
      } else {
        alert("all not empty");
      }
    } else {
      setCheckempty(false);
      table_th.push(values.el_name);
      table_td.push(values.percent);

      setGradedata({
        ...gradedata,
        [values.el_name]: values.percent,
      });
      Object.assign(arrlist, { [values.el_name]: values.percent });

      setValues({
        el_name: "",
        percent: "",
      });
    }
  };

  const saveGrade = () => {
    const key = "updatable";
    messageAlert("loading", "Loading...");

    const data_obj = JSON.stringify({
      grade_name: grade,
      chemical_name: arrlist,
      username: userInfo.name,
      email: userInfo.email,
    });

    axios
      .post(`${ApiEndPoint}chemical_page_add/`, data_obj, {
        "Content-Type": "application/json",
        Connection: "Keep-Alive",
        Authorization: `Bearer test`,
      })
      .then((response) => {
        messageAlert("success", "Succesfully Saved Grade Chemical");
        getAllChemicalData();
      })
      .catch((error) => {
        console.log(error, "error");
        messageAlert("error", error.message);
        // messageApi.open({
        //   key,
        //   type: 'error',
        //   content: error.message,
        //   duration: 2,
        // });
      });
  };
  const updateChemical = async (e) => {
    const { name, value } = e.target;
    setChemicalInput({
      ...chemicalInput,
      [name]: value,
    });
  };
  const UpdateChemical = async () => {
    messageAlert("loading", "Loading...");
    const data = {
      grade: gradeName,
      chemical_grade_id: modalData.chemical_grade_id,
      chemical: chemicalInput,
      username: userInfo.name,
      email: userInfo.email,
    };

    await axios
      .post(`${ApiEndPoint}update_chemical/`, data, {
        "Content-Type": "application/json",
        Connection: "Keep-Alive",
        Authorization: `Bearer test`,
      })
      .then((response) => {
        messageAlert("success", "Succesfully Update Grade Chemical");

        getAllChemicalData();
        setOpen(false);
      })
      .catch((error) => {
        console.log(error, "error");
        messageAlert("error", error.message);
      });
  };
  const getAllChemicalData = async () => {
    messageAlert("loading", "Geting grade chemical Data...");
   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const data_obj = {
userId:UserId
    };
    await axios
      .get(
        `${ApiEndPoint}Chemical/`,
        { params: data_obj },
      )
      .then((response) => {
        console.log("response 7h", response);
        if (response.status==200){
          setAllGradeData(response.data.data);
          messageAlert("success", "Succesfully Get all Grade Chemical data");
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
  useEffect(() => {
    getAllChemicalData();
  }, []);
  const SearchGradeHandler = async (e) => {
    messageAlert("loading", "Searching grade...");

    setSearchKeyword(e.target.value);

    await axios
      .get(
        `${ApiEndPoint}search_grade/`,
        {
          params: {
            word: e.target.value,
            username: userInfo.name,
            email: userInfo.email,
          },
        },
        {
          "Content-Type": "application/json",
          Connection: "Keep-Alive",
          Authorization: `Bearer test`,
        }
      )
      .then((response) => {
        messageAlert("success", "Succesfully Get Search result");

        setAllGradeData(response.data.data);
      })
      .catch((error) => {
        console.log(error, "error");
        messageAlert("error", error.message);
      });
  };
  // if(status !== "authenticated" ){
  //   Router.replace('/login')
  //   }

    const [currentPage, setCurrentPage] = useState(1);
    const [itemperpage,setItemPerPage]=useState(3)
let itemsPerPage=3
    // Calculate total pages based on data length and items per page
    const totalPages = allGradeData.length; 

    // Calculate the data to be displayed on the current page
    const startIndex = (currentPage - 1) * itemperpage;
    const endIndex = startIndex + itemperpage;
    const pageData = allGradeData.slice(startIndex, endIndex);

    // Function to handle page changes
    const handlePageChange = (pageNumber) => {
      console.log(pageNumber, "pageNumber");
      setCurrentPage(pageNumber);
    };
const onShowSizeChange = (current, pageSize) => {
  console.log(current, pageSize);
setItemPerPage(pageSize);
};
  return (
    <Layout title="Chemical">
      {contextHolder}
      <div className={styles.Chemical_container}>
        <div className="flex items-center justify-end">

        <button
          className="bg-mainDark text-white font-inter text-[2rem] rounded-md py-3 px-3"
          onClick={showAddModal}
        >
          Add Grade
        </button>
        </div>
        <div className={styles.alloys_content}>
          <BorderBox title={"Chemical Compositions"}>
            <div className={styles.table_grades}>
              <div className={styles.chemical_comp}>
                <div className={styles.wrraper_box}>
                  <div className={styles.search_box}>
                    <HiOutlineSearch className={styles.searchicon} />
                    <input
                      type="text"
                      placeholder="Search Grades chemical..."
                      value={searchKeyword}
                      onChange={SearchGradeHandler}
                    />
                  </div>
                </div>

                <table className={styles.main_grade}>
                  <thead>
                    <tr>
                      <th>Grade</th>
                      <th>Chemical</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allGradeData.map((item) => {
                      return (
                        <tr key={item._id}>
                          <td className={styles.grade_td}>
                            Grade:{item.grade}
                          </td>
                          <td>
                            <div className={styles.divChemical}>
                              <table>
                                <thead>
                                  <tr>
                                    {item.chemical.map((each, index) => {
                                      return (
                                        <th key={index}>{each.Element}</th>
                                      );
                                    })}
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    {item.chemical.map((each, index) => {
                                      return (
                                        <td key={index}>{each.percent}</td>
                                      );
                                    })}
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                          <td className={styles.button_actions}>
                            <button onClick={() => showModal(item)}>
                              Edit <FaEdit className={styles.icon_t} />
                            </button>

                            <Popconfirm
                              title={"Delete the Grade: " + item.grade}
                              description="Are you sure to delete this Grade?"
                              onConfirm={() => Deletegrade(item)}
                              icon={
                                <QuestionCircleOutlined
                                  style={{
                                    color: "red",
                                  }}
                                />
                              }
                            >
                              <button>
                                Delete <MdDelete className={styles.icon_t} />
                              </button>
                            </Popconfirm>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <table className={`${styles.mobile_table_c} w-full`}>
                  <tbody>
                    {allGradeData.map((item) => {
                      return (
                        <tr>
                          <td className={styles.td_mobile}>
                            <div className={styles.divChemical}>
                              <h3>Grade:{item.Grade}</h3>
                              <table>
                                <thead>
                                  <tr>
                                    {item.chemical.map((each, index) => {
                                      return (
                                        <th key={index}>{each.Element}</th>
                                      );
                                    })}
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    {item.chemical.map((each, index) => {
                                      return (
                                        <td key={index}>{each.percent}</td>
                                      );
                                    })}
                                  </tr>
                                </tbody>
                              </table>
                              <div className={styles.buttons_eddit}>
                                <span>
                                  <FaEdit
                                    className={styles.icon_edit}
                                    onClick={() => showModal(item)}
                                  />
                                </span>

                                <span>
                                   <Popconfirm
                              title={"Delete the Grade: " + item.grade}
                              description="Are you sure to delete this Grade?"
                              onConfirm={() => Deletegrade(item)}
                              icon={
                                <QuestionCircleOutlined
                                  style={{
                                    color: "red",
                                  }}
                                />
                              }
                            >


                                  <MdDelete
                                    className={styles.icon_delete}
                                  />
                            </Popconfirm>
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </BorderBox>
        </div>
      </div>
      <Modal
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
        okText="Ok"
        bodyStyle={{
          height: "auto",
          width: "295px",
          paddingBottom: "15px",
        }}
        width="295px"
        cancelText="Cencel"
      >
        <div className={styles.chemical_update}>
          <div className={styles.chemical_hed}>
            <h2>Chemical Update </h2>
            <h3>(Grade:{modalData ? modalData.Grade : ""})</h3>
          </div>
          <div className={styles.input_box}>
            <div className={styles.grade_box}>
              <label>Grade:</label>
              <Input
                placeholder="grade name"
                value={gradeName}
                onChange={(e) => setGradeName(e.target.value)}
              />
            </div>

            {chemicalInput
              ? Object.keys(chemicalInput).map((item) => {
                  return (
                    <div className={styles.grade_box}>
                      <label>{item}:</label>
                      <Input
                        placeholder="grade name"
                        name={item}
                        value={chemicalInput[item]}
                        onChange={updateChemical}
                      />
                    </div>
                  );
                })
              : ""}
          </div>
          <div className={styles.button_group}>
            <Button className={styles.Cancel_btn} onClick={hideModal}>
              Cencel
            </Button>

            <Button className={styles.Update_btn} onClick={UpdateChemical}>
              Update
            </Button>
          </div>
        </div>
      </Modal>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="py-3 px-3">
          <ChemicalAdd
            session={session}
            isEditGrade={isEditGrade}
            setIsModalOpen={setIsModalOpen}
            EditGradeData={EditGradeData}
            getAllChemicalData={getAllChemicalData}
          />
        </div>
      </Modal>
    </Layout>
  );
};

export default Chemical;

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