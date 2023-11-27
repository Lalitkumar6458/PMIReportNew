import React,{useState } from 'react'
import css from "../../styles/ReportPage.module.css"
import {
  DoubleRightOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import Router from 'next/router';
import {
  
    Input,
    Button,
    Modal,
    Form,
    Popconfirm,
   
  } from "antd";
  import RandomGradeData from '../SmallComponets/RandomGradeData';
const Reportmobilelist = ({ gradeDataC, Gradename, chemicalRange }) => {
  const { TextArea } = Input;
    const [form] = Form.useForm();
const [modal2Open, setModal2Open] = useState(false);

  const [tableview, setTableview] = useState(false);
  let getOldData = JSON.parse(localStorage.getItem("reportAddedData")) || [];
  const [addedData, setAddedData] = useState([...getOldData]);
  const[selectedRowData,setSelectedRowData]=useState({})
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
      data,
      chemicalRange,
    };
    setSelectedRowData(obj);
    console.log(" gradeDataC?.chemical", selectedRowData);
    // Router.push("/ReportEdit")
    var url = "/ReportEdit";
    form.setFieldsValue({
      ...data,
    });
setModal2Open(true)
    // Router.push(
    //   {
    //     pathname: url,
    //     query: { data: JSON.stringify(obj) },
    //   },
    //   url
    // );
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
const onFinish =async(value)=>{
console.log(
  value,
  "values form",
  JSON.parse(localStorage.getItem("reportAddedData"))
);
const dataKey = selectedRowData.data.key
  var olData = JSON.parse(localStorage.getItem("reportAddedData")).filter(
    (x) => x.key !== dataKey
  );
  var newData = {
    ...value,
    key: dataKey,
  };

  localStorage.setItem("reportAddedData", JSON.stringify([...olData, newData]));
setModal2Open(false);

  setAddedData(JSON.parse(localStorage.getItem("reportAddedData")))
}
const DeleteReportData=()=>{
  const dataKey = selectedRowData.data.key;
   var olData = JSON.parse(localStorage.getItem("reportAddedData")).filter(
     (x) => x.key !== dataKey
   );
   localStorage.setItem("reportAddedData", JSON.stringify([...olData]));
   setModal2Open(false);
   setAddedData(JSON.parse(localStorage.getItem("reportAddedData")));
}
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
      <Modal
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      >
        <div className="p-4">
          <Form
            className=""
            form={form}
            name="control-hooks"
            onFinish={onFinish}
          >
            <div className="grid grid-cols-3 gap-2">
              <div className="">
                <span className="text-[1.5rem] font-inter font-medium">
                  Sr No.
                </span>
                <Form.Item
                  name="srno"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Enter SrNo" size="large" />
                </Form.Item>
              </div>
              <div className="">
                <span className="text-[1.5rem] font-inter font-medium">
                  Quantity
                </span>
                <Form.Item
                  name="qty"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Enter Quantity" size="large" />
                </Form.Item>
              </div>
              <div className="">
                <span className="text-[1.5rem] font-inter font-medium">
                  Heat/Lot NO.
                </span>
                <Form.Item
                  name="heatno"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Input placeholder="Enter HeatNo" size="large" />
                </Form.Item>
              </div>
            </div>
            <div className="">
              <span className="text-[1.5rem] font-inter font-medium">
                Size(Description)
              </span>
              <Form.Item
                name="size"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <TextArea placeholder="Enter HeatNo" size="large" />
              </Form.Item>
            </div>

            <div className="updateReportInfo">
              <table className="w-full ">
                <thead className=" bg-mainDark text-white h-[50px] md:h-[40px]">
                  <tr>
                    <th className="pl-3">Alloy Element</th>
                    <th>Actual observations</th>
                    <th>Specification range</th>
                  </tr>
                </thead>
                <tbody>
                  {chemicalRange?.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className="bg-[#8a9bd68c] text-[#081A51] text-[16px] font-inter font-semibold"
                      >
                        <td className="py-2 pl-3 border-b">{item.Element}</td>
                        <td className="py-2 border-b">
                          <Form.Item
                            name={item.Element}
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          >
                            <Input className="w-[100px]" />
                          </Form.Item>
                        </td>
                        <td className="py-2 font-inter text-[15px] border-b text-mainDark">
                          {item.percent}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="">
              <span className="text-[1.5rem] font-inter font-medium">
                Remark
              </span>
              <Form.Item
                name="remark"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="Enter HeatNo" size="large" />
              </Form.Item>
            </div>
            <Form.Item>
              <div className="flex items-center justify-center gap-3 mt-4">
                <Popconfirm
                  title={"Delete the Row"}
                  description="Are you sure to delete this row?"
                  onConfirm={DeleteReportData}
                  icon={
                    <QuestionCircleOutlined
                      style={{
                        color: "red",
                      }}
                    />
                  }
                >
                  <button
                    className="bg-red-800 text-white rounded h-[40px] px-3 font-poppins text-[1.4rem]"
                    type="button"
                  >
                    Delete
                  </button>
                </Popconfirm>
                <button
                  onClick={() => setModal2Open(false)}
                  type="button"
                  className="rounded h-[40px] px-3 font-poppins text-[1.4rem] border border-mainDark"
                >
                  Cancel
                </button>
                <button
                  className="bg-mainDark text-white rounded h-[40px] px-3 font-poppins text-[1.4rem]"
                  type="sumbit"
                >
                  Update
                </button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default Reportmobilelist