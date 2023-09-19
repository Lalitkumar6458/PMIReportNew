import { Button, Form, Input, Popconfirm, Table } from 'antd';
import { MdDelete } from "react-icons/md";
import { DoubleRightOutlined,PlusCircleOutlined } from '@ant-design/icons';
import RandomGradeData from '../SmallComponets/RandomGradeData';
import styles from '../../styles/ReportPage.module.css'
import React, { useContext, useEffect, useRef, useState,useImperativeHandle } from 'react';
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
       var olData = JSON.parse(localStorage.getItem("reportAddedData")).filter(
         (x) => x.key !== record.key
       );
       var newData = {
         ...record,
         ...values,
       };

       localStorage.setItem(
         "reportAddedData",
         JSON.stringify([...olData, newData])
       );
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  
  
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        {dataIndex=="size"?<textarea className='textArea_input' ref={inputRef} rows="3" style={{width:"100%"}} onPressEnter={save} onBlur={save} />: <Input ref={inputRef}  onPressEnter={save} onBlur={save} />
        }
       
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
          width:dataIndex=="size"?"200px":"auto"
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
var AllData=[]
const ReportTable = ({data,gradeDataC,Gradename}) => {
 
const { TextArea } = Input;
var tabledaa=data
AllData=data

var getOldData=JSON.parse(localStorage.getItem("reportAddedData"))||[]
const [dataSource, setDataSource] = useState([...getOldData
]);
const [tableview, setTableview] = useState(false);


  const [count, setCount] = useState(2);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
     var olData = JSON.parse(localStorage.getItem("reportAddedData")).filter(
       (x) => x.key !== key
     );


     localStorage.setItem(
       "reportAddedData",
       JSON.stringify([...olData])
     );
  };

 
  let columdata=[]
  gradeDataC
    ? gradeDataC.chemical.map((item) => {
        if (item === "id" || item === "key") {
        } else {
          columdata.push({
            title: item.Element,
            dataIndex: item.Element,
            editable: true,
          });
        }
      })
    : null;
  const defaultColumns = [
    {
      title: "Sr No.",
      dataIndex: "srno",
      editable: true,
    },
    {
      title: "QTY",
      dataIndex: "qty",
      editable: true,
    },
    {
      title: "Size( Descriptions )",
      dataIndex: "size",
      editable: true,
    },
    ...columdata,
    ,
    {
      title: "Heat\LOT NO.",
      dataIndex: "heatno",
      editable: true,
    },
    {
      title: "Remark",
      dataIndex: "remark",
      editable: true,
    },
    {
      title: "Action",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <span
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MdDelete className={styles.icon_delete} />
            </span>
          </Popconfirm>
        ) : null,
    },
  ];

  
  const handleAdd = (data) => {
    alert("call add")
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: '32',
      address: `London, Park Lane no. ${count}`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };


  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  const[addeddata,setAddeddata] =useState([])
  const[countadd,setCountAdd] =useState(1)

  const[objSizeQty,setObjSizeQty]=useState({
   size:"",
   qty:""
  })
 
 

  const onSizeQtyHandler=(e)=>{
const{name,value}=e.target

setObjSizeQty({
 ...objSizeQty,
 [name]:value
})
  }
  const AddreportItem=()=>{
    var getOldData=JSON.parse(localStorage.getItem("reportAddedData"))||[]
    const data_get={
      key:getOldData.length===0?1:parseInt(getOldData[getOldData.length-1]["key"])+1,
      srno:getOldData.length===0?1:parseInt(getOldData[getOldData.length-1]["key"])+1,
      ...objSizeQty,
      ...RandomGradeData({data:gradeDataC?.chemical}),
      remark:"Ok"
     }
    setDataSource([...getOldData, data_get]);
   
  
    localStorage.setItem("reportAddedData",JSON.stringify([...getOldData,data_get]))
    setCountAdd(countadd+1)

  }


  return (
    <div>
      {/* <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button> */}
      <div className={styles.report_sizeqty}>
        {/* <div className={styles.tableView}>
               <button className={tableview?"":`${styles.active}`} onClick={()=>Table_view1()}>view1</button>
               <button className={tableview?`${styles.active}`:""} onClick={()=>Table_view()}>view2</button>
              </div> */}
        <div className="row">
          <div className="col-4 col-md-3">
            <div className={styles.inputBox}>
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
            <div className={styles.inputBox}>
              <label>Size(Description)</label>
              <TextArea
                placeholder="Enter Size..."
                className={styles.TextArea}
                onChange={onSizeQtyHandler}
                value={objSizeQty.size}
                name="size"
                allowClear
              />
            </div>
          </div>
          <div className="col-8 col-md-3">
            <div className={styles.inputBox}>
              <label>Heat\LOT No.</label>
              <Input
                placeholder="Enter Size..."
                onChange={onSizeQtyHandler}
                value={objSizeQty.heatno}
                name="heatno"
              />
            </div>
          </div>{" "}
       
          <div className="col-4 d-flex col-md-2">
            <div className={styles.AddButon}>
              <Button type="primary" onClick={AddreportItem}>
                <PlusCircleOutlined />
                ADD
              </Button>
            </div>
          </div>
        </div>
        <div className={`${styles.tableContent} reporttable`}>
          <Table
            components={components}
            rowClassName={() => "editable-row"}
            bordered
            dataSource={dataSource}
            columns={columns}
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
};
export default ReportTable;


