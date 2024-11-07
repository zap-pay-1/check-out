import React from 'react'

export default function loading() {
  return (
    <div  className='w-full bg-zinc-100 dotted h-screen flex items-center justify-center'>
    <div className='flex flex-col space-y-3 items-center justify-center'>
    <p>LOADING....</p>
  <div className="animate-spin inline-block size-16 w-20 h-20 border-[2px] border-current border-t-transparent text-green-600 rounded-full" role="status" aria-label="loading">
<span className="sr-only">Loading...</span>


</div>
</div>

</div>
  )
}
