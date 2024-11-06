//@ts-nocheck
"use client"

import { useKlaster } from '@/providers/klaster-provider'
import React, {useState} from 'react'
import { useQRCode } from 'next-qrcode'
import { truncateText } from '@/lib/truncateTxt';
import { Copy } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
export default function ModalInfo() {
    const {klasterAddress, klasterBalances}  = useKlaster()
    const [copied, setcopied] = useState<boolean>(false)
    const { Canvas } = useQRCode();

    const copyLink = (link)  => {
        navigator.clipboard.writeText(link)
        setcopied(true)
      }
  return (
    <div className='flex items-center justify-center flex-col'>


        <div>
    <h1 className='font-semibold text-center text-2xl mb-2'>Klaster wallet</h1>
    <TooltipProvider>
        <Tooltip>
        <TooltipTrigger>
    <div className={`bg-slate-100 py-2 px-4 rounded-xl my-1 flex space-x-1 items-center cursor-pointer ${copied && "text-green-700"}`} onClick={() =>  copyLink(klasterAddress)}>
    <p className='text-center'>{klasterAddress && truncateText(klasterAddress, 13, 8, 4)}</p>
    <Copy  className='w-3.5 h-3.5' />
    </div>
    </TooltipTrigger>
    <TooltipContent>
    <div className='flex items-center space-x-2 cursor-pointer'  >
        <Copy   className='text-muted-foreground w-3 h-3 cursor-pointer' onClick={() =>  copyLink(klasterAddress)}/>
        <p className='text-sm'>{copied  ? "Copied" : "Click to copy"}</p>
      </div>
    </TooltipContent>
    </Tooltip>
    </TooltipProvider>
    <div className='flex items-center justify-center flex-col mb-2'>
    <p className=''>Balance <span className='text-xl font-serif'>$</span>{klasterBalances}</p>
    </div>
    </div>

     
      <div  className=' bg-slate-100 rounded-xl p-2 inline-block'>
                                          <Canvas
                                           text={`ethereum:${klasterAddress}`}
                                           options={{
                                             errorCorrectionLevel: 'M',
                                             margin: 2,
                                             scale: 20,
                                             width: 190,
                                             color: {
                                                 dark: '#09090b',
                                                 light: '#f8fafc',
                                               },
                                           }}
                                           logo={{
                                             src: 'https://pbs.twimg.com/profile_images/1804136325756469248/GD6ODnI6_400x400.jpg',
                                             options: {
                                               width: 35,
                                               x: undefined,
                                               y: undefined,
                                               
                                             }
                                           }}
                                         />
                                     </div>
    </div>
  )
}
