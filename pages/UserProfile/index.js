import Layout from "@/Components/Layout";
import BorderBox from "@/Components/SmallComponets/BorderBox";
import React, { useState,useEffect } from "react";
import styles from "@/styles/Userprofile.module.css";
import { Button, Input, message, Upload} from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { getSession, useSession, signOut } from "next-auth/react"
import { ApiEndPoint } from "@/public/ApiEndPoint";


const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
const beforeUploadlogo = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
var initialValues={
  name:"",
  email:"",
  phone:"",
  address:"",
  profileImg:"",
  logoImg:""

}
const index = () => {
  const [messageApi, contextHolder] = message.useMessage()
    const { session, status, data } = useSession();

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [imageUrllogo, setImagelogo] = useState();
  const [editUserInfo, setEditUserInfo] =useState(false);
  const [userDetails, setUserDetails] = useState(initialValues)
  function messageAlert(type,content){
    const key = 'updatable';
  const userInfo = data.user;

 messageApi.open({
      key,
      type,
      content,
    })
  }

  const Changehanlder=(e)=>{
    const {name,value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value

    })
  }

  const getUserData = async()=>{
    messageAlert('loading','Geting Your profile Data...')



    await axios
      .get(
        `${ApiEndPoint}get_user_data/`,
        {
          params: {
            username: data.user.name,
            email: data.user.email,
          },
        },
        {
          "Content-Type": "application/json",
          Connection: "Keep-Alive",
          Authorization: `Bearer test`,
        }
      )
      .then((response) => {
        let userData = response.data.data[0];
        messageAlert("success", "Succesfully Get profile data");

        setImageUrl(userData.user_img);
        setImagelogo(userData.logo_img);

        setUserDetails({
          name: userData.user_name,
          email: userData.user_email,
          phone: userData.phone_no,
          address: userData.address,
        });

      })
      .catch((error) => {
        // dispatch({
        //   type: ERROR_FINDING_USER
        // })
        messageAlert("error", error.message);

        console.log(error, "error");
      });


  }
  useEffect(()=>{
    getUserData()
  },[])

  const handleChange = (info) => {
    getBase64(info.file.originFileObj, (url) => {
      setLoading(false);
      setImageUrl(url);
     
    });
    setUserDetails({
      ...userDetails,
      profileImg: info.file.originFileObj
    })
    // if (info.file.status === "uploading") {
    //   setLoading(true);
    //   return;
    // }
    // if (info.file.status === "done") {
    //   // Get this url from response in real world.
    //   getBase64(info.file.originFileObj, (url) => {
    //     setLoading(false);
    //     setImageUrl(url);
    //   });
    // }
  };
  const handleChangelogo = (info) => {

    setUserDetails({
      ...userDetails,
      logoImg: info.file.originFileObj
    })
       getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
         setImagelogo(url);
      });
   
  };
  const userDetailsSave=async()=>{
    messageAlert('loading','Saving profile Details...')

    const form =new FormData()
    form.append("name", userDetails.name)
    form.append("user_email", userDetails.email)
    form.append("phone_no",userDetails.phone)
    form.append("address",userDetails.address)
    form.append("user_img",userDetails.profileImg)
    form.append("logo_img", userDetails.logoImg)
    // setEditUserInfo(true)

    

    await axios
      .post(`${ApiEndPoint}set_user_info/`, form, {
        "Content-Type": "application/json",
        Connection: "Keep-Alive",
        Authorization: `Bearer test`,
      })
      .then((response) => {
        messageAlert('success','Succesfully Saved profile Details')

      })
      .catch((error) => {
        // dispatch({
        //   type: ERROR_FINDING_USER
        // })
        console.log(error, "error");
        messageAlert('error',error.message)

      });

  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
 
  return (
    <Layout title={"UserProfile"}>
      {contextHolder}
      <BorderBox title={"My Profile"}>
        <div className={styles.yor_details_page}>
          <h3 className="text-center" style={{fontSize:"2rem"}}>Your Details</h3>
          <div className={styles.userForm_con}>
            <div className="row col_gap_5">
              <div className="col-12 col-md-6">
                <div className={styles.input_box}>
                  <label>Name</label>
                  <Input placeholder="Enter your company name" disabled={editUserInfo} value={userDetails.name} name="name" onChange={Changehanlder} />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className={styles.input_box}>
                  <label>Phone No.</label>
                  <Input placeholder="Enter your Phone No." disabled={editUserInfo} value={userDetails.phone} name="phone" onChange={Changehanlder} />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className={styles.input_box}>
                  <label>Email</label>
                  <Input placeholder="Enter your Email" disabled={editUserInfo} value={userDetails.email} name="email" onChange={Changehanlder} />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className={styles.input_box}>
                  <label>Address</label>
                  <Input placeholder="Enter your Address" disabled={editUserInfo} value={userDetails.address} name="address" onChange={Changehanlder} />
                </div>
              </div>
              <div className="col-4 col-md-6">
                <div className={styles.image_box}>
                  <label>Profile Picture</label>

                  <Upload
                    name="profilePic"
                    listType="picture-circle"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                          width: "100%",
                        }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </div>
                </div>
                <div className="col-8 col-md-6 logo_upload">
                  <div className={styles.image_box}>
                    <label>Company Logo</label>

                    <Upload
                      name="companyLogo"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                    beforeUpload={beforeUploadlogo}
                      onChange={handleChangelogo}
                    >
                    {imageUrllogo ? (
                        <img
                        src={imageUrllogo}
                          alt="avatar"
                          style={{
                            width: "100%",
                          }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </div>
                </div>
                <div className="col-12 d-flex align-items-center justify-content-center">
                  <Button type="primary" className={styles.Save_details_btn} onClick={()=>userDetailsSave()}>Save Details</Button>
                </div>
                
              </div>
            </div>
          </div>
     
      </BorderBox>
    </Layout>
  );
};

export default index;


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