import React from 'react'
import Branches from './Branches'

const Year = ({ value, isActive, onClick }) => {
  return (
    <div className="text-sm px-10 py-2 text-center cursor-pointer">
      <h3 year="value" onClick={onClick}>{value}</h3>

      {isActive && (
        <div className="mt-2">
          <Branches year={value} />
        </div>
      )}
    </div>
  )
}

export default Year
