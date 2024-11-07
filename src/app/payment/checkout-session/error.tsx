'use client' // Error boundaries must be Client Components
 
import Image from 'next/image'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.log("page errors",error)
  }, [error])
 
  return (
    <div  className='w-full bg-zinc-100 dotted h-screen flex items-center justify-center'>
     <div>
         <Image src={"/img/not-found.svg"}  width={400} height={400} alt='not found' className='w-[80%] md:w-[400px]'  />
         <div className='my-4 flex flex-col space-y-3'>
            <h1 className='font-medium text-center'>Oops, something went wrong!</h1>
            <p className='text-sm text-center text-muted-foreground'>It appears this may be because the payment link was deleted by its creator.</p>
         </div>
     </div>

    </div>
  )
}