import React from 'react'
import css from '../../../styles/LatterPad.module.css'
import Image from 'next/image'
import img1 from "../../../public/Images/latterpad/form1.png"
import img2 from "../../../public/Images/latterpad/form2.png"
import img3 from "../../../public/Images/latterpad/form3.png"

import { PlusOutlined } from '@ant-design/icons';
import Link from 'next/link'
const LatterPad = () => {
  const formateData=[{
    id:1,
    name:'Formate 1',
    img:img1

  },
  {
    id:2,
    name:'Formate 2',
    img:img2

  },
  {
    id:3,
    name:'Formate 3',
    img:img3

  }

]
  return (
    <div className={css.latterpadCon}>
        <div className={css.latterpadFormate}>
          <h2>Create Your latter pade </h2>
          <div className={css.FormateBox}>
            <div className={`${css.rowlatter} row`}>


              {
                formateData.map((item)=>{
                  return(
                    <div className='col-12 col-md-4' key={item.id}>
                    <div className={css.formateCon}>
                    <Image src={item.img} width={500} height={400} alt='formate Img'/>
                    
                    <div className={css.btnBox}>
                      <Link href={{ pathname: '/Settings/Latterpad', query: { formId: item.id } }}>
                      <div className={css.plusbtn}>
                    <PlusOutlined/>
                    </div>
                      </Link>
                   
                    <h5>{item.name}</h5>
                    </div>
                                  </div>
                                  </div>
                  )
                })
              }
          

            </div>
          </div>
        </div>
    </div>
  )
}

export default LatterPad