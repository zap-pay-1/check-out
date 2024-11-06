//@ts-nocheck

import CheckOut from '@/components/payment/Check-out'
import axios from 'axios'
import React from 'react'
import { headers } from 'next/headers'
import { BACKEND_URL } from '@/constants'
export default async function page() {
  const headerList = await headers();
  const pathname =  headerList.get("x-current-path");
  const id = pathname.startsWith('/payment/') ? pathname.slice(26) : pathname;
 
  const fetchSession  =   async ()  =>  {
    const res  =  await  axios.get(`${BACKEND_URL}/pay/session/${id}`)
     return res.data
  }

  const data = await fetchSession()
  return (
    <div>   
        <CheckOut data={data}  />
    </div>
  )
}
