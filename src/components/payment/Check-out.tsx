
//@ts-nocheck

"use client"
import React, {useState, useEffect} from 'react'
import {
    useQuery,
  } from '@tanstack/react-query'
  import io from 'socket.io-client';
import { z } from "zod"
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from 'next/navigation'
import {Loader, Loader2, } from 'lucide-react'
import { AnimatePresence, motion } from "framer-motion"
import Image from 'next/image';
import SessionSuccess from './session-seccess';
import FailedState from '../invoices/failedState';
import { useAccount } from '@particle-network/connectkit';
  import { useQRCode } from 'next-qrcode'
  import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { BACKEND_URL, GLOBAL_LOGO } from '@/constants';
import PayState2 from './pay-state-2';
import { useConnect } from '@particle-network/connectkit';
import CheckoutNavbar from '../checkout-navbar';
import { useKlaster } from '@/providers/klaster-provider';
import SessionExpired from './session-expired';


const formSchema = z.object({
  payerEmail: z.string(),
  payerName : z.string(),
    payerAddress : z.string(),
     country :   z.string(),
    addressLine1  :  z.string(),
    addressLine2  :  z.string(),
    city :  z.string(),
    state : z.string(),
    zipCode :  z.string()
 })


 type Props = {
  data : any
 }
export default function CheckOut({data} : Props) {
    
    const [status, setStatus] = useState();
    const [isCheckingOut, setisCheckingOut] = useState(false)
  
 
   
const params =  useParams()
    const  router =  useRouter()
    const sessionId = params.sessionId
  const  PAY_BASE_URL = `${BACKEND_URL}/pay/`
   const  LOCAL_BASE_URL  = "http://localhost:5000/pay/"
const {isConnected, address}  = useAccount()
const {klasterAddress} = useKlaster()
 
              // Initialize socket only once using useEffect
  const socket = io(BACKEND_URL, { autoConnect: false });


  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log(`Connected to server with ID: ${socket.id}`);
    });

    socket.on('paymentStatus', (newStatus) => {
      console.log("The payment status:", newStatus);
       if(newStatus.sessionId  === sessionId){
        setisCheckingOut(false)
       }
      
      //alert("changed")
      setStatus(newStatus);
    });

    return () => {
      socket.disconnect();
    };
  }, [])

console.log("status", status)

 
console.log("information", data)

    const  SESSION_EXP_TIME =  data?.session?.durationTime


    useEffect(() => {
      if (window !== undefined && data?.session?.successUrl && status?.status === "COMPLETED") {
        const successUrl = data?.reciever?.redirectUrl
     try {
          // Validate if it's a valid URL and ensure it starts with https
          const url = new URL(successUrl);
          if (url  /*.protocol === 'https:'*/) {
            window.location.href = successUrl; // Redirect only if it's a valid HTTPS URL
          } else {
            console.error("Invalid redirect URL: Must be an HTTPS URL.");
          }
        } catch (error) {
          console.error("Invalid URL:", error?.message); // Handle invalid URL format
        }
      }
    }, [status]);
    
    

              const  getPaymentState =  ()  =>  {
                if(data?.session?.paymentStatus   === "completed"){
   return(
    <SessionSuccess data={data} status={status}  />
   )
                }
                if(!status    && data?.session?.paymentStatus  !== "completed" /* !testTruth  */  ){
                  return(
                 <PayState2     data={data} status={status} SESSION_EXP_TIME={SESSION_EXP_TIME}  isCheckingOut={isCheckingOut} setisCheckingOut={setisCheckingOut}  />
              
                  )
                   
                }  else if(status &&  status.status  === "COMPLETED"  && status.sessionId === sessionId /*testTruth */){
     return(
     <SessionSuccess   data={data} status={status}    />
     )
                }else if(status &&  status.status  === "FAILED"  && status.sessionId === sessionId ){
                  return(
                   <FailedState  />
                   )

                }else if( status &&  status.status  === "PENDING"  && status.sessionId === sessionId  /*! testTruth */){
                  return(
                    <AnimatePresence>
                    < motion.div  
                    className='flex items-center justify-center  w-full p-5 rounded-xl border  '
                    initial={{ y : 3 }}
                    transition={{ease : "easeIn", duration : 1}}
                    animate={{ y: -3 }}
                    exit={{ opacity: 0 }}
                    key={"pending"}
                    >
                       <div  className='  w-full items-center justify-center  '>
                     
              
                <div className=' pb-6 pt-5 flex flex-col justify-center items-center '>
                <Loader2  className='w-16 h-16 mb-3 animate-spin' />
                    <h1  className='text-xl leading-snug font-semibold text-center'>Processing Your Payment </h1>
                     <h2 className='text-muted-foreground text-sm text-center'></h2>
                </div>
              
                       </div>
              
                    </motion.div>
                    </AnimatePresence>
                  )
                }else if(status &&  status.status  === "EXPIRED"  && status.sessionId === sessionId ){
                  return(
                  <SessionExpired />
                   )

                }
              }


             
            
  return (
    <div>
      {klasterAddress &&
        <CheckoutNavbar balance={2} address={"helllo address"} />
      }
    <div className=' max-w-5xl mx-auto    my-4 h-screen  '>
    
    {/*} <OnChainDtaNav walletAddress={userMetadata?.publicAddress} balance={formattedBalance1} />*/}

        <div  className='flex flex-col md:flex-row lg:space-x-1 '>
          <div  className='flex-1 w-full md:min-h-screen bg-zinc-50 items-center justify-center relative   p-6  overflow-x-hidden'>
        
               <div  className='my-5'>
                 <h1  className='text-lg font-medium  md:font-semibold my-2 truncate'>{data?.reciever?.linkName}</h1>
                 <div className='w-[95%] overflow-x-visible'>
                  <h2  className='text-muted-foreground text-sm md:text-sm break-words line-clamp-6 '>{data?.reciever?.description}</h2>
                  </div>
               </div>

                 <div  className='my-5  h-[1.5px]  bg-muted'></div>

                  <div  className='flex  space-x-4  items-center'>
                    <p className='font-medium md:font-semibold'>Amount</p>
                    <div className='flex space-x-1 items-center justify-center'>
                    <Image src={`/img/usdc.png`} height={100} width={100} alt='token logo' 
                      className='w-4 h-4 rounded-full '
                    />
                     <p className='md:font-medium'>  {data?.session?.amount} USDC</p>
                     </div>
                  </div>


  {/*REMOVED PRODUC IMAGE  
                  <div className='my-5  flex items-center justify-center lg:justify-start lg:items-start'>
                     <Image     src={`/img/messi.png`}  width={300} height={300} alt='product image' className='border w-56 h-52 md:w-72 md:h-80 object-cover'  />
                  </div>
*/}
                   <div  className='absolute bottom-14 w-full hidden lg:flex'>
                   <p className='text-sm text-muted-foreground'>Powered by ZapPay</p>
  </div>

         </div>
          <div  className='flex-1   md:h-screen    p-6  '>
          {getPaymentState()}
          </div>
                
            </div>    </div>           
            </div>
         
            )}

  

  
