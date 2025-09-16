import React from 'react'

function Question() {
  return (
    <div className=' w-[200px] flex flex-col'>
        <input type="text" name="" id="" 
        className='bg-emerald-300 ml-6 mt-2'
        placeholder='Question' />
        <input type="text" name="" id="" 
         className='bg-emerald-300 ml-6 mt-2'placeholder='answers'/>

         <input type="text" name="" id="" 
         className='bg-emerald-300 ml-6 mt-2'placeholder='answers'/>

         <input type="text" name="" id="" 
         className='bg-emerald-300 ml-6 mt-2'placeholder='answers'/>

         <input type="text" name="" id="" 
         className='bg-emerald-300 ml-6 mt-2'placeholder='answers'/>
         
         <input type="text" name="" id="" 
         className='bg-emerald-300 ml-6 mt-2'placeholder='correct ans' />
         <input type="text" name="" id="" 
         className='bg-emerald-300 ml-6 mt-2'placeholder='chapter id' />
         <button className='w-[200px] ml-4 bg-purple-700 text-white mt-1.5'>submit</button>

    </div>
  )
}

export default Question