import * as React from "react"
import './index.sass'
import './CloseButton.sass'

const CloseButton = (props) => {

  const handleClick = () => {
    props.onClick()
  }

  return (
      
      <div 
        className={`closeContainer${props.className && ' ' + props.className}`}
        onClick={handleClick}>
        <span className="closeIcon">+</span>
      </div>
    
  )
}

export default CloseButton

