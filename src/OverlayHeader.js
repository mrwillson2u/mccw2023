import * as React from "react"
import './index.sass'
import './OverlayHeader.sass'

const OverlayHeader = (props) => {

  return (
      
      <div className="headerContainer">
        {/* <div className="closeRow"> */}
          
        {/* </div> */}
       
        {props.children}
      </div>
  )
}

export default OverlayHeader

