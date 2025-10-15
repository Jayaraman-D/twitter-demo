import React from 'react'
import './Suggestions.css'
import dp from '/logos/x-logo.png'

const Suggestions = () => {
  return (
    <div className='suggestions'>
      <div className="suggestUser">
        <img src={dp} alt='dp'></img>
        <p className='userName'>Karthik</p>
      </div>
      <div className="suggestUser">
        <img src={dp} alt='dp'></img>
        <p className='userName'>Balaji</p>
      </div>
      <div className="suggestUser">
        <img src={dp} alt='dp'></img>
        <p className='userName'>Senthil Kumar</p>
      </div>
    </div>
  )
}

export default Suggestions