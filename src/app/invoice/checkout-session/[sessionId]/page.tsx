//@ts-nocheck

import InvoiceCheckOut from '@/components/invoices/Invoice-checkout'
import React from 'react'
import { headers } from 'next/headers'
import { BACKEND_URL } from '@/constants'
import axios from 'axios'
export default async function page() {
  const headerList = await headers();
  const pathname =  headerList.get("x-current-path");
  const id = pathname.startsWith('/invoice/') ? pathname.slice(26) : pathname;

  const handleFetchSession  =   async ()  =>  {
    const res  =  await  axios.get(`${BACKEND_URL}/invoice/get-invoice/${id}`)
     return res.data
  }

  const data = await handleFetchSession()
  return (
    <div>
    
      <InvoiceCheckOut  data={data} />
    </div>
  )
}
//
