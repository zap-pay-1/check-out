//@ts-nocheck

import CheckOut from '@/components/pay/Check-out'
import React from 'react'
import { headers } from 'next/headers'
import { BACKEND_URL } from '@/constants'
import axios from 'axios'
export default async function page() {
  const headerList = await headers();
  const pathname =  headerList.get("x-current-path");
  const id = pathname.startsWith('/pay/') ? pathname.slice(22) : pathname;

  const handleFetchSession  =   async ()  =>  {
    const res  =  await  axios.get(`${BACKEND_URL}/pay/checkout-session/${id}`)
     return res.data
  }
  const data =  await handleFetchSession()
  return (
    <div>
     
<CheckOut data={data} />
    </div>
  )
}
