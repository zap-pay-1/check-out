import { useKlaster } from '@/providers/klaster-provider'
import React from 'react'
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
  } from "../components/ui/deposit-animated-modal";

import Image from 'next/image';
import { truncateText } from '@/lib/truncateTxt';
import { DollarSign, User2 } from 'lucide-react';
import ModalInfo from './modal-content';
import Logo from './logo';
type Props =  {
    balance : any
    address : any
}
export default function CheckoutNavbar({balance, address} : Props) {
    const {klasterBalances, klasterAddress} = useKlaster()
    const  openLink  =  ()  =>  {
      window.open(`https://docs.klaster.io/getting-started`)
  }
     console.log("provider balances", klasterBalances)
  return (
    <div className='w-full border-b  p-3 flex items-center justify-center sticky top-0 bg-white/85 z-20'>
        <div className='w-full max-w-7xl mx-auto flex justify-between items-center'>
     <Logo   />



     
  <Modal >
     <ModalTrigger >
         <div className='flex items-center space-x-1 px-2 py-1 md:py-2 md:px-4 rounded-xl border border-zinc-200'>
             <Image  src={`/img/klaster.jpg`} width={200} height={200} alt='klaster logo'  className=' w-4 h-4 md:w-6 md:h-6 object-cover rounded-full' />
              <p className='text-sm md:text-base'>{klasterAddress && truncateText(klasterAddress, 13, 8, 4)}</p>
         </div>
     </ModalTrigger>
     <ModalBody  className='w-[200px]'>
        <ModalContent>
           <ModalInfo  />
        </ModalContent>
        <ModalFooter>
          <div className='flex items-center justify-center space-x-2 text-sm'><p>Whats Klatser?</p>
           <div className=' text-blue-500 cursor-pointer text-sm' onClick={openLink}>
            <p>Learn more</p> 
           </div>
           </div>
        </ModalFooter>
     </ModalBody>
  </Modal>


  
      </div>
    </div>
  )
}
