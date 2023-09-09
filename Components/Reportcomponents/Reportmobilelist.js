import React,{useState } from 'react'
import css from "../../styles/ReportPage.module.css"
import { DoubleRightOutlined,PlusCircleOutlined } from '@ant-design/icons';
import Router from 'next/router';
import {
  
    Input,
    Button,
   
  } from "antd";
  import RandomGradeData from '../SmallComponets/RandomGradeData';
const Reportmobilelist = ({ gradeDataC, Gradename, chemicalRange }) => {
  const { TextArea } = Input;

  const [tableview, setTableview] = useState(false);
  var getOldData = JSON.parse(localStorage.getItem("reportAddedData")) || [];
  const [addedData, setAddedData] = useState([...getOldData]);
  const Data = [
    {
      id: 1,
      srno: 1,
      Size: "30MMX204MM Circle",
      qty: "3pc",
      remark: "Ok",
    },
    {
      id: 2,
      srno: 2,
      Size: "50MMX404MM Circle",
      qty: "6pc",
      remark: "Ok",
    },
  ];

  const [addeddata, setAddeddata] = useState([]);
  const [countadd, setCountAdd] = useState(1);

  const [objSizeQty, setObjSizeQty] = useState({
    size: "",
    qty: "",
    heatno: "",
  });

  const report_grade_edit = (data) => {
    var obj = {
      gradeDataC: gradeDataC?.chemical,
      data,
      chemicalRange,
    };
    // Router.push("/ReportEdit")
    var url = "/ReportEdit";
    Router.push(
      {
        pathname: url,
        query: { data: JSON.stringify(obj) },
      },
      url
    );
  };

  const onSizeQtyHandler = (e) => {
    const { name, value } = e.target;

    setObjSizeQty({
      ...objSizeQty,
      [name]: value,
    });
  };

  const AddreportItem = () => {
    var getOldData = JSON.parse(localStorage.getItem("reportAddedData")) || [];

    const data_get = {
      key:
        getOldData.length === 0
          ? 1
          : parseInt(getOldData[getOldData.length - 1]["key"]) + 1,
      srno:
        getOldData.length === 0
          ? 1
          : parseInt(getOldData[getOldData.length - 1]["key"]) + 1,
      ...objSizeQty,
      ...RandomGradeData({ data: gradeDataC.chemical }),
      remark: "Ok",
    };
    setAddedData([...getOldData, data_get]);

    localStorage.setItem(
      "reportAddedData",
      JSON.stringify([...getOldData, data_get])
    );
    setCountAdd(countadd + 1);
  };

  return (
    <>
      <div className={css.report_sizeqty}>
        {/* <div className={css.tableView}>
               <button className={tableview?"":`${css.active}`} onClick={()=>Table_view1()}>view1</button>
               <button className={tableview?`${css.active}`:""} onClick={()=>Table_view()}>view2</button>
              </div> */}
        <div className="row">
          <div className="col-4 col-md-3">
            <div className={css.inputBox}>
              <label>Quantity</label>
              <Input
                placeholder="Enter Qty..."
                onChange={onSizeQtyHandler}
                value={objSizeQty.qty}
                name="qty"
              />
            </div>
          </div>
          <div className="col-8 col-md-4">
            <div className={css.inputBox}>
              <label>Size(Description)</label>
              <TextArea
                className={css.TextArea}
                placeholder="Enter Size..."
                onChange={onSizeQtyHandler}
                value={objSizeQty.size}
                name="size"
                allowClear
              />
            </div>
          </div>
          <div className="col-8 col-md-3">
            <div className={css.inputBox}>
              <label>Heat\LOT No.</label>
              <Input
                placeholder="Enter Size..."
                onChange={onSizeQtyHandler}
                value={objSizeQty.heatno}
                name="heatno"
              />
            </div>
          </div>
          <div className="col-4 col-md-2 d-flex">
            <div className={css.AddButon}>
              <Button type="primary" onClick={AddreportItem}>
                <PlusCircleOutlined />
                ADD
              </Button>
            </div>
          </div>
        </div>
        <div className={`${css.tableContent} reporttable`}>
          <div className={css.ReportMobileTable}>
            <div className={css.table_head}>
              <span className={css.sr_no}>SR No.</span>
              <span className={css.size_h}>Size(Description)</span>
              <span className={css.remark}>Remark</span>
              <span className={css.btn_right}></span>
            </div>
            <div className={css.tableBody}>
              {addedData.map((item) => {
                return (
                  <div
                    className={css.tableRow}
                    key={item.id}
                    onClick={() => report_grade_edit(item)}
                  >
                    <span className={css.sr_no_text}>{item.srno}</span>
                    <div className={css.sizeBox}>
                      <span className={css.qty_class}>Qty: {item.qty}</span>
                      <span className={css.size}>{item.size}</span>
                    </div>
                    <span className={css.remark_ok}>{item.remark}</span>
                    <span className={css.btn_right}>
                      <DoubleRightOutlined className={css.icons_client} />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reportmobilelist