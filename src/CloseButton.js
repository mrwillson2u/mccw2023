import * as React from "react"
import './index.sass'
import './CloseButton.sass'

const CloseButton = (props) => {

  const handleClick = () => {
    props.onClick()
  }

  return (
      
      <div 
        className="closeContainer"
        onClick={handleClick}>
        <div className="lowerLeftToUpperRight"></div>
        <div className="upperLeftToLowerRight"></div>
      </div>
    
  )
}

export default CloseButton

