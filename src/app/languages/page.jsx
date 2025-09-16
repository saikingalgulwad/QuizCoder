import React from 'react'
import Chapter from './chapter/page'
import Question from './chapter/question/page'

function page() {
  return (
    <div>
        <input type="text" name="" id="lang" className='bg-emerald-200 m-6' placeholder='Language' />

       <button>Submit</button>
    </div>
  )
}

export default page