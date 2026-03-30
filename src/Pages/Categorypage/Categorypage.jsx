import React from 'react'
import { useParams } from 'react-router-dom'

const Categorypage = () => {
    const {category, subcategory} = useParams();

    console.log(category);
    console.log(subcategory);
  return (
    <div>
      <h1 className=' my-5 text-center text-3xl font-mono'>{category} / {subcategory}</h1>
      <h3 className='text-center text-xl font-mono'>Page Coming Soon</h3>
        
    </div>
  )
}

export default Categorypage
