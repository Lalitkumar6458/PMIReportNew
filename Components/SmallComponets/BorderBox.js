import React,{useState} from 'react'
import { FileAddOutlined} from '@ant-design/icons';
import {HiArrowNarrowDown,HiArrowNarrowUp } from "react-icons/hi";

const BorderBox = ({children,title}) => {
  const [smallbox,setSmallbox]=useState(false)
  return (
    <div className='Borbox_con'>
<div className='Border_box'>
<button type='button' className="small_height_b" onClick={()=>{smallbox?setSmallbox(false):setSmallbox(true)}}>{smallbox?<HiArrowNarrowDown/>:<HiArrowNarrowUp/>}</button>
      <h2>{title}</h2>
      <div className='hideandShow' style={{display:smallbox?"none":""}}>

{children}
      </div>
    </div>
    </div>
    
  )
}

export default BorderBox