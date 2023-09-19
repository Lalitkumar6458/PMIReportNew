import React,{useState} from 'react'
import css  from "../../styles/ReportPage.module.css"
import formate1 from "../../public/Images/ReportFormate/formate1.jpg"
import { Button, Modal } from "antd";
import Image from 'next/image';
import {CheckOutlined} from '@ant-design/icons';
const ReportFormate = () => {
    const [imagename, setImagename] = useState(formate1);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const[formateNo,setFormateNo]=useState(1)
const[reportFormateData,setReportFormateData]=useState([
    {
        id:1,
        image:require("../../public/Images/ReportFormate/formate1.jpg"),
        active:true,
    },
    {
        id:2,
        image:require("../../public/Images/ReportFormate/formate2.jpg"),
        active:false
    },
    {
        id:3,
        image:require("../../public/Images/ReportFormate/formate3.jpg"),
        active:false
    }
])
 const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const FormateSelect=(data)=>{
    setFormateNo(data.id)

      setImagename(data.image)
   setIsModalOpen(true);
   const newData=reportFormateData.map((item)=>{
    if(data.id === item.id){

        return{
            ...item,
            active:true
        }
    }else{
        return{
            ...item,
            active:false
        }
    }
   })
   setReportFormateData(newData)
  }

  
  return (
    <div>

<div className="row gapRow">


    {
        reportFormateData.map((item)=>{
            return(
                <div className="col-6 col-md-4" key={item.id}>
                <div
                  className={css.formate_box}
                  style={{
                    border: item.active ? "4px solid #081A51" : null,
                  }}
                  onClick={() => FormateSelect(item)}
                >
                  <span className={css.FormateNum}>{item.id}</span>
                  <Image
                    src={item.image}
                    alt="formate"
                    className={css.imageFormate}
                  />
                  {item.active?<div className={css.SelectedForm}><CheckOutlined /></div>:null}
                  
                </div>
              </div>
            )
        })
    }
               
              </div>


              <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Image src={imagename} alt="formate" className={css.imageFormate} />
        </Modal>
    </div>
  )
}

export default ReportFormate