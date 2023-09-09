import Layout from "@/Components/Layout";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import css from "../styles/ReportPage.module.css";
import { LeftOutlined } from "@ant-design/icons";
import Router,{useRouter} from "next/router";
import { Button, Input } from 'antd';
import { getSession, useSession, signOut } from "next-auth/react"

const ReportEdit = () => {
  const { data: session } = useSession()

  const { TextArea } = Input;
  const router=useRouter()
const{query}=router
var getData=JSON.parse(query.data)

var pDetails={

}
var cDetails={

}
for(let i in getData.data){
     if(i=="srno"||i=="qty"||i=="remark"||i=="size"||i=="key"||i=="heatno"){
      pDetails[i]=getData.data[i]
      
     }else{
      cDetails[i]=getData.data[i]
     }
}
const[ChemicalDetails,setChemicalDetails]=useState({
...cDetails
})

const[prodDetails,setProdDetails]=useState({
 ...pDetails
})
const changeHandler =(e)=>{
const{name,value}=e.target
setProdDetails({
  ...prodDetails,
  [name]:value
}

  
)

}
const changeChemical=(e)=>{
  const{name,value}=e.target
  setChemicalDetails({
    ...ChemicalDetails,
    [name]:value
  })
}
const UpdateGradepro=()=>{
  
  var olData = JSON.parse(localStorage.getItem("reportAddedData")).filter(
    (x) => x.key !== prodDetails
  .key);
  var newData = {
    ...ChemicalDetails,
    ...prodDetails,
  };
  

    localStorage.setItem("reportAddedData",JSON.stringify([...olData,newData]))

    

}

const DeleteReportRow=(key)=>{
 var olData = JSON.parse(localStorage.getItem("reportAddedData")).filter(
   (x) => x.key !== key
 );
 localStorage.setItem("reportAddedData", JSON.stringify([...olData]));
Router.push("/Report")
}

  return (
    <>
      <Layout title="ReportEdit">
        <div className={css.reportEdit_con}>
          <div className={css.heading_report}>
            <span
              className={css.arrow_left}
              onClick={() => Router.push("/Report")}
            >
              <LeftOutlined className={css.icons_client} />
            </span>
            <div className={css.heading_text}>
              <span>Chemical Composition</span>
              <span>(Grade:316L)</span>
            </div>
            <span onClick={() => DeleteReportRow(prodDetails.key)}>
              {" "}
              <MdDelete className={css.icon_delete} />
            </span>
          </div>

          <div className={`${css.inputRow} row`}>
            <div className="col-4">
              <div className={css.inputBox}>
                <label>Sr No. </label>
                <Input
                  placeholder="Basic usage"
                  value={prodDetails.srno}
                  name="srno"
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="col-7">
              <div className={css.inputBox}>
                <label>Quantity</label>
                <Input
                  placeholder="Basic usage"
                  value={prodDetails.qty}
                  name="qty"
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="col-12">
              <div className={css.inputBox}>
                <label>Size(descriptions)</label>
                <TextArea
                  rows={3}
                  style={{ border: "1px solid" }}
                  value={prodDetails.size}
                  name="size"
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="col-6">
              <div className={css.inputBox}>
                <label>Heat\LOT No.</label>
                <Input
                  placeholder="Basic usage"
                  value={prodDetails.heatno}
                  name="heatno"
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="col-5">
              <div className={css.inputBox}>
                <label>Remark</label>
                <Input
                  placeholder="Basic usage"
                  value={prodDetails.remark}
                  name="remark"
                  onChange={changeHandler}
                />
              </div>
            </div>
          </div>
          <div className={css.gradeChemicaltable}>
            <table>
              <thead>
                <tr>
                  <th>Alloy Element</th>
                  <th>Actual observations</th>
                  <th>Specification range</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(ChemicalDetails).map((key, i) => {
                  return (
                    <tr key={i}>
                      <td style={{ textTransform: "capitalize" }}>{key}</td>
                      <td>
                        {" "}
                        <Input
                          placeholder="Basic usage"
                          value={ChemicalDetails[key]}
                          name={key}
                          onChange={changeChemical}
                          className={css.Input_field}
                        />
                      </td>
                      <td>{getData.chemicalRange[i].percent || "-"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <Button
              className={css.Update_chemical}
              onClick={() => UpdateGradepro()}
            >
              Update
            </Button>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ReportEdit;
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
