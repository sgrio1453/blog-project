import React from 'react'

const DisplayName = ({fontSize}) => {
  const displayName = "Samet Geçgel";
  return (
    <div className={`font-medium ${fontSize}`}>
      {displayName}
    </div>
  )
}

export default DisplayName