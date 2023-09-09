import React from 'react'
import styles from "../../styles/ClientMobileTable.module.css"
import { DoubleRightOutlined} from '@ant-design/icons';
import {FaUserCircle} from "react-icons/fa";
import Link from 'next/link';
import Router from 'next/router';
const EditTable = ({data}) => {
 console.log(data, " client data");

  const CLientInfoHandler=(data)=>{

    localStorage.setItem("ClientData",JSON.stringify(data))

    Router.push("/Client/"+data.user_info_id)
  }
  return (
    <div>
      <div className={styles.EditTable_con}>
        <div className={styles.table_box}>
          <div className={styles.table_data}>
            {data.map((item) => {
              return (
                <div
                  className={styles.row_data}
                  key={item._id}
                  onClick={() => CLientInfoHandler(item)}
                >
                  <div className={styles.content}>
                    <span>
                      <FaUserCircle className={styles.icon_user} />
                    </span>
                    <div className={styles.name_email}>
                      <span>{item.name}</span>
                      <span>{item.email}</span>
                    </div>
                  </div>
                  <span>
                    <DoubleRightOutlined className={styles.icons_client} />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTable