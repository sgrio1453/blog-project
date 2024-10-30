import React from 'react'

const DisplayName = ({fontSize, name}) => {
  return (
    <div className={`font-medium ${fontSize}`}>
      {name}
    </div>
  )
}

export default DisplayName