//@ts-nocheck

import LinkPay from '@/components/payment/LinkPay'
import axios from 'axios';
import React from 'react'
import { headers } from 'next/headers'
import { BACKEND_URL } from '@/constants'
export default async function page() {
  const headerList = await headers();
  const pathname =  headerList.get("x-current-path");
  const id = pathname.startsWith('/payment/') ? pathname.slice(22) : pathname;

  console.log("payment id", id)
  const handleFetchLink  =   async ()  =>  {
    const res  =  await  axios.get(`${BACKEND_URL}/pay/link/${id}`)
     return res.data
  }
    const  data = await handleFetchLink()
  return (
    <div  className='flex w-full h-screen items-center justify-center  bg-muted'>  
      <LinkPay  data={data} />
    </div>
  )
}
