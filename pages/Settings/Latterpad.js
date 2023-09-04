import Layout from '@/Components/Layout'
import React,{useState} from 'react'
import { useRouter } from 'next/router'
import css from "../../styles/LatterPad.module.css"
import LaterrPadCon from '@/Components/Settings/latterPad/LaterrPadCon'
import LaterrPadCon3 from '@/Components/Settings/latterPad/LaterrPadCon3'
const Latterpad = () => {
  const router  =useRouter()

  return (
    <Layout title="Latterpad">
{/* <LaterrPadCon formId={router.query.formId}/> */}
{
        router.query.formId == 3 ? <LaterrPadCon3/>:<LaterrPadCon/>
}

    </Layout>
  )
}

export default Latterpad