import '@/styles/globals.css'
import { useState,useEffect } from 'react'
import Router from 'next/router'
import 'bootstrap/dist/css/bootstrap.css'


import Loader from '@/Components/SmallComponets/Loader'
import { SessionProvider } from 'next-auth/react'
export default function App({ Component, pageProps }) {


  const[loading,setLoading]=useState(true)
  const[routeLoad,setRouteLoad]=useState(false)
  Router.events.on('routeChangeStart',(url)=>{

    setRouteLoad(true)

   
  })
  Router.events.on('routeChangeComplete',(url)=>{
  
    setRouteLoad(false)

  })
useEffect(()=>{
  setLoading(false)
},[])
  return <>
  {loading?<div className='loader'>
    <Loader/>
  </div>:
     <SessionProvider session={pageProps.session}>

       <Component {...pageProps} />
     </SessionProvider>
    
  
}
  
  </>
  
}
